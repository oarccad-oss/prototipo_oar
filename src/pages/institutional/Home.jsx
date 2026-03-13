import React, { useState } from 'react';
import { Button, Card, Badge } from '../../components/ui/Shared';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Globe, Trees, Users, ChevronRight, BarChart3, Map, FileText, ExternalLink, HelpCircle, Flame, CloudRain, Wind, Waves, Droplets, Shield, Activity, ShieldAlert, Layers, Briefcase, Database, PieChart as PieIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
// import { MapViewer } from '../../components/map/MapViewer';

import { QUESTIONS_DATA } from '../questions/questions';

export const Home = () => {
    const navigate = useNavigate();
    const [activeRole, setActiveRole] = useState('decision'); // 'decision', 'tech', 'citizen'
    const [isActiveMap, setIsActiveMap] = useState(false);

    // Filter questions for the home page cards
    const homeQuestions = QUESTIONS_DATA.filter(q =>
        ['forest-loss', 'active-fires', 'drought-risk', 'conservation-30x30', 'water-security', 'ocean-health'].includes(q.id)
    );

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section - Decision Oriented */}
            <section className="relative h-[650px] flex items-center justify-center text-white overflow-hidden">
                {/* Background video simulation */}
                <div className="absolute inset-0 bg-blue-900/40 z-10 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516214104703-d870798883c5')] bg-cover bg-center"></div>

                <div className="relative z-30 container mx-auto px-4 text-center space-y-8 pt-20">
                    <span className="inline-block px-6 py-2 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-300 text-lg md:text-xl font-bold tracking-wider uppercase">
                        Observatorio Ambiental Regional (OAR)
                    </span>
                </div>
            </section>


            {/* --- SECCIÓN 1: Preguntas Estratégicas (Punto de entrada) --- */}
            <section className="relative z-40 -mt-16 container mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-xl text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-emerald-100">
                        <HelpCircle className="h-3.5 w-3.5" /> Respuestas a Desafíos Regionales
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {homeQuestions.map((q) => (
                        <Card 
                            key={q.id} 
                            className="flex flex-col h-full hover:shadow-xl transition-all duration-300 border-l-4 group cursor-pointer bg-white" 
                            style={{ borderLeftColor: q.color }} 
                            onClick={() => navigate(q.path)}
                        >
                            <div className="p-8 pb-4">
                                <div className="p-3 rounded-full w-fit mb-4 transition-colors group-hover:bg-opacity-20" style={{ backgroundColor: `${q.color}20` }}>
                                    <q.icon className="h-8 w-8" style={{ color: q.color }} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight group-hover:text-brand-primary transition-colors">
                                    {q.question}
                                </h3>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    {q.description}
                                </p>
                            </div>
                            <div className="mt-auto px-8 py-4 border-t border-slate-50 flex justify-end">
                                <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1" style={{ color: q.color }}>
                                    Ver Análisis <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Button 
                        variant="outline" 
                        className="rounded-full px-8 py-6 border-emerald-200 text-emerald-700 hover:bg-emerald-50 font-bold"
                        onClick={() => navigate('/strategic-questions')}
                    >
                        Ver todas las preguntas estratégicas <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </section>


            {/* --- SECCIÓN 2: Intelligence & Analytics (Análisis Multidimensional) --- */}
            <section className="mt-32 py-24 bg-gradient-to-b from-white via-slate-50 to-slate-100 overflow-hidden relative border-t border-slate-100">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-primary/5 blur-[120px] rounded-full"></div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-[0.2em] border border-brand-primary/20">
                                <Database className="h-3.5 w-3.5" /> Intelligence Center
                            </div>
                            <h2 className="text-4xl md:text-6xl font-serif font-black leading-tight text-slate-900">
                                Análisis <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-emerald-600">Multidimensional</span>
                            </h2>
                            <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed max-w-xl">
                                Explore nuestras bases de datos mediante cruces dinámicos de variables. Herramienta global disponible para todos los ejes estratégicos.
                            </p>
                            <div className="flex flex-wrap gap-6 pt-4">
                                <Button 
                                    className="bg-brand-primary text-white hover:bg-brand-primary/90 rounded-full px-10 py-7 h-auto font-black text-base shadow-xl shadow-brand-primary/20 transition-all hover:scale-105 active:scale-95"
                                    onClick={() => navigate('/analisis-multidimensional')}
                                >
                                    Iniciar Sandbox <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex-1 relative w-full lg:w-auto h-[400px] md:h-[500px]">
                             <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative w-full max-w-md aspect-square">
                                    <div className="absolute top-10 left-0 p-4 bg-white/60 backdrop-blur-xl rounded-2xl border border-white shadow-2xl rotate-[-6deg] hover:rotate-0 transition-transform duration-500 z-20">
                                        <div className="h-20 w-40 flex items-end gap-1 pt-4">
                                            <div className="flex-1 bg-brand-primary/60 rounded-t h-full animate-[pulse_3s_infinite]"></div>
                                            <div className="flex-1 bg-brand-primary/30 rounded-t h-[60%] animate-[pulse_4s_infinite]"></div>
                                            <div className="flex-1 bg-brand-primary/80 rounded-t h-[85%] animate-[pulse_2s_infinite]"></div>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-brand-primary/5 rounded-full blur-[100px]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECCIÓN 3: Ejes Estratégicos ERAM (Directorio final) --- */}
            <section className="py-24 bg-white border-t border-slate-100">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-widest mb-6">
                            <Globe className="h-3 w-3" /> Marco Estratégico
                        </div>
                        <h2 className="text-3xl md:text-5xl font-serif font-black text-slate-900 leading-tight mb-6">Explorar por <span className="text-emerald-600 font-serif">ejes ERAM</span></h2>
                        <p className="text-slate-500 text-lg font-light leading-relaxed">
                            Seleccione un eje temático para acceder a sus portales dedicados, bibliotecas y herramientas especializadas.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {[
                            { title: "Calidad Ambiental", icon: Wind, color: "#3b82f6", path: "/strategic-axis/calidad" },
                            { title: "Mares y Biodiversidad", icon: Waves, color: "#06b6d4", path: "/strategic-axis/mares" },
                            { title: "Recurso Hídrico", icon: Droplets, color: "#2563eb", path: "/strategic-axis/agua" },
                            { title: "Bosques y Paisajes", icon: Trees, color: "#059669", path: "/strategic-axis/bosques", active: true },
                            { title: "Cambio Climático", icon: CloudRain, color: "#9333ea", path: "/strategic-axis/clima" }
                        ].map((axis) => (
                            <Card 
                                key={axis.title} 
                                className={cn(
                                    "p-6 bg-white shadow-xl border-t-4 hover:shadow-2xl hover:scale-105 transition-all cursor-pointer group relative overflow-hidden",
                                    axis.active ? "ring-2 ring-emerald-500/20" : "opacity-90"
                                )} 
                                style={{ borderTopColor: axis.color }}
                                onClick={() => navigate(axis.path)}
                            >
                                {!axis.active && (
                                    <div className="absolute top-2 right-2">
                                        <span className="text-[7px] font-black uppercase tracking-tighter text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">Próximamente</span>
                                    </div>
                                )}
                                <div className="flex flex-col items-center text-center space-y-4">
                                    <div className="p-4 rounded-2xl group-hover:scale-110 transition-transform" style={{ backgroundColor: `${axis.color}10` }}>
                                        <axis.icon className="h-8 w-8" style={{ color: axis.color }} />
                                    </div>
                                    <h3 className="text-sm font-black text-slate-800 leading-tight uppercase tracking-wider">{axis.title}</h3>
                                    <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 group-hover:text-emerald-600 transition-colors uppercase">
                                        Ver Hub <ArrowRight size={10} />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            {/* Footer Divider / Context */}
            <div className="max-w-7xl mx-auto px-8 pb-16 mt-32">
                <div className="border-t border-slate-200 py-8 text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    Observatorio Ambiental Regional (OAR) • Estrategia Regional Ambiental de Centroamérica y República Dominicana
                </div>
            </div>
        </div>
    );
};
