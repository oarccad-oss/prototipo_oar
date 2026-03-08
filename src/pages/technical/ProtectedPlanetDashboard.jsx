import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Shield, Mountain, Anchor, ArrowLeft, ArrowDown, Share2, Download, TrendingUp, MapPin, HelpCircle } from 'lucide-react';
import { Card, Badge, Button, DataSourceModal, ShareButton } from '../../components/ui/Shared';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MiniMap } from '../../components/map/MiniMap';
import { SICA_COORDINATES, SICA_COUNTRIES } from '../../api/constants';

// Datos Simulados Enriquecidos (Mock WDPA API)
const WDPA_DATA = {
    'GT': { land: 30.8, marine: 1.2, totalAreas: 349, growth: 1.5, top: [{ name: "Reserva de la Biosfera Maya", km2: 21602, type: "Reserva de Biosfera" }, { name: "Sierra de las Minas", km2: 2426, type: "Reserva de Biosfera" }, { name: "Adolfo V. Hall", km2: 890, type: "Parque Nacional" }, { name: "Manchón Guamuchal", km2: 780, type: "Humedal" }, { name: "Atitlán", km2: 650, type: "Parque Nacional" }] },
    'HN': { land: 26.5, marine: 4.8, totalAreas: 91, growth: 0.8, top: [{ name: "Río Plátano", km2: 5250, type: "Reserva de Biosfera" }, { name: "Patuca", km2: 3760, type: "Parque Nacional" }, { name: "Tawahka Asangni", km2: 2331, type: "Reserva de Biosfera" }] },
    'NI': { land: 37.2, marine: 2.5, totalAreas: 76, growth: 0.2, top: [{ name: "Bosawás", km2: 20000, type: "Reserva de Biosfera" }, { name: "Indio Maíz", km2: 3180, type: "Reserva Biológica" }] },
    'CR': { land: 25.4, marine: 27.8, totalAreas: 161, growth: 2.1, top: [{ name: "La Amistad", km2: 1991, type: "Parque Internacional" }, { name: "Isla del Coco", km2: 2034, type: "Parque Nacional" }, { name: "Tortuguero", km2: 769, type: "Parque Nacional" }] },
    'PA': { land: 36.2, marine: 32.5, totalAreas: 105, growth: 1.2, top: [{ name: "Darién", km2: 5790, type: "Parque Nacional" }, { name: "Coiba", km2: 2701, type: "Parque Nacional" }] },
    'SV': { land: 2.3, marine: 0.8, totalAreas: 121, growth: 0.1, top: [{ name: "El Imposible", km2: 38, type: "Parque Nacional" }, { name: "Montecristo", km2: 20, type: "Parque Nacional" }] },
    'BZ': { land: 38.4, marine: 18.2, totalAreas: 110, growth: 0.5, top: [{ name: "Chiquibul", km2: 1073, type: "Parque Nacional" }, { name: "Cockscomb Basin", km2: 518, type: "Santuario de Vida Silvestre" }] },
    'DO': { land: 24.8, marine: 15.6, totalAreas: 128, growth: 0.9, top: [{ name: "Jaragua", km2: 1374, type: "Parque Nacional" }, { name: "Del Este", km2: 419, type: "Parque Nacional" }] },
    'regional': { land: 27.5, marine: 12.8, totalAreas: 1140, growth: 1.1, top: [{ name: "Reserva de la Biosfera Maya (GT)", km2: 21602, type: "Reserva de Biosfera" }, { name: "Bosawás (NI)", km2: 20000, type: "Reserva de Biosfera" }, { name: "Río Plátano (HN)", km2: 5250, type: "Reserva de Biosfera" }, { name: "La Amistad (CR/PA)", km2: 4010, type: "Parque Internacional" }] }
};



const StatCard = ({ title, value, unit, colorClass, subtitle, icon: Icon }) => (
    <div className={`bg-white p-6 border-t-4 ${colorClass} shadow-sm hover:shadow-md transition-shadow relative overflow-hidden`}>
        <div className="flex justify-between items-start mb-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</h4>
            {Icon && <Icon className="h-5 w-5 text-slate-200" />}
        </div>
        <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold text-slate-800">
                {value}%
            </span>
            <span className="text-sm font-medium text-slate-500">{unit}</span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">{subtitle}</p>
    </div>
);

export const ProtectedPlanetDashboard = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedIso = searchParams.get('country') || 'GT';
    const [loading, setLoading] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    const dataSources = [
        { name: "Áreas Protegidas (WDPA)", description: "Base de datos mundial de áreas protegidas terrestres y marinas.", provider: "UNEP-WCMC / IUCN", updateFrequency: "Mensual" },
        { name: "OECMs", description: "Otras medidas efectivas de conservación basadas en áreas.", provider: "UNEP-WCMC", updateFrequency: "Mensual" }
    ];

    const data = WDPA_DATA[selectedIso] || WDPA_DATA['regional'];
    const countryName = SICA_COORDINATES[selectedIso]?.name || (selectedIso === 'regional' ? "Región SICA" : "Guatemala");
    const mapView = SICA_COORDINATES[selectedIso] || SICA_COORDINATES['regional'];

    const handleCountryChange = (e) => {
        setLoading(true);
        setSearchParams({ country: e.target.value });
        setTimeout(() => setLoading(false), 500);
    };

    // Chart Data Mock
    const breakdownData = [
        { name: 'Terrestre', value: data.land, fill: '#89C441' },
        { name: 'Marina', value: data.marine, fill: '#3B82F6' },
        { name: 'Sin Protección', value: 100 - (data.land + data.marine > 100 ? 100 : data.land + data.marine), fill: '#E2E8F0' }
    ];

    return (
        <div className="p-8 bg-slate-50 min-h-full font-sans space-y-8">

            {/* HEADER INTERACTIVO */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
                                <Shield className="h-3 w-3 text-[#89C441]" />
                                Base de Datos Mundial de Áreas Protegidas (WDPA)
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
                        layers={[{ url: 'https://tiles.unep-wcmc.org/arcgis/rest/services/ProtectedSites/The_World_Database_of_Protected_Areas/MapServer/tile/{z}/{y}/{x}', opacity: 0.7 }]}
                        center={[mapView.lat, mapView.lon]}
                        zoom={mapView.zoom}
                    />
                    <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-center text-slate-500">
                        Visualizando: Áreas Protegidas (WDPA) - {countryName}
                    </div>
                </Card>

                {/* NARRATIVA */}
                <Card className="p-6 bg-white border-l-4 border-l-[#89C441] shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-[#89C441]" />
                        Estado de Conservación: {countryName}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                        <strong>{countryName}</strong> ha protegido oficialmente el <span className="text-[#89C441] font-bold">{data.land}%</span> de su territorio terrestre y
                        el <span className="text-blue-500 font-bold">{data.marine}%</span> de su zona económica exclusiva (ZEE).
                        El sistema cuenta con <span className="font-bold text-slate-800">{data.totalAreas} áreas protegidas</span> registradas
                        {data.growth > 0 && <span>, mostrando un crecimiento del <strong>{data.growth}%</strong> respecto al año anterior</span>}.
                    </p>
                </Card>

                {/* KPI CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        title="Cobertura Terrestre"
                        value={data.land}
                        unit="del territorio"
                        subtitle="Superficie bajo régimen de protección legal."
                        colorClass="border-t-[#89C441]"
                        icon={Mountain}
                    />
                    <StatCard
                        title="Cobertura Marina"
                        value={data.marine}
                        unit="de la ZEE"
                        subtitle="Áreas marinas protegidas y reservas costeras."
                        colorClass="border-t-blue-500"
                        icon={Anchor}
                    />
                    <div className="bg-white p-6 border-t-4 border-t-slate-800 shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Total Áreas</h4>
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-3xl font-extrabold text-slate-800">{data.totalAreas}</span>
                            <span className="text-sm font-medium text-slate-500">unidades</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">Parques nacionales, reservas y refugios.</p>
                    </div>
                </div>

                {/* MAIN CHART & LIST */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card className="p-6 bg-white shadow-sm flex flex-col h-[400px]">
                            <h3 className="text-lg font-bold text-slate-800 mb-6">Proporción de Territorio Protegido</h3>
                            <div className="flex-1 w-full min-h-0 relative">
                                <ResponsiveContainer width="99%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={breakdownData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={80}
                                            outerRadius={120}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {breakdownData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => `${value}%`} contentStyle={{ borderRadius: '8px', border: 'none' }} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </div>

                    <div className="lg:col-span-1">
                        <Card className="p-6 bg-white shadow-sm h-full">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Áreas Más Extensas</h3>
                            <div className="space-y-4 overflow-y-auto max-h-[320px] pr-2 custom-scrollbar">
                                {data.top.map((area, i) => (
                                    <div key={i} className="flex justify-between items-start p-3 bg-slate-50 rounded-lg group hover:bg-slate-100 transition-colors">
                                        <div>
                                            <div className="font-bold text-slate-700 text-sm">{i + 1}. {area.name}</div>
                                            <div className="text-xs text-slate-500">{area.type}</div>
                                        </div>
                                        <Badge variant="outline" className="bg-white whitespace-nowrap text-xs">{new Intl.NumberFormat('es-GT').format(area.km2)} km²</Badge>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            <DataSourceModal
                isOpen={showHelp}
                onClose={() => setShowHelp(false)}
                title="Fuente de Datos: Áreas Protegidas"
                sources={dataSources}
            />
        </div>
    );
};