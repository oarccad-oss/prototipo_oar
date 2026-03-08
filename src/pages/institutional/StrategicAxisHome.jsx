import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    BookOpen, 
    HelpCircle, 
    LayoutDashboard, 
    Map, 
    Trees, 
    Info, 
    ArrowRight,
    Search,
    RefreshCw,
    FileText,
    Activity
} from 'lucide-react';
import { Button, Card } from '../../components/ui/Shared';

const SICA_FACTS = [
    "La región SICA cuenta con 18.1 millones de hectáreas de bosque, de las cuales el 45% se encuentran bajo protección oficial.",
    "Tres países de la región han logrado revertir la tendencia regional y ahora muestran una ganancia neta de cobertura boscosa en 2024.",
    "El stock total de carbono en los bosques de la región SICA alcanza las 3.2 Gigatoneladas, un pilar crítico para la resiliencia climática.",
    "La 'Selva Maya' es el bosque tropical más extenso de Mesoamérica, albergando una biodiversidad única en el mundo.",
    "El carbono orgánico del suelo representa más del 50% del total almacenado en nuestros ecosistemas forestales regionales."
];

const ModuleCard = ({ icon: Icon, title, description, path, colorClass, delay }) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={() => navigate(path)}
            className={`group relative p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden animate-in fade-in slide-in-from-bottom-4 fill-mode-both`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity`}>
                <Icon size={128} />
            </div>
            
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500 ${colorClass}`}>
                <Icon className="h-7 w-7 text-white" />
            </div>
            
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3 group-hover:text-brand-primary transition-colors">
                {title}
            </h3>
            
            <p className="text-slate-500 leading-relaxed mb-6 font-light">
                {description}
            </p>
            
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-brand-primary transition-colors">
                Ingresar al módulo <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
        </div>
    );
};

export const StrategicAxisHome = () => {
    const [factIndex, setFactIndex] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleShuffle = (e) => {
        e.stopPropagation();
        setIsRefreshing(true);
        setTimeout(() => {
            setFactIndex((prev) => (prev + 1) % SICA_FACTS.length);
            setIsRefreshing(false);
        }, 300);
    };

    return (
        <div className="min-h-full bg-slate-50 font-sans">
            {/* Hero Section */}
            <div className="relative pt-16 pb-24 px-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-50/50 to-transparent -z-10"></div>
                
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="flex-1 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black uppercase tracking-wider">
                                <Trees className="h-3 w-3" /> ERAM: Línea Estratégica 4
                            </div>
                            <h1 className="text-5xl md:text-6xl font-serif font-black text-slate-900 leading-tight">
                                Bosques y Paisajes <span className="text-emerald-600">Sostenibles</span>
                            </h1>
                            <p className="text-xl text-slate-600 max-w-2xl leading-relaxed font-light">
                                Gestión integral para la protección de los pulmones verdes de la región SICA, impulsando la resiliencia climática y la conectividad biológica mesoamericana.
                            </p>

                            {/* Prominent Search Bar */}
                            <div className="max-w-2xl mt-8">
                                <div className="relative group">
                                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-500 transition-colors group-focus-within:text-emerald-600" />
                                    <input 
                                        type="text" 
                                        placeholder="¿Qué información busca sobre este eje?" 
                                        className="w-full bg-white border border-slate-200 rounded-2xl py-5 pl-16 pr-6 shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 text-lg transition-all"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 rounded-xl px-6">
                                            Buscar
                                        </Button>
                                    </div>
                                </div>
                                <p className="mt-3 text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black pl-2">
                                    Búsqueda Integrada: Capas, Reportes y Metadatos
                                </p>
                            </div>
                        </div>
                        
                        {/* Dato del día Card */}
                        <div className="w-full lg:w-96 shrink-0">
                            <div className="bg-emerald-950 text-white p-8 rounded-[2.5rem] shadow-2xl shadow-emerald-950/20 relative overflow-hidden group min-h-[300px] flex flex-col justify-between">
                                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform duration-700">
                                    <Info className="h-12 w-12" />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Dato del día</h4>
                                    </div>
                                    <p className={`text-lg font-serif leading-relaxed italic mb-6 transition-all duration-300 ${isRefreshing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                                        "{SICA_FACTS[factIndex]}"
                                    </p>
                                </div>
                                <div>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <div className="h-1 w-12 bg-emerald-500 rounded-full"></div>
                                            <p className="mt-4 text-[10px] text-emerald-300/60 uppercase tracking-widest font-bold">Observatorio Ambiental Regional (OAR)</p>
                                        </div>
                                        <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            onClick={handleShuffle}
                                            className="h-10 w-10 p-0 rounded-full bg-white/5 hover:bg-emerald-500 hover:text-white text-emerald-400 border-none transition-all duration-300 shadow-lg"
                                        >
                                            <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modules Grid */}
            <div className="max-w-7xl mx-auto px-8 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ModuleCard 
                        icon={BookOpen}
                        title="Historias de Bosques"
                        description="Explore las narrativas y datos detallados de nuestras 5 grandes masas boscosas y vínculos transfronterizos."
                        path="/grandes-bosques"
                        colorClass="bg-emerald-500 shadow-lg shadow-emerald-500/30"
                        delay={100}
                    />
                    <ModuleCard 
                        icon={HelpCircle}
                        title="Preguntas Estratégicas"
                        description="Consulte la evidencia científica para responder a las interrogantes críticas de gestión ambiental regional."
                        path="/strategic-questions"
                        colorClass="bg-blue-500 shadow-lg shadow-blue-500/30"
                        delay={200}
                    />
                    <ModuleCard 
                        icon={LayoutDashboard}
                        title="Tablero de Control"
                        description="Visualice KPIs, tendencias y estadísticas dinámicas sobre el estado forestal de cada país miembro."
                        path="/technical/dashboard"
                        colorClass="bg-indigo-500 shadow-lg shadow-indigo-500/30"
                        delay={300}
                    />
                    <ModuleCard 
                        icon={FileText}
                        title="Reporte Técnico"
                        description="Acceda al reporte completo del Estado de los Bosques y Paisajes Sostenibles (FRA-2024)."
                        path="/technical/reports/fra-2024"
                        colorClass="bg-emerald-700 shadow-lg shadow-emerald-700/30"
                        delay={350}
                    />
                    <ModuleCard 
                        icon={Activity}
                        title="Análisis Geoespacial"
                        description="Herramientas de cruce espacial y algoritmos para la detección de cambios y zonificación."
                        path="/technical/geo-analysis"
                        colorClass="bg-emerald-600 shadow-lg shadow-emerald-900/20"
                        delay={400}
                    />
                    <ModuleCard 
                        icon={Map}
                        title="Visores Mapas"
                        description="Navegue por capas satelitales en tiempo real para el monitoreo de alertas de fuego y cambios en el uso del suelo."
                        path="/technical/maps"
                        colorClass="bg-red-500 shadow-lg shadow-red-500/30"
                        delay={450}
                    />
                    <ModuleCard 
                        icon={Info}
                        title="Centro Documental"
                        description="Acceda a bibliotecas, reportes técnicos y metadatos oficiales de la línea estratégica de bosques."
                        path="/technical/docs"
                        colorClass="bg-slate-700 shadow-lg shadow-slate-700/30"
                        delay={500}
                    />
                </div>
            </div>

            {/* Footer Divider / Context */}
            <div className="max-w-7xl mx-auto px-8 pb-16">
                <div className="border-t border-slate-200 py-8 text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    Observatorio Ambiental Regional (OAR) • Estrategia Regional Ambiental de Centroamérica y República Dominicana
                </div>
            </div>
        </div>
    );
};
