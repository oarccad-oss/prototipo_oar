import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    BookOpen, 
    HelpCircle, 
    LayoutDashboard, 
    Map, 
    Info, 
    ArrowRight,
    Search,
    Lock,
    Clock
} from 'lucide-react';
import { Button } from '../../components/ui/Shared';

const ModuleCardDisabled = ({ icon: Icon, title, description, colorClass, delay }) => {
    return (
        <div 
            className={`group relative p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200 shadow-none transition-all duration-500 cursor-not-allowed overflow-hidden opacity-80 animate-in fade-in slide-in-from-bottom-4 fill-mode-both`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 opacity-[0.02]`}>
                <Icon size={128} />
            </div>
            
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-slate-200 text-slate-400`}>
                <Icon className="h-7 w-7" />
            </div>
            
            <div className="flex items-center gap-2 mb-3">
                <h3 className="text-2xl font-serif font-bold text-slate-400">
                    {title}
                </h3>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest border border-slate-200">
                    <Lock className="h-2.5 w-2.5" /> Bloqueado
                </span>
            </div>
            
            <p className="text-slate-400 leading-relaxed mb-6 font-light">
                {description}
            </p>
            
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-300">
                Próximamente disponible <Clock className="h-4 w-4" />
            </div>
        </div>
    );
};

export const StrategicAxisGeneric = ({ axisTitle, subtitle, axisIcon: AxisIcon, axisColor, axisLine, description }) => {
    return (
        <div className="min-h-full bg-slate-50 font-sans">
            {/* Hero Section */}
            <div className="relative pt-16 pb-24 px-8 overflow-hidden">
                <div className={`absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-${axisColor}-50/50 to-transparent -z-10`}></div>
                
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="flex-1 space-y-6">
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-${axisColor}-100 text-${axisColor}-700 text-xs font-black uppercase tracking-wider`}>
                                <AxisIcon className="h-3 w-3" /> ERAM: Línea Estratégica {axisLine}
                            </div>
                            <h1 className="text-5xl md:text-6xl font-serif font-black text-slate-900 leading-tight">
                                {axisTitle}
                            </h1>
                            <p className="text-xl text-slate-600 max-w-2xl leading-relaxed font-light">
                                {description}
                            </p>
                        </div>
                        
                        {/* Placeholder for Data Card */}
                        <div className="w-full lg:w-96 shrink-0">
                            <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group min-h-[300px] flex flex-col justify-between grayscale opacity-50">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Info className="h-12 w-12" />
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Fichas de Indicadores</h4>
                                    <div className="h-4 w-3/4 bg-slate-800 rounded-lg animate-pulse" />
                                    <div className="h-4 w-1/2 bg-slate-800 rounded-lg animate-pulse" />
                                    <div className="h-4 w-2/3 bg-slate-800 rounded-lg animate-pulse" />
                                </div>
                                <div>
                                    <div className="h-1 w-12 bg-slate-700 rounded-full"></div>
                                    <p className="mt-4 text-[10px] text-slate-500 uppercase tracking-widest font-bold font-sans">Módulo en Desarrollo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modules Grid - All Disabled */}
            <div className="max-w-7xl mx-auto px-8 pb-32">
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-bold text-slate-800">Módulos de Consulta Regional</h2>
                    <p className="text-slate-500">Estos módulos se activarán progresivamente según la disponibilidad de datos oficiales.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ModuleCardDisabled 
                        icon={BookOpen}
                        title="Historias"
                        description="Narrativas centradas en el impacto territorial y social de este eje estratégico."
                        delay={100}
                    />
                    <ModuleCardDisabled 
                        icon={HelpCircle}
                        title="Preguntas"
                        description="Evidencia científica para responder dudas de gestión ambiental."
                        delay={200}
                    />
                    <ModuleCardDisabled 
                        icon={LayoutDashboard}
                        title="Tableros"
                        description="KPIs y tendencias dinámicas de seguimiento regional."
                        delay={300}
                    />
                    <ModuleCardDisabled 
                        icon={Map}
                        title="Mapas"
                        description="Visores geoespaciales interactivos y capas de monitoreo."
                        delay={400}
                    />
                    <ModuleCardDisabled 
                        icon={Info}
                        title="Docs"
                        description="Catálogo de reportes, metadatos y bibliotecas técnicas."
                        delay={500}
                    />
                </div>
            </div>

            {/* Coming Soon Message */}
            <div className="bg-white border-y border-slate-100 py-16">
                <div className="max-w-3xl mx-auto px-8 text-center space-y-6">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Clock className="h-8 w-8" />
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-slate-800">Estamos trabajando en ello</h3>
                    <p className="text-lg text-slate-600 font-light">
                        El equipo técnico del Observatorio Ambiental Regional está actualmente procesando e integrando las capas de datos necesarias para habilitar este eje estratégico.
                    </p>
                    <Button variant="outline" className="rounded-full px-8 mt-4" onClick={() => window.history.back()}>
                        Volver al inicio
                    </Button>
                </div>
            </div>
        </div>
    );
};
