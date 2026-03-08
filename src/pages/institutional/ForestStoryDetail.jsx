import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
    ArrowLeft, 
    Share2, 
    FileText, 
    Clock, 
    Calendar, 
    Map as MapIcon, 
    BarChart3, 
    Info, 
    BookOpen, 
    MessageSquare,
    ChevronRight,
    Search,
    Download
} from 'lucide-react';
import { Button } from '../../components/ui/Shared';
import { cn } from '../../lib/utils';

export const ForestStoryDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [activeStory, setActiveStory] = useState(null);

    // Mock data based on the regions from GrandesBosques
    const stories = [
        { name: "Montañas Mayas", country: "Belice", type: "country" },
        { name: "Selva Maya", type: "bridge" },
        { name: "Reserva de la Biosfera Maya", country: "Guatemala", type: "country" },
        { name: "Parque Nacional El Imposible", country: "El Salvador", type: "country" },
        { name: "Reserva de la Biosfera del Río Plátano", country: "Honduras", type: "country" },
        { name: "Trinacional Trifinio (Montecristo)", type: "bridge" },
        { name: "Manglares del Golfo de Fonseca", type: "bridge" },
        { name: "Reserva de la Biosfera Bosawás", country: "Nicaragua", type: "country" },
        { name: "La Moskitia", type: "bridge" },
        { name: "Indio Maíz - Tortuguero", type: "bridge" },
        { name: "Parque Nacional Corcovado", country: "Costa Rica", type: "country" },
        { name: "La Amistad (Talamanca)", type: "bridge" },
        { name: "Parque Nacional Darién", country: "Panamá", type: "country" },
        { name: "Valle Nuevo / Los Haitises", country: "República Dominicana", type: "country" },
    ].map(s => ({
        ...s,
        slug: s.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    }));

    useEffect(() => {
        const found = stories.find(s => s.slug === slug);
        if (found) {
            setActiveStory(found);
        } else {
            setActiveStory(stories[0]);
        }
        window.scrollTo(0, 0);
    }, [slug]);

    if (!activeStory) return null;

    return (
        <div className="flex h-[calc(100vh-64px)] bg-white overflow-hidden">
            {/* Sidebar Navigation */}
            <aside className="w-80 border-r border-slate-100 flex flex-col bg-slate-50/50 shrink-0 hidden lg:flex">
                <div className="p-6 border-b border-slate-100">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Buscar historia..." 
                            className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-1">
                    <h3 className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Historias de los Grandes Bosques</h3>
                    {stories.map((s) => (
                        <button
                            key={s.slug}
                            onClick={() => navigate(`/grandes-bosques/historias/${s.slug}`)}
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-left group",
                                s.slug === slug 
                                    ? "bg-emerald-50 text-emerald-700 shadow-sm" 
                                    : "text-slate-600 hover:bg-white hover:text-emerald-600"
                            )}
                        >
                            <div className={cn(
                                "shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                                s.slug === slug ? "bg-emerald-500 text-white" : "bg-white border border-slate-200 text-slate-400 group-hover:border-emerald-200 group-hover:text-emerald-500"
                            )}>
                                {s.type === 'bridge' ? <Share2 className="h-4 w-4" /> : <MapIcon className="h-4 w-4" />}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold truncate leading-none mb-1">{s.name}</p>
                                <p className="text-[10px] opacity-70 truncate uppercase tracking-tighter">
                                    {s.type === 'bridge' ? 'Internacional' : s.country}
                                </p>
                            </div>
                            {s.slug === slug && <ChevronRight className="h-4 w-4 ml-auto" />}
                        </button>
                    ))}
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto relative bg-slate-50/20">
                {/* Mobile Header Nav removed since Layout has Navbar */}

                <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12 space-y-12">
                    {/* Header Section */}
                    <div className="space-y-6">
                        <div className="flex flex-wrap items-center gap-4">
                            <Link to="/stories" className="text-emerald-600 hover:text-emerald-700 text-sm font-bold flex items-center gap-1 group">
                                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Volver a Historias
                            </Link>
                        </div>
                        
                        <div className="space-y-4">
                            <h1 className="text-4xl lg:text-5xl font-serif font-black text-slate-900 leading-tight">
                                {activeStory.name}: {activeStory.type === 'bridge' ? 'Conectividad sin Fronteras' : 'El Corazón de ' + activeStory.country}
                            </h1>
                            <p className="text-xl text-slate-500 font-light leading-relaxed max-w-3xl">
                                Análisis profundo sobre la dinámica de cobertura vegetal, presiones antropogénicas y estrategias de conservación local en este macizo forestal.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-slate-100">
                            <div className="flex flex-wrap items-center gap-8 text-sm font-medium text-slate-500">
                                <div className="flex items-center gap-2">
                                    <BookOpen className="h-4 w-4 text-emerald-500" />
                                    <span>Tema ERAM: <span className="text-slate-900">Bosques</span></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapIcon className="h-4 w-4 text-emerald-500" />
                                    <span>Territorio: <span className="text-slate-900">{activeStory.type === 'bridge' ? 'Región SICA' : activeStory.country}</span></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-emerald-500" />
                                    <span>Marzo 2024</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-emerald-500" />
                                    <span>Lectura: 6 min</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button variant="outline" className="rounded-full px-6 flex items-center gap-2 border-slate-200">
                                    <Share2 className="h-4 w-4" /> Compartir
                                </Button>
                                <Button variant="outline" className="rounded-full px-6 flex items-center gap-2 border-slate-200">
                                    <Download className="h-4 w-4" /> Exportar PDF
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Essential Summary Card */}
                    <div className="bg-emerald-950 text-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700"></div>
                        <div className="relative z-10 space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/20 text-emerald-300 text-xs font-bold uppercase tracking-widest">
                                <Clock className="h-4 w-4" /> Lo esencial en 30 segundos
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                                <div className="space-y-3">
                                    <div className="w-10 h-1 bg-emerald-500 rounded-full"></div>
                                    <p className="text-lg leading-relaxed text-emerald-50">
                                        Hallazgo principal: Estabilidad en la cobertura boscosa central con ligero aumento en zonas de regeneración.
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <div className="w-10 h-1 bg-emerald-500 rounded-full"></div>
                                    <p className="text-lg leading-relaxed text-emerald-50">
                                        Tendencia clave: Incremento del 2% en la fragmentación de los bordes debido a actividades agrícolas menores.
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <div className="w-10 h-1 bg-emerald-500 rounded-full"></div>
                                    <p className="text-lg leading-relaxed text-emerald-50">
                                        Impacto regional: La conservación de este núcleo es vital para la recarga hídrica de 3 cuencas transfronterizas.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Mockup Section */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-serif font-bold text-slate-900">Mapa interactivo (simplificado)</h2>
                            <div className="flex gap-2">
                                <div className="px-3 py-1 rounded bg-slate-100 text-[10px] font-bold text-slate-500 uppercase">Capas AD</div>
                                <div className="px-3 py-1 rounded bg-slate-100 text-[10px] font-bold text-slate-500 uppercase">Leyenda</div>
                            </div>
                        </div>
                        <div className="aspect-video bg-slate-200 rounded-[2.5rem] relative overflow-hidden group shadow-inner border border-slate-100">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d')] bg-cover bg-center mix-blend-overlay opacity-30 group-hover:scale-105 transition-transform duration-[10s]"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 space-y-4">
                                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-emerald-600">
                                    <MapIcon className="h-8 w-8" />
                                </div>
                                <p className="text-sm font-bold tracking-widest uppercase">[ Embed del visor geográfico simplificado ]</p>
                                <p className="text-xs italic opacity-80 max-w-md text-center">Solo controles esenciales: Zoom, selección de año y tooltip informativo al pasar el cursor.</p>
                            </div>
                            {/* Layer labels mockup */}
                            <div className="absolute bottom-10 left-10 p-4 rounded-2xl bg-white/90 backdrop-blur shadow-lg border border-white space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                    <span className="text-[10px] font-bold text-slate-700">Cobertura Densa</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <span className="text-[10px] font-bold text-slate-700">Bosque Secundario</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Data Insights & Glossary Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="p-8 md:p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm space-y-8">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                                        <BarChart3 className="h-5 w-5" />
                                    </div>
                                    <h2 className="text-2xl font-serif font-bold text-slate-900">¿Qué dicen los datos?</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <p className="text-4xl font-serif font-black text-emerald-600">845,230 ha</p>
                                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Extensión Total</p>
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed italic">
                                            Esta cifra representa el 40% del área protegida designada en los últimos inventarios forestales de 2023.
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <p className="text-4xl font-serif font-black text-rose-500">-1.2%</p>
                                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Tasa de Cambio anual</p>
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed italic">
                                            Se observa una reducción marginal en comparación con el periodo 2010-2020, indicando efectividad en las políticas.
                                        </p>
                                    </div>
                                </div>
                                {/* Mini chart mockup */}
                                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 text-center">Tendencia de pérdida de bosque (2018-2024)</p>
                                    <div className="flex items-end justify-between gap-4 h-32 px-4 italic text-[10px] text-slate-300">
                                        <div className="flex-1 bg-emerald-500/10 h-[80%] rounded-t-lg relative group">
                                            <div className="absolute inset-x-0 bottom-0 bg-emerald-500 h-[70%] rounded-t-lg group-hover:h-[75%] transition-all"></div>
                                        </div>
                                        <div className="flex-1 bg-emerald-500/10 h-[80%] rounded-t-lg relative group">
                                            <div className="absolute inset-x-0 bottom-0 bg-emerald-500 h-[65%] rounded-t-lg group-hover:h-[70%] transition-all"></div>
                                        </div>
                                        <div className="flex-1 bg-emerald-500/10 h-[80%] rounded-t-lg relative group">
                                            <div className="absolute inset-x-0 bottom-0 bg-emerald-500 h-[68%] rounded-t-lg group-hover:h-[73%] transition-all"></div>
                                        </div>
                                        <div className="flex-1 bg-emerald-500/10 h-[80%] rounded-t-lg relative group">
                                            <div className="absolute inset-x-0 bottom-0 bg-emerald-500 h-[62%] rounded-t-lg group-hover:h-[67%] transition-all"></div>
                                        </div>
                                        <div className="flex-1 bg-emerald-500/10 h-[80%] rounded-t-lg relative group">
                                            <div className="absolute inset-x-0 bottom-0 bg-emerald-500 h-[58%] rounded-t-lg group-hover:h-[63%] transition-all"></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 px-4">
                                        <span>2018</span>
                                        <span>2020</span>
                                        <span>2022</span>
                                        <span>2024</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-orange-50 text-orange-600">
                                        <Info className="h-5 w-5" />
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900 leading-none">Glosario rápido</h2>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <p className="text-xs font-black text-slate-900 uppercase tracking-widest">Deforestación</p>
                                        <p className="text-sm text-slate-600 font-light leading-relaxed">Pérdida permanente de la cobertura de bosque por actividades humanas.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-xs font-black text-slate-900 uppercase tracking-widest">Bosque Secundario</p>
                                        <p className="text-sm text-slate-600 font-light leading-relaxed">Áreas en proceso de regeneración natural tras disturbios previos.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-xs font-black text-slate-900 uppercase tracking-widest">Resiliencia Climática</p>
                                        <p className="text-sm text-slate-600 font-light leading-relaxed">Capacidad del ecosistema para recuperar sus funciones tras un shock.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm space-y-6">
                                <div className="flex items-center gap-3 text-emerald-600">
                                    <MessageSquare className="h-5 w-5" />
                                    <h2 className="text-xl font-bold leading-none">Preguntas</h2>
                                </div>
                                <div className="space-y-3">
                                    <button className="w-full text-left p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50 transition-colors text-xs font-bold text-slate-700 flex items-center justify-between group">
                                        ¿Dónde hay incendios activos?
                                        <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-emerald-500" />
                                    </button>
                                    <button className="w-full text-left p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50 transition-colors text-xs font-bold text-slate-700 flex items-center justify-between group">
                                        ¿Cuánta biomasa se almacena?
                                        <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-emerald-500" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Section: Sources & Methodology */}
                    <div className="py-12 border-t border-slate-100 space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-slate-900">Fuentes y metodología</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-4 group cursor-pointer">
                                        <div className="shrink-0 p-2 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                            <FileText className="h-4 w-4" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors underline decoration-dotted underline-offset-4">Dataset Global Forest Watch 2024</p>
                                            <p className="text-xs text-slate-500">Datos satelitales procesados para la plataforma regional.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4 group cursor-pointer">
                                        <div className="shrink-0 p-2 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                            <FileText className="h-4 w-4" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors underline decoration-dotted underline-offset-4">Metodología de Inventario Dinámico CCAD</p>
                                            <p className="text-xs text-slate-500">Documentación técnica sobre validación de campo y precisión.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-emerald-50 rounded-3xl p-8 flex flex-col justify-center space-y-4 border border-emerald-100">
                                <p className="text-sm text-emerald-900 font-medium">¿Deseas profundizar más en los datos?</p>
                                <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-xl py-6 font-bold">
                                    Acceder al Dashboard Científico
                                </Button>
                                <p className="text-[10px] text-emerald-600/70 center text-center uppercase tracking-widest font-black">Open Data Initiative SICA</p>
                            </div>
                        </div>
                        <div className="text-center pt-12">
                            <p className="text-xs text-slate-400 font-medium">Wireframe — Story Detail (Versión de Implementación OAR V2)</p>
                        </div>
                    </div>
                </div>

                {/* AI Assistant Bubble */}
                <div className="fixed bottom-8 right-8 z-[60]">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <button className="relative px-6 py-3 bg-white hover:bg-emerald-50 rounded-full shadow-xl flex items-center gap-3 font-bold text-slate-800 transition-all border border-slate-100">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                                <MessageSquare className="h-4 w-4 text-emerald-600 shadow-sm" />
                            </div>
                            <span className="text-sm">Asistente IA</span>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};
