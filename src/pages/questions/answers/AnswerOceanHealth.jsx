import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button, Badge, DataSourceModal, ShareButton } from '../../../components/ui/Shared';
import { Anchor, ThermometerSun, ArrowLeft, ArrowDown, Share2, Download, TrendingUp, Fish, Waves, HelpCircle, Globe, ChevronRight, ExternalLink, Activity, ShieldCheck, Droplets } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MiniMap } from '../../../components/map/MiniMap';
import { SICA_COORDINATES, SICA_COUNTRIES } from '../../../data/constants';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';

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
                {Icon && <Icon className="h-5 w-5 text-slate-200 transition-colors group-hover:text-cyan-500" />}
            </div>
            <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-black text-slate-900 tracking-tighter">
                    {value}
                </span>
                <span className="text-sm font-bold text-slate-500">{unit}</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed font-light">{subtitle}</p>
        </Card>
    </motion.div>
);

export const AnswerOceanHealth = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedIso = searchParams.get('country') || 'regional';
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showHelp, setShowHelp] = useState(false);

    useEffect(() => {
        setLoading(true);
        const remoteUrl = `https://raw.githubusercontent.com/mapgisdev/prototipo_oar/main/public/api/ocean_data.json`;

        fetch(remoteUrl)
            .then(res => res.json())
            .then(allData => {
                setData(allData[selectedIso] || allData['regional']);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching remote ocean data:", err);
                setLoading(false);
            });
    }, [selectedIso]);

    const countryName = SICA_COORDINATES[selectedIso]?.name || (selectedIso === 'regional' ? "Región SICA" : "Belize");
    const mapView = SICA_COORDINATES[selectedIso] || SICA_COORDINATES['regional'];

    const handleCountryChange = (e) => {
        setLoading(true);
        setSearchParams({ country: e.target.value });
        setTimeout(() => setLoading(false), 500);
    };

    const getAlertColor = (level) => {
        if (level === 'Normal') return 'text-emerald-500';
        if (level === 'Vigilancia') return 'text-yellow-500';
        if (level.includes('Alerta')) return 'text-red-500';
        return 'text-slate-500';
    };

    return (
        <div className="relative min-h-screen bg-slate-50 overflow-hidden selection:bg-cyan-500 selection:text-white">
            <style>{`
                @keyframes blob-drift {
                    0%, 100% { transform: translate(0, 0) scale(1) }
                    33% { transform: translate(40px, -60px) scale(1.1) }
                    66% { transform: translate(-30px, 30px) scale(0.9) }
                }
                .text-glow-cyan {
                    text-shadow: 0 0 20px rgba(6,182,212,0.3);
                }
                .mesh-ocean {
                    background-image: radial-gradient(circle at 10% 10%, rgba(6, 182, 212, 0.05) 0%, transparent 50%),
                                      radial-gradient(circle at 90% 90%, rgba(16, 185, 129, 0.05) 0%, transparent 50%);
                }
            `}</style>

            {/* Background Decorative Elements */}
            <div className="absolute inset-0 mesh-ocean pointer-events-none z-0" />
            <div 
                className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none z-0"
                style={{ animation: 'blob-drift 30s infinite alternate' }}
            />
            <div 
                className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none z-0"
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
                                    <Waves className="h-3.5 w-3.5 text-cyan-500 animate-pulse" />
                                    Vigilancia de Ecosistemas Marinos
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="relative group">
                                        <select
                                            className="appearance-none bg-transparent text-xl md:text-3xl font-serif font-black text-slate-900 cursor-pointer pr-10 focus:outline-none hover:text-cyan-600 transition-colors"
                                            value={selectedIso}
                                            onChange={handleCountryChange}
                                        >
                                            {Object.entries(SICA_COORDINATES).filter(([k]) => k !== 'regional').map(([code, val]) => (
                                                <option key={code} value={code}>{val.name}</option>
                                            ))}
                                            <option value="regional">Región SICA (Total)</option>
                                        </select>
                                        <ArrowDown className="h-4 w-4 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-cyan-600 transition-colors" />
                                    </div>
                                    <Badge className="bg-cyan-500 text-white border-none px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                                        NOAA CRW 5km
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
                                <Download className="h-4 w-4 mr-2" /> Descargar <span className="hidden sm:inline ml-1">Informe</span>
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
                            <div className="h-[550px] relative">
                                <MiniMap
                                    layers={[{ url: 'https://tiles.globalforestwatch.org/coral_bleaching/{z}/{x}/{y}.png' }]}
                                    center={[16.0, -84.0]}
                                    zoom={5}
                                />
                                <div className="absolute top-8 left-8 z-[1000] flex flex-col gap-3">
                                    <Badge className="bg-white/95 backdrop-blur-md text-cyan-600 border-none px-5 py-2.5 text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
                                        <Globe className="h-3.5 w-3.5" />
                                        Anomalía de Temperatura Superficial (SST)
                                    </Badge>
                                    <Badge className="bg-slate-900/90 backdrop-blur-md text-white border-none px-5 py-2.5 text-[10px] font-black uppercase tracking-widest shadow-xl">
                                        Riesgo de Blanqueamiento de Coral
                                    </Badge>
                                </div>
                                <div className="absolute bottom-8 right-8 z-[1000]">
                                    <Button className="bg-white/90 backdrop-blur-md text-slate-900 border border-slate-200 rounded-2xl px-6 h-12 flex items-center gap-2 shadow-2xl hover:bg-slate-900 hover:text-white transition-all">
                                      <Activity className="h-4 w-4" /> Ver Capas de Corrientes
                                    </Button>
                                </div>
                            </div>
                            <div className="p-8 bg-white/90 backdrop-blur-xl border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-cyan-50 rounded-2xl border border-cyan-100">
                                        <Waves className="h-5 w-5 text-cyan-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Detección Satelital</p>
                                        <p className="text-sm font-bold text-slate-900">Variables biofísicas procesadas vía NOAA Coral Reef Watch v3.1</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full border border-emerald-100 text-[10px] font-black uppercase tracking-widest italic">
                                        Estado: Sincronizado
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
                        <Card className="p-12 bg-white/70 backdrop-blur-2xl border border-slate-100 shadow-2xl shadow-cyan-500/5 rounded-[3.5rem] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                                <Waves className="h-64 w-64 text-cyan-600" />
                            </div>
                            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                                <div className="max-w-3xl">
                                    <h3 className="text-[10px] font-black text-cyan-600 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                                        <div className="w-12 h-0.5 bg-cyan-200" />
                                        Estado Biofísico Oceánico
                                    </h3>
                                    {data ? (
                                        <div className="space-y-6">
                                            <p className="text-slate-900 text-2xl md:text-4xl font-serif leading-tight">
                                                Las aguas territoriales de <span className="text-cyan-600 font-black italic">{countryName}</span> reportan hoy <span className="text-cyan-600 italic font-black text-glow-cyan">{data.sst}°C</span>. 
                                            </p>
                                            <p className="text-xl text-slate-500 leading-relaxed font-light">
                                                Se identifica una anomalía térmica de <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-lg not-italic font-black border border-red-100 inline-block">+{data.anomaly}°C</span>, situando el riesgo de estrés coralino en nivel <span className={`font-black uppercase underline decoration-cyan-500/30 decoration-8 underline-offset-[-2px] ${getAlertColor(data.riskLevel)}`}>{data.riskLevel}</span>.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            <div className="h-10 bg-slate-100 animate-pulse rounded-full w-full"></div>
                                            <div className="h-10 bg-slate-100 animate-pulse rounded-full w-2/3"></div>
                                        </div>
                                    )}
                                </div>
                                <div className="shrink-0">
                                    <Button 
                                        className="rounded-2xl px-10 min-w-[240px] h-16 bg-slate-900 text-white hover:bg-cyan-600 transition-all font-black text-[10px] uppercase tracking-widest shadow-xl"
                                        onClick={() => window.open('https://coralreefwatch.noaa.gov/', '_blank')}
                                    >
                                        Ficha Técnica NOAA <ExternalLink className="ml-2 h-4 w-4" />
                                    </Button>
                                    <p className="mt-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocolo de Blanqueamiento v3.1</p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* KPI CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <StatCard
                            title="Temperatura (SST)"
                            value={data?.sst || 0}
                            unit="°C"
                            subtitle="Medición satelital de la superficie oceánica en tiempo cuasi-real."
                            colorClass="border-t-cyan-500"
                            icon={Waves}
                            delay={0}
                        />
                        <StatCard
                            title="Nivel de Alerta"
                            value={data?.riskLevel || '...'}
                            unit="Estado"
                            subtitle="Determinación de estrés térmico acumulado para corales."
                            colorClass={data?.riskLevel?.includes('Alerta') ? 'border-t-red-500' : 'border-t-yellow-500'}
                            icon={ThermometerSun}
                            delay={0.1}
                        />
                        <StatCard
                            title="Salud Ecosistémica"
                            value={data?.healthIndex || 0}
                            unit="/ 100"
                            subtitle="Puntuación compuesta de biodiversidad y servicios marinos."
                            colorClass="border-t-slate-900"
                            icon={Fish}
                            delay={0.2}
                        />
                    </div>

                    {/* GRÁFICO Y RECURSOS SECTION */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
                        <div className="lg:col-span-3">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="p-12 bg-white border border-slate-100 shadow-2xl rounded-[3.5rem] h-[550px] flex flex-col group">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                                        <div>
                                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-3">Dinámica Térmica Semestral</h3>
                                            <p className="text-2xl font-serif font-black text-slate-900 tracking-tight leading-none group-hover:text-cyan-500 transition-colors">Variación de SST (Sea Surface Temp)</p>
                                        </div>
                                        <div className="flex items-center gap-3 px-5 py-2.5 bg-cyan-50 text-cyan-600 rounded-3xl border border-cyan-100 text-[10px] font-black uppercase tracking-widest shadow-sm">
                                            <Activity className="h-4 w-4 animate-pulse" /> Sincronizado NOAA
                                        </div>
                                    </div>
                                    <div className="flex-1 w-full min-h-0 relative">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={data?.trend || []} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                                <defs>
                                                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                                                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                                <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'black', fill: '#94a3b8', textTransform: 'uppercase' }} />
                                                <YAxis domain={['dataMin - 1', 'dataMax + 1']} axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'black', fill: '#94a3b8' }} />
                                                <Tooltip 
                                                    contentStyle={{ 
                                                        borderRadius: '24px', 
                                                        border: 'none', 
                                                        boxShadow: '0 25px 60px rgba(0,0,0,0.1)',
                                                        padding: '20px',
                                                        background: 'rgba(255,255,255,0.95)',
                                                        backdropFilter: 'blur(15px)'
                                                    }} 
                                                />
                                                <Area 
                                                    type="monotone" 
                                                    dataKey="v" 
                                                    stroke="#06b6d4" 
                                                    strokeWidth={5} 
                                                    fillOpacity={1} 
                                                    fill="url(#colorTemp)" 
                                                    animationDuration={2500}
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-center gap-10 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        <div className="flex items-center gap-2"><div className="h-2.5 w-2.5 rounded-full bg-cyan-500" /> Promedio Mensual</div>
                                        <div className="flex items-center gap-2 font-light italic">Resolución Espacial: 5km Geoespacial</div>
                                    </div>
                                </Card>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2"
                        >
                            <Card className="p-12 bg-slate-900 border border-slate-800 shadow-2xl rounded-[3.5rem] h-full flex flex-col justify-between text-center group relative overflow-hidden">
                                <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none" />
                                <div className="relative z-10">
                                    <motion.div
                                        animate={{ y: [0, -15, 0] }}
                                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                        className="mb-10 inline-block p-6 bg-white/5 rounded-full border border-white/10"
                                    >
                                        <Anchor className="h-20 w-20 text-cyan-400 group-hover:scale-110 transition-transform" />
                                    </motion.div>
                                    <h3 className="text-2xl font-serif font-black text-white mb-6">Soberanía de Recursos</h3>
                                    <p className="text-slate-400 text-base font-light leading-relaxed mb-12">
                                        La integración de datos satelitales en tiempo real es el pilar fundamental para la subsistencia costera y el manejo de pesquerías ante el cambio climático.
                                    </p>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 text-left">
                                            <ShieldCheck className="h-5 w-5 text-emerald-400" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white">Soberanía Alimentaria Garantizada</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 text-left">
                                            <Droplets className="h-5 w-5 text-cyan-400" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white">Red de Sensores In-Situ Activa</span>
                                        </div>
                                    </div>
                                </div>
                                <Button className="relative z-10 mt-12 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-black uppercase text-[10px] tracking-widest rounded-2xl h-16 w-full shadow-2xl shadow-cyan-500/30 transition-all">
                                    <Fish className="mr-2 h-4 w-4" /> Banco de Datos Pesqueros Regional
                                </Button>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </main>

            <footer className="max-w-7xl mx-auto px-8 py-20 relative z-10 font-bold text-[10px] uppercase tracking-[0.3em] text-slate-400 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-slate-200/50">
                <div className="flex items-center gap-6">
                    <span>© 2026 Observatorio Ambiental Regional</span>
                    <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
                    <span>Red Integrada NOAA • SICA • CRW</span>
                </div>
                <div className="flex gap-10 items-center opacity-70">
                    <span className="hover:text-cyan-500 cursor-pointer transition-colors border-b border-transparent hover:border-cyan-500">Alertas Satelitales v4.0</span>
                    <span className="hover:text-cyan-500 cursor-pointer transition-colors border-b border-transparent hover:border-cyan-500">Gestión de Arrecifes</span>
                </div>
            </footer>

            <DataSourceModal
                isOpen={showHelp}
                onClose={() => setShowHelp(false)}
                title="Sistemas de Monitoreo Oceánico y Arrecifal"
                sources={[
                    { name: "NOAA Coral Reef Watch", description: "Vigilancia satelital global de arrecifes coralinos y estrés térmico.", provider: "NOAA CRW", updateFrequency: "Día-1" },
                    { name: "SST Anomaly Hub", description: "Anomalías de temperatura superficial del mar procesadas vía ESA.", provider: "ESA / Copernicus", updateFrequency: "Semanal" }
                ]}
            />
        </div>
    );
};
