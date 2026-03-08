import React, { useState, useEffect } from 'react';
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sun, CloudRain, Loader2, AlertOctagon, ArrowLeft, ArrowDown, Share2, Download, Thermometer, Wind, HelpCircle } from 'lucide-react';
import { Card, Button, Badge, DataSourceModal, ShareButton } from '../../components/ui/Shared';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MiniMap } from '../../components/map/MiniMap';

const POINTS = [
    { name: 'Guatemala City (GT)', lat: 14.63, lon: -90.50, country: 'Guatemala' },
    { name: 'Tegucigalpa (HN)', lat: 14.07, lon: -87.20, country: 'Honduras' },
    { name: 'San Salvador (SV)', lat: 13.69, lon: -89.21, country: 'El Salvador' },
    { name: 'Managua (NI)', lat: 12.11, lon: -86.23, country: 'Nicaragua' },
    { name: 'San José (CR)', lat: 9.92, lon: -84.09, country: 'Costa Rica' },
    { name: 'Panama City (PA)', lat: 8.98, lon: -79.51, country: 'Panamá' },
    { name: 'Belmopan (BZ)', lat: 17.25, lon: -88.76, country: 'Belize' },
    { name: 'Santo Domingo (DO)', lat: 18.48, lon: -69.93, country: 'Rep. Dominicana' },
    { name: 'Corredor Seco (Chiquimula)', lat: 14.79, lon: -89.54, country: 'Guatemala (Corredor Seco)' },
    { name: 'Promedio Regional (SICA)', lat: 13.50, lon: -85.00, country: 'Región SICA (Centro Geográfico)' }
];

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

export const ClimateDashboard = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const locationParam = searchParams.get('location');
    const point = POINTS.find(p => p.name === locationParam) || POINTS[POINTS.length - 1];
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState({ temp: 0, rain: 0 });
    const [showHelp, setShowHelp] = useState(false);

    const dataSources = [
        { name: "Pronóstico Meteorológico", description: "Previsión a 7 días de temperatura y precipitación.", provider: "Open-Meteo API", updateFrequency: "Horaria" },
        { name: "Datos Históricos", description: "Registro climático de las últimas décadas.", provider: "ERA5 Reanalysis", updateFrequency: "Mensual" }
    ];

    useEffect(() => {
        setLoading(true);
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${point.lat}&longitude=${point.lon}&daily=temperature_2m_max,precipitation_sum&timezone=auto&past_days=90`)
            .then(r => r.json())
            .then(d => {
                if (d.daily) {
                    const formatted = d.daily.time.map((t, i) => ({
                        date: t,
                        temp: d.daily.temperature_2m_max[i],
                        rain: d.daily.precipitation_sum[i]
                    }));
                    setData(formatted);

                    const last = formatted[formatted.length - 1];
                    // Simple summary stats
                    setSummary({
                        temp: last ? last.temp : 0,
                        rain: formatted.reduce((acc, curr) => acc + curr.rain, 0).toFixed(1)
                    });
                }
                setLoading(false);
            })
            .catch(e => {
                console.error(e);
                setLoading(false);
            });
    }, [point]);

    const handleLocationChange = (e) => {
        setSearchParams({ location: e.target.value });
    };

    return (
        <div className="p-8 bg-slate-50 min-h-full font-sans space-y-8">

            {/* HEADER INTERACTIVO */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
                                <Sun className="h-3 w-3 text-orange-500" />
                                Monitor Climático (Open-Meteo API)
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="relative group">
                                    <select
                                        className="appearance-none bg-transparent text-2xl font-serif font-bold text-slate-800 cursor-pointer pr-8 focus:outline-none hover:text-brand-primary transition-colors"
                                        value={point.name}
                                        onChange={handleLocationChange}
                                    >
                                        {POINTS.map(p => (
                                            <option key={p.name} value={p.name}>{p.name}</option>
                                        ))}
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
                            <Button variant="white" size="sm" className="text-slate-600 border-slate-200 hover:bg-slate-50">
                                <Download className="h-4 w-4 mr-2" /> Exportar (CSV)
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                <Card className="p-0 overflow-hidden border-2 border-slate-200">
                    <MiniMap
                        markers={POINTS.map(p => ({ lat: p.lat, lon: p.lon, popup: p.name, color: '#3B82F6' }))}
                        center={[13.5, -85.0]}
                        zoom={5}
                    />
                    <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-center text-slate-500">
                        Visualizando: Estaciones Meteorológicas (Open-Meteo)
                    </div>
                </Card>

                {/* NARRATIVA */}
                <Card className="p-6 bg-white border-l-4 border-l-orange-500 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <Thermometer className="h-5 w-5 text-orange-500" />
                        Reporte Diario: {point.country}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                        {loading ? (
                            <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Obteniendo pronóstico...</span>
                        ) : (
                            <>
                                La temperatura máxima registrada hoy en <strong>{point.name}</strong> es de <span className="font-bold text-slate-900">{summary.temp}°C</span>.
                                En los últimos 90 días, se han acumulado <span className="font-bold text-blue-600">{summary.rain} mm</span> de precipitación,
                                lo que indica {summary.rain < 100 ? 'un periodo de déficit hídrico importante' : 'condiciones de humedad favorables'}.
                            </>
                        )}
                    </p>
                </Card>

                {/* KPI CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        title="Temperatura Máxima (Hoy)"
                        value={summary.temp}
                        unit="°C"
                        subtitle="Dato en tiempo real (2m sobre suelo)."
                        colorClass="border-t-orange-500"
                        icon={Sun}
                    />
                    <StatCard
                        title="Lluvia Acumulada (90d)"
                        value={summary.rain}
                        unit="mm"
                        subtitle="Precipitación total trimestral."
                        colorClass="border-t-blue-500"
                        icon={CloudRain}
                    />
                    <StatCard
                        title="Riesgo de Sequía"
                        value={summary.rain < 50 ? "Severo" : summary.rain < 200 ? "Moderado" : "Bajo"}
                        unit="Nivel"
                        subtitle="Basado en déficit pluviométrico reciente."
                        colorClass={summary.rain < 50 ? "border-t-red-500" : summary.rain < 200 ? "border-t-yellow-500" : "border-t-green-500"}
                        icon={AlertOctagon}
                    />
                </div>

                {/* MAIN CHART */}
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                    <Card className="p-6 bg-white shadow-sm h-[400px]">
                        <h3 className="text-lg font-bold text-slate-800 mb-6">Dinámica Climática (Últimos 90 Días)</h3>
                        {loading ? <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-slate-300" /></div> : (
                            <ResponsiveContainer width="100%" height="90%">
                                <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="date" minTickGap={30} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                                    <YAxis yAxisId="left" orientation="left" stroke="#F97316" label={{ value: 'Temp (°C)', angle: -90, position: 'insideLeft', fill: '#F97316' }} />
                                    <YAxis yAxisId="right" orientation="right" stroke="#3B82F6" label={{ value: 'Lluvia (mm)', angle: 90, position: 'insideRight', fill: '#3B82F6' }} />
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <Area yAxisId="right" type="monotone" dataKey="rain" name="Precipitación" fill="#3B82F6" fillOpacity={0.1} stroke="#3B82F6" />
                                    <Line yAxisId="left" type="monotone" dataKey="temp" name="Temp. Max" stroke="#F97316" strokeWidth={2} dot={false} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        )}
                    </Card>
                </div>
                <DataSourceModal
                    isOpen={showHelp}
                    onClose={() => setShowHelp(false)}
                    title="Fuente de Datos: Monitor Climático"
                    sources={dataSources}
                />
            </div>
        </div>
    );
};