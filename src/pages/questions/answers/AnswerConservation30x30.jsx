import React, { useState, useEffect } from 'react';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { Shield, Leaf, AlertCircle, Info, ArrowLeft, ArrowDown, Share2, Download, TrendingUp, Target, HelpCircle, Loader2 } from 'lucide-react';
import { Card, Badge, Button, DataSourceModal, ShareButton } from '../../../components/ui/Shared';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MiniMap } from '../../../components/map/MiniMap';
import { SICA_COORDINATES } from '../../../api/constants';

// Eliminadas constantes locales para usar fetch remoto



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

export const AnswerConservation30x30 = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedIso = searchParams.get('country') || 'regional';
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showHelp, setShowHelp] = useState(false);

    useEffect(() => {
        setLoading(true);
        const remoteUrl = `https://raw.githubusercontent.com/mapgisdev/prototipo_oar/main/public/api/bio_data.json`;

        fetch(remoteUrl)
            .then(res => res.json())
            .then(allData => {
                setData(allData[selectedIso] || allData['regional']);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching remote bio data:", err);
                setLoading(false);
            });
    }, [selectedIso]);

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
                    {data ? (
                        <p className="text-slate-600 leading-relaxed text-lg">
                            <strong>{countryName}</strong> ha alcanzado una protección del <span className="text-[#15803D] font-bold">{(data.progress.protected + data.progress.oecm).toFixed(1)}%</span> de su territorio
                            (Áreas Protegidas + OECMs). Para cumplir la meta del 30% al 2030, se requiere conservar un <span className="bg-red-50 text-red-600 px-1 rounded font-bold">{data.progress.gap > 0 ? `${data.progress.gap}% adicional` : '0% (Meta Alcanzada)'}</span>.
                        </p>
                    ) : (
                        <div className="h-20 animate-pulse bg-slate-100 rounded"></div>
                    )}
                </Card>

                {/* KPI CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        title="Cobertura Efectiva (AP + OECM)"
                        value={data?.progress ? (data.progress.protected + data.progress.oecm).toFixed(1) : "0.0"}
                        unit="%"
                        subtitle="Porcentaje total del territorio bajo conservación."
                        colorClass="border-t-[#15803D]"
                        icon={Shield}
                    />
                    <StatCard
                        title="Brecha de Integridad"
                        value={data?.integrity ? (data.integrity.find(i => i.name === 'Baja')?.value || 0) : 0}
                        unit="%"
                        subtitle="Ecosistemas con integridad ecológica baja."
                        colorClass="border-t-red-500"
                        icon={AlertCircle}
                    />
                    <StatCard
                        title="Especies Amenazadas"
                        value={data?.species ? data.species.reduce((acc, curr) => acc + curr.threatened, 0) : 0}
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
                            {data?.progress ? (
                                <>
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
                                </>
                            ) : (
                                <div className="h-full w-full animate-pulse bg-slate-100 rounded-full" />
                            )}
                        </div>
                        <div className="w-full mt-8 space-y-2">
                            {data?.progress ? (
                                <>
                                    <div className="flex justify-between text-sm"><span className="text-slate-600">Áreas Protegidas</span><span className="font-bold">{data.progress.protected}%</span></div>
                                    <div className="flex justify-between text-sm"><span className="text-slate-600">OECMs</span><span className="font-bold">{data.progress.oecm}%</span></div>
                                    <div className="flex justify-between text-sm pt-2 border-t mt-2">
                                        <span className={`${data.progress.gap > 0 ? 'text-red-500' : 'text-green-500'} font-bold`}>Brecha al 2030</span>
                                        <span className={`${data.progress.gap > 0 ? 'text-red-500' : 'text-green-500'} font-bold`}>{data.progress.gap > 0 ? `${data.progress.gap}%` : 'Meta Cumplida'}</span>
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-2">
                                    <div className="h-4 bg-slate-100 animate-pulse rounded w-full" />
                                    <div className="h-4 bg-slate-100 animate-pulse rounded w-full" />
                                </div>
                            )}
                        </div>
                    </Card>

                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-6 h-[350px]">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide"><Leaf className="h-4 w-4 text-green-600" /> Integridad Ecológica</h3>
                            <div className="h-full w-full min-h-0 relative">
                                {data?.integrity ? (
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
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center"><Loader2 className="animate-spin text-slate-300" /></div>
                                )}
                            </div>
                        </Card>
                        <Card className="p-6 h-[350px]">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide"><AlertCircle className="h-4 w-4 text-red-500" /> Riesgo de Extinción</h3>
                            <div className="h-full w-full min-h-0 relative">
                                {data?.species ? (
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
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center"><Loader2 className="animate-spin text-slate-300" /></div>
                                )}
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
