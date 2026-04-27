import React from 'react';
import { Card, Badge } from '../../../components/ui/Shared';
import { ShieldAlert, TreePine, History } from 'lucide-react';

const Q14EcosistemaAmenazado = () => {
    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
            <div className="border-l-4 border-rose-600 pl-6">
                <h1 className="text-4xl font-serif font-bold text-slate-900">
                    Ecosistema más Amenazado
                </h1>
                <p className="text-slate-500 mt-2 text-lg italic">
                    Identificación de prioridades críticas de conservación
                </p>
            </div>

            <Card className="p-0 overflow-hidden shadow-2xl border-none">
                <div className="bg-rose-600 p-8 text-white">
                    <div className="flex justify-between items-start">
                        <div>
                            <Badge variant="outline" className="text-white border-white mb-4">CRÍTICO</Badge>
                            <h2 className="text-3xl font-bold italic mb-2">
                                "Bosque tropical siempreverde estacional latifolia"
                            </h2>
                            <p className="text-rose-100 font-medium">Código: 26-2</p>
                        </div>
                        <ShieldAlert className="h-16 w-16 text-rose-200 opacity-50" />
                    </div>
                </div>
                <div className="p-8 bg-white grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-slate-900">29.3%</div>
                        <div className="text-sm text-slate-500 uppercase font-bold tracking-tighter">Área Perdida</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-slate-900">13,396 ha</div>
                        <div className="text-sm text-slate-500 uppercase font-bold tracking-tighter">Hectáreas Totales</div>
                    </div>
                    <div className="text-center border-l border-slate-100 pl-4">
                        <div className="flex items-center justify-center gap-1 text-slate-800 font-bold">
                            <History className="h-4 w-4" /> Periodo
                        </div>
                        <div className="text-lg text-slate-600 font-medium">2001-2020</div>
                    </div>
                </div>
            </Card>

            <div className="prose prose-slate max-w-none">
                <h3 className="text-xl font-bold text-slate-800">Contexto de Amenaza</h3>
                <p className="text-slate-600 leading-relaxed">
                    A pesar de su extensión relativamente moderada en comparación con los grandes macizos forestales, el ecosistema de tipo <strong>26-2</strong> ha sufrido la mayor tasa de transformación proporcional de la región. La pérdida de casi un tercio de su superficie original lo coloca en una categoría de riesgo inminente bajo los criterios de la Lista Roja de Ecosistemas de la UICN.
                </p>
            </div>
        </div>
    );
};

export default Q14EcosistemaAmenazado;
