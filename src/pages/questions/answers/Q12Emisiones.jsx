import React from 'react';
import { Card, Badge } from '../../../components/ui/Shared';
import { CloudRain, AlertTriangle, TrendingUp, BarChart3 } from 'lucide-react';

const Q12Emisiones = () => {
    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
            <div className="border-l-4 border-red-500 pl-6">
                <h1 className="text-4xl font-serif font-bold text-slate-900">
                    Emisiones de CO2 por Deforestación
                </h1>
                <p className="text-slate-500 mt-2 text-lg italic">
                    Impacto climático de la pérdida de cobertura forestal regional (2001-2020)
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-red-50 border-red-100 p-8 flex items-center gap-6">
                    <div className="p-4 bg-white rounded-2xl shadow-sm">
                        <TrendingUp className="h-12 w-12 text-red-600" />
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-slate-900">922 Mt</div>
                        <div className="text-sm font-bold text-red-600 uppercase tracking-widest">CO2e Acumulado</div>
                    </div>
                </Card>
                <Card className="bg-slate-50 border-slate-200 p-8 flex items-center gap-6">
                    <div className="p-4 bg-white rounded-2xl shadow-sm">
                        <BarChart3 className="h-12 w-12 text-slate-600" />
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-slate-900">67.4 Mt</div>
                        <div className="text-sm font-bold text-slate-600 uppercase tracking-widest">Emisiones Anuales</div>
                    </div>
                </Card>
            </div>

            <Card className="p-0 overflow-hidden border-none shadow-2xl">
                <div className="bg-slate-900 p-8 text-white">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <CloudRain className="h-6 w-6 text-red-400" />
                        Análisis de Mitigación
                    </h3>
                    <p className="text-slate-300 leading-relaxed text-lg">
                        La deforestación regional ha liberado aproximadamente 922 millones de toneladas de CO2 equivalente a la atmósfera en las últimas dos décadas. Esta cifra subraya la importancia crítica de conservar los bosques remanentes como la estrategia de mitigación más costo-efectiva para la región SICA.
                    </p>
                </div>
                <div className="p-8 bg-white grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h4 className="font-bold text-slate-900 border-b pb-2">Metodología de Cálculo</h4>
                        <p className="text-sm text-slate-600">
                            Estimaciones basadas en el factor IPCC Tier 1 para bosques tropicales húmedos: 550.5 tCO2e por hectárea perdida.
                        </p>
                        <div className="flex gap-2">
                            <Badge variant="info">IPCC Tier 1</Badge>
                            <Badge variant="info">GFW Data</Badge>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-bold text-slate-900 border-b pb-2">Riesgos Asociados</h4>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm text-slate-600">
                                <AlertTriangle className="h-4 w-4 text-amber-500" />
                                Retroalimentación climática positiva
                            </li>
                            <li className="flex items-center gap-2 text-sm text-slate-600">
                                <AlertTriangle className="h-4 w-4 text-amber-500" />
                                Pérdida de resiliencia ecosistémica
                            </li>
                        </ul>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Q12Emisiones;
