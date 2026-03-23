import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { Shield, Leaf, AlertCircle, Info, ArrowLeft, ArrowDown, Share2, Download, TrendingUp, Target, HelpCircle, Loader2, Database, Map as MapIcon, ChevronRight } from 'lucide-react';
import { Card, Badge, Button, DataSourceModal, ShareButton } from '../../../components/ui/Shared';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MiniMap } from '../../../components/map/MiniMap';
import { SICA_COORDINATES } from '../../../data/constants';
import { cn } from '../../../lib/utils';

// Eliminadas constantes locales para usar fetch remoto

const StatCard = ({ title, value, unit, colorClass, subtitle, icon: Icon, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        whileHover={{ y: -8 }}
        className="h-full"
    >
        <Card className={`bg-white/80 backdrop-blur-xl p-8 border-t-4 ${colorClass} shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all rounded-[2.5rem] relative overflow-hidden h-full flex flex-col`}>
            <div className="flex justify-between items-start mb-6">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{title}</h4>
                <div className={`p-2 rounded-xl bg-slate-50 border border-slate-100`}>
                    {Icon && <Icon className="h-5 w-5 text-slate-400" />}
                </div>
            </div>
            <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-black text-slate-900 tracking-tighter">
                    {value}
                </span>
                <span className="text-sm font-bold text-slate-500">{unit}</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed font-light flex-grow">{subtitle}</p>
        </Card>
    </motion.div>
);

export const AnswerConservation30x30 = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedIso = searchParams.get('country') || 'regional';
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showHelp, setShowHelp] = useState(false);

    const dataSources = [
        { name: "Global Biodiversity Framework (GBF)", description: "Metas mundiales para la biodiversidad, incluyendo la meta 3 (30x30).", provider: "UN Biodiversity Lab", updateFrequency: "Anual" },
        { name: "Integridad Ecológica", description: "Índice de integridad de los ecosistemas terrestres.", provider: "Venter et al. / UNBL", updateFrequency: "Bienal" }
    ];

    useEffect(() => {
        setLoading(true);
        const remoteUrl = `https://raw.githubusercontent.com/mapgisdev/prototipo_oar/main/public/api/bio_data.json`;

        fetch(remoteUrl)
            .then(res => res.json())
            .then(allData => {
                setData(allData[selectedIso] || allData['regional']);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching remote bio data:", err);
                setLoading(false);
            });
    }, [selectedIso]);

    const countryName = SICA_COORDINATES[selectedIso]?.name || (selectedIso === 'regional' ? 'Región SICA' : 'Guatemala');
    const mapView = SICA_COORDINATES[selectedIso] || SICA_COORDINATES['regional'];

    const handleCountryChange = (e) => {
        setLoading(true);
        setSearchParams({ country: e.target.value });
        setTimeout(() => setLoading(false), 500);
    };

    return (
        <div className="relative min-h-screen bg-slate-50 overflow-hidden selection:bg-emerald-500 selection:text-white">
            {/* Global Styles for animations - Reuse from Home or define here if needed */}
            <style>{`
                @keyframes blob-drift {
                    0%, 100% { transform: translate(0, 0) scale(1) }
                    33% { transform: translate(30px, -50px) scale(1.1) }
                    66% { transform: translate(-20px, 20px) scale(0.9) }
                }
                .text-glow {
                    text-shadow: 0 0 20px rgba(16,185,129,0.3);
                }
            `}</style>

            {/* Background Decorative Elements */}
            <div 
                className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none z-0"
                style={{ animation: 'blob-drift 25s infinite alternate' }}
            />
            <div 
                className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none z-0"
                style={{ animation: 'blob-drift 20s infinite alternate-reverse' }}
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
                                    <Target className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
                                    Marco de Biodiversidad de Kunming-Montreal
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="relative group">
                                        <select
                                            className="appearance-none bg-transparent text-xl md:text-3xl font-serif font-black text-slate-900 cursor-pointer pr-10 focus:outline-none hover:text-emerald-600 transition-colors"
                                            value={selectedIso}
                                            onChange={handleCountryChange}
                                        >
                                            {Object.entries(SICA_COORDINATES).filter(([k]) => k !== 'regional').map(([code, val]) => (
                                                <option key={code} value={code}>{val.name}</option>
                                            ))}
                                            <option value="regional">Toda la Región SICA</option>
                                        </select>
                                        <ArrowDown className="h-4 w-4 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-emerald-600 transition-colors" />
                                    </div>
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
                                <Download className="h-4 w-4 mr-2" /> Exportar <span className="hidden sm:inline ml-1">Análisis</span>
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                <div className="space-y-12">
                    {/* MAP SECTION */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="p-0 overflow-hidden border border-slate-200/50 shadow-2xl rounded-[3rem] group">
                            <div className="h-[450px] relative">
                                <MiniMap
                                    layers={[{ url: 'https://tiles.unep-wcmc.org/arcgis/rest/services/ProtectedSites/The_World_Database_of_Protected_Areas/MapServer/tile/{z}/{y}/{x}', opacity: 0.7 }]}
                                    center={[mapView.lat, mapView.lon]}
                                    zoom={mapView.zoom}
                                />
                                <div className="absolute top-6 left-6 z-[1000] flex flex-col gap-2">
                                    <Badge className="bg-white/95 backdrop-blur-md text-slate-900 border-none px-4 py-2 text-[10px] font-black uppercase tracking-widest shadow-xl">
                                        Capa WDPA Activa
                                    </Badge>
                                </div>
                            </div>
                            <div className="p-6 bg-white border-t border-slate-100 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                <div className="flex items-center gap-2">
                                    <MapIcon className="h-3 w-3" /> Sistema de Información Geográfica
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-emerald-500" /> Áreas Protegidas</span>
                                    <span className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-blue-500" /> OECMs</span>
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
                        <Card className="p-10 bg-white/70 backdrop-blur-xl border border-slate-100 shadow-xl shadow-slate-200/40 rounded-[2.5rem] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <TrendingUp className="h-32 w-32" />
                            </div>
                            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                                <div className="max-w-2xl">
                                    <h3 className="text-sm font-black text-emerald-600 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                        Análisis de Situación Regional
                                    </h3>
                                    {data ? (
                                        <p className="text-slate-900 text-xl md:text-2xl font-serif leading-relaxed">
                                            En <strong>{countryName}</strong>, el progreso hacia la meta 30x30 registra un <span className="text-emerald-600 italic font-black text-glow">{(data.progress.protected + data.progress.oecm).toFixed(1)}%</span> de cobertura efectiva. 
                                            Para asegurar la sostenibilidad ecosistémica al 2030, se requiere una expansión del <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-lg not-italic inline-block ml-1">{data.progress.gap > 0 ? `${data.progress.gap}%` : 'Meta Alcanzada'}</span>.
                                        </p>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="h-8 bg-slate-100 animate-pulse rounded-full w-3/4"></div>
                                            <div className="h-8 bg-slate-100 animate-pulse rounded-full w-1/2"></div>
                                        </div>
                                    )}
                                </div>
                                <Button 
                                    className="rounded-full px-8 h-14 bg-slate-100 text-slate-900 hover:bg-slate-900 hover:text-white transition-all font-black text-[10px] uppercase tracking-widest shadow-sm"
                                    onClick={() => navigate('/data')}
                                >
                                    Ficha Técnica <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </Card>
                    </motion.div>

                    {/* KPI CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <StatCard
                            title="Cobertura Efectiva (AP + OECM)"
                            value={data?.progress ? (data.progress.protected + data.progress.oecm).toFixed(1) : "0.0"}
                            unit="%"
                            subtitle="Porcentaje total del territorio bajo figuras oficiales de conservación."
                            colorClass="border-t-emerald-500"
                            icon={Shield}
                            delay={0}
                        />
                        <StatCard
                            title="Brecha de Integridad"
                            value={data?.integrity ? (data.integrity.find(i => i.name === 'Baja')?.value || 0) : 0}
                            unit="%"
                            subtitle="Representatividad de ecosistemas con integridad ecológica baja o fragmentada."
                            colorClass="border-t-red-500"
                            icon={AlertCircle}
                            delay={0.1}
                        />
                        <StatCard
                            title="Especies Amenazadas"
                            value={data?.species ? data.species.reduce((acc, curr) => acc + curr.threatened, 0) : 0}
                            unit="spp."
                            subtitle="Total de especies registradas en listas rojas globales (IUCN)."
                            colorClass="border-t-blue-500"
                            icon={Leaf}
                            delay={0.2}
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {/* Gauge Chart Custom */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="p-10 flex flex-col items-center bg-white border border-slate-100 shadow-xl rounded-[2.5rem]">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-10">Meta 30x30</h3>
                                <div className="relative w-56 h-56 flex items-center justify-center">
                                    {data?.progress ? (
                                        <>
                                            <svg className="transform -rotate-90 w-full h-full">
                                                <circle cx="112" cy="112" r="95" stroke="#f1f5f9" strokeWidth="20" fill="transparent" />
                                                <circle
                                                    cx="112"
                                                    cy="112"
                                                    r="95"
                                                    stroke="url(#gradient-conservation)"
                                                    strokeWidth="20"
                                                    fill="transparent"
                                                    strokeDasharray={596}
                                                    strokeDashoffset={596 - ((data.progress.protected + data.progress.oecm) / 100) * 596}
                                                    strokeLinecap="round"
                                                    className="transition-all duration-1000 ease-out shadow-2xl"
                                                />
                                                <defs>
                                                    <linearGradient id="gradient-conservation" x1="0%" y1="0%" x2="100%" y2="0%">
                                                        <stop offset="0%" stopColor="#10B981" />
                                                        <stop offset="100%" stopColor="#3B82F6" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                            <div className="absolute flex flex-col items-center">
                                                <span className="text-4xl font-black text-slate-900 tracking-tighter">{(data.progress.protected + data.progress.oecm).toFixed(1)}%</span>
                                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Protegido</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="h-full w-full animate-pulse bg-slate-100 rounded-full" />
                                    )}
                                </div>
                                <div className="w-full mt-10 space-y-4">
                                    {data?.progress ? (
                                        <>
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-slate-500 font-bold uppercase tracking-wider">Áreas Protegidas</span>
                                                <span className="font-black text-slate-900">{data.progress.protected}%</span>
                                            </div>
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-slate-500 font-bold uppercase tracking-wider">OECMs</span>
                                                <span className="font-black text-slate-900">{data.progress.oecm}%</span>
                                            </div>
                                            <div className="pt-6 border-t border-slate-100 mt-4">
                                                <div className="flex justify-between items-center">
                                                    <span className={cn("text-[10px] font-black uppercase tracking-widest", data.progress.gap > 0 ? 'text-red-500' : 'text-emerald-500')}>Brecha 2030</span>
                                                    <Badge className={cn("rounded-full px-3 py-1 font-black", data.progress.gap > 0 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600')}>
                                                        {data.progress.gap > 0 ? `${data.progress.gap}%` : 'CUMPLIDA'}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="h-4 bg-slate-100 animate-pulse rounded-full w-full" />
                                            <div className="h-4 bg-slate-100 animate-pulse rounded-full w-full" />
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </motion.div>

                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <Card className="p-8 h-[400px] flex flex-col bg-white border border-slate-100 shadow-xl rounded-[2.5rem]">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 shadow-sm border border-emerald-100">
                                            <Leaf className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Integridad Ecológica</h3>
                                    </div>
                                    <div className="flex-grow w-full relative">
                                        {data?.integrity ? (
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie data={data.integrity} innerRadius={70} outerRadius={90} dataKey="value" paddingAngle={8} minAngle={3}>
                                                        {data.integrity.map((entry, index) => (
                                                            <Cell 
                                                                key={`cell-${index}`} 
                                                                fill={entry.color} 
                                                                stroke="none"
                                                                className="hover:opacity-80 transition-opacity cursor-pointer"
                                                            />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip 
                                                        contentStyle={{ 
                                                            borderRadius: '20px', 
                                                            border: 'none', 
                                                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                                            padding: '12px 20px',
                                                            background: 'rgba(255,255,255,0.95)',
                                                            backdropFilter: 'blur(10px)'
                                                        }} 
                                                    />
                                                    <Legend 
                                                        verticalAlign="bottom" 
                                                        iconType="circle"
                                                        formatter={(value) => <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{value}</span>}
                                                    />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center"><Loader2 className="animate-spin text-emerald-500 h-8 w-8" /></div>
                                        )}
                                    </div>
                                </Card>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                <Card className="p-8 h-[400px] flex flex-col bg-white border border-slate-100 shadow-xl rounded-[2.5rem]">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="p-2.5 rounded-xl bg-red-50 text-red-600 shadow-sm border border-red-100">
                                            <AlertCircle className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Especies Amenazadas</h3>
                                    </div>
                                    <div className="flex-grow w-full relative">
                                        {data?.species ? (
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart layout="vertical" data={data.species} margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                                                    <XAxis type="number" hide />
                                                    <YAxis dataKey="group" type="category" width={80} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#64748b' }} axisLine={false} tickLine={false} />
                                                    <Tooltip 
                                                        cursor={{ fill: '#f8fafc' }}
                                                        contentStyle={{ 
                                                            borderRadius: '20px', 
                                                            border: 'none', 
                                                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                                            padding: '12px 20px',
                                                            background: 'rgba(255,255,255,0.95)',
                                                            backdropFilter: 'blur(10px)'
                                                        }} 
                                                    />
                                                    <Bar dataKey="total" name="Población Total" stackId="a" fill="#f1f5f9" radius={[0, 10, 10, 0]} barSize={24} />
                                                    <Bar dataKey="threatened" name="En Peligro" stackId="a" fill="#EF4444" radius={[0, 10, 10, 0]} barSize={24} />
                                                    <Legend 
                                                        verticalAlign="bottom" 
                                                        iconType="circle"
                                                        formatter={(value) => <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{value}</span>}
                                                    />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center"><Loader2 className="animate-spin text-red-500 h-8 w-8" /></div>
                                        )}
                                    </div>
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="max-w-7xl mx-auto px-8 py-12 relative z-10">
                <div className="border-t border-slate-200/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center md:text-left">
                        Metas de Biodiversidad Post-2020 • Centroamérica y República Dominicana
                    </div>
                    <div className="flex gap-4">
                        <Button 
                            variant="ghost" 
                            className="bg-white/50 backdrop-blur-sm text-slate-400 hover:text-emerald-600 rounded-full px-6 font-bold text-xs"
                            onClick={() => navigate('/docs')}
                        >
                            Ver Metodología
                        </Button>
                    </div>
                </div>
            </footer>

            <DataSourceModal
                isOpen={showHelp}
                onClose={() => setShowHelp(false)}
                title="Fuente de Datos: Meta 30x30"
                sources={dataSources}
            />
        </div>
    );
};

