import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen,
    HelpCircle,
    LayoutDashboard,
    Map as MapIcon,
    Trees,
    Info,
    ArrowRight,
    Search,
    RefreshCw,
    FileText,
    Activity,
    Globe,
    Sparkles,
    ShieldCheck,
    Box
} from 'lucide-react';
import { Button, Card, Badge } from '../../components/ui/Shared';

const SICA_FACTS = [
    "La región SICA cuenta con 18.1 millones de hectáreas de bosque, de las cuales el 45% se encuentran bajo protección oficial.",
    "Tres países de la región han logrado revertir la tendencia regional y ahora muestran una ganancia neta de cobertura boscosa en 2024.",
    "El stock total de carbono en los bosques de la región SICA alcanza las 3.2 Gigatoneladas, un pilar crítico para la resiliencia climática.",
    "La 'Selva Maya' es el bosque tropical más extenso de Centro América y República Dominicana, albergando una biodiversidad única en el mundo.",
    "El carbono orgánico del suelo representa más del 50% del total almacenado en nuestros ecosistemas forestales regionales.",
    "Los sistemas agroforestales de café y cacao en el SICA capturan hasta 40 toneladas de carbono por hectárea anualmente.",
    "La región alberga el 7% de la biodiversidad mundial en apenas el 0.5% de la superficie terrestre del planeta.",
    "Los manglares de la región SICA protegen contra marejadas y almacenan hasta 5 veces más carbono que los bosques terrestres."
];

const ModuleCard = ({ icon: Icon, title, description, path, colorClass, delay = 0 }) => {
    const navigate = useNavigate();
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="h-full"
        >
            <div
                onClick={() => navigate(path)}
                className={`group relative p-8 bg-white/80 backdrop-blur-xl rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden h-full flex flex-col`}
            >
                <div className={`absolute top-0 right-0 w-48 h-48 -mr-12 -mt-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none`}>
                    <Icon size={192} />
                </div>

                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg ${colorClass}`}>
                    <Icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-2xl font-serif font-black text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors tracking-tight">
                    {title}
                </h3>

                <p className="text-slate-500 leading-relaxed mb-8 font-light text-sm">
                    {description}
                </p>

                <div className="mt-auto flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-emerald-600 transition-colors">
                    Explorar Módulo <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-2 transition-transform" />
                </div>
            </div>
        </motion.div>
    );
};

export const StrategicAxisHome = () => {
    const navigate = useNavigate();
    const [factIndex, setFactIndex] = React.useState(() => Math.floor(Math.random() * SICA_FACTS.length));
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleShuffle = (e) => {
        e.stopPropagation();
        setIsRefreshing(true);
        setTimeout(() => {
            setFactIndex((prev) => {
                let next;
                do {
                    next = Math.floor(Math.random() * SICA_FACTS.length);
                } while (next === prev && SICA_FACTS.length > 1);
                return next;
            });
            setIsRefreshing(false);
        }, 300);
    };

    return (
        <div className="relative min-h-screen bg-slate-50 overflow-hidden selection:bg-emerald-500 selection:text-white">
            <style>{`
                @keyframes blob-drift {
                    0%, 100% { transform: translate(0, 0) scale(1) }
                    33% { transform: translate(40px, -60px) scale(1.1) }
                    66% { transform: translate(-30px, 30px) scale(0.9) }
                }
                .mesh-forest {
                    background-image: radial-gradient(circle at 10% 10%, rgba(16, 185, 129, 0.05) 0%, transparent 50%),
                                      radial-gradient(circle at 90% 90%, rgba(14, 165, 233, 0.05) 0%, transparent 50%);
                }
            `}</style>

            {/* Background Decorative Elements */}
            <div className="absolute inset-0 mesh-forest pointer-events-none z-0" />
            <div 
                className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none z-0"
                style={{ animation: 'blob-drift 30s infinite alternate' }}
            />
            <div 
                className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-500/5 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none z-0"
                style={{ animation: 'blob-drift 25s infinite alternate-reverse' }}
            />

            {/* Hero Section */}
            <main className="relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex-1 space-y-10"
                        >
                            <div className="flex flex-wrap gap-3">
                                <Badge className="bg-emerald-50 text-emerald-600 border-none px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] shadow-sm">
                                    <Trees className="h-3.5 w-3.5 mr-2" /> ERAM • Línea 4
                                </Badge>
                                <Badge className="bg-slate-900 text-white border-none px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] shadow-xl">
                                    <ShieldCheck className="h-3.5 w-3.5 mr-2" /> Protección Forestal
                                </Badge>
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl font-serif font-black text-slate-900 leading-[1.1] tracking-tight">
                                Bosques y Paisajes <br />
                                <span className="text-emerald-600 italic">Sostenibles</span>
                            </h1>
                            
                            <p className="text-xl md:text-2xl text-slate-500 max-w-2xl leading-relaxed font-light">
                                Gestión integral para la protección de los pulmones verdes de la región SICA, impulsando la resiliencia climática y la conectividad biológica mesoamericana.
                            </p>

                            {/* Prominent Search Bar */}
                            <div className="max-w-2xl pt-4">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-emerald-500/10 blur-2xl group-focus-within:bg-emerald-500/20 transition-all rounded-3xl" />
                                    <div className="relative flex items-center bg-white/80 backdrop-blur-xl border border-slate-200 rounded-[2rem] p-2 pr-4 shadow-2xl group-focus-within:border-emerald-500/50 transition-all">
                                        <div className="pl-6 w-14 shrink-0">
                                          <Search className="h-6 w-6 text-emerald-500 group-focus-within:scale-110 transition-transform" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="¿Qué información busca sobre este eje?"
                                            className="w-full bg-transparent py-5 px-4 focus:outline-none text-lg font-light text-slate-900 placeholder:text-slate-400"
                                        />
                                        <Button className="bg-slate-900 hover:bg-emerald-600 text-white rounded-2xl px-10 h-14 font-black uppercase text-[10px] tracking-widest transition-all">
                                            Buscar <span className="hidden sm:inline ml-2 text-emerald-400">Datos</span>
                                        </Button>
                                    </div>
                                </div>
                                <div className="mt-5 flex items-center justify-between px-6">
                                    <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-black">
                                        Búsqueda: Capas, Reportes y Metadatos
                                    </p>
                                    <div className="flex items-center gap-2 text-[10px] text-emerald-600 font-bold italic">
                                      <Activity className="h-3 w-3 animate-pulse" /> Nodo de Inteligencia Activo
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Dato del día Card */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full lg:w-[400px] shrink-0"
                        >
                            <div className="bg-slate-900 p-10 rounded-[3.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.15)] relative overflow-hidden group min-h-[380px] flex flex-col justify-between border border-slate-800">
                                <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.1] group-hover:scale-110 transition-all duration-1000">
                                    <Trees size={240} className="text-emerald-500" />
                                </div>
                                
                                <div className="relative z-10">
                                    <Badge className="bg-emerald-500 text-white border-none px-4 py-1 mb-8 text-[9px] font-black tracking-widest uppercase">
                                        Dato del Momento
                                    </Badge>
                                    <div className="min-h-[160px]">
                                      <AnimatePresence mode="wait">
                                          <motion.p 
                                              key={factIndex}
                                              initial={{ opacity: 0, y: 10 }}
                                              animate={{ opacity: 1, y: 0 }}
                                              exit={{ opacity: 0, y: -10 }}
                                              className="text-2xl font-serif leading-[1.4] text-white font-medium italic pr-4"
                                          >
                                              "{SICA_FACTS[factIndex]}"
                                          </motion.p>
                                      </AnimatePresence>
                                    </div>
                                </div>

                                <div className="relative z-10 pt-10 border-t border-white/10">
                                    <div className="flex justify-between items-center">
                                        <div className="space-y-1">
                                            <p className="text-[11px] font-black uppercase text-white tracking-widest">Observatorio Ambiental</p>
                                            <p className="text-[9px] font-bold text-emerald-400/60 uppercase tracking-widest">CCAD / SICA • v4.0.1</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={handleShuffle}
                                            className="h-14 w-14 p-0 rounded-2xl bg-white/5 hover:bg-emerald-500 hover:text-white text-emerald-400 border-none transition-all duration-500 shadow-2xl"
                                        >
                                            <RefreshCw className={`h-6 w-6 ${isRefreshing ? 'animate-spin' : ''}`} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Content Inventory */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

                        {/* Main Content Column */}
                        <div className="lg:col-span-3 space-y-24">

                            {/* Section 1: Grandes Bosques de la Región */}
                            <section className="space-y-12">
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                                >
                                    <div>
                                      <h2 className="text-xs font-black text-emerald-600 uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
                                        <div className="w-12 h-0.5 bg-emerald-200" />
                                        Inventario Regional
                                      </h2>
                                      <h3 className="text-4xl font-serif font-black text-slate-800 tracking-tight">
                                          Grandes Bosques <span className="text-emerald-600 italic">SICA</span>
                                      </h3>
                                    </div>
                                    <Button
                                        variant="link"
                                        className="text-emerald-600 font-black p-0 flex items-center gap-2 group text-[11px] uppercase tracking-widest"
                                        onClick={() => navigate('/grandes-bosques')}
                                    >
                                        Catálogo Completo <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                                    </Button>
                                </motion.div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    {[
                                        { name: "Montañas Mayas", country: "Belice", img: "/forests/belize.png", slug: "montanas-mayas" },
                                        { name: "Biosfera Maya", country: "Guatemala", img: "/forests/guatemala.png", slug: "reserva-de-la-biosfera-maya" },
                                        { name: "El Imposible", country: "El Salvador", img: "/forests/el_salvador.png", slug: "parque-nacional-el-imposible" },
                                        { name: "Río Plátano", country: "Honduras", img: "/forests/honduras.png", slug: "reserva-de-la-biosfera-del-rio-platano" }
                                    ].map((forest, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.1 }}
                                            viewport={{ once: true }}
                                            className="group relative h-64 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl hover:shadow-[0_40px_60px_rgba(0,0,0,0.1)] transition-all duration-700"
                                            onClick={() => navigate(`/grandes-bosques/historias/${forest.slug}`)}
                                        >
                                            <img
                                                src={forest.img}
                                                alt={forest.name}
                                                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-[2000ms] group-hover:scale-125"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent"></div>
                                            <div className="absolute top-6 left-6">
                                                <Badge className="bg-emerald-500/30 backdrop-blur-md border border-emerald-400/30 text-emerald-100 text-[9px] font-black uppercase tracking-widest px-3 py-1">
                                                    {forest.country}
                                                </Badge>
                                            </div>
                                            <div className="absolute bottom-6 left-8 right-8">
                                                <h4 className="text-2xl font-serif font-black text-white leading-tight mb-2 group-hover:text-emerald-400 transition-colors">{forest.name}</h4>
                                                <div className="flex items-center gap-2 text-[8px] font-black text-white/60 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                                                  Ver historia completa <ArrowRight size={10} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    onClick={() => navigate('/grandes-bosques')}
                                    className="p-10 bg-white/80 backdrop-blur-xl border border-emerald-100 rounded-[3rem] shadow-2xl shadow-emerald-500/5 hover:shadow-emerald-500/10 transition-all cursor-pointer group flex flex-col sm:flex-row items-center gap-10"
                                >
                                    <div className="w-20 h-20 bg-emerald-600 rounded-[2rem] flex items-center justify-center text-white shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-emerald-500/20">
                                        <Globe size={32} />
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-serif font-black text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">Bosques Transfronterizos</h4>
                                        <p className="text-base text-slate-500 font-light leading-relaxed max-w-xl">
                                            Acceda a proyectos como la Selva Maya, el Macizo Trinacional Montecristo y corredores biológicos regionales.
                                        </p>
                                    </div>
                                    <div className="ml-auto opacity-20 group-hover:opacity-100 group-hover:translate-x-3 transition-all">
                                      <ArrowRight size={32} className="text-emerald-600" />
                                    </div>
                                </motion.div>
                            </section>

                            {/* Section 2: Herramientas del Eje */}
                            <section className="space-y-12">
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                  <h2 className="text-xs font-black text-blue-600 uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
                                    <div className="w-12 h-0.5 bg-blue-200" />
                                    Marco Operativo
                                  </h2>
                                  <h3 className="text-4xl font-serif font-black text-slate-800 tracking-tight">
                                      Herramientas de <span className="text-blue-600 italic">Gestión Forestal</span>
                                  </h3>
                                </motion.div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <ModuleCard
                                        icon={Activity}
                                        title="Análisis Geoespacial"
                                        description="Motor de análisis avanzado para la detección de cambios en la cobertura boscosa (2000-2024)."
                                        path="/technical/geo-analysis"
                                        colorClass="bg-emerald-600 shadow-xl shadow-emerald-600/30"
                                        delay={0.1}
                                    />
                                    <ModuleCard
                                        icon={LayoutDashboard}
                                        title="Tablero ERAM KPIs"
                                        description="Seguimiento dinámico en tiempo real de metas regionales, metas AFOLU y resiliencia climática."
                                        path="/technical/dashboard"
                                        colorClass="bg-blue-600 shadow-xl shadow-blue-600/30"
                                        delay={0.2}
                                    />
                                </div>
                            </section>
                        </div>

                        {/* Sidebar / Questions Column */}
                        <div className="lg:col-span-2 space-y-12">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <Card className="p-12 bg-slate-900 text-white rounded-[4rem] border-0 shadow-[0_50px_100px_rgba(0,0,0,0.2)] relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-1000"></div>

                                    <div className="relative z-10 space-y-10">
                                        <div>
                                          <Badge className="bg-emerald-500 text-white border-none py-1.5 px-4 mb-6 text-[10px] font-black tracking-widest uppercase">Inteligencia</Badge>
                                          <h3 className="text-4xl font-serif font-black leading-tight">
                                              Preguntas <br /> <span className="text-emerald-400 italic">Críticas</span>
                                          </h3>
                                        </div>

                                        <div className="space-y-5">
                                            {[
                                                { q: "¿Cuál es el estado de los bosques en la región?", path: "/preguntas/estado-bosques" },
                                                { q: "¿Cuánta cobertura boscosa hemos perdido?", path: "/preguntas/perdida-bosque" },
                                                { q: "¿Cómo van las metas de conservación 30x30?", path: "/preguntas/meta-30x30" },
                                                { q: "¿Cuántos incendios están activos?", path: "/preguntas/incendios-activos" }
                                            ].map((item, i) => (
                                                <div
                                                    key={i}
                                                    onClick={() => navigate(item.path)}
                                                    className="group flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-emerald-600 hover:border-emerald-400 transition-all duration-500 cursor-pointer"
                                                >
                                                    <p className="text-base font-bold text-white/90 group-hover:text-white transition-colors flex-1 pr-4">{item.q}</p>
                                                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-emerald-600 transition-all duration-500">
                                                      <ArrowRight size={18} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <Button
                                            className="w-full h-16 bg-white text-slate-900 hover:bg-emerald-500 hover:text-white rounded-[2rem] font-black uppercase text-[11px] tracking-widest transition-all duration-500 shadow-2xl"
                                            onClick={() => navigate('/strategic-questions')}
                                        >
                                            Ver Todas las Preguntas
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>

                            {/* Resource Library */}
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                <Card className="p-12 bg-white/50 backdrop-blur-xl rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 space-y-10 group">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 flex items-center gap-3">
                                        <div className="p-2.5 bg-slate-900 rounded-xl">
                                          <BookOpen size={16} className="text-emerald-400" />
                                        </div>
                                        Repositorio Estratégico
                                    </h4>
                                    <div className="space-y-6">
                                        <div className="p-6 bg-white rounded-3xl border border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5 transition-all cursor-pointer flex items-center gap-6 group/item">
                                            <div className="w-14 h-14 bg-slate-50 rounded-2xl group-hover/item:bg-emerald-50 flex items-center justify-center transition-colors">
                                              <FileText size={24} className="text-slate-400 group-hover/item:text-emerald-600" />
                                            </div>
                                            <div>
                                              <p className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1">FRA Final 2024</p>
                                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Documento Técnico .pdf</p>
                                            </div>
                                            <ArrowRight size={16} className="ml-auto opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-2 transition-all text-emerald-600" />
                                        </div>
                                        <div className="p-6 bg-white rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all cursor-pointer flex items-center gap-6 group/item">
                                            <div className="w-14 h-14 bg-slate-50 rounded-2xl group-hover/item:bg-blue-50 flex items-center justify-center transition-colors">
                                              <Box size={24} className="text-slate-400 group-hover/item:text-blue-600" />
                                            </div>
                                            <div>
                                              <p className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1">Capas Geoespaciales</p>
                                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Catálogo Metadatos</p>
                                            </div>
                                            <ArrowRight size={16} className="ml-auto opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-2 transition-all text-blue-600" />
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer Divider / Context */}
            <div className="max-w-7xl mx-auto px-8 pb-24 relative z-10">
                <div className="border-t border-slate-200/50 pt-16 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-4">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">
                          Observatorio Ambiental Regional (OAR) • SICA • CCAD
                      </p>
                  </div>
                  <div className="flex gap-10 opacity-70">
                    <span className="text-[10px] font-black uppercase tracking-widest hover:text-emerald-600 cursor-pointer transition-colors">Estructura ERAM</span>
                    <span className="text-[10px] font-black uppercase tracking-widest hover:text-emerald-600 cursor-pointer transition-colors">Alianza AFOLU</span>
                  </div>
                </div>
            </div>
        </div>
    );
};
