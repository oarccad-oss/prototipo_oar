import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, Cell
} from 'recharts';
import { ArrowDown, Share2, Download, Leaf, AlertTriangle, TrendingUp, MapPin, ArrowLeft, HelpCircle, ChevronRight, Map as MapIcon, Database, ExternalLink, Loader2 } from 'lucide-react';
import { Card, Button, Badge, DataSourceModal, ShareButton } from '../../../components/ui/Shared';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MiniMap } from '../../../components/map/MiniMap';
import { SICA_COORDINATES } from '../../../data/constants';

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
        <Card className={`bg-white/80 backdrop-blur-xl p-8 border-t-4 ${colorClass} shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all rounded-[2.5rem] relative overflow-hidden h-full flex flex-col`}>
            <div className="flex justify-between items-start mb-6">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{title}</h4>
                {Icon && <Icon className="h-5 w-5 text-slate-200" />}
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

export const AnswerForestLoss = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedIso = searchParams.get("country") || "regional";
    const [showHelp, setShowHelp] = useState(false);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const dataSources = [
        { name: "Pérdida de Cobertura Arbórea", description: "Identifica la eliminación de la cubierta vegetal (dosel > 30%) mediante satélites Landsat.", provider: "Hansen/UMD/Google/USGS/NASA", updateFrequency: "Anual" },
        { name: "Emisiones de CO₂", description: "Estimación de emisiones de carbono por pérdida de biomasa arbórea superficial.", provider: "Global Forest Watch", updateFrequency: "Anual" },
        { name: "Alertas GLAD", description: "Sistema de alerta temprana de deforestación basado en imágenes satelitales.", provider: "GLAD Lab (UMD)", updateFrequency: "Semanal" }
    ];

    const countryName = SICA_COORDINATES[selectedIso]?.name || (selectedIso === 'regional' ? 'Región SICA' : 'Guatemala');
    const mapView = SICA_COORDINATES[selectedIso] || SICA_COORDINATES['regional'];

    useEffect(() => {
        setLoading(true);
        const remoteUrl = `https://raw.githubusercontent.com/mapgisdev/prototipo_oar/main/public/api/forest_data.json`;

        fetch(remoteUrl)
            .then(res => res.json())
            .then(allData => {
                setData(allData[selectedIso] || allData['regional']);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching remote data:", err);
                setLoading(false);
            });
    }, [selectedIso]);

    const stats = useMemo(() => {
        if (!data) return { topRegion: { name: '...', percent: 0 }, totalLoss: 0, percentLoss: 0 };
        const topRegion = data.topRegions?.[0] || { name: 'Múltiples zonas', percent: 0, value: 0 };
        const totalLoss = data.lossTotal || 0;
        const treeCoverRef = data.treeCover || 1;
        const percentLoss = ((totalLoss / treeCoverRef) * 100).toFixed(1);

        return { topRegion, totalLoss, percentLoss };
    }, [data]);

    const kFormatter = (num) => {
        return Math.abs(num) > 999
            ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k'
            : Math.sign(num) * Math.abs(num);
    };

    const fmt = (num) => new Intl.NumberFormat('es-GT').format(num);

    const handleCountryChange = (e) => {
        setLoading(true);
        setSearchParams({ country: e.target.value });
        setTimeout(() => setLoading(false), 500);
    };

    return (
        <div className="relative min-h-screen bg-slate-50 overflow-hidden selection:bg-[#FE6598] selection:text-white">
            <style>{`
                @keyframes blob-drift {
                    0%, 100% { transform: translate(0, 0) scale(1) }
                    33% { transform: translate(40px, -60px) scale(1.1) }
                    66% { transform: translate(-30px, 30px) scale(0.9) }
                }
                .text-glow-red {
                    text-shadow: 0 0 20px rgba(254,101,152,0.3);
                }
            `}</style>

            {/* Background Decorative Elements */}
            <div 
                className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FE6598]/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none z-0"
                style={{ animation: 'blob-drift 25s infinite alternate' }}
            />
            <div 
                className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none z-0"
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
                                    <Leaf className="h-3.5 w-3.5 text-[#FE6598] animate-pulse" />
                                    Vigilancia de Deforestación (GFW)
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="relative group">
                                        <select
                                            className="appearance-none bg-transparent text-xl md:text-3xl font-serif font-black text-slate-900 cursor-pointer pr-10 focus:outline-none hover:text-[#FE6598] transition-colors"
                                            value={selectedIso}
                                            onChange={handleCountryChange}
                                        >
                                            {Object.entries(SICA_COORDINATES).filter(([k]) => k !== 'regional').map(([code, val]) => (
                                                <option key={code} value={code}>{val.name}</option>
                                            ))}
                                            <option value="regional">Toda la Región SICA</option>
                                        </select>
                                        <ArrowDown className="h-4 w-4 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-[#FE6598] transition-colors" />
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
                                <Download className="h-4 w-4 mr-2" /> Exportar <span className="hidden sm:inline ml-1">Informe</span>
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
                                    layers={[{ url: 'https://tiles.globalforestwatch.org/umd_tree_cover_loss/latest/dynamic/{z}/{x}/{y}.png' }]}
                                    center={[mapView.lat, mapView.lon]}
                                    zoom={mapView.zoom}
                                />
                                <div className="absolute top-6 left-6 z-[1000] flex flex-col gap-2">
                                    <Badge className="bg-white/95 backdrop-blur-md text-[#FE6598] border-none px-4 py-2 text-[10px] font-black uppercase tracking-widest shadow-xl">
                                        Monitor Global Forest Watch
                                    </Badge>
                                </div>
                            </div>
                            <div className="p-6 bg-white border-t border-slate-100 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                <div className="flex items-center gap-2">
                                    <MapIcon className="h-3.5 w-3.5" /> Sensoramiento Remoto Landsat
                                </div>
                                <div className="flex items-center gap-1.5 bg-red-50 text-[#FE6598] px-3 py-1 rounded-full border border-red-100 italic">
                                    Visualización a {mapView.zoom}x - {countryName}
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
                                <Leaf className="h-32 w-32 text-[#FE6598]" />
                            </div>
                            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                                <div className="max-w-2xl">
                                    <h3 className="text-sm font-black text-[#FE6598] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                        Dinámica de Cobertura
                                    </h3>
                                    {loading ? (
                                        <div className="flex items-center gap-4 text-slate-400 h-12">
                                            <Loader2 className="animate-spin h-6 w-6" /> Procesando datasets satelitales...
                                        </div>
                                    ) : (
                                        <p className="text-slate-900 text-xl md:text-2xl font-serif leading-relaxed">
                                            En <strong>{countryName}</strong>, se ha registrado una pérdida bruta de <span className="text-[#FE6598] italic font-black text-glow-red">{fmt(stats.totalLoss)} ha</span>. Esto representa una disminución del <span className="underline decoration-slate-300 underline-offset-8">{stats.percentLoss}%</span> desde 2010, liberando <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-lg not-italic inline-block ml-1">{fmt(data?.co2Emissions)} Mt CO₂e</span>.
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-2xl border border-red-100">
                                        <TrendingUp className="h-4 w-4" />
                                        <span className="text-xs font-black uppercase tracking-widest">Actividad Crítica</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* KPI CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <StatCard
                            title="Pérdida Bruta Total"
                            value={data?.lossTotal || 0}
                            unit="ha"
                            subtitle="Superficie total de dosel arbóreo eliminada (2010-2023)."
                            colorClass="border-t-[#FE6598]"
                            icon={Leaf}
                            delay={0}
                        />
                        <StatCard
                            title="Bosque Primario"
                            value={data?.primaryLoss || 0}
                            unit="ha"
                            subtitle="Pérdida de bosques maduros tropicales de alta biodiversidad."
                            colorClass="border-t-emerald-500"
                            icon={AlertTriangle}
                            delay={0.1}
                        />
                        <StatCard
                            title="Huella de Carbono"
                            value={data?.co2Emissions || 0}
                            unit="Mt CO₂"
                            subtitle="Emisiones proyectadas liberadas por la deforestación."
                            colorClass="border-t-blue-500"
                            icon={TrendingUp}
                            delay={0.2}
                        />
                    </div>

                    {/* GRÁFICOS Y RANKING */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2"
                        >
                            <Card className="p-10 bg-white border border-slate-100 shadow-xl rounded-[2.5rem] h-[580px] flex flex-col">
                                <div className="flex justify-between items-center mb-10">
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Serie Histórica Anual</h3>
                                    <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest">
                                        <span className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-[#FE6598]" /> Pérdida (ha)</span>
                                    </div>
                                </div>
                                <div className="flex-1 w-full min-h-0 relative">
                                    <ResponsiveContainer width="99%" height="100%">
                                        <BarChart data={data?.years || []} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis 
                                                dataKey="year" 
                                                axisLine={false} 
                                                tickLine={false} 
                                                tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} 
                                            />
                                            <YAxis 
                                                axisLine={false} 
                                                tickLine={false} 
                                                tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} 
                                                tickFormatter={kFormatter}
                                            />
                                            <Tooltip 
                                                cursor={{ fill: '#FE6598', opacity: 0.05 }}
                                                contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}
                                                formatter={(value) => [`${fmt(value)} ha`, 'Pérdida']}
                                            />
                                            <Bar dataKey="loss" fill="#FE6598" radius={[8, 8, 0, 0]} barSize={24} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Card className="p-10 bg-slate-900 border border-slate-800 shadow-xl rounded-[2.5rem] h-[580px] flex flex-col">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 uppercase">Zonas de Mayor Presión</h3>
                                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
                                    {data?.topRegions ? data.topRegions.map((region, i) => (
                                        <div key={i} className="flex justify-between items-start p-4 bg-white/5 rounded-2xl group hover:bg-white/10 transition-all cursor-pointer border border-transparent hover:border-white/10 relative overflow-hidden">
                                            <div className="absolute left-0 top-0 bottom-0 bg-[#FE6598]/10 w-0 group-hover:w-full transition-all duration-500 ease-out" />
                                            <div className="relative z-10">
                                                <div className="font-black text-white text-xs uppercase tracking-wider mb-1 flex items-center gap-2">
                                                    <span className="text-slate-600">0{i + 1}</span> {region.name}
                                                </div>
                                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{fmt(region.value)} ha perdidas</div>
                                            </div>
                                            <Badge className="bg-[#FE6598]/10 text-[#FE6598] border-none text-[10px] font-black px-3 py-1 relative z-10">
                                                {region.percent}%
                                            </Badge>
                                        </div>
                                    )) : (
                                        <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4">
                                            <MapPin className="h-12 w-12 opacity-20" />
                                            <span className="text-[10px] uppercase font-black">Sin datos locales</span>
                                        </div>
                                    )}
                                </div>
                                <Button 
                                    variant="ghost" 
                                    className="mt-6 w-full rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all h-12"
                                    onClick={() => window.open('https://www.globalforestwatch.org', '_blank')}
                                >
                                    Ver Dataset en GFW <ExternalLink className="ml-2 h-4 w-4" />
                                </Button>
                                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-center gap-2">
                                    <Database className="h-3.5 w-3.5 text-slate-600" />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">Fuente: Hansen v1.11</span>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </main>

            <footer className="max-w-7xl mx-auto px-8 py-12 relative z-10 font-bold text-[10px] uppercase tracking-[0.2em] text-slate-400 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                    <span>© 2026 Observatorio Ambiental Regional</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span>Patrimonio Forestal Centroamericano</span>
                </div>
                <div className="flex gap-6 border-l md:border-l-2 border-slate-200 pl-6 h-4 items-center">
                    <span className="hover:text-[#FE6598] cursor-pointer transition-colors">Alertas GLAD</span>
                    <span className="hover:text-[#FE6598] cursor-pointer transition-colors">Emisiones AFOLU</span>
                </div>
            </footer>

            <DataSourceModal
                isOpen={showHelp}
                onClose={() => setShowHelp(false)}
                title="Fuente de Datos: Análisis de Cobertura Arbórea"
                sources={dataSources}
            />
        </div>
    );
};
