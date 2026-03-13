import React, { useState } from 'react';
import { Button, Card, Badge } from '../../components/ui/Shared';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Globe, Trees, Users, ChevronRight, BarChart3, Map, FileText, ExternalLink, HelpCircle, Flame, CloudRain, Wind, Waves, Droplets, Shield, Activity, ShieldAlert, Layers, Briefcase, Database, PieChart as PieIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { MapViewer } from '../../components/map/MapViewer';

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
                    <h1 className="text-5xl md:text-7xl font-serif font-black leading-tight drop-shadow-xl">
                        Decisiones basadas en <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">Evidencia Ambiental</span>
                    </h1>
                </div>
            </section>


            {/* Quick Access - Strategic Questions */}
            <section className="relative z-40 -mt-16 container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {homeQuestions.map((q) => (
                        <Card 
                            key={q.id} 
                            className="p-6 bg-white/95 backdrop-blur shadow-xl border-t-4 hover:-translate-y-1 transition-transform cursor-pointer group" 
                            style={{ borderTopColor: q.color }}
                            onClick={() => navigate(q.path)}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 rounded-full" style={{ backgroundColor: `${q.color}15` }}>
                                    <q.icon className="h-6 w-6" style={{ color: q.color }} />
                                </div>
                                <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-slate-500 transition-colors" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight">{q.question}</h3>
                            <p className="text-sm text-slate-600">
                                {q.highlight.split(/(<span.*?>.*?<\/span>)/g).map((part, i) => {
                                    // Note: In the data I didn't add span tags, but for aesthetics I can just map the highlight
                                    return <span key={i} dangerouslySetInnerHTML={{ __html: part }} />;
                                })}
                            </p>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <Button variant="outline" className="bg-white/80 backdrop-blur border-emerald-300 hover:bg-white text-emerald-800 shadow-sm" onClick={() => navigate('/strategic-questions')}>
                        Ver todas las Preguntas Estratégicas
                    </Button>
                </div>
            </section>

            {/* --- SECCIÓN AÑADIDA: Análisis Multidimensional --- */}
            <section className="py-24 bg-slate-950 text-white overflow-hidden relative">
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-1/4 h-3/4 bg-emerald-600/10 blur-[100px] rounded-full"></div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-500/20">
                                <Database className="h-3.5 w-3.5" /> Intelligence Center
                            </div>
                            <h2 className="text-4xl md:text-6xl font-serif font-black leading-tight">
                                Análisis <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 italic">Multidimensional</span>
                            </h2>
                            <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-xl">
                                Explore nuestras bases de datos mediante cruces dinámicos de variables. Compare métricas regionales, tipos de bosque y coberturas en una interfaz sandbox con más de 10 tipos de visualización.
                            </p>
                            <div className="flex flex-wrap gap-6 pt-4">
                                <Button 
                                    className="bg-white text-slate-950 hover:bg-blue-50 rounded-full px-10 py-7 h-auto font-black text-base shadow-xl shadow-white/5 transition-all hover:scale-105 active:scale-95"
                                    onClick={() => navigate('/analisis-multidimensional')}
                                >
                                    Iniciar Sandbox <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                                <div className="flex items-center gap-4 text-slate-500 border-l border-white/10 pl-6">
                                    <div className="flex -space-x-2">
                                        {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-[8px] font-bold">CSV</div>)}
                                    </div>
                                    <span className="text-xs font-medium">Bases de datos oficiales</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 relative w-full lg:w-auto h-[400px] md:h-[500px] animate-in fade-in zoom-in duration-1000">
                            {/* Abstract Visualization Representation */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative w-full max-w-md aspect-square">
                                    {/* Circles representing data nodes */}
                                    <div className="absolute top-0 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
                                    <div className="absolute bottom-10 left-0 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
                                    
                                    {/* Floating Cards */}
                                    <div className="absolute top-10 left-0 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl rotate-[-6deg] hover:rotate-0 transition-transform duration-500">
                                        <div className="flex gap-2 mb-3">
                                            <div className="w-3 h-3 rounded-full bg-red-400/50"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-400/50"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-400/50"></div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="w-32 h-2 bg-white/20 rounded"></div>
                                            <div className="w-20 h-2 bg-white/10 rounded"></div>
                                            <div className="h-20 w-40 flex items-end gap-1 pt-4">
                                                <div className="flex-1 bg-blue-500/60 rounded-t h-full"></div>
                                                <div className="flex-1 bg-blue-500/40 rounded-t h-[60%]"></div>
                                                <div className="flex-1 bg-blue-500/80 rounded-t h-[85%]"></div>
                                                <div className="flex-1 bg-blue-500/30 rounded-t h-[40%]"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-10 right-0 p-6 bg-slate-900/80 backdrop-blur-md rounded-3xl border border-white/5 shadow-2xl rotate-[3deg] hover:rotate-0 transition-transform duration-500 z-10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                                <PieIcon className="h-5 w-5 text-emerald-400" />
                                            </div>
                                            <div>
                                                <div className="w-24 h-2 bg-white/30 rounded mb-1"></div>
                                                <div className="w-16 h-1.5 bg-white/10 rounded"></div>
                                            </div>
                                        </div>
                                        <div className="w-32 h-32 rounded-full border-8 border-emerald-500/20 border-t-emerald-500/80 animate-[spin_10s_linear_infinite]"></div>
                                    </div>
                                    
                                    {/* Central Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-3xl shadow-2xl flex items-center justify-center rotate-45 animate-bounce">
                                            <Database className="-rotate-45 h-10 w-10 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Explorar por ejes ERAM */}
            <section className="py-24 container mx-auto px-4">
                <div className="bg-slate-50/50 rounded-[3rem] p-8 md:p-16 border border-slate-100">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-6">
                                <Globe className="h-3 w-3" /> Marco Estratégico
                            </div>
                            <h2 className="text-3xl md:text-5xl font-serif font-black text-slate-900 leading-tight mb-6">
                                Explorar por <span className="text-emerald-600">ejes ERAM</span>
                            </h2>
                            <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed">
                                Seleccione un eje estratégico para acceder a sus tableros, mapas y reportes especializados orientados a la resiliencia regional.
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            className="rounded-full px-8 border-emerald-300 text-emerald-700 hover:bg-white"
                            onClick={() => navigate('/strategic-questions')}
                        >
                            Ver todos los ejes
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                title: "Calidad Ambiental",
                                description: "Calidad de aire/agua, presión antrópica y variables de seguimiento ambiental.",
                                icon: Wind,
                                color: "text-blue-500",
                                bgColor: "bg-blue-50",
                                route: "/strategic-axis/calidad"
                            },
                            {
                                title: "Mares y Biodiversidad",
                                description: "Biodiversidad, ecosistemas marino-costeros y conectividad ecológica.",
                                icon: Waves,
                                color: "text-cyan-500",
                                bgColor: "bg-cyan-50",
                                route: "/strategic-axis/mares"
                            },
                            {
                                title: "Gestión Integral del Recurso Hídrico",
                                description: "Cuencas, disponibilidad hídrica, presión y riesgos asociados al agua.",
                                icon: Droplets,
                                color: "text-blue-600",
                                bgColor: "bg-blue-50",
                                route: "/strategic-axis/agua"
                            },
                            {
                                title: "Bosques y Paisajes Sostenibles",
                                description: "Deforestación, restauración, incendios y gestión sostenible del paisaje.",
                                icon: Trees,
                                color: "text-emerald-600",
                                bgColor: "bg-emerald-50",
                                route: "/strategic-axis/bosques"
                            },
                            {
                                title: "Cambio Climático y Gestión Integral del Riesgo",
                                description: "Amenazas, vulnerabilidad, escenarios climáticos y alertas tempranas.",
                                icon: CloudRain,
                                color: "text-purple-600",
                                bgColor: "bg-purple-50",
                                route: "/strategic-axis/clima"
                            }
                        ].map((axis, index) => (
                            <div
                                key={index}
                                className="group flex items-center justify-between p-4 md:p-6 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500/30 hover:shadow-md transition-all cursor-pointer"
                                onClick={() => navigate(axis.route)}
                            >
                                <div className="flex items-center gap-6">
                                    <div className={cn("hidden md:flex p-4 rounded-full border border-slate-100", axis.bgColor)}>
                                        <axis.icon className={cn("h-7 w-7", axis.color)} />
                                    </div>
                                    <div className="md:hidden p-2 rounded-full border border-slate-100">
                                        <axis.icon className={cn("h-5 w-5", axis.color)} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-lg md:text-xl group-hover:text-emerald-600 transition-colors">
                                            {axis.title}
                                        </h4>
                                        <p className="text-slate-500 text-sm md:text-base">
                                            {axis.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0 ml-4">
                                    <span className="hidden md:inline font-medium text-sm">Explorar</span>
                                    <ArrowRight className="h-5 w-5" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Los Grandes Bosques de la Región */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-4 text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-6">
                        <Trees className="h-3 w-3" /> Iniciativa Regional
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif font-black text-slate-900 leading-tight mb-6">
                        Los Grandes Bosques de <br /><span className="text-emerald-600">Centroamérica y República Dominicana</span>
                    </h2>
                    <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto">
                        Explore la riqueza natural y el estado de conservación de los macizos forestales más emblemáticos de nuestra región.
                    </p>
                </div>

                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: "Montañas Mayas", country: "Belice", img: "/forests/belize.png", slug: "montanas-mayas" },
                            { name: "Biosfera Maya", country: "Guatemala", img: "/forests/guatemala.png", slug: "reserva-de-la-biosfera-maya" },
                            { name: "El Imposible", country: "El Salvador", img: "/forests/el_salvador.png", slug: "parque-nacional-el-imposible" },
                            { name: "Río Plátano", country: "Honduras", img: "/forests/honduras.png", slug: "reserva-de-la-biosfera-del-rio-platano" },
                            { name: "Bosawás", country: "Nicaragua", img: "/forests/nicaragua.png", slug: "reserva-de-la-biosfera-bosawas" },
                            { name: "Corcovado", country: "Costa Rica", img: "/forests/costa_rica.png", slug: "parque-nacional-corcovado" },
                            { name: "Darién", country: "Panamá", img: "/forests/panama.png", slug: "parque-nacional-darien" },
                            { name: "Valle Nuevo", country: "Rep. Dominicana", img: "/forests/dominican_republic.png", slug: "valle-nuevo-los-haitises" }
                        ].map((forest, idx) => (
                            <div
                                key={idx}
                                className="group relative aspect-video sm:aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
                                onClick={() => navigate(`/grandes-bosques/historias/${forest.slug}`)}
                            >
                                <img
                                    src={forest.img}
                                    alt={forest.name}
                                    className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-200 text-[10px] font-black uppercase tracking-widest">
                                        {forest.country}
                                    </span>
                                </div>

                                <div className="absolute bottom-6 left-6 right-6 translate-y-2 group-hover:translate-y-0 transition-transform text-left">
                                    <h4 className="text-xl font-bold text-white mb-2 leading-tight">{forest.name}</h4>
                                    <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                        Ver Historia <ArrowRight className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Button
                            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-10 py-6 font-bold"
                            onClick={() => navigate('/grandes-bosques')}
                        >
                            Explorar catálogo completo <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Laboratorio de Análisis Geoespacial - Home Preview */}
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
                                <div className="animate-in fade-in slide-in-from-left-4 duration-500">
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
                                <div className="animate-in fade-in slide-in-from-left-4 duration-500">
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
                                <div className="animate-in fade-in slide-in-from-left-4 duration-500">
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

            {/* Integration with CCAD Web */}
            <section className="py-12 bg-white border-t border-slate-100">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <div className="bg-slate-100 p-3 rounded-lg">
                            <ExternalLink className="h-6 w-6 text-slate-500" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900">Parte del Ecosistema CCAD</h4>
                            <p className="text-sm text-slate-500">Este observatorio se integra con el portal institucional oficial.</p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => window.open('https://www.sica.int/ccad', '_blank')}>
                        Ir al sitio web de CCAD
                    </Button>
                </div>
            </section>
        </div>
    );
};
