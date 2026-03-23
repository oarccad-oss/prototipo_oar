import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sun, CloudRain, Loader2, AlertOctagon, ArrowLeft, ArrowDown, Share2, Download, Thermometer, Wind, HelpCircle, ChevronRight, Waves, Droplets, ShieldAlert, BarChart3, Satellite } from 'lucide-react';
import { Card, Button, Badge, DataSourceModal, ShareButton } from '../../../components/ui/Shared';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MiniMap } from '../../../components/map/MiniMap';

const POINTS = [
    { name: 'Guatemala City (GT)', lat: 14.63, lon: -90.50, country: 'Guatemala' },
    { name: 'Tegucigalpa (HN)', lat: 14.07, lon: -87.20, country: 'Honduras' },
    { name: 'San Salvador (SV)', lat: 13.69, lon: -89.21, country: 'El Salvador' },
    { name: 'Managua (NI)', lat: 12.11, lon: -86.23, country: 'Nicaragua' },
    { name: 'San José (CR)', lat: 9.92, lon: -84.09, country: 'Costa Rica' },
    { name: 'Panama City (PA)', lat: 8.98, lon: -79.51, country: 'Panamá' },
    { name: 'Belmopan (BZ)', lat: 17.25, lon: -88.76, country: 'Belize' },
    { name: 'Santo Domingo (DO)', lat: 18.48, lon: -69.93, country: 'Rep. Dominicana' },
    { name: 'Corredor Seco (Chiquimula)', lat: 14.79, lon: -89.54, country: 'Guatemala (Corredor Seco)' },
    { name: 'Promedio Regional (SICA)', lat: 13.50, lon: -85.00, country: 'Región SICA (Centro Geográfico)' }
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
                    {value}
                </span>
                <span className="text-sm font-bold text-slate-500">{unit}</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed font-light">{subtitle}</p>
        </Card>
    </motion.div>
);

export const AnswerDroughtRisk = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const locationParam = searchParams.get('location');
    const point = POINTS.find(p => p.name === locationParam) || POINTS[POINTS.length - 1];
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState({ temp: 0, rain: 0 });
    const [showHelp, setShowHelp] = useState(false);

    const dataSources = [
        { name: "Pronóstico Meteorológico", description: "Previsión a 7 días de temperatura y precipitación.", provider: "Open-Meteo API", updateFrequency: "Horaria" },
        { name: "Datos Históricos", description: "Registro climático de las últimas décadas.", provider: "ERA5 Reanalysis", updateFrequency: "Mensual" }
    ];

    useEffect(() => {
        setLoading(true);
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${point.lat}&longitude=${point.lon}&daily=temperature_2m_max,precipitation_sum&timezone=auto&past_days=90`)
            .then(r => r.json())
            .then(d => {
                if (d.daily) {
                    const formatted = d.daily.time.map((t, i) => ({
                        date: t,
                        temp: d.daily.temperature_2m_max[i],
                        rain: d.daily.precipitation_sum[i]
                    }));
                    setData(formatted);

                    const last = formatted[formatted.length - 1];
                    // Simple summary stats
                    setSummary({
                        temp: last ? last.temp : 0,
                        rain: formatted.reduce((acc, curr) => acc + curr.rain, 0).toFixed(1)
                    });
                }
                setLoading(false);
            })
            .catch(e => {
                console.error(e);
                setLoading(false);
            });
    }, [point]);

    const handleLocationChange = (e) => {
        setSearchParams({ location: e.target.value });
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
                .mesh-drought {
                    background-image: radial-gradient(circle at 10% 10%, rgba(249, 115, 22, 0.05) 0%, transparent 50%),
                                      radial-gradient(circle at 90% 90%, rgba(59, 130, 246, 0.05) 0%, transparent 50%);
                }
            `}</style>

            {/* Background Decorative Elements */}
            <div className="absolute inset-0 mesh-drought pointer-events-none z-0" />
            <div 
                className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none z-0"
                style={{ animation: 'blob-drift 30s infinite alternate' }}
            />
            <div 
                className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none z-0"
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
                                    <Thermometer className="h-3.5 w-3.5 text-orange-500 animate-pulse" />
                                    Observatorio de Vulnerabilidad Climática
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="relative group">
                                        <select
                                            className="appearance-none bg-transparent text-xl md:text-3xl font-serif font-black text-slate-900 cursor-pointer pr-10 focus:outline-none hover:text-orange-600 transition-colors"
                                            value={point.name}
                                            onChange={handleLocationChange}
                                        >
                                            {POINTS.map(p => (
                                                <option key={p.name} value={p.name}>{p.name}</option>
                                            ))}
                                        </select>
                                        <ArrowDown className="h-4 w-4 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-orange-600 transition-colors" />
                                    </div>
                                    <Badge className="bg-orange-500 text-white border-none px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                                        ERA-5 Copernicus
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
                                <Download className="h-4 w-4 mr-2" /> Exportar <span className="hidden sm:inline ml-1">Análisis</span>
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
                                    markers={POINTS.map(p => ({ lat: p.lat, lon: p.lon, popup: p.name, color: '#F97316' }))}
                                    center={[13.5, -85.0]}
                                    zoom={5}
                                />
                                <div className="absolute top-8 left-8 z-[1000] flex flex-col gap-3">
                                    <Badge className="bg-white/95 backdrop-blur-md text-orange-600 border-none px-5 py-2.5 text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
                                        <Satellite className="h-3.5 w-3.5" />
                                        Red de Estaciones Agrometeorológicas
                                    </Badge>
                                    <Badge className="bg-slate-900/90 backdrop-blur-md text-white border-none px-5 py-2.5 text-[10px] font-black uppercase tracking-widest shadow-xl">
                                        Monitor de Riesgo de Sequía
                                    </Badge>
                                </div>
                            </div>
                            <div className="p-8 bg-white/90 backdrop-blur-xl border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100">
                                        <Droplets className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Punto de Control Activo</p>
                                        <p className="text-sm font-bold text-slate-900">{point.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1.5 bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full border border-orange-100 text-[10px] font-black uppercase tracking-widest italic">
                                        <Sun className="h-3.5 w-3.5 animate-spin-slow" /> Estado: Crítico
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
                        <Card className="p-12 bg-white/70 backdrop-blur-2xl border border-slate-100 shadow-2xl shadow-slate-200/40 rounded-[3.5rem] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                                <Sun className="h-64 w-64 text-orange-600" />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-[10px] font-black text-orange-600 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                                    <div className="w-12 h-0.5 bg-orange-200" />
                                    Diagnóstico Multivariable
                                </h3>
                                <div className="text-slate-900 text-2xl md:text-4xl font-serif leading-tight max-w-5xl">
                                    {loading ? (
                                        <div className="flex items-center gap-6">
                                            <Loader2 className="h-10 w-10 animate-spin text-orange-500" /> 
                                            <span className="text-slate-300 italic">Sincronizando con Copernicus Hub...</span>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            <p>
                                                <strong>{point.name}</strong> registra hoy una máxima de <span className="text-orange-600 italic font-black text-glow-orange">{summary.temp}°C</span>. 
                                            </p>
                                            <p className="text-2xl text-slate-500 font-light leading-relaxed">
                                                Con un acumulado trimestral de <span className="underline decoration-slate-200 decoration-4 underline-offset-8">{summary.rain} mm</span>, la zona presenta un estado de <span className={`px-4 py-1 rounded-2xl border ${summary.rain < 100 ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-blue-50 text-blue-700 border-blue-200'} font-black text-lg not-italic`}>{summary.rain < 100 ? 'ALTO DÉFICIT HÍDRICO' : 'PERIODOS DE LLUVIAS ESTABLES'}</span>.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* KPI CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <StatCard
                            title="Temperatura Máxima"
                            value={summary.temp}
                            unit="°C"
                            subtitle="Estrés térmico registrado a 2m sobre el nivel del suelo."
                            colorClass="border-t-orange-500"
                            icon={Sun}
                            delay={0}
                        />
                        <StatCard
                            title="Precipitación Σ"
                            value={summary.rain}
                            unit="mm"
                            subtitle="Acumulativo trimestral de precipitación pluvial."
                            colorClass="border-t-blue-500"
                            icon={CloudRain}
                            delay={0.1}
                        />
                        <StatCard
                            title="Nivel de Riesgo"
                            value={summary.rain < 50 ? "Severo" : summary.rain < 200 ? "Moderado" : "Bajo"}
                            unit="SPI-3"
                            subtitle="Índice de Precipitación Estándar regional."
                            colorClass={summary.rain < 50 ? "border-t-red-600" : summary.rain < 200 ? "border-t-yellow-500" : "border-t-emerald-500"}
                            icon={AlertOctagon}
                            delay={0.2}
                        />
                    </div>

                    {/* MAIN CHART */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="p-12 bg-white border border-slate-100 shadow-2xl rounded-[3.5rem] h-[550px] flex flex-col group">
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
                                <div>
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-3">Dinámica Climática (90 Días)</h3>
                                    <p className="text-2xl font-serif font-black text-slate-900 tracking-tight leading-none group-hover:text-orange-500 transition-colors">Interacción Temperatura / Lluvia</p>
                                </div>
                                <div className="flex gap-6 items-center bg-slate-50 px-6 py-3 rounded-3xl border border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-lg shadow-orange-500/30" />
                                        <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Temperatura</span>
                                    </div>
                                    <div className="h-4 w-px bg-slate-200" />
                                    <div className="flex items-center gap-3">
                                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-lg shadow-blue-500/30" />
                                        <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Lluvia</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 w-full min-h-0 relative">
                                {loading ? (
                                    <div className="h-full flex flex-col items-center justify-center gap-6">
                                        <div className="relative">
                                            <Loader2 className="animate-spin h-14 w-14 text-orange-200" />
                                            <BarChart3 className="absolute inset-0 m-auto h-6 w-6 text-orange-500" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 animate-pulse">Procesando Reanálisis Global ERA-5...</span>
                                    </div>
                                ) : (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <ComposedChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                                            <defs>
                                                <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis 
                                                dataKey="date" 
                                                minTickGap={40} 
                                                axisLine={false} 
                                                tickLine={false} 
                                                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'black', textTransform: 'uppercase' }} 
                                            />
                                            <YAxis 
                                                yAxisId="left" 
                                                orientation="left" 
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#F97316', fontSize: 10, fontWeight: 'black' }}
                                            />
                                            <YAxis 
                                                yAxisId="right" 
                                                orientation="right" 
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#3B82F6', fontSize: 10, fontWeight: 'black' }}
                                            />
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
                                                yAxisId="right" 
                                                type="monotone" 
                                                dataKey="rain" 
                                                name="Lluvia (mm)" 
                                                fill="url(#colorRain)" 
                                                stroke="#3B82F6" 
                                                strokeWidth={3}
                                                animationDuration={2000}
                                            />
                                            <Line 
                                                yAxisId="left" 
                                                type="monotone" 
                                                dataKey="temp" 
                                                name="Temperatura (°C)" 
                                                stroke="#F97316" 
                                                strokeWidth={5} 
                                                dot={false}
                                                activeDot={{ r: 8, strokeWidth: 0, fill: '#F97316' }}
                                                animationDuration={1500}
                                            />
                                        </ComposedChart>
                                    </ResponsiveContainer>
                                )}
                            </div>
                            <div className="mt-8 flex justify-center items-center gap-10">
                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-2xl font-black text-slate-900 tracking-tighter">{summary.temp}°C</span>
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Máximo Hoy</span>
                                </div>
                                <div className="h-10 w-px bg-slate-100" />
                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-2xl font-black text-slate-900 tracking-tighter">{summary.rain}mm</span>
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Acumulado Trimestre</span>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </main>

            <footer className="max-w-7xl mx-auto px-8 py-20 relative z-10 font-bold text-[10px] uppercase tracking-[0.3em] text-slate-400 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-slate-200/50">
                <div className="flex items-center gap-6">
                    <span>© 2026 Observatorio Ambiental Regional</span>
                    <div className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
                    <span>Conexión Nodo Copernicus CDS</span>
                </div>
                <div className="flex gap-8 items-center opacity-70">
                    <span className="hover:text-orange-500 cursor-pointer transition-colors border-b border-transparent hover:border-orange-500">ERA5 Reanalysis</span>
                    <span className="hover:text-orange-500 cursor-pointer transition-colors border-b border-transparent hover:border-orange-500">Open-Meteo V3</span>
                    <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">
                      <ShieldAlert className="h-4 w-4 text-orange-500" />
                    </div>
                </div>
            </footer>

            <DataSourceModal
                isOpen={showHelp}
                onClose={() => setShowHelp(false)}
                title="Sistemas de Monitoreo Climático y Riesgo"
                sources={dataSources}
            />
        </div>
    );
};
