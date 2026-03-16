import React, { useState, useEffect } from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area
} from 'recharts';
import { Flame, AlertTriangle, RefreshCw, ArrowLeft, ArrowDown, Share2, Download, TrendingUp, MapPin, HelpCircle } from 'lucide-react';
import { Card, Button, Badge, DataSourceModal, ShareButton } from '../../../components/ui/Shared';
import { useNavigate, useSearchParams } from 'react-router-dom';

// Eliminadas constantes locales para usar fetch remoto


import { MiniMap } from '../../../components/map/MiniMap';
import { SICA_COORDINATES } from '../../../data/constants';

// Datos Simulados de Incendios (Ubicación aprox.)
const FIRE_POINTS = [
    { lat: 17.5, lon: -90.5, country: 'GT', popup: 'Peten, Guatemala (Alta Confianza)' },
    { lat: 15.5, lon: -89.0, country: 'GT', popup: 'Sierra de las Minas, Guatemala' },
    { lat: 14.8, lon: -87.0, country: 'HN', popup: 'Olancho, Honduras' },
    { lat: 13.5, lon: -85.5, country: 'NI', popup: 'Bosawas, Nicaragua' },
    { lat: 9.5, lon: -83.5, country: 'CR', popup: 'Talamanca, Costa Rica' },
    { lat: 8.5, lon: -80.0, country: 'PA', popup: 'Darien, Panama' },
    { lat: 17.0, lon: -88.5, country: 'BZ', popup: 'Chiquibul, Belize' },
    { lat: 18.5, lon: -70.5, country: 'DO', popup: 'Cordillera Central, Rep. Dom.' }
];

const StatCard = ({ title, value, unit, colorClass, subtitle }) => (
    <div className={`bg-white p-6 border-t-4 ${colorClass} shadow-sm hover:shadow-md transition-shadow`}>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{title}</h4>
        <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold text-slate-800">
                {new Intl.NumberFormat('es-GT').format(value)}
            </span>
            <span className="text-sm font-medium text-slate-500">{unit}</span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">{subtitle}</p>
    </div>
);

export const AnswerActiveFires = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedIso = searchParams.get("country") || "regional";
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showHelp, setShowHelp] = useState(false);

    const dataSources = [
        { name: "Alertas de Incendio", description: "Detecciones de anomalías térmicas (incendios activos) en tiempo real vía satélite.", provider: "NASA FIRMS (MODIS/VIIRS)", updateFrequency: "Tiempo Real" },
        { name: "Área Quemada", description: "Estimación de superficie afectada por incendios.", provider: "GWIS (Global Wildfire Info System)", updateFrequency: "Mensual" }
    ];

    useEffect(() => {
        setLoading(true);
        const remoteUrl = `https://raw.githubusercontent.com/mapgisdev/prototipo_oar/main/public/api/fires_data.json`;

        fetch(remoteUrl)
            .then(res => res.json())
            .then(allData => {
                setData(allData[selectedIso] || allData['regional']);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching remote fires data:", err);
                setLoading(false);
            });
    }, [selectedIso]);

    const countryName = SICA_COORDINATES[selectedIso]?.name || (selectedIso === 'regional' ? "Región SICA" : "Guatemala");
    const mapView = SICA_COORDINATES[selectedIso] || SICA_COORDINATES['regional'];

    // Filtro de Puntos
    const activePoints = selectedIso === 'regional'
        ? FIRE_POINTS
        : FIRE_POINTS.filter(p => p.country === selectedIso);

    // Mapeo para visualización (color rojo)
    const mapMarkers = activePoints.map(p => ({ ...p, type: 'circle', color: '#EF4444' }));

    // Simular carga al cambiar país
    const handleCountryChange = (e) => {
        setLoading(true);
        setSearchParams({ country: e.target.value });
        setTimeout(() => setLoading(false), 500);
    };

    return (
        <div className="p-8 bg-slate-50 min-h-full font-sans space-y-8">

            {/* HEADER INTERACTIVO */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
                                <Flame className="h-3 w-3 text-orange-500" />
                                Monitoreo de Incendios (NASA FIRMS / VIIRS)
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
                        markers={mapMarkers}
                        center={[mapView.lat, mapView.lon]}
                        zoom={mapView.zoom}
                    />
                    <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-center text-slate-500">
                        Visualizando: Puntos de Calor (VIIRS) - {countryName}
                    </div>
                </Card>

                {/* NARRATIVA */}
                <Card className="p-6 bg-white border-l-4 border-l-orange-500 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                        Situación Actual: {countryName}
                    </h3>
                    {data ? (
                        <p className="text-slate-600 leading-relaxed text-lg">
                            En las últimas 24 horas, se han detectado <span className="font-bold text-slate-900">{data.alerts} focos de calor</span> en <strong>{countryName}</strong>.
                            De estos, <span className="bg-red-100 text-red-800 px-1 rounded font-bold">{data.highConfidence}</span> son de alta confianza,
                            lo que representa un riesgo significativo para la calidad del aire y la cobertura forestal.
                        </p>
                    ) : (
                        <div className="h-20 animate-pulse bg-slate-100 rounded"></div>
                    )}
                </Card>

                {/* KPI CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        title="Alertas (24h)"
                        value={data?.alerts || 0}
                        unit="focos"
                        subtitle="Puntos de calor detectados por satélite VIIRS."
                        colorClass="border-t-orange-500"
                    />
                    <StatCard
                        title="Alta Confianza"
                        value={data?.highConfidence || 0}
                        unit="alertas"
                        subtitle="Probabilidad >80% de ser un incendio activo."
                        colorClass="border-t-red-600"
                    />
                    <StatCard
                        title="Superficie Afectada"
                        value={data?.area || 0}
                        unit="ha"
                        subtitle="Estimación basada en el radio de detección."
                        colorClass="border-t-slate-800"
                    />
                </div>

                {/* MAIN CHART */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card className="p-6 bg-white shadow-sm h-[400px] flex flex-col">
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-slate-800">Tendencia de Actividad (7 Días)</h3>
                                <p className="text-sm text-slate-500">Número de alertas diarias registradas.</p>
                            </div>
                            <div className="flex-1 w-full min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data?.trend || []}>
                                        <defs>
                                            <linearGradient id="colorFire" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#F97316" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                        <XAxis dataKey="d" axisLine={false} tickLine={false} />
                                        <YAxis axisLine={false} tickLine={false} />
                                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Area type="monotone" dataKey="v" stroke="#F97316" strokeWidth={3} fillOpacity={1} fill="url(#colorFire)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </div>

                    <div className="lg:col-span-1">
                        <Card className="p-6 bg-white shadow-sm h-full">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Fuentes de Datos</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                        <span className="text-xs font-bold text-slate-700">VIIRS S-NPP</span>
                                    </div>
                                    <p className="text-xs text-slate-500">Resolución 375m. Actualización cada 12h.</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                        <span className="text-xs font-bold text-slate-700">MODIS Aqua/Terra</span>
                                    </div>
                                    <p className="text-xs text-slate-500">Resolución 1km. Histórico desde 2000.</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <DataSourceModal
                        isOpen={showHelp}
                        onClose={() => setShowHelp(false)}
                        title="Fuente de Datos: Monitoreo de Incendios"
                        sources={dataSources}
                    />
                </div>
            </div>
        </div>
    );
};
