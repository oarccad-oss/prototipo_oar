import React, { useState } from 'react';
import { Card, Button, Badge, DataSourceModal, ShareButton } from '../../components/ui/Shared';
import { Anchor, ThermometerSun, ArrowLeft, ArrowDown, Share2, Download, TrendingUp, Fish, Waves, HelpCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MiniMap } from '../../components/map/MiniMap';
import { SICA_COORDINATES } from '../../api/constants';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';

const OCEAN_DATA = {
    'BZ': { sst: 29.5, anomaly: 1.2, coralRisk: 'Alto', riskLevel: 'Alerta 1', healthIndex: 72, trend: [{ m: 'Ene', v: 27.5 }, { m: 'Feb', v: 27.8 }, { m: 'Mar', v: 28.1 }, { m: 'Abr', v: 28.5 }, { m: 'May', v: 29.0 }, { m: 'Jun', v: 29.5 }] },
    'HN': { sst: 28.8, anomaly: 0.8, coralRisk: 'Medio', riskLevel: 'Vigilancia', healthIndex: 68, trend: [{ m: 'Ene', v: 27.0 }, { m: 'Feb', v: 27.2 }, { m: 'Mar', v: 27.5 }, { m: 'Abr', v: 28.0 }, { m: 'May', v: 28.5 }, { m: 'Jun', v: 28.8 }] },
    'PA': { sst: 27.4, anomaly: 0.4, coralRisk: 'Bajo', riskLevel: 'Normal', healthIndex: 75, trend: [{ m: 'Ene', v: 26.5 }, { m: 'Feb', v: 26.8 }, { m: 'Mar', v: 27.0 }, { m: 'Abr', v: 27.2 }, { m: 'May', v: 27.3 }, { m: 'Jun', v: 27.4 }] },
    'CR': { sst: 28.0, anomaly: 0.6, coralRisk: 'Medio', riskLevel: 'Vigilancia', healthIndex: 78, trend: [{ m: 'Ene', v: 27.0 }, { m: 'Feb', v: 27.3 }, { m: 'Mar', v: 27.6 }, { m: 'Abr', v: 27.8 }, { m: 'May', v: 27.9 }, { m: 'Jun', v: 28.0 }] },
    'GT': { sst: 29.1, anomaly: 1.0, coralRisk: 'Alto', riskLevel: 'Vigilancia', healthIndex: 65, trend: [{ m: 'Ene', v: 27.8 }, { m: 'Feb', v: 28.0 }, { m: 'Mar', v: 28.3 }, { m: 'Abr', v: 28.8 }, { m: 'May', v: 29.0 }, { m: 'Jun', v: 29.1 }] },
    'SV': { sst: 29.8, anomaly: 1.5, coralRisk: 'Critico', riskLevel: 'Alerta 2', healthIndex: 62, trend: [{ m: 'Ene', v: 28.0 }, { m: 'Feb', v: 28.5 }, { m: 'Mar', v: 28.9 }, { m: 'Abr', v: 29.2 }, { m: 'May', v: 29.5 }, { m: 'Jun', v: 29.8 }] },
    'NI': { sst: 28.5, anomaly: 0.7, coralRisk: 'Medio', riskLevel: 'Vigilancia', healthIndex: 70, trend: [{ m: 'Ene', v: 27.2 }, { m: 'Feb', v: 27.5 }, { m: 'Mar', v: 27.8 }, { m: 'Abr', v: 28.1 }, { m: 'May', v: 28.3 }, { m: 'Jun', v: 28.5 }] },
    'DO': { sst: 28.9, anomaly: 0.9, coralRisk: 'Alto', riskLevel: 'Alerta 1', healthIndex: 69, trend: [{ m: 'Ene', v: 27.4 }, { m: 'Feb', v: 27.7 }, { m: 'Mar', v: 28.0 }, { m: 'Abr', v: 28.4 }, { m: 'May', v: 28.7 }, { m: 'Jun', v: 28.9 }] },
    'regional': { sst: 28.5, anomaly: 0.88, coralRisk: 'Medio', riskLevel: 'Vigilancia', healthIndex: 71, trend: [{ m: 'Ene', v: 27.3 }, { m: 'Feb', v: 27.6 }, { m: 'Mar', v: 27.9 }, { m: 'Abr', v: 28.3 }, { m: 'May', v: 28.6 }, { m: 'Jun', v: 28.8 }] }
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

export const OceanDashboard = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedIso = searchParams.get('country') || 'regional';
    const [loading, setLoading] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    const dataSources = [
        { name: "SST (Temperatura Superficial)", description: "Temperatura superficial del mar en tiempo real.", provider: "NOAA Coral Reef Watch", updateFrequency: "Diaria" },
        { name: "Anomalía Térmica", description: "Desviación de la temperatura respecto a la media histórica.", provider: "NOAA Coral Reef Watch", updateFrequency: "Diaria" },
        { name: "Alerta de Blanqueamiento", description: "Nivel de estrés térmico acumulado en arrecifes de coral.", provider: "NOAA CRW", updateFrequency: "Semanal" }
    ];

    const data = OCEAN_DATA[selectedIso] || OCEAN_DATA['regional'];
    const countryName = SICA_COORDINATES[selectedIso]?.name || (selectedIso === 'regional' ? "Región SICA" : "Belize");
    const mapView = SICA_COORDINATES[selectedIso] || SICA_COORDINATES['regional'];

    const handleCountryChange = (e) => {
        setLoading(true);
        setSearchParams({ country: e.target.value });
        setTimeout(() => setLoading(false), 500);
    };

    const getAlertColor = (level) => {
        if (level === 'Normal') return 'text-green-500';
        if (level === 'Vigilancia') return 'text-yellow-500';
        if (level.includes('Alerta')) return 'text-red-500';
        return 'text-slate-500';
    };

    return (
        <div className="p-8 bg-slate-50 min-h-full font-sans space-y-8">

            {/* HEADER INTERACTIVO */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
                                <ThermometerSun className="h-3 w-3 text-cyan-500" />
                                Monitor Océanos (NOAA Coral Reef Watch)
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
                        layers={[{ url: 'https://tiles.globalforestwatch.org/coral_bleaching/{z}/{x}/{y}.png' }]}
                        center={[16.0, -84.0]}
                        zoom={5}
                    />
                    <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-center text-slate-500">
                        Visualizando: Estrés Térmico de Corales (NOAA) - Región SICA
                    </div>
                </Card>

                {/* NARRATIVA */}
                <Card className="p-6 bg-white border-l-4 border-l-cyan-500 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-cyan-500" />
                        Salud Oceánica: Situación en {countryName}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                        Las aguas costeras de <strong>{countryName}</strong> registran una temperatura superficial de <span className="font-bold text-slate-900">{data.sst}°C</span>,
                        con una anomalía térmica de <span className="bg-red-50 text-red-600 px-1 rounded font-bold">+{data.anomaly}°C</span> respecto a la media histórica.
                        El sistema de alerta temprana de arrecifes de coral indica un nivel de <strong className={getAlertColor(data.riskLevel)}>{data.riskLevel.toUpperCase()}</strong>.
                    </p>
                </Card>

                {/* KPI CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        title="Temp. Superficial (SST)"
                        value={data.sst}
                        unit="°C"
                        subtitle={`Anomalía de +${data.anomaly}°C detectada por satélite.`}
                        colorClass="border-t-cyan-500"
                        icon={Waves}
                    />
                    <StatCard
                        title="Riesgo de Blanqueamiento"
                        value={data.riskLevel}
                        unit="Nivel"
                        subtitle="Índice de estrés térmico acumulado (DHW)."
                        colorClass={data.riskLevel.includes('Alerta') ? 'border-t-red-500' : 'border-t-yellow-500'}
                        icon={ThermometerSun}
                    />
                    <StatCard
                        title="Índice de Salud Oceánica"
                        value={data.healthIndex}
                        unit="/ 100"
                        subtitle="Puntuación global de biodiversidad y servicios."
                        colorClass="border-t-slate-800"
                        icon={Fish}
                    />
                </div>

                {/* MAIN CHART */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card className="p-6 bg-white shadow-sm h-[400px] flex flex-col">
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-slate-800">Tendencia Térmica (6 Meses)</h3>
                                <p className="text-sm text-slate-500">Temperatura superficial del mar registrada.</p>
                            </div>
                            <div className="flex-1 w-full min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data.trend}>
                                        <defs>
                                            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                        <XAxis dataKey="m" axisLine={false} tickLine={false} />
                                        <YAxis domain={['dataMin - 1', 'dataMax + 1']} axisLine={false} tickLine={false} />
                                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Area type="monotone" dataKey="v" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </div>

                    <div className="lg:col-span-1">
                        <Card className="p-6 bg-white shadow-sm h-full flex flex-col justify-center text-center">
                            <Anchor className="h-16 w-16 text-cyan-200 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Recursos Marinos</h3>
                            <p className="text-slate-500 mb-6">
                                El monitoreo continuo es esencial para la gestión de pesquerías y la conservación de ecosistemas costeros en la región SICA.
                            </p>
                            <Button className="bg-cyan-600 hover:bg-cyan-700 w-full text-white">
                                <Fish className="mr-2 h-4 w-4" /> Ver Datos de Pesca
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>

            <DataSourceModal
                isOpen={showHelp}
                onClose={() => setShowHelp(false)}
                title="Fuente de Datos: Monitor Océanos"
                sources={dataSources}
            />
        </div>
    );
};