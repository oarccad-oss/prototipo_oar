import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Droplets, AlertTriangle, ArrowLeft, ArrowDown, Share2, Download, TrendingUp, CloudRain, HelpCircle, ChevronRight, Waves } from 'lucide-react';
import { Card, Badge, Button, DataSourceModal, ShareButton } from '../../../components/ui/Shared';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MiniMap } from '../../../components/map/MiniMap';
import { SICA_COORDINATES, SICA_COUNTRIES } from '../../../data/constants';

const WATER_DATA = {
    'GT': { stress: 3.1, stressLabel: 'Alto', risk: 80, access: 88, source: 'WRI Aqueduct', profile: [{ s: 'Físico', v: 80 }, { s: 'Calidad', v: 65 }, { s: 'Regulatorio', v: 45 }, { s: 'Sequía', v: 90 }, { s: 'Inundación', v: 85 }] },
    'HN': { stress: 2.4, stressLabel: 'Medio-Alto', risk: 65, access: 85, source: 'WRI Aqueduct', profile: [{ s: 'Físico', v: 60 }, { s: 'Calidad', v: 50 }, { s: 'Regulatorio', v: 55 }, { s: 'Sequía', v: 70 }, { s: 'Inundación', v: 90 }] },
    'SV': { stress: 3.8, stressLabel: 'Extremadamente Alto', risk: 95, access: 90, source: 'WRI Aqueduct', profile: [{ s: 'Físico', v: 90 }, { s: 'Calidad', v: 85 }, { s: 'Regulatorio', v: 60 }, { s: 'Sequía', v: 95 }, { s: 'Inundación', v: 70 }] },
    'NI': { stress: 2.6, stressLabel: 'Medio-Alto', risk: 60, access: 82, source: 'WRI Aqueduct', profile: [{ s: 'Físico', v: 50 }, { s: 'Calidad', v: 40 }, { s: 'Regulatorio', v: 50 }, { s: 'Sequía', v: 60 }, { s: 'Inundación', v: 80 }] },
    'CR': { stress: 1.8, stressLabel: 'Bajo', risk: 30, access: 96, source: 'WRI Aqueduct', profile: [{ s: 'Físico', v: 30 }, { s: 'Calidad', v: 20 }, { s: 'Regulatorio', v: 80 }, { s: 'Sequía', v: 40 }, { s: 'Inundación', v: 50 }] },
    'PA': { stress: 1.9, stressLabel: 'Bajo', risk: 35, access: 94, source: 'WRI Aqueduct', profile: [{ s: 'Físico', v: 35 }, { s: 'Calidad', v: 25 }, { s: 'Regulatorio', v: 75 }, { s: 'Sequía', v: 45 }, { s: 'Inundación', v: 55 }] },
    'BZ': { stress: 1.2, stressLabel: 'Bajo', risk: 25, access: 89, source: 'WRI Aqueduct', profile: [{ s: 'Físico', v: 25 }, { s: 'Calidad', v: 30 }, { s: 'Regulatorio', v: 60 }, { s: 'Sequía', v: 30 }, { s: 'Inundación', v: 40 }] },
    'DO': { stress: 3.2, stressLabel: 'Alto', risk: 85, access: 86, source: 'WRI Aqueduct', profile: [{ s: 'Físico', v: 85 }, { s: 'Calidad', v: 70 }, { s: 'Regulatorio', v: 55 }, { s: 'Sequía', v: 80 }, { s: 'Inundación', v: 75 }] },
    'regional': { stress: 2.8, stressLabel: 'Medio-Alto', risk: 78, access: 89, source: 'WRI Aqueduct', profile: [{ s: 'Físico', v: 65 }, { s: 'Calidad', v: 55 }, { s: 'Regulatorio', v: 58 }, { s: 'Sequía', v: 72 }, { s: 'Inundación', v: 78 }] }
};

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
                    {value}
                </span>
                <span className="text-sm font-bold text-slate-500">{unit}</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed font-light">{subtitle}</p>
        </Card>
    </motion.div>
);

export const AnswerWaterSecurity = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedIso = searchParams.get('country') || 'regional';
    const [loading, setLoading] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    const dataSources = [
        { name: "Estrés Hídrico", description: "Relación entre demanda y oferta total de agua renovable.", provider: "WRI Aqueduct", updateFrequency: "Anual" },
        { name: "Riesgo de Sequía", description: "Probabilidad histórica y proyecciones de sequía.", provider: "WRI Aqueduct", updateFrequency: "Anual" },
        { name: "Calidad del Agua", description: "Potencial de contaminación costera y fluvial.", provider: "WRI Aqueduct", updateFrequency: "Anual" }
    ];

    const data = WATER_DATA[selectedIso] || WATER_DATA['regional'];
    const countryName = SICA_COORDINATES[selectedIso]?.name || (selectedIso === 'regional' ? 'Región SICA' : 'Guatemala');
    const mapView = SICA_COORDINATES[selectedIso] || SICA_COORDINATES['regional'];

    const handleCountryChange = (e) => {
        setLoading(true);
        setSearchParams({ country: e.target.value });
        setTimeout(() => setLoading(false), 500);
    };

    return (
        <div className="relative min-h-screen bg-slate-50 overflow-hidden selection:bg-blue-500 selection:text-white">
            <style>{`
                @keyframes blob-drift {
                    0%, 100% { transform: translate(0, 0) scale(1) }
                    33% { transform: translate(40px, -60px) scale(1.1) }
                    66% { transform: translate(-30px, 30px) scale(0.9) }
                }
                .text-glow-blue {
                    text-shadow: 0 0 20px rgba(59,130,246,0.3);
                }
            `}</style>

            {/* Background Decorative Elements */}
            <div 
                className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none z-0"
                style={{ animation: 'blob-drift 25s infinite alternate' }}
            />
            <div 
                className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none z-0"
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
                                    <Droplets className="h-3.5 w-3.5 text-blue-500 animate-bounce" />
                                    Seguridad Hídrica (WRI Aqueduct 3.0)
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="relative group">
                                        <select
                                            className="appearance-none bg-transparent text-xl md:text-3xl font-serif font-black text-slate-900 cursor-pointer pr-10 focus:outline-none hover:text-blue-600 transition-colors"
                                            value={selectedIso}
                                            onChange={handleCountryChange}
                                        >
                                            {Object.entries(SICA_COORDINATES).filter(([k]) => k !== 'regional').map(([code, val]) => (
                                                <option key={code} value={code}>{val.name}</option>
                                            ))}
                                            <option value="regional">Toda la Región SICA</option>
                                        </select>
                                        <ArrowDown className="h-4 w-4 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-blue-600 transition-colors" />
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
                                    center={[mapView.lat, mapView.lon]}
                                    zoom={mapView.zoom}
                                />
                                <div className="absolute top-6 left-6 z-[1000] flex flex-col gap-2">
                                    <Badge className="bg-white/95 backdrop-blur-md text-blue-600 border-none px-4 py-2 text-[10px] font-black uppercase tracking-widest shadow-xl">
                                        Monitor de Estrés Hídrico
                                    </Badge>
                                </div>
                            </div>
                            <div className="p-6 bg-white border-t border-slate-100 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                <div className="flex items-center gap-2">
                                    <Droplets className="h-3.5 w-3.5" /> Recursos Hídricos Continentales
                                </div>
                                <div className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100 italic">
                                    {countryName} - {selectedIso}
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
                                <Droplets className="h-32 w-32 text-blue-500" />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                    Diagnóstico Regional
                                </h3>
                                <p className="text-slate-900 text-xl md:text-2xl font-serif leading-relaxed max-w-4xl">
                                    <strong>{countryName}</strong> reporta un índice de estrés de <span className="text-blue-600 italic font-black text-glow-blue">{data.stress}</span>, clasificado como <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-lg border border-blue-100">{data.stressLabel.toUpperCase()}</span>. El riesgo ambiental acumulado se estima en un <span className="underline decoration-2 underline-offset-4">{data.risk}%</span> respecto a la capacidad de renovación.
                                </p>
                            </div>
                        </Card>
                    </motion.div>

                    {/* KPI CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <StatCard
                            title="Estrés Hídrico"
                            value={data.stress}
                            unit="/ 5.0"
                            subtitle="Ratio de extracción total vs. recursos renovables disponibles."
                            colorClass="border-t-blue-500"
                            icon={Droplets}
                            delay={0}
                        />
                        <StatCard
                            title="Riesgo de Sequía"
                            value={data.profile.find(p => p.s === 'Sequía')?.v}
                            unit="Score"
                            subtitle="Probabilidad e impacto estimado de eventos de sequía extrema."
                            colorClass="border-t-orange-500"
                            icon={CloudRain}
                            delay={0.1}
                        />
                        <StatCard
                            title="Acceso Potable"
                            value={`${data.access}%`}
                            unit="Población"
                            subtitle="Porcentaje con acceso a servicios gestionados de forma segura."
                            colorClass="border-t-emerald-500"
                            icon={Waves}
                            delay={0.2}
                        />
                    </div>

                    {/* GRÁFICO Y RECOMENDACIONES */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Card className="p-10 bg-white border border-slate-100 shadow-xl rounded-[2.5rem] h-[500px] flex flex-col">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-10 text-center">Perfil de Riesgo Hídrico</h3>
                                <div className="flex-1 w-full min-h-0">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart outerRadius={140} data={data.profile}>
                                            <PolarGrid stroke="#e2e8f0" />
                                            <PolarAngleAxis dataKey="s" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'black' }} />
                                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                            <Radar 
                                                name="Riesgo" 
                                                dataKey="v" 
                                                stroke="#3B82F6" 
                                                strokeWidth={3}
                                                fill="#3B82F6" 
                                                fillOpacity={0.3} 
                                            />
                                            <Tooltip 
                                                contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} 
                                            />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Card className="p-10 bg-slate-900 border border-slate-800 shadow-xl rounded-[2.5rem] h-[500px] flex flex-col justify-center">
                                <div className="flex items-center gap-6 mb-10">
                                    <div className="p-5 rounded-[2rem] bg-blue-500/10 border border-blue-500/20">
                                        <Droplets className="h-10 w-10 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-white">Estrategias de Adaptación</h3>
                                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Hoja de Ruta para {countryName}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        "Infraestructura de almacenamiento resiliente.",
                                        "Sistemas de riego circular y telemetría.",
                                        "Protección estricta de zonas de recarga hídrica."
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl group hover:bg-white/10 transition-all border border-transparent hover:border-white/10">
                                            <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                            <span className="text-slate-300 font-light text-sm">{item}</span>
                                            <ChevronRight className="ml-auto h-4 w-4 text-slate-700 group-hover:text-blue-500 transition-colors" />
                                        </div>
                                    ))}
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
                    <span>Plataforma SICA • Acuíferos Transfronterizos</span>
                </div>
                <div className="flex gap-6 border-l md:border-l-2 border-slate-200 pl-6 h-4 items-center">
                    <span className="hover:text-blue-500 cursor-pointer transition-colors">WRI Aqueduct Hub</span>
                    <span className="hover:text-blue-500 cursor-pointer transition-colors">Marco de Sendai</span>
                </div>
            </footer>

            <DataSourceModal
                isOpen={showHelp}
                onClose={() => setShowHelp(false)}
                title="Fuente de Datos: Seguridad Hídrica"
                sources={dataSources}
            />
        </div>
    );
};
