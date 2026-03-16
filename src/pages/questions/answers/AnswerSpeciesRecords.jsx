import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell, AreaChart, Area, CartesianGrid } from 'recharts';
import { Leaf, Camera, Map as MapIcon, Loader2, ExternalLink, ArrowLeft, ArrowDown, Share2, Download, TrendingUp, Search, HelpCircle } from 'lucide-react';
import { Card, Badge, Button, DataSourceModal, ShareButton } from '../../../components/ui/Shared';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { MiniMap } from '../../../components/map/MiniMap';
import { SICA_COORDINATES, SICA_COUNTRIES } from '../../../data/constants';

const StatCard = ({ title, value, unit, colorClass, subtitle, icon: Icon }) => (
    <div className={`bg-white p-6 border-t-4 ${colorClass} shadow-sm hover:shadow-md transition-shadow relative`}>
        <div className="flex justify-between items-start mb-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</h4>
            {Icon && <Icon className="h-5 w-5 text-slate-200" />}
        </div>
        <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold text-slate-800">
                {value ? new Intl.NumberFormat('es-GT').format(value) : '-'}
            </span>
            <span className="text-sm font-medium text-slate-500">{unit}</span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">{subtitle}</p>
    </div>
);

export const AnswerSpeciesRecords = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const country = searchParams.get('country') || 'GT'; // Default to GT for consistency
    const [stats, setStats] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showHelp, setShowHelp] = useState(false);

    const dataSources = [
        { name: "Registros de Especies", description: "Ocurrencias de especies geolocalizadas.", provider: "GBIF API", updateFrequency: "Tiempo Real" },
        { name: "Taxonomía", description: "Clasificación biológica (Reino, Filo, Clase).", provider: "GBIF Backbone Taxonomy", updateFrequency: "Semestral" }
    ];

    const countryName = SICA_COUNTRIES.find(c => c.code === country)?.name || (country === 'regional' ? 'Región SICA' : country);
    const mapView = SICA_COORDINATES[country] || SICA_COORDINATES['regional'];

    useEffect(() => {
        setLoading(true);

        let queryParams = `country=${country}`;
        if (country === 'regional') {
            // Construir query para todos los países SICA
            queryParams = SICA_COUNTRIES.map(c => `country=${c.code}`).join('&');
        }

        // Mapping GBIF Kingdom Keys: 1=Animalia, 6=Plantae, 5=Fungi
        Promise.all([
            fetch(`https://api.gbif.org/v1/occurrence/search?${queryParams}&facet=kingdomKey&limit=0`).then(r => r.json()),
            fetch(`https://api.gbif.org/v1/occurrence/search?${queryParams}&mediaType=StillImage&limit=6&hasCoordinate=true`).then(r => r.json())
        ]).then(([facets, media]) => {
            const counts = facets.facets[0].counts.map(i => {
                let name = 'Otros';
                let color = '#CBD5E1';
                if (i.name === '1') { name = 'Animalia'; color = '#F87171'; }
                else if (i.name === '6') { name = 'Plantae'; color = '#4ADE80'; }
                else if (i.name === '5') { name = 'Fungi'; color = '#F59E0B'; }
                return { name, count: parseInt(i.count), color };
            }).sort((a, b) => b.count - a.count);

            setStats({ total: facets.count, kingdom: counts });
            setImages(media.results.map(r => ({
                id: r.key,
                name: r.vernacularName || r.species || r.genus || r.family,
                sci: r.scientificName,
                url: r.media[0].identifier
            })));
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, [country]);

    return (
        <div className="p-8 bg-slate-50 min-h-full font-sans space-y-8">

            {/* HEADER INTERACTIVO */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
                                <Leaf className="h-3 w-3 text-green-600" />
                                Explorador de Biodiversidad (GBIF API)
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="relative group">
                                    <select
                                        className="appearance-none bg-transparent text-2xl font-serif font-bold text-slate-800 cursor-pointer pr-8 focus:outline-none hover:text-brand-primary transition-colors"
                                        value={country}
                                        onChange={e => setSearchParams({ country: e.target.value })}
                                    >
                                        {SICA_COUNTRIES.map(c => (
                                            <option key={c.code} value={c.code}>{c.name}</option>
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
                            <Button onClick={() => window.open(`https://www.gbif.org/country/${country}/summary`, '_blank')} variant="white" size="sm" className="text-slate-600 border-slate-200 hover:bg-slate-50">
                                <ExternalLink className="h-4 w-4 mr-2" /> Ver en GBIF.org
                            </Button>
                            <Button variant="white" size="sm" className="text-slate-600 border-slate-200 hover:bg-slate-50">
                                <Download className="h-4 w-4 mr-2" /> Exportar PDF
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <Card className="p-0 overflow-hidden border-2 border-slate-200">
                    <MiniMap
                        layers={[{ url: 'https://api.gbif.org/v2/map/occurrence/density/{z}/{x}/{y}@1x.png?style=classic.poly&bin=hex&hexPerTile=30' }]}
                        center={[mapView.lat, mapView.lon]}
                        zoom={mapView.zoom}
                    />
                    <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-center text-slate-500">
                        Visualizando: Densidad de Registros (GBIF) - {countryName}
                    </div>
                </Card>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

                {/* NARRATIVA */}
                <Card className="p-6 bg-white border-l-4 border-l-green-500 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <Search className="h-5 w-5 text-green-500" />
                        Resumen de Biodiversidad: {countryName}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                        {loading ? (
                            <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Cargando datos de GBIF...</span>
                        ) : (
                            <>
                                La plataforma GBIF registra un total de <span className="font-bold text-slate-900">{new Intl.NumberFormat('es-GT').format(stats?.total)} ocurrencias</span> biológicas reportadas en <strong>{countryName}</strong>.
                                La mayor parte corresponde al reino <strong style={{ color: stats?.kingdom[0]?.color }}>{stats?.kingdom[0]?.name}</strong>, con {new Intl.NumberFormat('es-GT').format(stats?.kingdom[0]?.count)} registros.
                            </>
                        )}
                    </p>
                </Card>

                {/* KPI CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        title="Registros Totales"
                        value={stats?.total}
                        unit="ocurrencias"
                        subtitle="Datos abiertos de biodiversidad global."
                        colorClass="border-t-green-500"
                        icon={MapIcon}
                    />
                    <StatCard
                        title="Reino Dominante"
                        value={stats?.kingdom?.[0]?.count}
                        unit={stats?.kingdom?.[0]?.name}
                        subtitle="Grupo taxonómico con mayor cantidad de registros."
                        colorClass="border-t-brand-primary"
                    />
                    <StatCard
                        title="Registros con Imágenes"
                        value={Math.round(stats?.total * 0.05)} // Estimación dummy para demo
                        unit="aprox"
                        subtitle="Registros que incluyen evidencia fotográfica."
                        colorClass="border-t-purple-500"
                        icon={Camera}
                    />
                </div>

                {/* MAIN CHART & GALLERY */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <Card className="p-6 bg-white shadow-sm h-full flex flex-col">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Distribución por Reino</h3>
                            {loading ? <div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin text-green-500" /></div> : (
                                <div className="flex-1 w-full min-h-0">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart layout="vertical" data={stats.kingdom} margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12, fill: '#64748b' }} />
                                            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none' }} />
                                            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={30}>
                                                {stats.kingdom.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                        </Card>
                    </div>

                    <div className="lg:col-span-2">
                        <Card className="p-6 bg-white shadow-sm h-full">
                            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Camera className="h-5 w-5 text-slate-400" />
                                Galería Reciente
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {loading ? [1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-32 bg-slate-100 animate-pulse rounded-lg" />) : images.map(img => (
                                    <div key={img.id} className="relative h-32 rounded-lg overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-all">
                                        <img src={img.url} alt={img.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                                            <p className="text-white font-bold text-xs truncate">{img.name}</p>
                                            <p className="text-slate-300 text-[10px] italic truncate">{img.sci}</p>
                                        </div>
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
                title="Fuente de Datos: Explorador de Biodiversidad"
                sources={dataSources}
            />
        </div>
    );
};
