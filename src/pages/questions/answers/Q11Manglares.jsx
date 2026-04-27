import React from 'react';
import { Card, Badge } from '../../../components/ui/Shared';
import { Waves, TrendingDown, ShieldCheck } from 'lucide-react';

const Q11Manglares = () => {
    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
            <div className="border-l-4 border-cyan-500 pl-6">
                <h1 className="text-4xl font-serif font-bold text-slate-900">
                    Estado de los Manglares en la Región SICA
                </h1>
                <p className="text-slate-500 mt-2 text-lg italic">
                    Análisis de superficie y pérdida acumulada (2001-2020)
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-cyan-50 border-cyan-100 flex flex-col items-center text-center p-6">
                    <Waves className="h-10 w-10 text-cyan-600 mb-3" />
                    <div className="text-3xl font-bold text-slate-900">419,174 ha</div>
                    <div className="text-sm text-slate-600 font-medium">Superficie Total</div>
                </Card>
                <Card className="bg-red-50 border-red-100 flex flex-col items-center text-center p-6">
                    <TrendingDown className="h-10 w-10 text-red-600 mb-3" />
                    <div className="text-3xl font-bold text-slate-900">3,702 ha</div>
                    <div className="text-sm text-slate-600 font-medium">Pérdida Acumulada</div>
                </Card>
                <Card className="bg-green-50 border-green-100 flex flex-col items-center text-center p-6">
                    <ShieldCheck className="h-10 w-10 text-green-600 mb-3" />
                    <div className="text-3xl font-bold text-slate-900">99.1%</div>
                    <div className="text-sm text-slate-600 font-medium">Permanencia</div>
                </Card>
            </div>

            <Card className="p-8 bg-white shadow-xl">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Waves className="h-5 w-5 text-cyan-500" />
                    Importancia Estratégica
                </h3>
                <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
                    <p>
                        Los manglares representan uno de los ecosistemas más resilientes y críticos para la adaptación al cambio climático en la región SICA. Con más de 400,000 hectáreas distribuidas en ambas costas, actúan como barreras naturales contra tormentas y son sumideros de carbono altamente eficientes.
                    </p>
                    <p>
                        Aunque la pérdida porcentual es menor que en otros ecosistemas forestales, la degradación de 3,700 hectáreas representa un riesgo significativo para la biodiversidad marina y la seguridad costera de las comunidades locales.
                    </p>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 border-slate-200">
                    <h4 className="font-bold text-slate-900 mb-3">Distribución por Cuenca</h4>
                    <ul className="space-y-3">
                        <li className="flex justify-between items-center text-sm">
                            <span className="text-slate-600">Pacífico</span>
                            <Badge variant="info">65%</Badge>
                        </li>
                        <li className="flex justify-between items-center text-sm">
                            <span className="text-slate-600">Caribe</span>
                            <Badge variant="info">35%</Badge>
                        </li>
                    </ul>
                </Card>
                <Card className="p-6 border-slate-200">
                    <h4 className="font-bold text-slate-900 mb-3">Principales Amenazas</h4>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="danger">Acuacultura</Badge>
                        <Badge variant="danger">Desarrollo Urbano</Badge>
                        <Badge variant="danger">Erosión Costera</Badge>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Q11Manglares;
