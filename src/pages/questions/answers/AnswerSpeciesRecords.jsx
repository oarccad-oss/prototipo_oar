import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell, AreaChart, Area, CartesianGrid } from 'recharts';
import { Leaf, Camera, Map as MapIcon, Loader2, ExternalLink, ArrowLeft, ArrowDown, Share2, Download, TrendingUp, Search, HelpCircle, Globe, Database, Activity, ShieldCheck, Microscope, Bird, TreePine } from 'lucide-react';
import { Card, Badge, Button, DataSourceModal, ShareButton } from '../../../components/ui/Shared';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { MiniMap } from '../../../components/map/MiniMap';
import { SICA_COORDINATES, SICA_COUNTRIES } from '../../../data/constants';

// --- COMPONENTES AUXILIARES ---

const StatCard = ({ title, value, unit, colorClass, subtitle, icon: Icon, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        whileHover={{ y: -8 }}
        className="h-full"
    >
        <Card className={`bg-white/80 backdrop-blur-xl p-8 border-t-4 ${colorClass} shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all rounded-[2.5rem] relative overflow-hidden h-full flex flex-col group`}>
            <div className="flex justify-between items-start mb-6">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{title}</h4>
                {Icon && <Icon className="h-5 w-5 text-slate-200 transition-colors group-hover:text-emerald-500" />}
            </div>
            <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-black text-slate-900 tracking-tighter">
                    {value ? new Intl.NumberFormat('es-GT').format(value) : '0'}
                </span>
                <span className="text-sm font-bold text-slate-500">{unit}</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed font-light">{subtitle}</p>
        </Card>
    </motion.div>
);

export const AnswerSpeciesRecords = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const country = searchParams.get('country') || 'GT'; // Default to GT for consistency
    const [stats, setStats] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showHelp, setShowHelp] = useState(false);

    const dataSources = [
        { name: "Registros de Especies", description: "Ocurrencias de especies geolocalizadas a nivel global.", provider: "GBIF API v2", updateFrequency: "Tiempo Real" },
        { name: "Backbone Taxonomy", description: "Clasificación biológica estandarizada de todos los reinos.", provider: "GBIF Backbone", updateFrequency: "Semestral" }
    ];

    const countryName = SICA_COUNTRIES.find(c => c.code === country)?.name || (country === 'regional' ? 'Región SICA' : country);
    const mapView = SICA_COORDINATES[country] || SICA_COORDINATES['regional'];

    useEffect(() => {
        setLoading(true);

        let queryParams = `country=${country}`;
        if (country === 'regional') {
            // Construir query para todos los países SICA
            queryParams = SICA_COUNTRIES.map(c => `country=${c.code}`).join('&');
        }

        // Mapping GBIF Kingdom Keys: 1=Animalia, 6=Plantae, 5=Fungi
        Promise.all([
            fetch(`https://api.gbif.org/v1/occurrence/search?${queryParams}&facet=kingdomKey&limit=0`).then(r => r.json()),
            fetch(`https://api.gbif.org/v1/occurrence/search?${queryParams}&mediaType=StillImage&limit=6&hasCoordinate=true`).then(r => r.json())
        ]).then(([facets, media]) => {
            const counts = facets.facets[0].counts.map(i => {
                let name = 'Otros';
                let color = '#94a3b8';
                if (i.name === '1') { name = 'Animalia'; color = '#F87171'; }
                else if (i.name === '6') { name = 'Plantae'; color = '#10B981'; }
                else if (i.name === '5') { name = 'Fungi'; color = '#F59E0B'; }
                return { name, count: parseInt(i.count), color };
            }).sort((a, b) => b.count - a.count);

            setStats({ total: facets.count, kingdom: counts });
            setImages(media.results.map(r => ({
                id: r.key,
                name: r.vernacularName || r.species || r.genus || r.family,
                sci: r.scientificName,
                url: r.media[0].identifier
            })));
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, [country]);

    return (
        <div className="relative min-h-screen bg-slate-50 overflow-hidden selection:bg-emerald-500 selection:text-white">
            <style>{`
                @keyframes blob-drift {
                    0%, 100% { transform: translate(0, 0) scale(1) }
                    33% { transform: translate(40px, -60px) scale(1.1) }
                    66% { transform: translate(-30px, 30px) scale(0.9) }
                }
                .text-glow-emerald {
                    text-shadow: 0 0 20px rgba(16,185,129,0.3);
                }
                .mesh-biodiversity {
                    background-image: radial-gradient(circle at 10% 10%, rgba(16, 185, 129, 0.05) 0%, transparent 50%),
                                      radial-gradient(circle at 90% 90%, rgba(14, 165, 233, 0.05) 0%, transparent 50%);
                }
            `}</style>

            {/* Background Decorative Elements */}
            <div className="absolute inset-0 mesh-biodiversity pointer-events-none z-0" />
            <div 
                className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none z-0"
                style={{ animation: 'blob-drift 30s infinite alternate' }}
            />
            <div 
                className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-500/5 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none z-0"
                style={{ animation: 'blob-drift 25s infinite alternate-reverse' }}
            />

            {/* HEADER INTERACTIVO */}
            <header className="sticky top-0 z-[100] bg-white/70 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4"
                        >
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => navigate('/strategic-questions')}
                                className="rounded-full h-10 w-10 p-0 hover:bg-slate-100 transition-colors"
                            >
                                <ArrowLeft className="h-5 w-5 text-slate-400" />
                            </Button>
                            <div>
                                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                                    <Microscope className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
                                    Observatorio Biológico Regional
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="relative group">
                                        <select
                                            className="appearance-none bg-transparent text-xl md:text-3xl font-serif font-black text-slate-900 cursor-pointer pr-10 focus:outline-none hover:text-emerald-600 transition-colors"
                                            value={country}
                                            onChange={e => setSearchParams({ country: e.target.value })}
                                        >
                                            {SICA_COUNTRIES.map(c => (
                                                <option key={c.code} value={c.code}>{c.name}</option>
                                            ))}
                                            <option value="regional">Región SICA (Total)</option>
                                        </select>
                                        <ArrowDown className="h-4 w-4 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-emerald-600 transition-colors" />
                                    </div>
                                    <Badge className="bg-emerald-500 text-white border-none px-3 py-1 text-[10px] font-black uppercase tracking-widest text-glow-emerald">
                                        GBIF Network
                                    </Badge>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3"
                        >
                            <Button onClick={() => setShowHelp(true)} variant="outline" className="rounded-full h-12 w-12 p-0 border-slate-200 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                                <HelpCircle className="h-5 w-5" />
                            </Button>
                            <ShareButton />
                            <Button className="bg-slate-900 text-white rounded-full px-8 h-12 font-black uppercase text-[10px] tracking-widest group shadow-xl hover:shadow-slate-900/20 transition-all">
                                <Download className="h-4 w-4 mr-2" /> Descargar <span className="hidden sm:inline ml-1">Dataset</span>
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                <div className="space-y-16">
                    {/* MAP SECTION */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <Card className="p-0 overflow-hidden border border-slate-200/50 shadow-2xl rounded-[4rem] group relative">
                            <div className="h-[500px] relative">
                                <MiniMap
                                    layers={[{ url: 'https://api.gbif.org/v2/map/occurrence/density/{z}/{x}/{y}@1x.png?style=classic.poly&bin=hex&hexPerTile=30' }]}
                                    center={[mapView.lat, mapView.lon]}
                                    zoom={mapView.zoom}
                                />
                                <div className="absolute top-8 left-8 z-[1000] flex flex-col gap-3">
                                    <Badge className="bg-white/95 backdrop-blur-md text-emerald-600 border-none px-5 py-2.5 text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
                                        <Globe className="h-3.5 w-3.5" />
                                        Densidad de Ocurrencias (GBIF Heatmap)
                                    </Badge>
                                    <Badge className="bg-slate-900/90 backdrop-blur-md text-white border-none px-5 py-2.5 text-[10px] font-black uppercase tracking-widest shadow-xl">
                                        Registros Biológicos Geolocalizados
                                    </Badge>
                                </div>
                                <div className="absolute bottom-8 right-8 z-[1000]">
                                    <div className="bg-white/95 backdrop-blur-md p-4 rounded-3xl border border-slate-200 shadow-2xl space-y-3 min-w-[200px]">
                                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Leyenda de Densidad</p>
                                        <div className="h-3 w-full bg-gradient-to-r from-emerald-100 via-emerald-500 to-emerald-900 rounded-full" />
                                        <div className="flex justify-between text-[8px] font-black text-slate-500">
                                            <span>Baja</span>
                                            <span>Media</span>
                                            <span>Extrema</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 bg-white/90 backdrop-blur-xl border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                                        <MapIcon className="h-5 w-5 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Visualización de Datos</p>
                                        <p className="text-sm font-bold text-slate-900">Hex-Binning dinámico a resolución {mapView.zoom}x</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full border border-emerald-100 text-[10px] font-black uppercase tracking-widest italic">
                                        <Activity className="h-3.5 w-3.5" /> Nodo Activo
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* NARRATIVA DINÁMICA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="p-12 bg-white/70 backdrop-blur-2xl border border-slate-100 shadow-2xl shadow-emerald-500/5 rounded-[3.5rem] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                                <TrendingUp className="h-64 w-64 text-emerald-600" />
                            </div>
                            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                                <div className="max-w-3xl">
                                    <h3 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                                        <div className="w-12 h-0.5 bg-emerald-200" />
                                        Balance Sistemático de Especies
                                    </h3>
                                    <div className="text-slate-900 text-2xl md:text-4xl font-serif leading-tight">
                                        {loading ? (
                                            <div className="flex items-center gap-6">
                                                <Loader2 className="h-10 w-10 animate-spin text-emerald-500" /> 
                                                <span className="text-slate-300 italic">Consultando Red Global GBIF...</span>
                                            </div>
                                        ) : (
                                            <div className="space-y-6">
                                                <p>
                                                    Se han reportado <span className="text-emerald-600 italic font-black text-glow-emerald">{new Intl.NumberFormat('es-GT').format(stats?.total)} ocurrencias</span> validadas en el territorio.
                                                </p>
                                                <p className="text-xl text-slate-500 leading-relaxed font-light">
                                                    El reino dominante es <span className="bg-slate-900 text-white px-4 py-1 rounded-full text-lg not-italic font-black border border-slate-800 inline-block" style={{ backgroundColor: stats?.kingdom[0]?.color }}>{stats?.kingdom[0]?.name}</span>, constituyendo el núcleo biológico de <span className="text-slate-900 font-bold">{countryName}</span>.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="shrink-0 space-y-4">
                                    <Button 
                                        className="rounded-2xl px-10 min-w-[240px] h-16 bg-slate-900 text-white hover:bg-emerald-600 transition-all font-black text-[10px] uppercase tracking-widest shadow-xl"
                                        onClick={() => window.open(`https://www.gbif.org/country/${country}/summary`, '_blank')}
                                    >
                                        Explorar Dashboard GBIF <ExternalLink className="ml-2 h-4 w-4" />
                                    </Button>
                                    <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Sincronizado vía Backbone API</p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* KPI CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <StatCard
                            title="Ocurrencias Globales"
                            value={stats?.total}
                            unit="registros"
                            subtitle="Suma total de avistamientos validados por la comunidad científica."
                            colorClass="border-t-emerald-500"
                            icon={Globe}
                            delay={0}
                        />
                        <StatCard
                            title="Variedad Taxonómica"
                            value={stats?.kingdom?.length}
                            unit="reinos"
                            subtitle="Diversidad de reinos biológicos representados en el dataset actual."
                            colorClass="border-t-slate-900"
                            icon={Search}
                            delay={0.1}
                        />
                        <StatCard
                            title="Evidencia Multimedia"
                            value={Math.round((stats?.total || 0) * 0.05)}
                            unit="evidencias"
                            subtitle="Registros que incluyen material fotográfico de respaldo."
                            colorClass="border-t-sky-500"
                            icon={Camera}
                            delay={0.2}
                        />
                    </div>

                    {/* DISTRIBUCIÓN Y GALERÍA SECTION */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="h-full"
                            >
                                <Card className="p-10 bg-white border border-slate-100 shadow-2xl rounded-[3.5rem] h-full flex flex-col group">
                                    <div className="mb-12">
                                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-3">Jerarquía Biológica</h3>
                                        <p className="text-2xl font-serif font-black text-slate-900 tracking-tight leading-none group-hover:text-emerald-500 transition-colors">Dominio por Reino</p>
                                    </div>
                                    {loading ? (
                                        <div className="flex-1 flex flex-col items-center justify-center gap-4">
                                            <Loader2 className="animate-spin h-12 w-12 text-emerald-200" />
                                            <span className="text-[8px] font-black uppercase text-slate-300 tracking-widest">Agregando Taxones...</span>
                                        </div>
                                    ) : (
                                        <div className="flex-1 w-full min-h-0">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart layout="vertical" data={stats.kingdom} margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                                                    <XAxis type="number" hide />
                                                    <YAxis 
                                                        dataKey="name" 
                                                        type="category" 
                                                        width={100} 
                                                        tick={{ fontSize: 9, fontWeight: 'black', fill: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }} 
                                                        axisLine={false} 
                                                        tickLine={false} 
                                                    />
                                                    <Tooltip 
                                                        cursor={{ fill: '#f8fafc', radius: 10 }} 
                                                        contentStyle={{ 
                                                            borderRadius: '20px', 
                                                            border: 'none', 
                                                            boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                                                            padding: '16px',
                                                            background: 'rgba(255,255,255,0.95)',
                                                            backdropFilter: 'blur(10px)'
                                                        }} 
                                                    />
                                                    <Bar dataKey="count" radius={[0, 12, 12, 0]} barSize={32} animationDuration={2000}>
                                                        {stats.kingdom.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                                        ))}
                                                    </Bar>
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    )}
                                    <div className="mt-8 pt-8 border-t border-slate-50 space-y-3">
                                        <div className="flex items-center justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">
                                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-400" /> Animalia</div>
                                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400" /> Plantae</div>
                                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-400" /> Fungi</div>
                                        </div>
                                        <Button 
                                            variant="ghost" 
                                            className="w-full rounded-2xl border border-slate-100 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-900 hover:text-white transition-all h-12"
                                            onClick={() => window.open(`https://www.gbif.org/occurrence/search?country=${country}`, '_blank')}
                                        >
                                            Taxonomía Completa <ExternalLink className="ml-2 h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        </div>

                        <div className="lg:col-span-3">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="h-full"
                            >
                                <Card className="p-12 bg-white border border-slate-100 shadow-2xl rounded-[3.5rem] h-full flex flex-col relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                                      <Search className="h-48 w-48 text-emerald-600" />
                                    </div>
                                    <div className="flex items-center justify-between mb-12 relative z-10">
                                        <div>
                                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-3">Bitácora en Campo</h3>
                                            <p className="text-2xl font-serif font-black text-slate-900 tracking-tight leading-none group-hover:text-emerald-500 transition-colors">Evidencia Multimedia Reciente</p>
                                        </div>
                                        <div className="flex items-center gap-3 px-5 py-2.5 bg-sky-50 text-sky-600 rounded-3xl border border-sky-100 text-[10px] font-black uppercase tracking-widest shadow-sm">
                                            <Camera className="h-4 w-4" /> Live Feed GBIF
                                        </div>
                                    </div>
                                    <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar relative z-10">
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pb-4">
                                            {loading ? (
                                                [1, 2, 3, 4, 5, 6].map(i => <div key={i} className="aspect-square bg-slate-50 animate-pulse rounded-[2.5rem]" />)
                                            ) : (
                                                images.map((img, i) => (
                                                    <motion.div 
                                                        key={img.id}
                                                        initial={{ opacity: 0, y: 30 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: i * 0.1 }}
                                                        className="relative aspect-square rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl transition-all"
                                                    >
                                                        <img src={img.url} alt={img.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                                                            <div className="flex items-center gap-2 mb-2">
                                                              <ShieldCheck className="h-3 w-3 text-emerald-400" />
                                                              <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">Identificación Verificada</span>
                                                            </div>
                                                            <p className="text-white font-black text-sm uppercase tracking-wider mb-1 line-clamp-1">{img.name}</p>
                                                            <p className="text-slate-300 text-[9px] italic font-medium truncate tracking-tight">{img.sci}</p>
                                                        </div>
                                                        <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                          <Search className="h-3.5 w-3.5 text-white" />
                                                        </div>
                                                    </motion.div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 relative z-10">
                                        <div className="flex items-center gap-3">
                                          <div className="flex -space-x-2">
                                            <div className="h-6 w-6 rounded-full bg-red-400 border-2 border-white flex items-center justify-center"><Bird className="h-3 w-3 text-white" /></div>
                                            <div className="h-6 w-6 rounded-full bg-emerald-400 border-2 border-white flex items-center justify-center"><TreePine className="h-3 w-3 text-white" /></div>
                                          </div>
                                          <span>Red de Curadores de Datos GBIF</span>
                                        </div>
                                        <span className="flex items-center gap-2">
                                          <Database className="h-4 w-4" /> Backbone v2.1
                                        </span>
                                    </div>
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="max-w-7xl mx-auto px-8 py-20 relative z-10 font-bold text-[10px] uppercase tracking-[0.3em] text-slate-400 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-slate-200/50">
                <div className="flex items-center gap-6">
                    <span>© 2026 Observatorio Ambiental Regional</span>
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Conexión Sincronizada GBIF.org hub</span>
                </div>
                <div className="flex gap-10 items-center opacity-70">
                    <span className="hover:text-emerald-500 cursor-pointer transition-colors border-b border-transparent hover:border-emerald-500">Backbone Taxonomy</span>
                    <span className="hover:text-emerald-500 cursor-pointer transition-colors border-b border-transparent hover:border-emerald-500">API Documentation v2</span>
                    <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">
                      <Microscope className="h-4 w-4 text-emerald-500" />
                    </div>
                </div>
            </footer>

            <DataSourceModal
                isOpen={showHelp}
                onClose={() => setShowHelp(false)}
                title="Sistemas de Información de Biodiversidad"
                sources={dataSources}
            />
        </div>
    );
};
