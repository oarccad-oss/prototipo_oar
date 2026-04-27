import React from 'react';
import { Card, Badge } from '../../../components/ui/Shared';
import { Focus, MapPin, AlertCircle } from 'lucide-react';

const Q13Hotspots = () => {
    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
            <div className="border-l-4 border-amber-500 pl-6">
                <h1 className="text-4xl font-serif font-bold text-slate-900">
                    Hotspots Municipales de Deforestación
                </h1>
                <p className="text-slate-500 mt-2 text-lg italic">
                    Concentración de la pérdida de bosque a escala local
                </p>
            </div>

            <Card className="bg-amber-50 border-amber-100 p-8 flex items-center gap-8">
                <div className="p-5 bg-white rounded-full shadow-lg">
                    <Focus className="h-12 w-12 text-amber-600" />
                </div>
                <div>
                    <div className="text-5xl font-bold text-slate-900">1.7%</div>
                    <div className="text-slate-600 font-medium">de los municipios concentran el <span className="font-bold text-amber-700">50%</span> de la pérdida regional.</div>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-red-500" />
                        Estadística Crítica
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                        De los 973 municipios que integran la región SICA, solo 17 de ellos concentran la mitad de toda la deforestación ocurrida entre 2001 y 2020.
                    </p>
                </Card>
                <Card className="p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-amber-500" />
                        Implicación de Política
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                        Este alto nivel de concentración sugiere que las intervenciones de comando y control focalizadas en estas 17 unidades territoriales podrían reducir significativamente la tasa regional.
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default Q13Hotspots;
