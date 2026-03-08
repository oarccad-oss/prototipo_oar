import React, { useState } from 'react';
import { 
    MousePointer2, 
    Play, 
    Layers, 
    FileText, 
    Info,
    Terminal,
    Database,
    CheckCircle2,
    AlertTriangle,
    Map as MapIcon,
    Server,
    Settings2,
    FileCheck,
    ArrowRight,
    Zap
} from 'lucide-react';
import { Button } from '../../components/ui/Shared';
import { cn } from '../../lib/utils';

export const GeoAnalysisGeneric = ({ 
    title, 
    description, 
    layers, 
    pythonFunction, 
    icon: Icon,
    uses = []
}) => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [step, setStep] = useState(1); // 1: Info, 2: Simulation

    const simulateAnalysis = () => {
        setIsAnalyzing(true);
        setResult(null);
        
        // Simulate python backend delay
        setTimeout(() => {
            setIsAnalyzing(false);
            setResult({
                status: 'success',
                summary: "Análisis completado satisfactoriamente.",
                details: [
                    "Intersección espacial: 14.5 hectáreas afectadas.",
                    "Base de datos consultada: SpatiaLite Regional v2.",
                    "Confianza del algoritmo: 98.2%"
                ]
            });
        }, 2500);
    };

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
            {/* Header section */}
            <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
                <div className="flex-1 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest leading-none">
                        <Icon className="h-3 w-3" /> Motor de Análisis Geoespacial
                    </div>
                    <h1 className="text-4xl font-serif font-black text-slate-900 leading-tight">
                        {title}
                    </h1>
                    <p className="text-lg text-slate-600 font-light leading-relaxed max-w-3xl">
                        {description}
                    </p>
                </div>

                <div className="flex gap-2">
                    <Button 
                        variant={step === 1 ? "primary" : "outline"} 
                        size="sm" 
                        onClick={() => setStep(1)}
                        className="rounded-xl flex gap-2"
                    >
                        <Info className="h-4 w-4" /> Concepto
                    </Button>
                    <Button 
                        variant={step === 2 ? "primary" : "outline"} 
                        size="sm" 
                        onClick={() => setStep(2)}
                        className="rounded-xl flex gap-2"
                    >
                        <MapIcon className="h-4 w-4" /> Herramienta
                    </Button>
                </div>
            </div>

            {step === 1 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 -mr-8 -mt-8 rounded-full blur-2xl"></div>
                            
                            <h3 className="text-lg font-bold text-slate-800 mb-8 flex items-center gap-2 relative z-10">
                                <Settings2 className="h-5 w-5 text-emerald-600" /> Flujo de Procesamiento Regional
                            </h3>
                            
                            <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                                {[
                                    { icon: MousePointer2, label: "Entrada", desc: "Usuario dibuja polígono" },
                                    { icon: Server, label: "Petición", desc: "Envío a API Python" },
                                    { icon: Database, label: "Cruces", desc: "Intersección SQL" },
                                    { icon: FileCheck, label: "Resultado", desc: "Generación de Reporte" }
                                ].map((step, i) => (
                                    <React.Fragment key={i}>
                                        <div className="flex flex-col items-center gap-3 text-center flex-1">
                                            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-sm group-hover:scale-110 transition-transform">
                                                <step.icon className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 mb-1">{step.label}</p>
                                                <p className="text-xs text-slate-500 font-medium px-2">{step.desc}</p>
                                            </div>
                                        </div>
                                        {i < 3 && (
                                            <div className="hidden md:block">
                                                <ArrowRight className="h-4 w-4 text-slate-300" />
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Layers className="h-5 w-5 text-emerald-600" /> Capas del Diccionario de Datos OAR
                            </h3>
                            <p className="text-slate-500 text-sm mb-6 font-light">Para ejecutar este análisis, el sistema integra automáticamente las siguientes fuentes oficiales:</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {layers.map((layer, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-slate-100 shadow-sm">
                                            <Database className="h-4 w-4 text-slate-400" />
                                        </div>
                                        <span className="text-sm font-bold text-slate-700">{layer}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-emerald-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-emerald-600/20 relative overflow-hidden group">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                            
                            <h3 className="text-xl font-serif font-black mb-6 flex items-center gap-2">
                                <Zap className="h-5 w-5 text-emerald-300" /> Casos de Uso
                            </h3>
                            
                            <ul className="space-y-4 mb-8">
                                {uses.map((use, idx) => (
                                    <li key={idx} className="flex gap-3 items-start animate-in slide-in-from-left-4 fill-mode-both" style={{ animationDelay: `${idx * 150}ms` }}>
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-300 shrink-0 shadow-[0_0_8px_rgba(110,231,183,1)]"></div>
                                        <p className="text-sm font-medium leading-relaxed text-emerald-50">
                                            {use}
                                        </p>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-6 border-t border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                                        <Icon className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-black tracking-widest text-emerald-200/60 leading-none mb-1">Impacto de la Herramienta</p>
                                        <p className="text-[11px] font-bold uppercase tracking-wider text-white">Eficiencia Regional (+85%)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden relative min-h-[500px]">
                        {/* Map Simulator */}
                        <div className="absolute inset-0 bg-slate-200">
                            <div className="absolute inset-0 opacity-40 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-400 flex flex-col items-center gap-4 text-center">
                                <div className="w-24 h-24 rounded-full border-4 border-slate-300 border-dashed animate-spin duration-[10s]"></div>
                                <p className="text-sm font-black uppercase tracking-widest">Simulador de Visor Geoespacial</p>
                            </div>
                        </div>

                        {/* Drawing Tools Overlay */}
                        <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                            <div className="bg-white/90 backdrop-blur-xl p-2 rounded-2xl border border-white/20 shadow-xl flex flex-col gap-1">
                                <button className="p-3 bg-emerald-600 text-white rounded-xl shadow-lg border-2 border-emerald-400/30">
                                    <MousePointer2 className="h-5 w-5" />
                                </button>
                                <button className="p-3 text-slate-600 hover:bg-slate-50 transition-colors rounded-xl">
                                    <div className="w-5 h-5 border-2 border-slate-400 rotate-45"></div>
                                </button>
                                <button className="p-3 text-slate-600 hover:bg-slate-50 transition-colors rounded-xl">
                                    <div className="w-5 h-5 rounded-full border-2 border-slate-400"></div>
                                </button>
                            </div>
                        </div>

                        {/* Top bar */}
                        <div className="absolute top-6 right-6 z-10">
                            <div className="bg-slate-900/90 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10 shadow-xl flex items-center gap-4 text-white">
                                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Paso 1: Dibuje el Polígono</span>
                                <div className="h-4 w-px bg-white/20"></div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">CRS: EPSG:4326</span>
                            </div>
                        </div>

                        {/* Active Area Simulation */}
                        {!isAnalyzing && !result && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="w-48 h-32 bg-emerald-400/30 border-4 border-emerald-500 rounded-lg relative animate-pulse backdrop-blur-sm">
                                    <div className="absolute -top-3 -left-3 w-6 h-6 bg-white border-2 border-emerald-600 rounded-full shadow-lg"></div>
                                    <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-white border-2 border-emerald-600 rounded-full shadow-lg"></div>
                                </div>
                            </div>
                        )}

                        {/* Buttons & Status */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4">
                            {!result ? (
                                <Button 
                                    className={cn(
                                        "rounded-full px-12 py-7 text-lg shadow-2xl transition-all h-auto",
                                        isAnalyzing ? "bg-slate-800" : "bg-emerald-600 hover:bg-emerald-700 scale-110"
                                    )}
                                    onClick={simulateAnalysis}
                                    disabled={isAnalyzing}
                                >
                                    {isAnalyzing ? (
                                        <div className="flex items-center gap-3">
                                            <Play className="h-5 w-5 animate-spin" />
                                            <span className="font-bold uppercase tracking-widest text-sm">Ejecutando en Backend Python...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <Play className="h-5 w-5 fill-current" />
                                            <span className="font-bold uppercase tracking-widest text-sm">Iniciar Análisis Cruzado</span>
                                        </div>
                                    )}
                                </Button>
                            ) : (
                                <div className="flex gap-4 animate-in zoom-in duration-300">
                                    <Button variant="outline" className="bg-white rounded-full px-8 py-4 h-auto capitalize font-bold text-slate-900" onClick={() => setResult(null)}>
                                        Reiniciar Análisis
                                    </Button>
                                    <Button className="bg-slate-900 rounded-full px-8 py-4 h-auto capitalize font-bold text-white flex gap-2">
                                        <FileText className="h-4 w-4" /> Exportar Reporte (PDF/JSON)
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Analysis results floating panel */}
                        {result && (
                            <div className="absolute right-8 top-1/2 -translate-y-1/2 w-80 bg-white shadow-2xl rounded-[2rem] border border-slate-100 overflow-hidden animate-in slide-in-from-right-8 duration-500 z-20">
                                <div className="bg-emerald-600 p-6 text-white">
                                    <div className="flex items-center gap-2 mb-1">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-200" />
                                        <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Python Result</span>
                                    </div>
                                    <h4 className="text-xl font-serif font-black">Resumen del Algoritmo</h4>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                                        <p className="text-xs font-bold text-slate-700 leading-relaxed">{result.summary}</p>
                                    </div>
                                    <div className="space-y-3 pt-4 border-t border-slate-50">
                                        {result.details.map((detail, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center border border-emerald-100">
                                                    <span className="text-[10px] font-black text-emerald-600">{idx + 1}</span>
                                                </div>
                                                <span className="text-[11px] font-medium text-slate-500">{detail}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-4 mt-4 bg-orange-50 rounded-2xl p-4 border border-orange-100 flex gap-3">
                                        <AlertTriangle className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                                        <p className="text-[10px] text-orange-700 font-bold leading-relaxed">
                                            Recuerde: Este es un prototipo conceptual de la lógica funcional del OAR.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
