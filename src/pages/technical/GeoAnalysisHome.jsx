import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Activity, 
    Zap, 
    Globe, 
    Code2, 
    Database, 
    ArrowRight,
    Search,
    ShieldAlert,
    Trees,
    Layers,
    Briefcase
} from 'lucide-react';
import { Button } from '../../components/ui/Shared';

const AnalysisCard = ({ icon: Icon, title, description, path, color, delay }) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={() => navigate(path)}
            className="group relative p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity" style={{ color }}>
                <Icon size={128} />
            </div>
            
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:rotate-12 duration-500" style={{ backgroundColor: color + '10' }}>
                <Icon className="h-7 w-7" style={{ color }} />
            </div>
            
            <h3 className="text-2xl font-serif font-black text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                {title}
            </h3>
            
            <p className="text-slate-500 leading-relaxed mb-6 font-light text-sm">
                {description}
            </p>
            
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-emerald-600 transition-all">
                Abrir Laboratorio <ArrowRight className="h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
            </div>
        </div>
    );
};

export const GeoAnalysisHome = () => {
    return (
        <div className="min-h-full bg-[#f8fafc] font-sans pb-32">
            {/* Hero Hub */}
            <div className="relative pt-20 pb-24 px-8 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="flex-1 space-y-8 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-black uppercase tracking-[0.2em] mb-4 border border-emerald-100/50">
                                <Activity className="h-4 w-4 animate-pulse" /> Laboratorio Geoespacial Regional
                            </div>
                            <h1 className="text-3xl md:text-5xl font-serif font-black text-slate-900 leading-[1.1]">
                                Análisis Inteligente
                            </h1>
                            <p className="text-xl text-slate-600 max-w-2xl leading-relaxed font-light mx-auto lg:mx-0">
                                Prototipos de algoritmos espaciales diseñados para la gestión territorial del SICA, integrando múltiples capas de datos en procesos de cruce automáticos.
                            </p>
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                                <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
                                    <Globe className="h-5 w-5 text-blue-500" />
                                    <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">SICA Regional</span>
                                </div>
                                <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
                                    <Code2 className="h-5 w-5 text-emerald-500" />
                                    <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">Python Backend</span>
                                </div>
                                <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
                                    <Database className="h-5 w-5 text-orange-500" />
                                    <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">Interoperable</span>
                                </div>
                            </div>
                        </div>

                        {/* Concept Visualizer */}
                        <div className="w-full lg:w-[450px] shrink-0">
                            <div className="bg-slate-900 rounded-[3rem] p-1 shadow-3xl shadow-emerald-900/10">
                                <div className="bg-slate-800 rounded-[2.8rem] p-10 relative overflow-hidden">
                                     <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-emerald-500/10 to-transparent"></div>
                                     <Zap className="text-emerald-400 mb-8 h-12 w-12" />
                                     <h3 className="text-2xl font-serif font-bold text-white mb-4">¿Cómo funciona?</h3>
                                     <ul className="space-y-4">
                                         {[
                                             "Dibuja el área de interés en el mapa.",
                                             "El sistema envía las coordenadas al servidor.",
                                             "Python realiza el cruce con capas SQL (SpatiaLite).",
                                             "Recibe el reporte de hallazgos instantáneo."
                                         ].map((item, idx) => (
                                             <li key={idx} className="flex gap-4">
                                                 <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
                                                     <span className="text-[10px] text-emerald-400 font-black">{idx + 1}</span>
                                                 </div>
                                                 <span className="text-slate-400 text-sm font-medium">{item}</span>
                                             </li>
                                         ))}
                                     </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Analysis Grid */}
            <div className="max-w-7xl mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <AnalysisCard 
                        icon={ShieldAlert}
                        title="Restricciones"
                        description="Valida si un área tiene limitaciones legales por sitios de conservación o presencia de patrimonio."
                        path="/technical/geo-analysis/restrictions"
                        color="#EF4444"
                        delay={100}
                    />
                    <AnalysisCard 
                        icon={Trees}
                        title="Deforestación"
                        description="Analiza series temporales para detectar pérdida de cobertura boscosa en áreas específicas."
                        path="/technical/geo-analysis/deforestation"
                        color="#15803D"
                        delay={200}
                    />
                    <AnalysisCard 
                        icon={Layers}
                        title="Ecosistemas"
                        description="Identifica la diversidad de ecosistemas presentes dentro del perímetro seleccionado."
                        path="/technical/geo-analysis/ecosystems"
                        color="#3B82F6"
                        delay={300}
                    />
                    <AnalysisCard 
                        icon={Briefcase}
                        title="Proyectos SICA"
                        description="Visualiza qué proyectos de cooperación regional están activos en el área de interés."
                        path="/technical/geo-analysis/projects"
                        color="#F59E0B"
                        delay={400}
                    />
                </div>
            </div>
        </div>
    );
};
