import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Globe, LayoutDashboard, Leaf, ArrowRight, TreePine, Droplets, ThermometerSun, Network, GitMerge, Info, ClipboardList, Target, Gavel, FolderCheck, ChevronRight, BarChart3 } from 'lucide-react';
import { Card, Button, Badge } from '../../components/ui/Shared';
import { cn } from '../../lib/utils';

export const MonitoringPortal = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState('estrategico');

    useEffect(() => {
        const level = searchParams.get('level');
        if (level === 'estrategico' || level === 'operativo') {
            setActiveTab(level);
        }
    }, [searchParams]);
    const [selectedEje, setSelectedEje] = useState(4); // Default to Bosques (ID 4)

    const ejesERAM = [
        { 
            id: 1, 
            title: 'Educación Ambiental', 
            fullTitle: 'Gestión del Conocimiento y Educación Ambiental',
            description: 'Modelos de sensibilización y formación para la sostenibilidad regional.',
            status: 'upcoming', 
            icon: Network 
        },
        { 
            id: 2, 
            title: 'Resiliencia y Riesgo', 
            fullTitle: 'Cambio Climático y Gestión de Riesgos',
            description: 'Monitoreo de adaptación, mitigación y vulnerabilidad ante eventos extremos.',
            status: 'upcoming', 
            icon: ThermometerSun 
        },
        { 
            id: 3, 
            title: 'Recursos Hídricos', 
            fullTitle: 'Gestión Integral del Recurso Hídrico',
            description: 'Seguimiento de cuencas transfronterizas y disponibilidad de agua.',
            status: 'upcoming', 
            icon: Droplets 
        },
        { 
            id: 4, 
            title: 'Bosques y Paisajes', 
            fullTitle: 'Bosques y Paisajes Sostenibles',
            description: 'Auditoría de restauración forestal, modelos de gobernanza comunitaria y contribución a la economía regional resiliente mediante el manejo sostenible.',
            status: 'active', 
            icon: TreePine 
        },
        { 
            id: 5, 
            title: 'Mares y Biodiversidad', 
            fullTitle: 'Ecosistemas Marinos y Biodiversidad',
            description: 'Conservación de arrecifes, manglares y conectividad ecológica regional.',
            status: 'upcoming', 
            icon: Globe 
        }
    ];

    const currentEje = ejesERAM.find(e => e.id === selectedEje);

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            {/* HERO SECTION */}
            <div className="bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-[length:24px_24px]"></div>
                <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-20">
                    <Globe className="w-96 h-96" />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-4 py-24">
                    <div className="max-w-4xl text-left">
                        <span className="inline-block py-1 px-3 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-xs font-bold tracking-wider mb-6 uppercase">
                            SISTEMA INTEGRADO DE SEGUIMIENTO DE INDICADORES AMBIENTALES
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
                            Monitoreo de Indicadores <br /><span className="text-emerald-400">Estratégicos y Operativos</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 max-w-3xl font-light">
                            Plataforma regional para la evaluación integral del desempeño ambiental. Este sistema conecta la evaluación de alto nivel frente a los compromisos internacionales con la auditoría de la ejecución técnica en el territorio centroamericano.
                        </p>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA WITH TABS */}
            <main className="flex-1 bg-white border-t border-slate-200 py-20 -mt-10 relative z-20 rounded-t-[3rem] shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.1)]">
                <div className="max-w-7xl mx-auto px-4">
                    {/* TABS SELECTOR */}
                    <div className="flex flex-wrap justify-center gap-4 mb-20">
                        <button 
                            onClick={() => setActiveTab('estrategico')}
                            className={`px-10 py-5 rounded-full text-sm font-black uppercase tracking-widest flex items-center gap-3 transition-all duration-300 ${activeTab === 'estrategico' ? 'bg-indigo-600 text-white shadow-2xl scale-110 ring-8 ring-indigo-500/10' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                        >
                            <Globe className="w-5 h-5" /> 1. El Nivel Estratégico (Global)
                        </button>
                        <button 
                            onClick={() => setActiveTab('operativo')}
                            className={`px-10 py-5 rounded-full text-sm font-black uppercase tracking-widest flex items-center gap-3 transition-all duration-300 ${activeTab === 'operativo' ? 'bg-emerald-600 text-white shadow-2xl scale-110 ring-8 ring-emerald-500/10' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                        >
                            <LayoutDashboard className="w-5 h-5" /> 2. El Nivel Operativo (ERAM)
                        </button>
                    </div>

                    {/* TAB CONTENT */}
                    <div className="max-w-6xl mx-auto">
                        {activeTab === 'estrategico' && (
                            <div className="transition-all animate-in fade-in slide-in-from-bottom-8 duration-500">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                                    <div className="lg:col-span-12">
                                        <div className="bg-indigo-50/50 border border-indigo-100 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-8 text-indigo-500/10"><Globe className="w-48 h-48" /></div>
                                            
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 border-b border-indigo-100 pb-12">
                                                <div className="max-w-2xl text-left">
                                                    <h3 className="text-3xl md:text-5xl font-serif font-black text-indigo-900 mb-6">
                                                        Monitoreo Estratégico
                                                    </h3>
                                                    <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed">
                                                        Evalúa el estado biofísico real de la región (Sinergias CDB, CMNUCC, CNULD). Ideal para tomadores de decisión y reportes de alto nivel.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                                <Card className="bg-white/80 backdrop-blur-sm p-8 border-indigo-100 shadow-sm rounded-[2rem] text-left hover:border-indigo-300 transition-colors">
                                                    <span className="font-black text-indigo-900 block mb-3 text-2xl">CDB</span>
                                                    <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-4">Biodiversidad</p>
                                                    <p className="text-sm text-slate-500 leading-relaxed font-medium">Meta Kunming-Montreal: Retención de ecosistemas intactos.</p>
                                                </Card>
                                                <Card className="bg-white/80 backdrop-blur-sm p-8 border-indigo-100 shadow-sm rounded-[2rem] text-left hover:border-indigo-300 transition-colors">
                                                    <span className="font-black text-indigo-900 block mb-3 text-2xl">CMNUCC</span>
                                                    <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-4">Cambio Climático</p>
                                                    <p className="text-sm text-slate-500 leading-relaxed font-medium">Inventarios regionales de GEI y biomasa retenida.</p>
                                                </Card>
                                                <Card className="bg-white/80 backdrop-blur-sm p-8 border-indigo-100 shadow-sm rounded-[2rem] text-left hover:border-indigo-300 transition-colors">
                                                    <span className="font-black text-indigo-900 block mb-3 text-2xl">CNULD</span>
                                                    <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-4">Desertificación</p>
                                                    <p className="text-sm text-slate-500 leading-relaxed font-medium">Neutralidad de Degradación de la Tierra (LDN).</p>
                                                </Card>
                                            </div>

                                            <Button 
                                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-8 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-indigo-900/20 group flex items-center justify-center gap-4 transition-all hover:scale-[1.01]"
                                                onClick={() => navigate('/monitoring/strategic')}
                                            >
                                                Explorar Indicadores Estratégicos <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'operativo' && (
                            <div className="transition-all animate-in fade-in slide-in-from-bottom-8 duration-500">
                                <div className="bg-emerald-50/50 border border-emerald-100 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
                                     <div className="absolute top-0 right-0 p-8 text-emerald-500/10"><BarChart3 className="w-48 h-48" /></div>

                                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 border-b border-emerald-100 pb-12">
                                        <div className="max-w-2xl text-left">
                                            <h3 className="text-3xl md:text-5xl font-serif font-black text-emerald-900 mb-6">
                                                Seguimiento Operativo ERAM
                                            </h3>
                                            <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed">
                                                Auditamos la ejecución técnica de los Ejes de la Estrategia Regional Ambiental. Control físico de metas y ambiente institucional.
                                            </p>
                                        </div>
                                     </div>

                                     <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                                        {/* AXIS SELECTOR (LEFT) */}
                                        <div className="lg:col-span-12 xl:col-span-5 space-y-4">
                                            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6 pl-4">Panel de Control de Ejes</p>
                                            
                                            {ejesERAM.map((eje) => (
                                                <div 
                                                    key={eje.id}
                                                    onClick={() => setSelectedEje(eje.id)}
                                                    className={cn(
                                                        "group flex items-center justify-between p-5 rounded-[1.5rem] border-2 transition-all cursor-pointer",
                                                        selectedEje === eje.id 
                                                            ? "bg-emerald-600 border-emerald-600 text-white shadow-lg scale-[1.02]" 
                                                            : "bg-white border-slate-100 text-slate-400 hover:border-emerald-200 hover:scale-[1.01]"
                                                    )}
                                                >
                                                    <div className="flex items-center gap-4 text-left">
                                                        <div className={cn(
                                                            "p-2 rounded-xl transition-all",
                                                            selectedEje === eje.id ? "bg-white/20" : "bg-slate-100"
                                                        )}>
                                                            <eje.icon className="w-6 h-6" />
                                                        </div>
                                                        <div>
                                                            <h5 className="font-black text-sm uppercase tracking-wider">{eje.title}</h5>
                                                            <p className="text-[10px] font-bold opacity-70">ERAM Dashboard</p>
                                                        </div>
                                                    </div>
                                                    {selectedEje === eje.id && (
                                                        <ChevronRight className="w-5 h-5 animate-pulse" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        {/* SELECTED AXIS VIEW (RIGHT) */}
                                        <div className="lg:col-span-12 xl:col-span-7">
                                            <Card className="rounded-[3rem] border-2 border-emerald-200 bg-white p-10 flex flex-col group shadow-2xl shadow-emerald-900/10 min-h-[450px] text-left relative overflow-hidden transition-all duration-500">
                                                <div className="absolute top-0 right-0 p-10 opacity-5">
                                                    <currentEje.icon className="w-48 h-48 text-emerald-900" />
                                                </div>
                                                
                                                <div className="flex justify-between items-start mb-8 relative z-10">
                                                    <div className="p-5 bg-emerald-600 rounded-[2rem] text-white shadow-xl transition-all">
                                                        <currentEje.icon className="w-10 h-10" />
                                                    </div>
                                                    <Badge 
                                                        className={cn(
                                                            "font-black border-none uppercase text-xs tracking-widest px-6 py-3 rounded-full transition-all",
                                                            currentEje.status === 'active' ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                                                        )}
                                                    >
                                                        Eje {currentEje.id}: {currentEje.status === 'active' ? 'ACTIVO' : 'DISPONIBLE PRÓXIMAMENTE'}
                                                    </Badge>
                                                </div>

                                                <h4 className="text-4xl font-black text-slate-800 mb-6 relative z-10">{currentEje.fullTitle}</h4>
                                                <p className="text-slate-500 text-xl leading-relaxed mb-10 flex-1 italic font-serif relative z-10">
                                                    {currentEje.description}
                                                </p>

                                                {currentEje.status === 'active' ? (
                                                    <Button 
                                                        className="bg-emerald-600 hover:bg-emerald-700 text-white w-full py-6 rounded-[1.5rem] font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 group-hover:shadow-2xl transition-all relative z-10"
                                                        onClick={() => navigate('/monitoring/operational')}
                                                    >
                                                        Explorar Indicadores <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                                    </Button>
                                                ) : (
                                                    <div className="p-6 bg-slate-50 rounded-[1.5rem] border border-slate-200 text-center relative z-10">
                                                        <span className="text-slate-400 font-black uppercase text-xs tracking-widest">Módulo en proceso de integración técnica</span>
                                                    </div>
                                                )}
                                            </Card>
                                        </div>
                                     </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};
