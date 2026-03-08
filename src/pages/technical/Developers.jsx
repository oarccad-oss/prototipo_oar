import React from 'react';
import { Card, Badge, Button } from '../../components/ui/Shared';
import { Terminal, Database, Server, Copy, Check, Globe, Map as MapIcon, Shield, Flame, Leaf, Code, Sun, Waves, Anchor, Target, ExternalLink } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

const SERVICE_CATEGORIES = [
    {
        id: 'geoservices',
        title: 'Geoservicios y Capas Base (OGC/SICA)',
        icon: Globe,
        color: 'border-l-blue-500',
        services: [
            {
                name: "WMS Regional SICA",
                provider: "CCAD-SICA",
                url: "https://mapas.sica.int/geoserver/wms",
                status: "Activo",
                format: "image/png, application/pdf",
                description: "Capas base de límites políticos, hidrografía y centros poblados de Centroamérica.",
                usedIn: "Visor Geoespacial y Mini Mapas (Capas base)",
                links: [{ label: "Ir al Visor", path: "/technical/map" }]
            },
            {
                name: "WFS Capas de Bosques",
                provider: "OAR",
                url: "https://mapas.sica.int/geoserver/wfs",
                status: "Activo",
                format: "GeoJSON, GML, Shapefile",
                description: "Vectores de cobertura boscosa, áreas protegidas y ecosistemas transfronterizos.",
                usedIn: "Visor Geoespacial (Capas vectoriales de análisis)",
                links: [{ label: "Ir al Visor", path: "/technical/map" }]
            }
        ]
    },
    {
        id: 'conservation',
        title: 'Biodiversidad y Conservación',
        icon: Shield,
        color: 'border-l-green-600',
        services: [
            {
                name: "WDPA Protected Sites (Tiles)",
                provider: "UNEP-WCMC / IUCN",
                url: "https://tiles.unep-wcmc.org/arcgis/rest/services/ProtectedSites/The_World_Database_of_Protected_Areas/MapServer/tile/{z}/{y}/{x}",
                status: "Activo",
                format: "Raster Tiles",
                description: "Capa global de áreas protegidas de la Base de Datos Mundial (Protected Planet).",
                usedIn: "Reporte 30x30 y Panel de Áreas Protegidas",
                links: [
                    { label: "Ir a Reporte 30x30", path: "/technical/reports/biodiversity" },
                    { label: "Ir a Protected Planet", path: "/technical/reports/protected-planet" }
                ]
            },
            {
                name: "GBIF Occurrence API",
                provider: "GBIF.org",
                url: "https://api.gbif.org/v1/occurrence/search",
                status: "Activo",
                format: "JSON, Darwin Core",
                description: "Consulta de registros de presencia de especies en tiempo real para la región SICA.",
                usedIn: "Dashboard de Biodiversidad (Búsqueda de especies)",
                links: [{ label: "Ir a Dashboard", path: "/technical/reports/gbif" }]
            }
        ]
    },
    {
        id: 'climate-oceans',
        title: 'Clima, Incendios y Océanos',
        icon: Sun,
        color: 'border-l-orange-500',
        services: [
            {
                name: "Open-Meteo Forecast API",
                provider: "Open-Meteo",
                url: "https://api.open-meteo.com/v1/forecast",
                status: "Activo",
                format: "JSON",
                description: "Pronósticos meteorológicos horarios y diarios basados en modelos globales (IFS, GFS).",
                usedIn: "Monitor Climático (Gráficos de temp/lluvia)",
                links: [{ label: "Ir al Monitor", path: "/technical/reports/climate" }]
            },
            {
                name: "NASA FIRMS (Active Fires)",
                provider: "NASA/Earthdata",
                url: "https://firms.modaps.eosdis.nasa.gov/api/",
                status: "Activo",
                format: "CSV, JSON",
                description: "Alertas de incendios basadas en sensores satelitales MODIS y VIIRS.",
                usedIn: "Dashboard de Incendios (Alertas en tiempo real)",
                links: [{ label: "Ir al Dashboard", path: "/technical/reports/fires" }]
            },
            {
                name: "NOAA Coral bleaching (Tiles)",
                provider: "NOAA / GFW",
                url: "https://tiles.globalforestwatch.org/coral_bleaching/{z}/{x}/{y}.png",
                status: "Activo",
                format: "Raster Tiles",
                description: "Niveles de estrés térmico y riesgo de blanqueamiento de coral en tiempo real.",
                usedIn: "Monitor de Océanos (Arrecifes de coral)",
                links: [{ label: "Ir al Monitor", path: "/technical/reports/ocean" }]
            }
        ]
    },
    {
        id: 'forest-monitoring',
        title: 'Monitoreo Forestal y Suelos',
        icon: Leaf,
        color: 'border-l-emerald-500',
        services: [
            {
                name: "GFW Tree Cover Loss Tiles",
                provider: "Global Forest Watch",
                url: "https://tiles.globalforestwatch.org/umd_tree_cover_loss/latest/dynamic/{z}/{x}/{y}.png",
                status: "Activo",
                format: "PNG (Raster Tiles)",
                description: "Visualización dinámica de la pérdida de cobertura arbórea anual (Hansen et al.).",
                usedIn: "Reporte GFW y Visor de Mapas (Capas forestales)",
                links: [{ label: "Ir al Reporte", path: "/technical/reports/gfw" }]
            },
            {
                name: "Hansen Global Forest Change",
                provider: "UMD / GFW",
                url: "https://api.globalforestwatch.org/v2/query",
                status: "Activo",
                format: "GeoJSON, JSON",
                description: "API de consulta para estadísticas de pérdida y ganancia de bosque por país/región.",
                usedIn: "Reporte GFW (Estadísticas anuales)",
                links: [{ label: "Ir al Reporte", path: "/technical/reports/gfw" }]
            },
            {
                name: "FRA 2020/2024 Data",
                provider: "FAO",
                url: "https://fra-data.fao.org/api/",
                status: "Activo",
                format: "JSON, CSV",
                description: "Evaluación de los recursos forestales mundiales para Centroamérica.",
                usedIn: "Reporte FRA 2024 (Dashboard regional)",
                links: [{ label: "Ir al Reporte", path: "/technical/reports/fra-2024" }]
            }
        ]
    }
];

export const Developers = () => {
    const [copied, setCopied] = React.useState(null);

    const handleCopy = (url, id) => {
        navigator.clipboard.writeText(url);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="bg-slate-50 min-h-full pb-20">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 py-12 px-8 mb-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest">
                            <Code className="h-3 w-3" /> Ecosistema de Datos Abiertos
                        </div>
                        <h1 className="text-4xl font-serif font-black text-slate-900 leading-tight">Portal de<br/><span className="text-blue-600">Desarrolladores</span></h1>
                        <p className="text-xl text-slate-600 font-light max-w-2xl leading-relaxed text-balance">
                            El OAR promueve la interoperabilidad regional mediante la integración de APIs globales y geoservicios regionales. Aquí encontrará la documentación técnica de los servicios que alimentan el observatorio.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Button variant="outline" className="rounded-xl border-slate-300">
                            <Database className="h-4 w-4 mr-2" /> Descargar Metadatos (ISO)
                        </Button>
                        <Button className="rounded-xl bg-slate-900 text-white">
                            <Terminal className="h-4 w-4 mr-2" /> Documentación API REST
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 space-y-16">
                {SERVICE_CATEGORIES.map((category) => (
                    <div key={category.id} className="space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm text-slate-600">
                                <category.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-800 tracking-tight">{category.title}</h2>
                                <p className="text-sm text-slate-500">Integración de servicios y endpoints especializados.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {category.services.map((service, idx) => (
                                <div key={idx} className={cn(
                                    "bg-white border border-slate-200 rounded-[2rem] p-8 hover:shadow-2xl transition-all duration-500 border-l-[8px] group relative overflow-hidden flex flex-col justify-between",
                                    category.color
                                )}>
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <h3 className="font-bold text-slate-900 text-xl mb-1">{service.name}</h3>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{service.provider}</span>
                                                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                                    <Badge variant={service.status === 'Activo' ? 'green' : 'warning'} className="text-[10px] uppercase font-bold tracking-tight">{service.status}</Badge>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <p className="text-slate-600 text-sm mb-6 leading-relaxed font-medium">
                                            {service.description}
                                        </p>

                                        {/* Site Usage Section */}
                                        <div className="mb-8 p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1 text-[10px] uppercase font-black text-blue-600 tracking-widest">
                                                    <MapIcon className="h-3 w-3" /> Aplicación en el sitio:
                                                </div>
                                                <p className="text-slate-500 text-xs font-semibold leading-snug italic">
                                                    {service.usedIn}
                                                </p>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {service.links?.map((link, lIdx) => (
                                                    <Link key={lIdx} to={link.path}>
                                                        <Button size="xs" variant="white" className="rounded-lg shadow-sm border-slate-200 text-slate-700 hover:text-blue-600 flex items-center gap-1.5 whitespace-nowrap px-2 py-1">
                                                            <span className="text-[9px] font-black uppercase tracking-tight">{link.label}</span>
                                                            <ExternalLink className="h-2 w-2" />
                                                        </Button>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="bg-slate-50 rounded-2xl p-4 mb-6 flex items-center justify-between group/code border border-slate-100 hover:border-blue-200 transition-colors">
                                            <code className="text-[10px] font-mono text-slate-500 truncate mr-4">
                                                {service.url}
                                            </code>
                                            <button 
                                                onClick={() => handleCopy(service.url, `${category.id}-${idx}`)}
                                                className="p-2.5 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all text-slate-400 hover:text-blue-600"
                                                title="Copiar URL"
                                            >
                                                {copied === `${category.id}-${idx}` ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="relative z-10 flex items-center justify-between mt-auto">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">FORMATO</span>
                                            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                                                {service.format}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Subtly animated background pattern */}
                                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                                        <category.icon size={120} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
