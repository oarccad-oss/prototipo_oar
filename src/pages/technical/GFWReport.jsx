import React, { useState, useMemo } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line
} from 'recharts';
import { ArrowDown, Share2, Download, Leaf, AlertTriangle, TrendingUp, MapPin, ArrowLeft, HelpCircle } from 'lucide-react';
import { Card, Button, Badge, DataSourceModal, ShareButton } from '../../components/ui/Shared';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MiniMap } from '../../components/map/MiniMap';
import { SICA_COORDINATES } from '../../api/constants';
// La carga de datos se realiza ahora vía fetch desde el repositorio remoto

// Mapeo de códigos ISO para el selector


// --- COMPONENTES AUXILIARES ---

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

// --- COMPONENTE PRINCIPAL ---

export const GFWReport = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    // Estado para el filtro de país
    const selectedIso = searchParams.get("country") || "regional"; // Default Regional SICA
    const [showHelp, setShowHelp] = useState(false);

    const dataSources = [
        { name: "Pérdida de Cobertura Arbórea", description: "Identifica la eliminación de la cubierta vegetal (dosel > 30%) mediante satélites Landsat.", provider: "Hansen/UMD/Google/USGS/NASA", updateFrequency: "Anual" },
        { name: "Emisiones de CO₂", description: "Estimación de emisiones de carbono por pérdida de biomasa arbórea superficial.", provider: "Global Forest Watch", updateFrequency: "Anual" },
        { name: "Alertas GLAD", description: "Sistema de alerta temprana de deforestación basado en imágenes satelitales.", provider: "GLAD Lab (UMD)", updateFrequency: "Semanal" }
    ];

    // 1. Carga de Datos Remotos
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const countryName = SICA_COORDINATES[selectedIso]?.name || "Región SICA";
    const mapView = SICA_COORDINATES[selectedIso] || SICA_COORDINATES['regional'];

    useEffect(() => {
        setLoading(true);
        // URL del repositorio remoto (GitHub Raw)
        const remoteUrl = `https://raw.githubusercontent.com/mapgisdev/prototipo_oar/main/public/api/forest_data.json`;
        
        fetch(remoteUrl)
            .then(res => res.json())
            .then(allData => {
                // Selecciona el país o regional
                setData(allData[selectedIso] || allData['regional']);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching remote data:", err);
                setLoading(false);
            });
    }, [selectedIso]);

    // 2. Cálculos para Narrativa Dinámica (Data Storytelling)
    const stats = useMemo(() => {
        if (!data) return { topRegion: { name: '...', percent: 0 }, totalLoss: 0, percentLoss: 0 };
        const topRegion = data.topRegions?.[0] || { name: 'Múltiples zonas', percent: 0, value: 0 };
        const totalLoss = data.lossTotal || 0;
        const treeCoverRef = data.treeCover || 1; // Evitar división por cero
        const percentLoss = ((totalLoss / treeCoverRef) * 100).toFixed(1);

        return { topRegion, totalLoss, percentLoss };
    }, [data]);

    // Formateador de ejes (e.g., 1500 -> 1.5k)
    const kFormatter = (num) => {
        return Math.abs(num) > 999
            ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k'
            : Math.sign(num) * Math.abs(num);
    };

    // Formateador de números local
    const fmt = (num) => new Intl.NumberFormat('es-GT').format(num);

    return (
        <div className="p-8 bg-slate-50 min-h-full font-sans space-y-8">
            {/* HEADER INTERACTIVO */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
                                <Leaf className="h-3 w-3 text-[#97BD3D]" />
                                Análisis de Cobertura Arbórea (GFW)
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="relative group">
                                    <select
                                        className="appearance-none bg-transparent text-2xl font-serif font-bold text-slate-800 cursor-pointer pr-8 focus:outline-none hover:text-brand-primary transition-colors"
                                        value={selectedIso}
                                        onChange={(e) => setSearchParams({ country: e.target.value })}
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

            {/* 1. MAPA GEOESPACIAL (Full Width) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <Card className="p-0 overflow-hidden border-2 border-slate-200">
                    <MiniMap
                        layers={[{ url: 'https://tiles.globalforestwatch.org/umd_tree_cover_loss/latest/dynamic/{z}/{x}/{y}.png' }]}
                        center={[mapView.lat, mapView.lon]}
                        zoom={mapView.zoom}
                    />
                    <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-center text-slate-500">
                        Visualizando: Pérdida de Cobertura Arbórea (GFW) - {countryName}
                    </div>
                </Card>

                {/* 2. NARRATIVA */}
                <Card className="p-6 bg-white border-l-4 border-l-brand-primary shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-brand-primary" />
                        Resumen Ejecutivo: Situación en {countryName}
                    </h3>
                    {data ? (
                        <p className="text-slate-600 leading-relaxed text-lg">
                            Desde 2010 hasta 2023, <strong>{countryName}</strong> perdió <span className="bg-[#FE6598]/20 px-1 rounded font-bold text-[#C72E66]">{fmt(stats.totalLoss)} ha</span> de cobertura arbórea,
                            lo que equivale a una disminución del <strong>{stats.percentLoss}%</strong> de la cobertura arbórea desde el año 2010.
                            Esta pérdida ha generado aproximadamente <span className="font-bold text-slate-800">{fmt(data.co2Emissions)} Mt</span> de emisiones de CO₂e a la atmósfera.
                        </p>
                    ) : (
                        <div className="h-20 animate-pulse bg-slate-100 rounded"></div>
                    )}
                </Card>
            </div>

            {/* CONTENIDO PRINCIPAL - GRID */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

                {/* 4. TARJETAS DE DATOS (KPIs) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        title="Pérdida Total (2010-2023)"
                        value={data?.lossTotal || 0}
                        unit="ha"
                        subtitle="Pérdida bruta total de dosel arbóreo (>30% densidad)."
                        colorClass="border-t-[#FE6598]"
                    />
                    <StatCard
                        title="Pérdida Bosque Primario"
                        value={data?.primaryLoss || 0}
                        unit="ha"
                        subtitle="Bosque tropical húmedo maduro irreemplazable."
                        colorClass="border-t-[#97BD3D]"
                    />
                    <StatCard
                        title="Emisiones Totales"
                        value={data?.co2Emissions || 0}
                        unit="Mt"
                        subtitle="Megatoneladas de CO₂ liberadas por pérdida de biomasa."
                        colorClass="border-t-[#EAB839]"
                    />
                </div>

                {/* 5. GRÁFICOS Y RANKING */}
                {/* 5. GRÁFICOS Y RANKING */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Columna Izquierda: Gráfico Histórico */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Pérdida de cobertura arbórea por año</h3>
                                    <p className="text-sm text-slate-500">2010 - 2023 | &gt;30% densidad de dosel</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="h-3 w-3 rounded-full bg-[#FE6598]"></span>
                                    <span className="text-xs font-bold text-slate-600">Pérdida Anual</span>
                                </div>
                            </div>

                            <div className="h-[400px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data?.years || []} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                        <XAxis
                                            dataKey="year"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#64748b', fontSize: 12 }}
                                            dy={10}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#64748b', fontSize: 12 }}
                                            tickFormatter={kFormatter}
                                        />
                                        <Tooltip
                                            cursor={{ fill: '#FE6598', opacity: 0.1 }}
                                            contentStyle={{ borderRadius: '4px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            formatter={(value) => [`${fmt(value)} ha`, 'Pérdida']}
                                        />
                                        <Bar dataKey="loss" fill="#FE6598" radius={[2, 2, 0, 0]} barSize={40} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Gráfico Secundario (Sparkline de Emisiones) */}
                            <div className="mt-8 pt-8 border-t border-slate-100">
                                <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4 text-[#EAB839]" />
                                    Tendencia de Emisiones (Mt CO₂)
                                </h4>
                                <div className="h-[150px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={data?.years || []}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="year" hide />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} width={30} />
                                            <Tooltip contentStyle={{ fontSize: '12px' }} />
                                            <Line
                                                type="monotone"
                                                dataKey="emissions"
                                                stroke="#EAB839"
                                                strokeWidth={2}
                                                dot={false}
                                                activeDot={{ r: 4 }}
                                                name="Emisiones"
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Columna Derecha: Ranking (Top Regions) */}
                    <div className="lg:col-span-1">
                        <Card className="p-0 overflow-hidden h-full flex flex-col">
                            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                                <h3 className="font-bold text-slate-800">Ubicación principal de la pérdida</h3>
                                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                    En {countryName}, la región más afectada es <strong>{stats.topRegion.name}</strong>,
                                    responsable del <strong>{stats.topRegion.percent}%</strong> de la pérdida total histórica registrada.
                                </p>
                            </div>

                            <div className="flex-1 overflow-y-auto max-h-[600px]">
                                {data.topRegions && data.topRegions.length > 0 ? (
                                    data.topRegions.map((region, index) => (
                                        <div key={index} className="flex items-center p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors relative group">
                                            {/* Barra de fondo porcentual */}
                                            <div
                                                className="absolute left-0 top-0 bottom-0 bg-[#FE6598]/5 transition-all group-hover:bg-[#FE6598]/10"
                                                style={{ width: `${region.percent}%` }}
                                            />

                                            <div className="flex items-center justify-center w-6 h-6 rounded bg-slate-200 text-slate-600 font-bold text-xs mr-3 shrink-0 relative z-10">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1 relative z-10">
                                                <div className="flex justify-between items-baseline mb-1">
                                                    <span className="font-bold text-slate-700 text-sm truncate max-w-[140px]" title={region.name}>
                                                        {region.name}
                                                    </span>
                                                    <Badge variant="warning" className="text-[10px] py-0 h-5 bg-[#FE6598]/10 text-[#C72E66] border-0">
                                                        {region.percent}%
                                                    </Badge>
                                                </div>
                                                <div className="text-xs text-slate-400">
                                                    {fmt(region.value)} ha perdidas
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-slate-400 text-sm italic flex flex-col items-center gap-2">
                                        <MapPin className="h-8 w-8 text-slate-300" />
                                        <span>Datos subnacionales no disponibles para esta vista regional.</span>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                                <span className="text-xs text-slate-400 block">
                                    Fuente: Global Forest Watch & UMD (Hansen et al.)
                                </span>
                            </div>
                        </Card>
                    </div>

                </div>
            </div>

            <DataSourceModal
                isOpen={showHelp}
                onClose={() => setShowHelp(false)}
                title="Fuente de Datos: Análisis de Cobertura Arbórea"
                sources={dataSources}
            />
        </div >
    );
};