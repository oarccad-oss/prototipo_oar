import React, { useState } from 'react';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { Shield, Leaf, AlertCircle, Info, ArrowLeft, ArrowDown, Share2, Download, TrendingUp, Target, HelpCircle } from 'lucide-react';
import { Card, Badge, Button, DataSourceModal, ShareButton } from '../../components/ui/Shared';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MiniMap } from '../../components/map/MiniMap';
import { SICA_COORDINATES } from '../../api/constants';

const BIO_DATA = {
    'GT': { progress: { protected: 21.3, oecm: 5.1, gap: 3.6 }, integrity: [{ name: 'Alta', value: 38, color: '#15803D' }, { name: 'Media', value: 42, color: '#EAB308' }, { name: 'Baja', value: 20, color: '#EF4444' }], species: [{ group: 'Anfibios', total: 140, threatened: 85 }, { group: 'Aves', total: 320, threatened: 45 }, { group: 'Mamíferos', total: 180, threatened: 32 }] },
    'HN': { progress: { protected: 15.8, oecm: 2.0, gap: 12.2 }, integrity: [{ name: 'Alta', value: 30, color: '#15803D' }, { name: 'Media', value: 50, color: '#EAB308' }, { name: 'Baja', value: 20, color: '#EF4444' }], species: [{ group: 'Anfibios', total: 90, threatened: 50 }, { group: 'Aves', total: 400, threatened: 60 }, { group: 'Mamíferos', total: 160, threatened: 25 }] },
    'CR': { progress: { protected: 25.4, oecm: 6.5, gap: 0 }, integrity: [{ name: 'Alta', value: 50, color: '#15803D' }, { name: 'Media', value: 40, color: '#EAB308' }, { name: 'Baja', value: 10, color: '#EF4444' }], species: [{ group: 'Anfibios', total: 180, threatened: 30 }, { group: 'Aves', total: 500, threatened: 20 }, { group: 'Mamíferos', total: 200, threatened: 15 }] },
    'PA': { progress: { protected: 22.1, oecm: 4.8, gap: 3.1 }, integrity: [{ name: 'Alta', value: 45, color: '#15803D' }, { name: 'Media', value: 35, color: '#EAB308' }, { name: 'Baja', value: 20, color: '#EF4444' }], species: [{ group: 'Anfibios', total: 120, threatened: 40 }, { group: 'Aves', total: 450, threatened: 35 }, { group: 'Mamíferos', total: 190, threatened: 22 }] },
    'NI': { progress: { protected: 20.0, oecm: 3.0, gap: 7.0 }, integrity: [{ name: 'Alta', value: 35, color: '#15803D' }, { name: 'Media', value: 45, color: '#EAB308' }, { name: 'Baja', value: 20, color: '#EF4444' }], species: [{ group: 'Anfibios', total: 100, threatened: 45 }, { group: 'Aves', total: 380, threatened: 50 }, { group: 'Mamíferos', total: 150, threatened: 28 }] },
    'SV': { progress: { protected: 10.5, oecm: 1.2, gap: 18.3 }, integrity: [{ name: 'Alta', value: 10, color: '#15803D' }, { name: 'Media', value: 30, color: '#EAB308' }, { name: 'Baja', value: 60, color: '#EF4444' }], species: [{ group: 'Anfibios', total: 60, threatened: 40 }, { group: 'Aves', total: 250, threatened: 80 }, { group: 'Mamíferos', total: 100, threatened: 50 }] },
    'BZ': { progress: { protected: 28.6, oecm: 5.5, gap: 0 }, integrity: [{ name: 'Alta', value: 60, color: '#15803D' }, { name: 'Media', value: 30, color: '#EAB308' }, { name: 'Baja', value: 10, color: '#EF4444' }], species: [{ group: 'Anfibios', total: 80, threatened: 20 }, { group: 'Aves', total: 300, threatened: 30 }, { group: 'Mamíferos', total: 140, threatened: 18 }] },
    'DO': { progress: { protected: 19.2, oecm: 3.8, gap: 7.0 }, integrity: [{ name: 'Alta', value: 25, color: '#15803D' }, { name: 'Media', value: 50, color: '#EAB308' }, { name: 'Baja', value: 25, color: '#EF4444' }], species: [{ group: 'Anfibios', total: 110, threatened: 60 }, { group: 'Aves', total: 350, threatened: 70 }, { group: 'Mamíferos', total: 130, threatened: 40 }] },
    'regional': { progress: { protected: 20.4, oecm: 4.1, gap: 5.5 }, integrity: [{ name: 'Alta', value: 38, color: '#15803D' }, { name: 'Media', value: 41, color: '#EAB308' }, { name: 'Baja', value: 21, color: '#EF4444' }], species: [{ group: 'Anfibios', total: 880, threatened: 370 }, { group: 'Aves', total: 2950, threatened: 390 }, { group: 'Mamíferos', total: 1250, threatened: 240 }] },
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

export const BioReport = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedIso = searchParams.get('country') || 'regional';
    const [loading, setLoading] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    const dataSources = [
        { name: "Cobertura 30x30", description: "Progreso hacia la Meta 3 del Marco Mundial de Biodiversidad.", provider: "UN Biodiversity Lab", updateFrequency: "Anual" },
        { name: "Integridad Ecológica", description: "Índice de integridad del ecosistema basado en presión humana.", provider: "Biodiversity Intactness Index", updateFrequency: "Anual" },
        { name: "Listas Rojas", description: "Especies amenazadas y en peligro de extinción.", provider: "UICN", updateFrequency: "Semestral" }
    ];

    const data = BIO_DATA[selectedIso] || BIO_DATA['regional'];

    const countryName = SICA_COORDINATES[selectedIso]?.name || (selectedIso === 'regional' ? 'Región SICA' : 'Guatemala');
    const mapView = SICA_COORDINATES[selectedIso] || SICA_COORDINATES['regional'];

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
                                <Target className="h-3 w-3 text-red-500" />
                                Meta 3 GBF (UN Biodiversity Lab)
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
                <Card className="p-6 bg-white border-l-4 border-l-red-500 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-red-500" />
                        Progreso hacia la Meta 30x30: {countryName}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                        <strong>{countryName}</strong> ha alcanzado una protección del <span className="text-[#15803D] font-bold">{(data.progress.protected + data.progress.oecm).toFixed(1)}%</span> de su territorio
                        (Áreas Protegidas + OECMs). Para cumplir la meta del 30% al 2030, se requiere conservar un <span className="bg-red-50 text-red-600 px-1 rounded font-bold">{data.progress.gap > 0 ? `${data.progress.gap}% adicional` : '0% (Meta Alcanzada)'}</span>.
                    </p>
                </Card>

                {/* KPI CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        title="Cobertura Efectiva (AP + OECM)"
                        value={(data.progress.protected + data.progress.oecm).toFixed(1)}
                        unit="%"
                        subtitle="Porcentaje total del territorio bajo conservación."
                        colorClass="border-t-[#15803D]"
                        icon={Shield}
                    />
                    <StatCard
                        title="Brecha de Integridad"
                        value={data.integrity.find(i => i.name === 'Baja').value}
                        unit="%"
                        subtitle="Ecosistemas con integridad ecológica baja."
                        colorClass="border-t-red-500"
                        icon={AlertCircle}
                    />
                    <StatCard
                        title="Especies Amenazadas"
                        value={data.species.reduce((acc, curr) => acc + curr.threatened, 0)}
                        unit="spp."
                        subtitle="Total de especies en listas rojas (UICN)."
                        colorClass="border-t-orange-500"
                        icon={Leaf}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Gauge Chart Custom */}
                    <Card className="p-8 flex flex-col items-center border-t-4 border-brand-secondary">
                        <h3 className="font-bold text-slate-700 mb-6 uppercase tracking-widest text-sm">Cobertura Territorial</h3>
                        <div className="relative w-48 h-48 flex items-center justify-center">
                            <svg className="transform -rotate-90 w-full h-full">
                                <circle cx="96" cy="96" r="80" stroke="#e2e8f0" strokeWidth="16" fill="transparent" />
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="80"
                                    stroke="#15803D"
                                    strokeWidth="16"
                                    fill="transparent"
                                    strokeDasharray={502}
                                    strokeDashoffset={502 - ((data.progress.protected + data.progress.oecm) / 100) * 502}
                                    className="transition-all duration-1000 ease-out"
                                />
                            </svg>
                            <span className="absolute text-3xl font-bold text-slate-800">{(data.progress.protected + data.progress.oecm).toFixed(1)}%</span>
                        </div>
                        <div className="w-full mt-8 space-y-2">
                            <div className="flex justify-between text-sm"><span className="text-slate-600">Áreas Protegidas</span><span className="font-bold">{data.progress.protected}%</span></div>
                            <div className="flex justify-between text-sm"><span className="text-slate-600">OECMs</span><span className="font-bold">{data.progress.oecm}%</span></div>
                            <div className="flex justify-between text-sm pt-2 border-t mt-2">
                                <span className={`${data.progress.gap > 0 ? 'text-red-500' : 'text-green-500'} font-bold`}>Brecha al 2030</span>
                                <span className={`${data.progress.gap > 0 ? 'text-red-500' : 'text-green-500'} font-bold`}>{data.progress.gap > 0 ? `${data.progress.gap}%` : 'Meta Cumplida'}</span>
                            </div>
                        </div>
                    </Card>

                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-6 h-[350px]">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide"><Leaf className="h-4 w-4 text-green-600" /> Integridad Ecológica</h3>
                            <div className="h-full w-full min-h-0 relative">
                                <ResponsiveContainer width="99%" height="90%">
                                    <PieChart>
                                        <Pie data={data.integrity} innerRadius={60} outerRadius={80} dataKey="value" paddingAngle={5}>
                                            {data.integrity.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                                        <Legend verticalAlign="bottom" height={36} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                        <Card className="p-6 h-[350px]">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide"><AlertCircle className="h-4 w-4 text-red-500" /> Riesgo de Extinción</h3>
                            <div className="h-full w-full min-h-0 relative">
                                <ResponsiveContainer width="99%" height="90%">
                                    <BarChart layout="vertical" data={data.species} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="group" type="category" width={70} tick={{ fontSize: 12 }} />
                                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} cursor={{ fill: 'transparent' }} />
                                        <Bar dataKey="total" name="Total Especies" stackId="a" fill="#e2e8f0" radius={[0, 4, 4, 0]} />
                                        <Bar dataKey="threatened" name="Amenazadas" stackId="a" fill="#EF4444" radius={[0, 4, 4, 0]} />
                                        <Legend verticalAlign="bottom" height={36} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            <DataSourceModal
                isOpen={showHelp}
                onClose={() => setShowHelp(false)}
                title="Fuente de Datos: Meta 30x30"
                sources={dataSources}
            />
        </div>
    );
};