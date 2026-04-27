import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell, PieChart, Pie, Legend
} from 'recharts';
import { Download, Share2, Info, TreeDeciduous, TrendingDown, ShieldCheck, ArrowLeft, ChevronRight, Target, Database, Waves, ExternalLink, Map as MapIcon, Shield } from 'lucide-react';
import { Card, Button, Badge, ShareButton } from '../../../components/ui/Shared';
import { useNavigate } from 'react-router-dom';

// --- MOCK DATA ESPECÍFICA PARA ESTE REPORTE ---
const dataForestTrend = [
    { year: 1990, value: 22.5 },
    { year: 2000, value: 20.1 },
    { year: 2010, value: 19.2 },
    { year: 2020, value: 18.4 },
    { year: 2024, value: 18.1 },
];

const dataDesignation = [
    { name: 'Producción', value: 25, color: '#F59E0B' }, // Amber
    { name: 'Protección de suelo/agua', value: 15, color: '#3B82F6' }, // Blue
    { name: 'Conservación biodiversidad', value: 45, color: '#10B981' }, // Emerald
    { name: 'Servicios sociales', value: 10, color: '#EC4899' }, // Pink
    { name: 'Otros', value: 5, color: '#94A3B8' }, // Slate
];

const dataCarbon = [
    { name: 'Biomasa Viva', value: 1200 },
    { name: 'Madera Muerta', value: 150 },
    { name: 'Suelo', value: 1800 },
    { name: 'Hojarasca', value: 80 },
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

const SectionHeader = ({ number, title, subtitle }) => (
    <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-12 border-l-4 border-emerald-500 pl-8"
    >
        <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.3em] block mb-2">
            Sección {number}
        </span>
        <h2 className="text-4xl font-serif font-black text-slate-900 mb-4 tracking-tight leading-tight">{title}</h2>
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed italic font-light">{subtitle}</p>
    </motion.div>
);

export const AnswerForestState = () => {
    const navigate = useNavigate();
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
                                    <TreeDeciduous className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
                                    Estado de los Bosques (FRA 2024)
                                </div>
                                <h1 className="text-xl md:text-2xl font-serif font-black text-slate-900 tracking-tight">Eje Regional SICA</h1>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3"
                        >
                            <ShareButton />
                            <Button className="bg-slate-900 text-white rounded-full px-8 h-12 font-black uppercase text-[10px] tracking-widest group shadow-xl hover:shadow-slate-900/20 transition-all">
                                <Download className="h-4 w-4 mr-2" /> Exportar <span className="hidden sm:inline ml-1">Análisis</span>
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                <div className="space-y-24">
                    {/* HERO SECTION */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-5xl"
                    >
                        <Badge className="bg-emerald-500 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20 border-none mb-10">
                            Diagnóstico Forestal FRA 2024
                        </Badge>
                        <h2 className="text-6xl md:text-8xl font-serif font-black text-slate-900 mb-10 leading-[1] tracking-tighter">
                            Condición Regional <br/>
                            <span className="text-emerald-500 italic text-glow-emerald">Multidimensional</span>
                        </h2>
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <p className="text-2xl text-slate-500 leading-relaxed font-light italic border-l-4 border-slate-200 pl-8 max-w-2xl">
                                "Un análisis integral sobre la extensión, condición y gestión de los recursos forestales regionales, integrando variables climáticas y de biodiversidad."
                            </p>
                            <div className="flex flex-col gap-3 pt-2">
                                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100">
                                    <ShieldCheck className="h-4 w-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Datos Verificados</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* KEY FINDINGS GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <StatCard
                            title="Superficie Forestal"
                            value="18.1"
                            unit="Mha"
                            subtitle="Superficie total estimada al cierre del periodo 2024."
                            colorClass="border-t-emerald-500"
                            icon={TreeDeciduous}
                            delay={0}
                        />
                        <StatCard
                            title="Resiliencia Neta"
                            value="+3%"
                            unit="Anual"
                            subtitle="Incremento en áreas de regeneración asistida regional."
                            colorClass="border-t-orange-500"
                            icon={TrendingDown}
                            delay={0.1}
                        />
                        <StatCard
                            title="Protección Legal"
                            value="45%"
                            unit="Regional"
                            subtitle="Porcentaje de superficie boscosa bajo régimen estricto."
                            colorClass="border-t-blue-500"
                            icon={ShieldCheck}
                            delay={0.2}
                        />
                    </div>

                    {/* SECCIÓN 1: EXTENSIÓN */}
                    <section>
                        <SectionHeader
                            number="01"
                            title="Dinámica de Extensión"
                            subtitle="Estudio temporal de la cobertura vegetal. La consolidación de políticas de conservación ha logrado mitigar la tasa de deforestación histórica."
                        />

                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="lg:col-span-2 space-y-8"
                            >
                                <p className="text-xl text-slate-600 leading-relaxed font-serif">
                                    La región SICA mantiene un capital natural de <strong>18.1 millones de hectáreas</strong>. A pesar de las presiones antropogénicas, la curva de pérdida se ha estabilizado en el último quinquenio.
                                </p>
                                <div className="p-10 bg-white/70 backdrop-blur-xl rounded-[3rem] border border-emerald-100 shadow-xl shadow-emerald-500/5 relative overflow-hidden group">
                                    <TreeDeciduous className="absolute bottom-0 right-0 h-32 w-32 text-emerald-500/5 -mb-8 -mr-8 transition-transform group-hover:scale-110" />
                                    <p className="text-emerald-700 font-bold italic relative z-10 text-lg leading-relaxed">
                                        "La implementación de sistemas de pago por servicios ambientales ha sido clave en la recuperación de 400k ha en zonas degradadas."
                                    </p>
                                </div>
                                <Button variant="outline" className="rounded-full px-8 h-14 border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white transition-all font-black text-[10px] uppercase tracking-widest shadow-sm">
                                    Explorar Mapa Temporal <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="lg:col-span-3"
                            >
                                <Card className="p-10 bg-white border border-slate-100 shadow-2xl rounded-[3rem] h-[520px] flex flex-col group">
                                    <div className="flex justify-between items-center mb-10">
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Historial de Cobertura (Mha)</h4>
                                        <Badge className="bg-slate-900 text-white border-none px-3 py-1">Dataset FRA 2024</Badge>
                                    </div>
                                    <div className="flex-1 w-full min-h-0 relative">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={dataForestTrend} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                                <defs>
                                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                                                <YAxis domain={[15, 25]} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                                                <Tooltip 
                                                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', padding: '20px' }} 
                                                />
                                                <Area type="monotone" dataKey="value" stroke="#10B981" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-emerald-500" /> Bosque Nativo</div>
                                        <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-blue-500 opacity-30" /> Plantaciones</div>
                                    </div>
                                </Card>
                            </motion.div>
                        </div>
                    </section>

                    {/* SECCIÓN 2: DESIGNACIÓN */}
                    <section>
                        <SectionHeader
                            number="02"
                            title="Gobernanza y Uso"
                            subtitle="Análisis de la designación funcional de las áreas forestales. La conservación de la biodiversidad lidera los objetivos de manejo regional."
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-white rounded-[4rem] shadow-2xl border border-slate-100 p-16 overflow-hidden relative group">
                                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                                    <Shield className="h-48 w-48 text-emerald-500" />
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                                    <div className="h-[450px] w-full relative">
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-6xl font-black text-slate-900 tracking-tighter">45%</span>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">Prioridad de Conservación</span>
                                        </div>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={dataDesignation}
                                                    innerRadius={130}
                                                    outerRadius={180}
                                                    paddingAngle={10}
                                                    dataKey="value"
                                                    stroke="none"
                                                >
                                                    {dataDesignation.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} className="hover:opacity-80 transition-opacity cursor-pointer" />
                                                    ))}
                                                </Pie>
                                                <Tooltip 
                                                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }} 
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <div className="space-y-10">
                                        <div className="max-w-md">
                                            <h3 className="text-2xl font-serif font-black text-slate-900 mb-4 italic">Clasificación por Objetivo</h3>
                                            <p className="text-slate-500 font-light leading-relaxed">
                                                Cerca de la mitad del patrimonio forestal regional está destinado exclusivamente a la protección de ecosistemas críticos y hotspots de biodiversidad.
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-1 gap-4">
                                            {dataDesignation.map((item, index) => (
                                                <motion.div 
                                                    key={index} 
                                                    whileHover={{ x: 12, backgroundColor: 'rgba(248,250,252,1)' }}
                                                    className="flex items-center justify-between p-6 bg-slate-50/50 rounded-3xl border border-transparent hover:border-slate-200 transition-all cursor-default"
                                                >
                                                    <div className="flex items-center gap-5">
                                                        <div className="w-4 h-4 rounded-full shadow-lg" style={{ backgroundColor: item.color }}></div>
                                                        <span className="text-slate-600 font-black text-[11px] uppercase tracking-widest">{item.name}</span>
                                                    </div>
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="font-black text-slate-900 text-2xl tracking-tighter">{item.value}</span>
                                                        <span className="text-[10px] font-black text-slate-400">%</span>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </section>

                    {/* SECCIÓN 3: CARBONO */}
                    <section>
                        <SectionHeader
                            number="03"
                            title="Balance de Carbono"
                            subtitle="Evaluación de biomasa y secuestro de carbono. Los suelos forestales representan el mayor reservorio de carbono orgánico en la región."
                        />

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="space-y-10"
                            >
                                <div className="space-y-6">
                                    <p className="text-2xl text-slate-500 leading-relaxed font-serif italic border-l-4 border-slate-200 pl-8">
                                        Capacidad de almacenamiento total estimada en <strong>3.2 Gigatoneladas de Carbono</strong>.
                                    </p>
                                    <p className="text-slate-600 font-light leading-relaxed">
                                        Este dato es fundamental para el cumplimiento de las NDC (Contribuciones Determinadas a Nivel Nacional) bajo el Acuerdo de París.
                                    </p>
                                </div>
                                <Card className="p-10 bg-slate-900 border border-slate-800 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                                    <Database className="absolute bottom-0 right-0 h-32 w-32 text-white/5 -mb-6 -mr-6 group-hover:scale-110 transition-transform" />
                                    <div className="flex gap-6 items-start relative z-10">
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-emerald-500 transition-colors">
                                            <Database className="h-6 w-6 text-emerald-400 group-hover:text-white" />
                                        </div>
                                        <div>
                                            <h5 className="text-white font-black uppercase text-[10px] tracking-widest mb-2">Reservorio en Suelo</h5>
                                            <p className="text-slate-400 text-sm font-light leading-relaxed">
                                                El carbono orgánico del suelo representa más del 56% del capital de carbono forestal regional.
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                                <Button className="w-full rounded-2xl h-14 bg-slate-100 text-slate-900 hover:bg-slate-900 hover:text-white transition-all font-black text-[10px] uppercase tracking-widest h-14">
                                    Ver Metodología de Cálculo IPS <ExternalLink className="ml-2 h-4 w-4" />
                                </Button>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="lg:col-span-2"
                            >
                                <Card className="p-12 bg-white border border-slate-100 shadow-2xl rounded-[3.5rem] h-[520px] flex flex-col group">
                                    <div className="flex justify-between items-center mb-12">
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Distribución por Reservorio (Mt C)</h4>
                                        <Waves className="h-5 w-5 text-blue-500 animate-pulse" />
                                    </div>
                                    <div className="flex-1 w-full min-h-0 relative">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart
                                                data={dataCarbon}
                                                layout="vertical"
                                                margin={{ top: 0, right: 30, left: 20, bottom: 0 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="name" type="category" width={120} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'black', textTransform: 'uppercase' }} axisLine={false} tickLine={false} />
                                                <Tooltip 
                                                    cursor={{ fill: '#f8fafc' }}
                                                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }} 
                                                />
                                                <Bar dataKey="value" fill="#1E3A8A" radius={[0, 20, 20, 0]} barSize={50}>
                                                    {
                                                        dataCarbon.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={index === 2 ? '#1E3A8A' : '#93C5FD'} className="hover:opacity-80 transition-all cursor-pointer" />
                                                        ))
                                                    }
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="mt-8 flex items-center justify-center gap-6">
                                        <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-blue-900" /> Carbono Estable</div>
                                        <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-blue-300" /> Carbono Labil</div>
                                    </div>
                                </Card>
                            </motion.div>
                        </div>
                    </section>
                </div>
            </main>

            <footer className="max-w-7xl mx-auto px-8 py-16 relative z-10 font-bold text-[10px] uppercase tracking-[0.2em] text-slate-400 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-slate-200/50">
                <div className="flex items-center gap-4">
                    <span>© 2026 Observatorio Ambiental Regional</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span>Conexión FAO FRA API 2.0</span>
                </div>
                <div className="flex gap-8 items-center">
                    <span className="hover:text-emerald-500 cursor-pointer transition-colors">Repositorio Regional SFC</span>
                    <span className="hover:text-emerald-500 cursor-pointer transition-colors">Metadatos Estándar</span>
                    <div className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100">
                      <Target className="h-4 w-4 text-emerald-500" />
                    </div>
                </div>
            </footer>
        </div>
    );
};
