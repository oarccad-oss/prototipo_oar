import React, { useState } from 'react';
import { Button, Card, Badge } from '../../components/ui/Shared';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Globe, Trees, Users, ChevronRight, BarChart3, Map, FileText, ExternalLink, HelpCircle, Flame, CloudRain, Wind, Waves, Droplets, Shield, Activity, ShieldAlert, Layers, Briefcase, Database, PieChart as PieIcon, LayoutDashboard } from 'lucide-react';
import { getEramAxes } from '../../lib/eram';
import { cn } from '../../lib/utils';
import { MapViewer } from '../../components/map/MapViewer';

import { QUESTIONS_DATA } from '../questions/questions';
import CIFRAS_DATA from '../../data/cifras/cifras.json';

export const Home = () => {
    const navigate = useNavigate();
    const [activeRole, setActiveRole] = useState('decision'); // 'decision', 'tech', 'citizen'
    const [isActiveMap, setIsActiveMap] = useState(false);

    // Filter questions for the home page cards
    const homeQuestions = QUESTIONS_DATA.filter(q =>
        ['forest-loss', 'active-fires', 'drought-risk', 'conservation-30x30', 'water-security', 'ocean-health'].includes(q.id)
    );

    // Get 6 random figures from the data
    const randomCifras = React.useMemo(() => {
        return [...CIFRAS_DATA]
            .sort(() => 0.5 - Math.random())
            .slice(0, 6);
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section - Decision Oriented */}
            <section className="relative min-h-[900px] flex items-start justify-center text-white overflow-hidden pb-24">
                {/* Background video simulation */}
                <div className="absolute inset-0 bg-blue-900/40 z-10 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516214104703-d870798883c5')] bg-cover bg-center"></div>

                <div className="relative z-30 container mx-auto px-4 text-center space-y-12 pt-24">
                    <span className="inline-block px-8 py-3 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-300 text-2xl md:text-4xl font-black tracking-widest uppercase">
                        Observatorio Ambiental Regional (OAR)
                    </span>

                    {/* --- SECCIÓN 1: Preguntas Estratégicas (Punto de entrada) --- */}
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white shadow-2xl text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-100">
                                <HelpCircle className="h-3.5 w-3.5" /> Respuestas a Desafíos Regionales
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                            {homeQuestions.map((q) => (
                                <Card
                                    key={q.id}
                                    className="flex flex-col h-full hover:shadow-2xl transition-all duration-500 border-t-4 group cursor-pointer bg-white/85 backdrop-blur-xl border-white/20 rounded-xl overflow-hidden shadow-md hover:-translate-y-2"
                                    style={{ borderTopColor: q.color }}
                                    onClick={() => navigate(q.path)}
                                >
                                    <div className="p-6 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-2.5 rounded-full transition-colors group-hover:bg-opacity-30" style={{ backgroundColor: `${q.color}15` }}>
                                                <q.icon className="h-5 w-5" style={{ color: q.color }} />
                                            </div>
                                            <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-slate-400 group-hover:translate-x-1 transition-all" />
                                        </div>

                                        <h3 className="text-lg font-bold text-slate-900 mb-3 leading-tight group-hover:text-brand-primary transition-colors">
                                            {q.shortQuestion || q.question}
                                        </h3>

                                        {q.highlight && (
                                            <div
                                                className="text-[13px] text-slate-500 leading-snug"
                                                dangerouslySetInnerHTML={{ __html: q.highlight }}
                                            />
                                        )}
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <Button
                                variant="outline"
                                className="rounded-full px-8 py-6 border-white/20 text-white hover:bg-white/10 font-bold backdrop-blur-md"
                                onClick={() => navigate('/strategic-questions')}
                            >
                                Ver todas las preguntas estratégicas <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECCIÓN 2: Cifras de Impacto (Indicadores Clave) --- */}
            <section className="py-20 bg-slate-50/50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-2xl font-serif font-black text-slate-900 mb-2">Cifras Regionales</h2>
                            <p className="text-slate-500">Indicadores clave extraídos de bases de datos satelitales y reportes oficiales.</p>
                        </div>
                        <Activity className="h-8 w-8 text-emerald-500 opacity-20" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {randomCifras.map((item, idx) => {
                            const axisColors = {
                                'Bosques': '#97BD3D',
                                'Biodiversidad': '#10B981',
                                'Agua': '#3B82F6',
                                'Mares': '#06B6D4',
                                'Clima': '#8B5CF6',
                                'Calidad Ambiental': '#475569',
                                'Incendios': '#EF4444'
                            };
                            const color = axisColors[item.eje_tematico] || '#10B981';

                            return (
                                <Card key={idx} className="bg-white border-t-4 rounded-none shadow-sm p-8" style={{ borderTopColor: color }}>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-6">
                                        {item.titulo}
                                    </span>
                                    <div className="flex items-baseline gap-2 mb-4">
                                        <span className="text-4xl font-black text-slate-900 tracking-tight">
                                            {item.valor}
                                        </span>
                                        <span className="text-lg font-bold text-slate-400">
                                            {item.unidad_medida}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                        {item.bajada}
                                    </p>
                                    <div className="mt-8 pt-4 border-t border-slate-50 flex items-center justify-between">
                                        <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{item.fuente}</span>
                                        <div className="px-2 py-0.5 rounded bg-slate-50 text-[9px] font-bold text-slate-400 border border-slate-100 uppercase italic">
                                            {item.eje_tematico}
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>

                    <div className="mt-16 flex justify-center">
                        <Button
                            className="bg-slate-900 text-white hover:bg-slate-800 rounded-full px-12 py-7 h-auto font-black text-lg shadow-2xl shadow-slate-900/20 transform hover:scale-105 active:scale-95 transition-all group"
                            onClick={() => navigate('/data/cifras')}
                        >
                            <span className="flex items-center gap-3">
                                <Activity className="h-5 w-5 text-emerald-400" />
                                Ir al Centro de Cifras
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                            </span>
                        </Button>
                    </div>
                </div>
            </section>

            {/* --- SECCIÓN SIME: Sistema Integrado de Seguimiento Ambiental --- */}
            <section className="py-24 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-[length:24px_24px]"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-6 py-2 rounded-full bg-slate-800 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                            SISTEMA INTEGRADO DE SEGUIMIENTO DE INDICADORES AMBIENTALES
                        </div>
                        <h2 className="text-3xl md:text-5xl font-serif font-black text-white leading-tight mb-6">
                            Monitoreo de Impacto y <span className="text-emerald-400">Cumplimiento</span>
                        </h2>
                        <p className="text-slate-400 text-lg font-light leading-relaxed max-w-3xl mx-auto">
                            Seguimiento en tiempo real de los compromisos internacionales (Convenciones) y la ejecución técnica de la Estrategia Regional Ambiental (ERAM).
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Card Estratégico */}
                        <div
                            className="bg-slate-800/50 border border-slate-700 p-8 rounded-[2rem] hover:bg-slate-800 transition-all border-t-4 border-t-blue-500 group cursor-pointer"
                            onClick={() => navigate('/monitoring?level=estrategico')}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                    <Globe className="w-8 h-8" />
                                </div>
                                <span className="bg-blue-500/10 text-blue-400 border-none px-3 py-1 rounded-full uppercase text-[9px] font-black tracking-widest">
                                    Indicadores Estratégicos
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors italic font-serif">Meta Global: Convenciones de Río</h3>
                            <p className="text-slate-400 font-light leading-relaxed mb-6">
                                Monitoreo de sinergias entre las agendas de Biodiversidad, Cambio Climático y Neutralidad de Degradación de la Tierra.
                            </p>
                            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm uppercase tracking-widest">
                                Explorar Nivel Estratégico <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </div>
                        </div>

                        {/* Card Operativo */}
                        <div
                            className="bg-slate-800/50 border border-slate-700 p-8 rounded-[2rem] hover:bg-slate-800 transition-all border-t-4 border-t-emerald-500 group cursor-pointer"
                            onClick={() => navigate('/monitoring?level=operativo')}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                    <LayoutDashboard className="w-8 h-8" />
                                </div>
                                <span className="bg-emerald-500/10 text-emerald-400 border-none px-3 py-1 rounded-full uppercase text-[9px] font-black tracking-widest">
                                    Indicadores Operativos
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors italic font-serif">Seguimiento ERAM 2025</h3>
                            <p className="text-slate-400 font-light leading-relaxed mb-6">
                                Auditoría técnica de la ejecución de metas nacionales, gestión institucional y avance físico en el territorio.
                            </p>
                            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-widest">
                                Explorar Indicadores ERAM <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>




            {/* --- SECCIÓN 3: Ejes Estratégicos ERAM (Explorar por ejes) --- */}
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
                        {getEramAxes().map((axis) => (
                            <Card
                                key={axis.id}
                                className={cn(
                                    "p-6 bg-white shadow-xl border-t-4 hover:shadow-2xl hover:scale-105 transition-all cursor-pointer group relative overflow-hidden",
                                    axis.id === 'bosques' ? "ring-2 ring-emerald-500/20" : "opacity-90"
                                )}
                                style={{ borderTopColor: axis.color }}
                                onClick={() => navigate(axis.ruta)}
                            >
                                {axis.id !== 'bosques' && (
                                    <div className="absolute top-2 right-2">
                                        <span className="text-[7px] font-black uppercase tracking-tighter text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">Próximamente</span>
                                    </div>
                                )}
                                <div className="flex flex-col items-center text-center space-y-4">
                                    <div className="p-4 rounded-2xl group-hover:scale-110 transition-transform" style={{ backgroundColor: `${axis.color}10` }}>
                                        <axis.iconComponent className="h-8 w-8" style={{ color: axis.color }} />
                                    </div>
                                    <h3 className="text-sm font-black text-slate-800 leading-tight uppercase tracking-wider">{axis.text}</h3>
                                    <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 group-hover:text-emerald-600 transition-colors uppercase">
                                        Ver Hub <ArrowRight size={10} />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>





            {/* Reportes Temáticos - Premium Edition */}
            <section className="py-24 bg-gradient-to-b from-white to-slate-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <div className="max-w-4xl text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-black uppercase tracking-[0.2em] mb-6 border border-emerald-100/50">
                                <FileText className="h-3.5 w-3.5" /> Conocimiento Estratégico
                            </div>
                            <h2 className="text-3xl md:text-5xl font-serif font-black text-slate-900 leading-[1.1] mb-6">
                                Reportes <span className="text-emerald-600 block md:inline italic">Temáticos de Estado</span>
                            </h2>
                            <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed max-w-3xl">
                                Análisis científicos exhaustivos que transforman datos complejos en narrativas procesables para la resiliencia regional.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Report 1: Forest - ACTIVE & PREMIUM */}
                        <div
                            className="group relative flex flex-col h-full bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-700 cursor-pointer overflow-hidden border-b-8 border-b-emerald-500"
                            onClick={() => navigate('/technical/reports/fra-2024')}
                        >
                            <div className="h-64 relative overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200"
                                    alt="Forest Report"
                                    className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent"></div>
                                <div className="absolute top-6 left-6">
                                    <Badge className="bg-emerald-500 text-white border-none px-4 py-1 shadow-lg shadow-emerald-500/30 text-[10px] uppercase font-black tracking-widest">
                                        Publicado 2024
                                    </Badge>
                                </div>
                            </div>

                            <div className="p-10 flex flex-col flex-1 relative bg-white">
                                <div className="bg-emerald-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 -mt-16 relative z-10 shadow-lg group-hover:bg-emerald-500 transition-colors duration-500">
                                    <Trees className="h-7 w-7 text-emerald-600 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors">Estado de los Bosques</h3>
                                <p className="text-slate-500 text-base leading-relaxed mb-10 flex-1 font-light">
                                    El análisis más robusto de la década sobre la salud forestal del SICA, integrando datos del FRA-2020/2025 y alertas satelitales en tiempo real.
                                </p>
                                <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-8 mt-auto">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); navigate('/technical/reports/fra-2024'); }}
                                        className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-all duration-300 group/btn"
                                    >
                                        <FileText className="h-5 w-5" />
                                        <span className="text-[10px] font-black uppercase tracking-tighter">Explorar Reporte</span>
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); navigate('/technical/dashboard'); }}
                                        className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition-all duration-300 group/btn"
                                    >
                                        <BarChart3 className="h-5 w-5 rotate-0 group-hover/btn:rotate-12 transition-transform" />
                                        <span className="text-[10px] font-black uppercase tracking-tighter">Explorar Dashboard</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Report 2: Biodiversity - COMING SOON */}
                        <div className="group flex flex-col h-full bg-slate-50/50 rounded-[2.5rem] border border-dashed border-slate-200 opacity-80 cursor-not-allowed overflow-hidden">
                            <div className="h-64 relative overflow-hidden grayscale opacity-40">
                                <img
                                    src="https://images.unsplash.com/photo-1452570053594-1b985d6ea890?auto=format&fit=crop&q=80&w=1200"
                                    alt="Bio Report"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-slate-200/20"></div>
                            </div>
                            <div className="p-10 flex flex-col flex-1">
                                <div className="bg-slate-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 -mt-16 relative z-10 shadow-sm">
                                    <Shield className="h-7 w-7 text-slate-400" />
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-slate-400 mb-4 tracking-tight">Estado de la Biodiversidad</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1 font-light italic">
                                    En desarrollo: Monitoreo regional de especies clave y efectividad de zonas protegidas 30x30.
                                </p>
                                <div className="grid grid-cols-2 gap-4 border-t border-slate-100/50 pt-8 mt-auto opacity-40">
                                    <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-100 text-slate-400">
                                        <FileText className="h-5 w-5" />
                                        <span className="text-[10px] font-black uppercase tracking-tighter">Reporte</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-100 text-slate-400">
                                        <BarChart3 className="h-5 w-5" />
                                        <span className="text-[10px] font-black uppercase tracking-tighter">Dashboard</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Report 3: Oceans - COMING SOON */}
                        <div className="group flex flex-col h-full bg-slate-50/50 rounded-[2.5rem] border border-dashed border-slate-200 opacity-80 cursor-not-allowed overflow-hidden">
                            <div className="h-64 relative overflow-hidden grayscale opacity-40">
                                <img
                                    src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1200"
                                    alt="Ocean Report"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-10 flex flex-col flex-1">
                                <div className="bg-slate-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 -mt-16 relative z-10 shadow-sm">
                                    <Waves className="h-7 w-7 text-slate-400" />
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-slate-400 mb-4 tracking-tight">Estado de los Mares</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1 font-light italic">
                                    En desarrollo: Evaluación de la salud de arrecifes y estrés térmico en las costas del SICA.
                                </p>
                                <div className="grid grid-cols-2 gap-4 border-t border-slate-100/50 pt-8 mt-auto opacity-40">
                                    <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-100 text-slate-400">
                                        <FileText className="h-5 w-5" />
                                        <span className="text-[10px] font-black uppercase tracking-tighter">Reporte</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-100 text-slate-400">
                                        <BarChart3 className="h-5 w-5" />
                                        <span className="text-[10px] font-black uppercase tracking-tighter">Dashboard</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* INDICADORES */}

            {/* --- SECCIÓN 2: Intelligence & Analytics (Análisis Multidimensional) --- */}
            <section className="mt-32 py-24 bg-gradient-to-b from-white via-slate-50 to-slate-100 overflow-hidden relative border-t border-slate-100">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-primary/5 blur-[120px] rounded-full"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 space-y-8">
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

            {/* --- SECCIÓN 4: Laboratorio de Análisis Geoespacial --- */}
            <section className="py-24 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest mb-6">
                                <Activity className="h-3 w-3 animate-pulse" /> Laboratorio Inteligente
                            </div>
                            <h2 className="text-3xl md:text-5xl font-serif font-black text-slate-900 leading-tight mb-6">
                                Análisis Geoespacial <span className="text-blue-600">Avanzado</span>
                            </h2>
                            <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed">
                                Ejecute algoritmos complejos de cruce espacial en tiempo real. Integre capas oficiales para responder a desafíos territoriales críticos.
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            className="rounded-full px-8 py-6 h-auto border-slate-200 hover:bg-slate-900 hover:text-white transition-all group"
                            onClick={() => navigate('/technical/geo-analysis')}
                        >
                            Ver Todo el Laboratorio <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: "Restricciones",
                                icon: ShieldAlert,
                                description: "Validación legal de polígonos por áreas protegidas.",
                                color: "bg-red-500",
                                path: "/technical/geo-analysis/restrictions"
                            },
                            {
                                title: "Deforestación",
                                icon: Trees,
                                description: "Historial de pérdida de cobertura en tiempo real.",
                                color: "bg-emerald-600",
                                path: "/technical/geo-analysis/deforestation"
                            },
                            {
                                title: "Ecosistemas",
                                icon: Layers,
                                description: "Inventario de biodiversidad y vegetación.",
                                color: "bg-blue-600",
                                path: "/technical/geo-analysis/ecosystems"
                            },
                            {
                                title: "Proyectos",
                                icon: Briefcase,
                                description: "Cruce de cooperación regional activa.",
                                color: "bg-orange-500",
                                path: "/technical/geo-analysis/projects"
                            }
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                onClick={() => navigate(item.path)}
                                className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
                            >
                                <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                                    <item.icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-xl font-serif font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-slate-500 text-sm font-light leading-relaxed mb-4">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Visor de Mapas Regional */}
            <section className="py-24 bg-slate-900 text-white overflow-hidden">
                <div className="container mx-auto px-4 mb-20 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-black uppercase tracking-widest mb-6">
                        <Map className="h-3 w-3" /> Infraestructura de Datos
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif font-black mb-6">
                        Visor Geoespacial <span className="text-blue-400">Regional</span>
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto">
                        Acceda a capas de información crítica sobre biodiversidad, cobertura forestal y riesgos climáticos en una sola plataforma integrada.
                    </p>
                </div>

                <div className="container mx-auto px-4">
                    <div className="relative h-[600px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group/map">
                        <MapViewer hideControls={true} />

                        {!isActiveMap && (
                            <div
                                className="absolute inset-0 z-[1002] bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer group-hover/map:bg-slate-900/30 transition-all duration-500"
                                onClick={() => setIsActiveMap(true)}
                            >
                                <div className="text-center p-8 bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20 shadow-2xl transform transition-transform group-hover/map:scale-105">
                                    <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-600/40">
                                        <Map className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Visor Interactivo</h3>
                                    <p className="text-blue-100 text-sm mb-6">Haz clic para interactuar con el mapa</p>
                                    <Button size="sm" className="bg-white text-blue-900 hover:bg-blue-50">
                                        Activar Navegación
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Overlay with more info link */}
                        <div className="absolute bottom-8 right-8 z-[1001]">
                            <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white shadow-xl px-8"
                                onClick={() => navigate('/technical/maps')}
                            >
                                Abrir Centro de Mapas <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* CENTRO DE DOCUMENTACION */}

            {/**SIEMPRE FINAL */}
            {/* Audience Segmentation */}
            <section className="py-24 bg-slate-50 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-6">
                            <Users className="h-3 w-3" /> Adaptación de Usuario
                        </div>
                        <h2 className="text-3xl md:text-5xl font-serif font-black text-slate-900 leading-tight mb-6">Plataforma Adaptativa</h2>
                        <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed">
                            Hemos diseñado flujos de trabajo específicos para cada actor clave en la gestión ambiental regional, asegurando que cada datos llegue con el propósito correcto.
                        </p>
                    </div>

                    {/* Role Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {[
                            { id: 'decision', label: 'Dashboard', icon: Users },
                            { id: 'tech', label: 'Visor Interactivo', icon: BarChart3 },
                            { id: 'citizen', label: 'Historias', icon: Globe }
                        ].map((role) => (
                            <button
                                key={role.id}
                                onClick={() => setActiveRole(role.id)}
                                className={cn(
                                    "flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all text-sm md:text-base",
                                    activeRole === role.id
                                        ? "bg-emerald-600 text-white shadow-lg ring-2 ring-offset-2 ring-emerald-600"
                                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                                )}
                            >
                                <role.icon className="h-4 w-4" />
                                {role.label}
                            </button>
                        ))}
                    </div>

                    {/* Dynamic Content based on Role */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1 space-y-6">
                            {activeRole === 'decision' && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold text-slate-900">Tableros de Control Ejecutivo</h3>
                                    <p className="text-slate-600 text-lg leading-relaxed">
                                        Visualice el cumplimiento de metas regionales (ERAM, AFOLU) mediante semáforos de alerta temprana. Acceda a reportes sintetizados para cumbres ministeriales.
                                    </p>
                                    <ul className="space-y-3 pt-4">
                                        <li className="flex items-center gap-2 text-slate-700">
                                            <div className="h-2 w-2 rounded-full bg-emerald-500" /> Monitoreo de Metas 2030
                                        </li>
                                        <li className="flex items-center gap-2 text-slate-700">
                                            <div className="h-2 w-2 rounded-full bg-emerald-500" /> Resúmenes de Impacto Económico
                                        </li>
                                    </ul>
                                    <Button className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => navigate('/technical/dashboard')}>
                                        Ver Dashboard Ejecutivo
                                    </Button>
                                </div>
                            )}

                            {activeRole === 'tech' && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold text-slate-900">Datos Abiertos e Interoperabilidad</h3>
                                    <p className="text-slate-600 text-lg leading-relaxed">
                                        Acceda al catálogo de metadatos geográficos. Descargue capas Shapefile/GeoJSON y conecte sus sistemas mediante servicios WMS/WFS estandarizados.
                                    </p>
                                    <Button className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => navigate('/technical/map')}>
                                        Explorar Visor Avanzado
                                    </Button>
                                </div>
                            )}

                            {activeRole === 'citizen' && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold text-slate-900">Narrativas de Impacto</h3>
                                    <p className="text-slate-600 text-lg leading-relaxed">
                                        Conozca las historias detrás de los datos. Explore mapas interactivos simplificados sobre la iniciativa "Grandes Bosques" y el estado de la biodiversidad.
                                    </p>
                                    <Button className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => navigate('/grandes-bosques')}>
                                        Ver Historias
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className="order-1 md:order-2">
                            <div className="aspect-square md:aspect-[4/3] bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 relative group">
                                {/* Role based Mockup Image */}
                                <img
                                    src={
                                        activeRole === 'decision' ? "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000" :
                                            activeRole === 'tech' ? "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" :
                                                "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=1000"
                                    }
                                    alt="Platform Preview"
                                    className="object-cover w-full h-full transform transition-transform group-hover:scale-105 duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>




            {/* Footer Divider / Context */}
            <div className="max-w-7xl mx-auto px-8 pb-4 mt-6 mb-4">
                <div className="border-t border-slate-200 py-4 text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    Observatorio Ambiental Regional (OAR) • Estrategia Regional Ambiental de Centroamérica y República Dominicana
                </div>
            </div>
        </div>
    );
};

