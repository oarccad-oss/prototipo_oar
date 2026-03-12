import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Droplets, AlertTriangle, ArrowLeft, ArrowDown, Share2, Download, TrendingUp, CloudRain, HelpCircle } from 'lucide-react';
import { Card, Badge, Button, DataSourceModal, ShareButton } from '../../components/ui/Shared';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MiniMap } from '../../components/map/MiniMap';
import { SICA_COORDINATES } from '../../api/constants';

const WATER_DATA = {
    'GT': { stress: 3.1, stressLabel: 'Alto', risk: 80, access: 88, source: 'WRI Aqueduct', profile: [{ s: 'Físico', v: 80 }, { s: 'Calidad', v: 65 }, { s: 'Regulatorio', v: 45 }, { s: 'Sequía', v: 90 }, { s: 'Inundación', v: 85 }] },
    'HN': { stress: 2.4, stressLabel: 'Medio-Alto', risk: 65, access: 85, source: 'WRI Aqueduct', profile: [{ s: 'Físico', v: 60 }, { s: 'Calidad', v: 50 }, { s: 'Regulatorio', v: 55 }, { s: 'Sequía', v: 70 }, { s: 'Inundación', v: 90 }] },
    'SV': { stress: 3.8, stressLabel: 'Extremadamente Alto', risk: 95, access: 90, source: 'WRI Aqueduct', profile: [{ s: 'Físico', v: 90 }, { s: 'Calidad', v: 85 }, { s: 'Regulatorio', v: 60 }, { s: 'Sequía', v: 95 }, { s: 'Inundación', v: 70 }] },
    'NI': { stress: 2.6, stressLabel: 'Medio-Alto', risk: 60, access: 82, source: 'WRI Aqueduct', profile: [{ s: 'Físico', v: 50 }, { s: 'Calidad', v: 40 }, { s: 'Regulatorio', v: 50 }, { s: 'Sequía', v: 60 }, { s: 'Inundación', v: 80 }] },
    'CR': { stress: 1.8, stressLabel: 'Bajo', risk: 30, access: 96, source: 'WRI Aqueduct', profile: [{ s: 'Físico', v: 30 }, { s: 'Calidad', v: 20 }, { s: 'Regulatorio', v: 80 }, { s: 'Sequía', v: 40 }, { s: 'Inundación', v: 50 }] },
    'PA': { stress: 1.9, stressLabel: 'Bajo', risk: 35, access: 94, source: 'WRI Aqueduct', profile: [{ s: 'Físico', v: 35 }, { s: 'Calidad', v: 25 }, { s: 'Regulatorio', v: 75 }, { s: 'Sequía', v: 45 }, { s: 'Inundación', v: 55 }] },
    'BZ': { stress: 1.2, stressLabel: 'Bajo', risk: 25, access: 89, source: 'WRI Aqueduct', profile: [{ s: 'Físico', v: 25 }, { s: 'Calidad', v: 30 }, { s: 'Regulatorio', v: 60 }, { s: 'Sequía', v: 30 }, { s: 'Inundación', v: 40 }] },
    'DO': { stress: 3.2, stressLabel: 'Alto', risk: 85, access: 86, source: 'WRI Aqueduct', profile: [{ s: 'Físico', v: 85 }, { s: 'Calidad', v: 70 }, { s: 'Regulatorio', v: 55 }, { s: 'Sequía', v: 80 }, { s: 'Inundación', v: 75 }] },
    'regional': { stress: 2.8, stressLabel: 'Medio-Alto', risk: 78, access: 89, source: 'WRI Aqueduct', profile: [{ s: 'Físico', v: 65 }, { s: 'Calidad', v: 55 }, { s: 'Regulatorio', v: 58 }, { s: 'Sequía', v: 72 }, { s: 'Inundación', v: 78 }] }
};



const StatCard = ({ title, value, unit, colorClass, subtitle, icon: Icon }) => (
    <div className={`bg-white p-6 border-t-4 ${colorClass} shadow-sm hover:shadow-md transition-shadow relative`}>
        <div className="flex justify-between items-start mb-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</h4>
            {Icon && <Icon className="h-5 w-5 text-slate-200" />}
        </div>
        <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold text-slate-800">
                {value}
            </span>
            <span className="text-sm font-medium text-slate-500">{unit}</span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">{subtitle}</p>
    </div>
);

export const WaterDashboard = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedIso = searchParams.get('country') || 'regional';
    const [loading, setLoading] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    const dataSources = [
        { name: "Estrés Hídrico", description: "Relación entre demanda y oferta total de agua renovable.", provider: "WRI Aqueduct", updateFrequency: "Anual" },
        { name: "Riesgo de Sequía", description: "Probabilidad histórica y proyecciones de sequía.", provider: "WRI Aqueduct", updateFrequency: "Anual" },
        { name: "Calidad del Agua", description: "Potencial de contaminación costera y fluvial.", provider: "WRI Aqueduct", updateFrequency: "Anual" }
    ];

    const data = WATER_DATA[selectedIso] || WATER_DATA['regional'];
    const countryName = SICA_COORDINATES[selectedIso]?.name || (selectedIso === 'regional' ? 'Región SICA' : 'Guatemala');
    const mapView = SICA_COORDINATES[selectedIso] || SICA_COORDINATES['regional'];

    const handleCountryChange = (e) => {
        setLoading(true);
        setSearchParams({ country: e.target.value });
        setTimeout(() => setLoading(false), 500);
    };

    const getScoreColor = (score) => {
        if (score < 2) return '#FCD34D'; // Bajo
        if (score < 3) return '#F97316'; // Medio
        if (score < 4) return '#EF4444'; // Alto
        return '#7F1D1D'; // Extremo
    };

    return (
        <div className="p-8 bg-slate-50 min-h-full font-sans space-y-8">

            {/* HEADER INTERACTIVO */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
                                <Droplets className="h-3 w-3 text-blue-500" />
                                Seguridad Hídrica (WRI Aqueduct)
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="relative group">
                                    <select
                                        className="appearance-none bg-transparent text-2xl font-serif font-bold text-slate-800 cursor-pointer pr-8 focus:outline-none hover:text-brand-primary transition-colors"
                                        value={selectedIso}
                                        onChange={handleCountryChange}
                                    >
                                        {Object.entries(SICA_COORDINATES).filter(([k]) => k !== 'regional').map(([code, val]) => (
                                            <option key={code} value={code}>{val.name}</option>
                                        ))}
                                        <option value="regional">Toda la Región SICA</option>
                                    </select>
                                    <ArrowDown className="h-4 w-4 text-slate-800 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button onClick={() => setShowHelp(true)} variant="ghost" size="sm" className="text-slate-500 hover:text-brand-primary">
                                <HelpCircle className="h-5 w-5" />
                            </Button>
                            <ShareButton />
                            <Button variant="white" size="sm" className="text-slate-600 border-slate-200 hover:bg-slate-50">
                                <Download className="h-4 w-4 mr-2" /> Exportar PDF
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                <Card className="p-0 overflow-hidden border-2 border-slate-200">
                    <MiniMap
                        center={[mapView.lat, mapView.lon]}
                        zoom={mapView.zoom}
                    />
                    <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-center text-slate-500">
                        Visualizando: Mapa General - {countryName}
                    </div>
                </Card>

                {/* NARRATIVA */}
                <Card className="p-6 bg-white border-l-4 border-l-blue-500 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-blue-500" />
                        Diagnóstico: Estrés Hídrico en {countryName}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                        <strong>{countryName}</strong> presenta un nivel de estrés hídrico clasificado como
                        <span className="font-bold px-2 py-0.5 rounded ml-1 text-white" style={{ backgroundColor: getScoreColor(data.stress) }}>{data.stressLabel.toUpperCase()} ({data.stress})</span>.
                        El riesgo general asociado a la gestión del recurso, incluyendo sequías e inundaciones, se estima en un <strong>{data.risk}%</strong>,
                        lo que requiere medidas urgentes de adaptación.
                    </p>
                </Card>

                {/* KPI CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        title="Puntuación Estrés Hídrico"
                        value={data.stress}
                        unit="/ 5.0"
                        subtitle="Ratio de extracción total vs. recursos renovables disponibles."
                        colorClass="border-t-blue-500"
                        icon={Droplets}
                    />
                    <StatCard
                        title="Riesgo de Sequía"
                        value={data.profile.find(p => p.s === 'Sequía')?.v}
                        unit="Score (0-100)"
                        subtitle="Probabilidad e impacto estimado de eventos de sequía."
                        colorClass="border-t-orange-500"
                        icon={CloudRain}
                    />
                    <StatCard
                        title="Acceso Agua Potable"
                        value={`${data.access}%`}
                        unit="cobertura"
                        subtitle="Porcentaje de población con acceso a fuentes mejoradas."
                        colorClass="border-t-slate-800"
                        icon={AlertTriangle}
                    />
                </div>

                {/* MAIN CHART */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="p-6 bg-white shadow-sm h-[450px]">
                        <h3 className="text-lg font-bold text-slate-800 mb-6">Perfil de Riesgo Hídrico</h3>
                        <ResponsiveContainer width="100%" height="80%">
                            <RadarChart outerRadius={120} data={data.profile}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="s" tick={{ fill: '#64748b', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                                <Radar name="Riesgo" dataKey="v" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.5} />
                                <Tooltip />
                            </RadarChart>
                        </ResponsiveContainer>
                    </Card>

                    <Card className="p-6 bg-white shadow-sm h-[450px] flex flex-col justify-center items-center text-center">
                        <div className="p-6 rounded-full bg-blue-50 mb-4">
                            <Droplets className="h-16 w-16 text-blue-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">Recomendaciones para {countryName}</h3>
                        <ul className="text-slate-600 space-y-2 text-left bg-slate-50 p-6 rounded-lg w-full max-w-md">
                            <li className="flex items-start gap-2"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>Fortalecer la infraestructura de almacenamiento.</li>
                            <li className="flex items-start gap-2"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>Implementar sistemas de riego eficiente en agricultura.</li>
                            <li className="flex items-start gap-2"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>Proteger las zonas de recarga hídrica en cuencas altas.</li>
                        </ul>
                    </Card>
                </div>
            </div>
            <DataSourceModal
                isOpen={showHelp}
                onClose={() => setShowHelp(false)}
                title="Fuente de Datos: Seguridad Hídrica"
                sources={dataSources}
            />
        </div >
    );
};