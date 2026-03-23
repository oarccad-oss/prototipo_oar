import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Shield, Mountain, Anchor, ArrowLeft, ArrowDown, Share2, Download, TrendingUp, MapPin, HelpCircle, Globe, ChevronRight, ExternalLink, Database } from 'lucide-react';
import { Card, Badge, Button, DataSourceModal, ShareButton } from '../../../components/ui/Shared';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MiniMap } from '../../../components/map/MiniMap';
import { SICA_COORDINATES, SICA_COUNTRIES } from '../../../data/constants';

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

// --- COMPONENTES AUXILIARES ---

const StatCard = ({ title, value, unit, colorClass, subtitle, icon: Icon, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        whileHover={{ y: -8 }}
        className="h-full"
    >
        <Card className={`bg-white/80 backdrop-blur-xl p-8 border-t-4 ${colorClass} shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all rounded-[2.5rem] relative overflow-hidden h-full flex flex-col`}>
            <div className="flex justify-between items-start mb-6">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{title}</h4>
                {Icon && <Icon className="h-5 w-5 text-slate-200" />}
            </div>
            <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-black text-slate-900 tracking-tighter">
                    {value}%
                </span>
                <span className="text-sm font-bold text-slate-500">{unit}</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed font-light">{subtitle}</p>
        </Card>
    </motion.div>
);

export const AnswerProtectedAreas = () => {
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
        <div className="relative min-h-screen bg-slate-50 overflow-hidden selection:bg-emerald-500 selection:text-white">
            <style>{`
                @keyframes blob-drift {
                    0%, 100% { transform: translate(0, 0) scale(1) }
                    33% { transform: translate(40px, -60px) scale(1.1) }
                    66% { transform: translate(-30px, 30px) scale(0.9) }
                }
                .text-glow-green {
                    text-shadow: 0 0 20px rgba(137,196,65,0.3);
                }
            `}</style>

            {/* Background Decorative Elements */}
            <div 
                className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#89C441]/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none z-0"
                style={{ animation: 'blob-drift 25s infinite alternate' }}
            />
            <div 
                className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none z-0"
                style={{ animation: 'blob-drift 20s infinite alternate-reverse' }}
            />

            {/* HEADER INTERACTIVO */}
            <header className="sticky top-0 z-[100] bg-white/70 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4"
                        >
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => navigate('/strategic-questions')}
                                className="rounded-full h-10 w-10 p-0 hover:bg-slate-100 transition-colors"
                            >
                                <ArrowLeft className="h-5 w-5 text-slate-400" />
                            </Button>
                            <div>
                                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                                    <Shield className="h-3.5 w-3.5 text-[#89C441]" />
                                    Base de Datos de Áreas Protegidas (WDPA)
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="relative group">
                                        <select
                                            className="appearance-none bg-transparent text-xl md:text-3xl font-serif font-black text-slate-900 cursor-pointer pr-10 focus:outline-none hover:text-[#89C441] transition-colors"
                                            value={selectedIso}
                                            onChange={handleCountryChange}
                                        >
                                            {Object.entries(SICA_COORDINATES).filter(([k]) => k !== 'regional').map(([code, val]) => (
                                                <option key={code} value={code}>{val.name}</option>
                                            ))}
                                            <option value="regional">Toda la Región SICA</option>
                                        </select>
                                        <ArrowDown className="h-4 w-4 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-[#89C441] transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3"
                        >
                            <Button onClick={() => setShowHelp(true)} variant="outline" className="rounded-full h-12 w-12 p-0 border-slate-200 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                                <HelpCircle className="h-5 w-5" />
                            </Button>
                            <ShareButton />
                            <Button className="bg-slate-900 text-white rounded-full px-8 h-12 font-black uppercase text-[10px] tracking-widest group shadow-xl hover:shadow-slate-900/20 transition-all">
                                <Download className="h-4 w-4 mr-2" /> Exportar <span className="hidden sm:inline ml-1">Informe</span>
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                <div className="space-y-12">
                    {/* MAP SECTION */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="p-0 overflow-hidden border border-slate-200/50 shadow-2xl rounded-[3rem] group">
                            <div className="h-[450px] relative">
                                <MiniMap
                                    layers={[{ url: 'https://tiles.unep-wcmc.org/arcgis/rest/services/ProtectedSites/The_World_Database_of_Protected_Areas/MapServer/tile/{z}/{y}/{x}', opacity: 0.7 }]}
                                    center={[mapView.lat, mapView.lon]}
                                    zoom={mapView.zoom}
                                />
                                <div className="absolute top-6 left-6 z-[1000] flex flex-col gap-2">
                                    <Badge className="bg-white/95 backdrop-blur-md text-[#89C441] border-none px-4 py-2 text-[10px] font-black uppercase tracking-widest shadow-xl">
                                        Capa WDPA Activa
                                    </Badge>
                                </div>
                            </div>
                            <div className="p-6 bg-white border-t border-slate-100 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-3.5 w-3.5" /> WDPA (World Database on Protected Areas)
                                </div>
                                <div className="flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-1 rounded-full border border-green-100 italic">
                                    Visualización a {mapView.zoom}x - {countryName}
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* NARRATIVA DINÁMICA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="p-10 bg-white/70 backdrop-blur-xl border border-slate-100 shadow-xl shadow-slate-200/40 rounded-[2.5rem] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Shield className="h-32 w-32 text-[#89C441]" />
                            </div>
                            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                                <div className="max-w-2xl">
                                    <h3 className="text-sm font-black text-[#89C441] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                        Resumen de Conservación
                                    </h3>
                                    <p className="text-slate-900 text-xl md:text-2xl font-serif leading-relaxed">
                                        <strong>{countryName}</strong> mantiene bajo protección el <span className="text-[#89C441] italic font-black text-glow-green">{data.land}%</span> terrestre y el <span className="text-blue-500 italic font-black">{data.marine}%</span> marino, sumando un total de <span className="underline decoration-slate-300 underline-offset-8">{data.totalAreas} áreas</span> designadas legalmente.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-2xl border border-green-100">
                                        <TrendingUp className="h-4 w-4" />
                                        <span className="text-xs font-black uppercase tracking-widest">+{data.growth}% Anual</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* KPI CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <StatCard
                            title="Protección Terrestre"
                            value={data.land}
                            unit="del país"
                            subtitle="Superficie continental y de islas bajo regímenes de protección oficial."
                            colorClass="border-t-[#89C441]"
                            icon={Mountain}
                            delay={0}
                        />
                        <StatCard
                            title="Protección Marina"
                            value={data.marine}
                            unit="de la ZEE"
                            subtitle="Áreas marinas, arrecifes y zonas costeras con protección activa."
                            colorClass="border-t-blue-500"
                            icon={Anchor}
                            delay={0.1}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            whileHover={{ y: -8 }}
                        >
                            <Card className="bg-slate-900 p-8 border-t-4 border-t-white shadow-xl hover:shadow-2xl transition-all rounded-[2.5rem] relative overflow-hidden h-full flex flex-col group">
                                <div className="flex justify-between items-start mb-6">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total de Unidades</h4>
                                    <Shield className="h-5 w-5 text-slate-700 group-hover:text-white transition-colors" />
                                </div>
                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className="text-4xl font-black text-white tracking-tighter">{data.totalAreas}</span>
                                    <span className="text-sm font-bold text-slate-400">áreas</span>
                                </div>
                                <p className="text-sm text-slate-400 leading-relaxed font-light">Categorizadas en parques, reservas y parajes naturales.</p>
                            </Card>
                        </motion.div>
                    </div>

                    {/* DISTRIBUCIÓN Y LISTADO */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2"
                        >
                            <Card className="p-10 bg-white border border-slate-100 shadow-xl rounded-[2.5rem] h-[580px] flex flex-col">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-10">Balance de Cobertura</h3>
                                <div className="flex-1 w-full min-h-0 relative">
                                    <ResponsiveContainer width="99%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={breakdownData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={100}
                                                outerRadius={140}
                                                paddingAngle={8}
                                                dataKey="value"
                                                stroke="none"
                                            >
                                                {breakdownData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.fill} className="hover:opacity-80 transition-opacity cursor-pointer" />
                                                ))}
                                            </Pie>
                                            <Tooltip 
                                                formatter={(value) => [`${value}%`, 'Cobertura']} 
                                                contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} 
                                            />
                                            <Legend verticalAlign="bottom" height={36}/>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Card className="p-10 bg-slate-900 border border-slate-800 shadow-xl rounded-[2.5rem] h-[580px] flex flex-col">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Áreas Emblemáticas</h3>
                                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
                                    {data.top.map((area, i) => (
                                        <motion.div 
                                            key={i}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex justify-between items-start p-4 bg-white/5 rounded-2xl group hover:bg-white/10 transition-all cursor-pointer border border-transparent hover:border-white/10"
                                            onClick={() => window.open(`https://www.protectedplanet.net/search?q=${area.name}`, '_blank')}
                                        >
                                            <div>
                                                <div className="font-black text-white text-xs uppercase tracking-wider mb-1 flex items-center gap-2">
                                                    <span className="text-slate-600">0{i + 1}</span> {area.name}
                                                </div>
                                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{area.type}</div>
                                            </div>
                                            <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[10px] font-black px-3 py-1">
                                                {new Intl.NumberFormat('es-GT').format(area.km2)} km²
                                            </Badge>
                                        </motion.div>
                                    ))}
                                </div>
                                <Button 
                                    variant="ghost" 
                                    className="mt-6 w-full rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all"
                                    onClick={() => window.open('https://www.protectedplanet.net', '_blank')}
                                >
                                    Ver Inventario WDPA <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-center gap-2">
                                    <Database className="h-3.5 w-3.5 text-slate-600" />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">Sincronizado via UNEP-WCMC</span>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </main>

            <footer className="max-w-7xl mx-auto px-8 py-12 relative z-10 font-bold text-[10px] uppercase tracking-[0.2em] text-slate-400 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                    <span>© 2026 Observatorio Ambiental Regional</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span>Protocolo de Protección 30x30</span>
                </div>
                <div className="flex gap-6 border-l md:border-l-2 border-slate-200 pl-6 h-4 items-center">
                    <span className="hover:text-emerald-500 cursor-pointer transition-colors">WDPA Insights</span>
                    <span className="hover:text-emerald-500 cursor-pointer transition-colors">Estatus OECM</span>
                </div>
            </footer>

            <DataSourceModal
                isOpen={showHelp}
                onClose={() => setShowHelp(false)}
                title="Fuente de Datos: Áreas Protegidas"
                sources={dataSources}
            />
        </div>
    );
};
