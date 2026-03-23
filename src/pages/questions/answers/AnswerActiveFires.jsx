import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area
} from 'recharts';
import { Flame, AlertTriangle, RefreshCw, ArrowLeft, ArrowDown, Share2, Download, TrendingUp, MapPin, HelpCircle, Map as MapIcon, ChevronRight, Database, ExternalLink, ShieldAlert, Activity, Bell } from 'lucide-react';
import { Card, Button, Badge, DataSourceModal, ShareButton } from '../../../components/ui/Shared';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { MiniMap } from '../../../components/map/MiniMap';
import { SICA_COORDINATES } from '../../../data/constants';

const FIRE_POINTS = [
    { lat: 17.5, lon: -90.5, country: 'GT', popup: 'Peten, Guatemala (Alta Confianza)' },
    { lat: 15.5, lon: -89.0, country: 'GT', popup: 'Sierra de las Minas, Guatemala' },
    { lat: 14.8, lon: -87.0, country: 'HN', popup: 'Olancho, Honduras' },
    { lat: 13.5, lon: -85.5, country: 'NI', popup: 'Bosawas, Nicaragua' },
    { lat: 9.5, lon: -83.5, country: 'CR', popup: 'Talamanca, Costa Rica' },
    { lat: 8.5, lon: -80.0, country: 'PA', popup: 'Darien, Panama' },
    { lat: 17.0, lon: -88.5, country: 'BZ', popup: 'Chiquibul, Belize' },
    { lat: 18.5, lon: -70.5, country: 'DO', popup: 'Cordillera Central, Rep. Dom.' }
];

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
                {Icon && <Icon className="h-5 w-5 text-slate-200 transition-colors group-hover:text-orange-500" />}
            </div>
            <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-black text-slate-900 tracking-tighter">
                    {new Intl.NumberFormat('es-GT').format(value)}
                </span>
                <span className="text-sm font-bold text-slate-500">{unit}</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed font-light">{subtitle}</p>
        </Card>
    </motion.div>
);

export const AnswerActiveFires = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedIso = searchParams.get("country") || "regional";
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showHelp, setShowHelp] = useState(false);

    const dataSources = [
        { name: "Alertas de Incendio", description: "Detecciones de anomalías térmicas (incendios activos) en tiempo real vía satélite.", provider: "NASA FIRMS (MODIS/VIIRS)", updateFrequency: "Tiempo Real" },
        { name: "Área Quemada", description: "Estimación de superficie afectada por incendios.", provider: "GWIS (Global Wildfire Info System)", updateFrequency: "Mensual" }
    ];

    useEffect(() => {
        setLoading(true);
        const remoteUrl = `https://raw.githubusercontent.com/mapgisdev/prototipo_oar/main/public/api/fires_data.json`;

        fetch(remoteUrl)
            .then(res => res.json())
            .then(allData => {
                setData(allData[selectedIso] || allData['regional']);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching remote fires data:", err);
                setLoading(false);
            });
    }, [selectedIso]);

    const countryName = SICA_COORDINATES[selectedIso]?.name || (selectedIso === 'regional' ? "Región SICA" : "Guatemala");
    const mapView = SICA_COORDINATES[selectedIso] || SICA_COORDINATES['regional'];

    // Filtro de Puntos
    const activePoints = selectedIso === 'regional'
        ? FIRE_POINTS
        : FIRE_POINTS.filter(p => p.country === selectedIso);

    // Mapeo para visualización (color rojo)
    const mapMarkers = activePoints.map(p => ({ ...p, type: 'circle', color: '#EF4444' }));

    // Simular carga al cambiar país
    const handleCountryChange = (e) => {
        setLoading(true);
        setSearchParams({ country: e.target.value });
        setTimeout(() => setLoading(false), 500);
    };

    return (
        <div className="relative min-h-screen bg-slate-50 overflow-hidden selection:bg-orange-500 selection:text-white">
            <style>{`
                @keyframes blob-drift {
                    0%, 100% { transform: translate(0, 0) scale(1) }
                    33% { transform: translate(40px, -60px) scale(1.1) }
                    66% { transform: translate(-30px, 30px) scale(0.9) }
                }
                .text-glow-orange {
                    text-shadow: 0 0 20px rgba(249,115,22,0.3);
                }
                .mesh-fire {
                    background-image: radial-gradient(circle at 20% 20%, rgba(249, 115, 22, 0.05) 0%, transparent 50%),
                                      radial-gradient(circle at 80% 80%, rgba(239, 68, 68, 0.05) 0%, transparent 50%);
                }
            `}</style>

            {/* Background Decorative Elements */}
            <div className="absolute inset-0 mesh-fire pointer-events-none z-0" />
            <div 
                className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none z-0"
                style={{ animation: 'blob-drift 30s infinite alternate' }}
            />
            <div 
                className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-500/5 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none z-0"
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
                                    <Bell className="h-3.5 w-3.5 text-orange-500 animate-pulse" />
                                    Vigilancia de Incendios en Tiempo Real
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="relative group">
                                        <select
                                            className="appearance-none bg-transparent text-xl md:text-3xl font-serif font-black text-slate-900 cursor-pointer pr-10 focus:outline-none hover:text-orange-600 transition-colors"
                                            value={selectedIso}
                                            onChange={handleCountryChange}
                                        >
                                            {Object.entries(SICA_COORDINATES).filter(([k]) => k !== 'regional').map(([code, val]) => (
                                                <option key={code} value={code}>{val.name}</option>
                                            ))}
                                            <option value="regional">Región SICA (Total)</option>
                                        </select>
                                        <ArrowDown className="h-4 w-4 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-orange-600 transition-colors" />
                                    </div>
                                    <Badge className="hidden md:flex bg-orange-500 text-white border-none px-3 py-1 text-[10px] font-black uppercase tracking-widest animate-pulse">
                                        NASA FIRMS VIIRS
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
                                    markers={mapMarkers}
                                    center={[mapView.lat, mapView.lon]}
                                    zoom={mapView.zoom}
                                />
                                <div className="absolute top-8 left-8 z-[1000] flex flex-col gap-3">
                                    <Badge className="bg-white/95 backdrop-blur-md text-orange-600 border-none px-5 py-2.5 text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-orange-500 animate-ping" />
                                        Anomalías Térmicas Activas
                                    </Badge>
                                    <Badge className="bg-slate-900/90 backdrop-blur-md text-white border-none px-5 py-2.5 text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
                                        <ShieldAlert className="h-3.5 w-3.5 text-orange-400" />
                                        VIIRS 375m • Landsat-8
                                    </Badge>
                                </div>
                                <div className="absolute bottom-8 right-8 z-[1000]">
                                    <Button className="bg-white/90 backdrop-blur-md text-slate-900 border border-slate-200 rounded-2xl px-6 h-12 flex items-center gap-2 shadow-2xl hover:bg-slate-900 hover:text-white transition-all">
                                      <Activity className="h-4 w-4" /> Ver Capas de Emergencia
                                    </Button>
                                </div>
                            </div>
                            <div className="p-8 bg-white/90 backdrop-blur-xl border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-orange-50 rounded-2xl border border-orange-100">
                                        <MapIcon className="h-5 w-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Localización Geoespacial</p>
                                        <p className="text-sm font-bold text-slate-900">Interacción directa con focos detectados en el último ciclo orbital.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                                    <RefreshCw className="h-3.5 w-3.5 animate-spin text-orange-500" /> Sincronizado en Tiempo Real
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
                        <Card className="p-12 bg-white/70 backdrop-blur-2xl border border-slate-100 shadow-2xl shadow-orange-500/5 rounded-[3.5rem] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                                <Flame className="h-64 w-64 text-orange-600" />
                            </div>
                            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                                <div className="max-w-3xl">
                                    <h3 className="text-[10px] font-black text-orange-600 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                                        <div className="w-12 h-0.5 bg-orange-200" />
                                        Estado Crítico de Situación
                                    </h3>
                                    {data ? (
                                        <div className="space-y-6">
                                            <p className="text-slate-900 text-2xl md:text-4xl font-serif leading-tight">
                                                Durante las últimas 24 horas, <span className="text-orange-600 font-black italic">{countryName}</span> ha registrado un total de <span className="underline decoration-orange-500/30 decoration-8 underline-offset-[-2px]">{data.alerts} focos activos</span>. 
                                            </p>
                                            <p className="text-xl text-slate-500 leading-relaxed font-light">
                                                De estos, un preocupante <strong className="text-slate-900 font-black">{Math.round((data.highConfidence/data.alerts)*100)}%</strong> corresponden a alertas de alta confianza, confirmando actividad de fuego persistente en áreas boscosas primarias.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            <div className="h-10 bg-slate-100 animate-pulse rounded-full w-full"></div>
                                            <div className="h-10 bg-slate-100 animate-pulse rounded-full w-2/3"></div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-4 shrink-0">
                                    <Button 
                                        className="rounded-2xl px-10 h-16 bg-orange-600 text-white hover:bg-orange-700 transition-all font-black text-[10px] uppercase tracking-widest shadow-xl shadow-orange-600/20"
                                        onClick={() => navigate('/emergency')}
                                    >
                                        Puesto de Mando Regional <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                    <span className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocolo de Respuesta Activo</span>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* KPI CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <StatCard
                            title="Total Alertas (24h)"
                            value={data?.alerts || 0}
                            unit="detecciones"
                            subtitle="Suma total de anomalías térmicas procesadas vía satélite."
                            colorClass="border-t-orange-500"
                            icon={Flame}
                            delay={0}
                        />
                        <StatCard
                            title="Superficie Afectada"
                            value={data?.area || 0}
                            unit="ha"
                            subtitle="Estimación de área con probabilidad de combustión activa."
                            colorClass="border-t-red-600"
                            icon={AlertTriangle}
                            delay={0.1}
                        />
                        <StatCard
                            title="Huella de Carbono"
                            value={Math.round((data?.alerts || 0) * 0.12)}
                            unit="tCO2e"
                            subtitle="Estimación de gases liberados por biomasa incinerada."
                            colorClass="border-t-slate-800"
                            icon={TrendingUp}
                            delay={0.2}
                        />
                    </div>

                    {/* CHARTS & METADATA SECTION */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
                        <div className="lg:col-span-3">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="p-12 bg-white border border-slate-100 shadow-2xl rounded-[3.5rem] h-[580px] flex flex-col group">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                                        <div>
                                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-3">Dinámica Temporal</h3>
                                            <p className="text-2xl font-serif font-black text-slate-900 tracking-tight">Evolución de Alertas por Día</p>
                                        </div>
                                        <div className="flex items-center gap-3 px-5 py-2.5 bg-orange-50 text-orange-600 rounded-3xl border border-orange-100 text-[10px] font-black uppercase tracking-widest shadow-sm">
                                            <Activity className="h-4 w-4 animate-pulse" /> Ciclo de 7 Días
                                        </div>
                                    </div>
                                    <div className="flex-1 w-full min-h-0 relative">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={data?.trend || []} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                                <defs>
                                                    <linearGradient id="colorFire" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#F97316" stopOpacity={0.4} />
                                                        <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                                <XAxis dataKey="d" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'black' }} />
                                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'black' }} />
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
                                                    stroke="#F97316" 
                                                    strokeWidth={5} 
                                                    fillOpacity={1} 
                                                    fill="url(#colorFire)" 
                                                    animationDuration={2000}
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        <div className="flex items-center gap-2"><div className="h-2.5 w-2.5 rounded-full bg-orange-500" /> Focos Satelitales</div>
                                        <div className="flex items-center gap-2"><div className="h-2.5 w-2.5 rounded-full bg-slate-200" /> Histórico SICA</div>
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
                            <Card className="p-12 bg-slate-900 text-white shadow-2xl rounded-[3.5rem] h-full relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 group-hover:scale-125 transition-transform duration-1000">
                                    <Database className="h-64 w-64 text-white" />
                                </div>
                                <div className="relative z-10 space-y-12">
                                    <div>
                                        <h3 className="text-[10px] font-black text-orange-400 uppercase tracking-[0.4em] mb-12 flex items-center gap-3">
                                            <div className="w-10 h-0.5 bg-orange-500/30" />
                                            Sistemas de Inteligencia
                                        </h3>
                                        <div className="space-y-8">
                                            <div className="group/item">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/item:bg-orange-500 transition-colors">
                                                        <Activity className="h-5 w-5 text-orange-400 group-hover/item:text-white" />
                                                    </div>
                                                    <span className="text-sm font-black uppercase tracking-[0.2em]">Sensor VIIRS S-NPP</span>
                                                </div>
                                                <p className="text-sm text-slate-400 leading-relaxed font-light">
                                                    Detección espacial de 375m. Optimizado para capturar anomalías térmicas pequeñas y incendios de baja intensidad en dosel cerrado.
                                                </p>
                                            </div>

                                            <div className="group/item">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/item:bg-blue-500 transition-colors">
                                                        <RefreshCw className="h-5 w-5 text-blue-400 group-hover/item:text-white" />
                                                    </div>
                                                    <span className="text-sm font-black uppercase tracking-[0.2em]">NASA FIRMS Pipeline</span>
                                                </div>
                                                <p className="text-sm text-slate-400 leading-relaxed font-light">
                                                    Procesamiento automatizado NRT (Near Real Time) con una latencia inferior a las 3 horas desde el paso del satélite.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <Button className="w-full rounded-2xl h-16 bg-white text-slate-900 hover:bg-orange-500 hover:text-white transition-all font-black text-[10px] uppercase tracking-widest shadow-2xl">
                                        Consola Técnica FIRMS <ExternalLink className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </main>

            <footer className="max-w-7xl mx-auto px-8 py-20 relative z-10 font-bold text-[10px] uppercase tracking-[0.3em] text-slate-400 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-slate-200/50">
                <div className="flex items-center gap-6">
                    <span>© 2026 Observatorio Ambiental Regional</span>
                    <div className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
                    <span>Protocolo SICA SAT-Incendios</span>
                </div>
                <div className="flex gap-8 items-center opacity-70">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-300">Latencia:</span> ~3.2h Regional
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-300">Nodos:</span> 8 Regionales Activos
                    </div>
                </div>
            </footer>

            <DataSourceModal
                isOpen={showHelp}
                onClose={() => setShowHelp(false)}
                title="Sistemas de Monitoreo de Incendios"
                sources={dataSources}
            />
        </div>
    );
};
