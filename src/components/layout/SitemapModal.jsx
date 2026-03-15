import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    Home, Trees, Database, HelpCircle, Map as MapIcon, 
    ShieldCheck, X, Activity, Globe, LayoutDashboard, ExternalLink,
    Layers, Target, Droplets, Wind, FileText, Settings, Folder, Briefcase
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { QUESTIONS_DATA } from '../../pages/questions/questions';
import { getEramAxes } from '../../lib/eram';
import { Card } from '../ui/Shared';

const SITEMAP_DATA = {
    id: "root", 
    name: "OAR Home", 
    path: "/", 
    depth: 1, 
    icon: Home,
    children: [
        { 
          id: "hero-preguntas", name: "Sección: Preguntas Estratégicas", depth: 2, icon: Layers,
          children: [
            { id: "hp-1-card", name: "Clic en: ¿Cómo vamos con la meta 30x30?", depth: 3, icon: HelpCircle, children: [{ id: "hp-1-visor", name: "Visor Final: Meta 30x30", path: "/preguntas/meta-30x30", depth: 4, icon: LayoutDashboard }] },
            { id: "hp-2-card", name: "Clic en: ¿Qué especies hay registradas?", depth: 3, icon: HelpCircle, children: [{ id: "hp-2-visor", name: "Visor Final: Registros de Especies", path: "/preguntas/registros-especies", depth: 4, icon: LayoutDashboard }] },
            { id: "hp-3-card", name: "Clic en: ¿Qué áreas están protegidas?", depth: 3, icon: HelpCircle, children: [{ id: "hp-3-visor", name: "Visor Final: Áreas Protegidas", path: "/preguntas/areas-protegidas", depth: 4, icon: LayoutDashboard }] },
            { id: "hp-4-card", name: "Clic en: ¿Nuestros océanos se calientan?", depth: 3, icon: HelpCircle, children: [{ id: "hp-4-visor", name: "Visor Final: Salud de Océanos", path: "/preguntas/salud-oceanos", depth: 4, icon: LayoutDashboard }] },
            { id: "hp-5-card", name: "Clic en: ¿Qué tan segura es nuestra agua?", depth: 3, icon: HelpCircle, children: [{ id: "hp-5-visor", name: "Visor Final: Seguridad Hídrica", path: "/preguntas/seguridad-hidrica", depth: 4, icon: LayoutDashboard }] },
            { id: "hp-6-card", name: "Clic en: ¿Cómo están los bosques?", depth: 3, icon: HelpCircle, children: [{ id: "hp-6-visor", name: "Visor Final: Estado de Bosques", path: "/preguntas/estado-bosques", depth: 4, icon: LayoutDashboard }] },
            { id: "hp-7-card", name: "Clic en: ¿Dónde y cuánto bosque perdemos?", depth: 3, icon: HelpCircle, children: [{ id: "hp-7-visor", name: "Visor Final: Pérdida de Bosque", path: "/preguntas/perdida-bosque", depth: 4, icon: LayoutDashboard }] },
            { id: "hp-8-card", name: "Clic en: ¿Donde hay incendios activos?", depth: 3, icon: HelpCircle, children: [{ id: "hp-8-visor", name: "Visor Final: Incendios Activos", path: "/preguntas/incendios-activos", depth: 4, icon: LayoutDashboard }] },
            { id: "hp-9-card", name: "Clic en: ¿Riesgo de sequía en Corredor Seco?", depth: 3, icon: HelpCircle, children: [{ id: "hp-9-visor", name: "Visor Final: Riesgo de Sequía", path: "/preguntas/riesgo-sequia", depth: 4, icon: LayoutDashboard }] }
          ]
        },
        { 
          id: "cifras", name: "Sección: Cifras Regionales", depth: 2, icon: Layers,
          children: [{ id: "cifras-visor", name: "Visor Final: Dashboard de Cifras", path: "/data/cifras", depth: 3, icon: LayoutDashboard }]
        },
        {
          id: "ejes", name: "Explorar por ejes ERAM", depth: 2, icon: Layers,
          children: [
            { id: "l1", name: "Landing Eje 1: Calidad Ambiental", path: "/strategic-axis/calidad", depth: 3, icon: Target },
            {
              id: "l2", name: "Landing Eje 2: Mares y Biodiversidad", path: "/strategic-axis/mares", depth: 3, icon: Globe,
              children: [
                {
                  id: "l2-preg", name: "Sección: Preguntas Críticas", path: "/strategic-questions", depth: 4, icon: HelpCircle,
                  children: [
                    { id: "l2-p1", name: "Visor Final: Meta 30x30", path: "/preguntas/meta-30x30", depth: 5, icon: LayoutDashboard },
                    { id: "l2-p2", name: "Visor Final: Especies Registradas", path: "/preguntas/registros-especies", depth: 5, icon: LayoutDashboard },
                    { id: "l2-p3", name: "Visor Final: Áreas Protegidas", path: "/preguntas/areas-protegidas", depth: 5, icon: LayoutDashboard },
                    { id: "l2-p4", name: "Visor Final: Salud de Océanos", path: "/preguntas/salud-oceanos", depth: 5, icon: LayoutDashboard },
                  ]
                }
              ]
            },
            {
              id: "l3", name: "Landing Eje 3: Gestión Hídrica", path: "/strategic-axis/agua", depth: 3, icon: Droplets,
              children: [
                {
                  id: "l3-preg", name: "Sección: Preguntas Críticas", path: "/strategic-questions", depth: 4, icon: HelpCircle,
                  children: [{ id: "l3-p1", name: "Visor Final: Seguridad Hídrica", path: "/preguntas/seguridad-hidrica", depth: 5, icon: LayoutDashboard }]
                }
              ]
            },
            {
              id: "l4", name: "Landing Eje 4: Bosques y Paisajes", path: "/strategic-axis/bosques", depth: 3, icon: Trees,
              children: [
                { id: "l4-t1", name: "Visor Final: Análisis Geoespacial", path: "/technical/geo-analysis", depth: 4, icon: Activity },
                { id: "l4-t2", name: "Visor Final: Tablero de KPIs", path: "/analisis-multidimensional", depth: 4, icon: LayoutDashboard },
                { id: "l4-t3", name: "Recurso: Metadatos Capas Bosques", path: "/technical/docs", depth: 4, icon: Folder },
                {
                  id: "l4-preg", name: "Sección: Preguntas Críticas", path: "/strategic-questions", depth: 4, icon: HelpCircle,
                  children: [
                    { id: "l4-p1", name: "Visor Final: Estado de Bosques", path: "/preguntas/estado-bosques", depth: 5, icon: LayoutDashboard },
                    { id: "l4-p2", name: "Visor Final: Pérdida de Bosque", path: "/preguntas/perdida-bosque", depth: 5, icon: LayoutDashboard },
                    { id: "l4-p3", name: "Visor Final: Incendios Activos", path: "/preguntas/incendios-activos", depth: 5, icon: LayoutDashboard },
                  ]
                },
                {
                  id: "l4-hist-landing", name: "Sección: Grandes Bosques de la Región", path: "/grandes-bosques", depth: 4, icon: Folder,
                  children: [
                    { id: "l4-h1-landing", name: "Visor Final: Montañas Mayas", path: "/grandes-bosques/historias/montanas-mayas", depth: 5, icon: LayoutDashboard },
                    { id: "l4-h2-landing", name: "Visor Final: Biosfera Maya", path: "/grandes-bosques/historias/reserva-de-la-biosfera-maya", depth: 5, icon: LayoutDashboard },
                    { id: "l4-h3-landing", name: "Visor Final: El Imposible", path: "/grandes-bosques/historias/parque-nacional-el-imposible", depth: 5, icon: LayoutDashboard },
                    { id: "l4-h4-landing", name: "Visor Final: Río Plátano", path: "/grandes-bosques/historias/reserva-de-la-biosfera-del-rio-platano", depth: 5, icon: LayoutDashboard },
                    { id: "l4-h5-landing", name: "Visor Final: Darién", path: "/grandes-bosques/historias/parque-nacional-darien", depth: 5, icon: LayoutDashboard },
                  ]
                }
              ]
            },
            {
              id: "l5", name: "Landing Eje 5: Cambio Climático", path: "/strategic-axis/clima", depth: 3, icon: Wind,
              children: [
                {
                  id: "l5-preg", name: "Sección: Preguntas Críticas", path: "/strategic-questions", depth: 4, icon: HelpCircle,
                  children: [{ id: "l5-p1", name: "Visor Final: Riesgo de Sequía", path: "/preguntas/riesgo-sequia", depth: 5, icon: LayoutDashboard }]
                }
              ]
            }
          ]
        },
        {
          id: "reportes", name: "Sección: Reportes Temáticos", depth: 2, icon: Layers,
          children: [
            {
              id: "fra-2024", name: "Visor Final: Reporte FRA 2024", path: "/technical/reports/fra-2024", depth: 3, icon: FileText
            },
            {
              id: "l4-hist", name: "Colección: Grandes Bosques", path: "/grandes-bosques", depth: 3, icon: Folder,
              children: [
                { id: "l4-h1", name: "Visor Final: Montañas Mayas", path: "/grandes-bosques/historias/montanas-mayas", depth: 4, icon: LayoutDashboard },
                { id: "l4-h2", name: "Visor Final: Biosfera Maya", path: "/grandes-bosques/historias/reserva-de-la-biosfera-maya", depth: 4, icon: LayoutDashboard },
                { id: "l4-h3", name: "Visor Final: El Imposible", path: "/grandes-bosques/historias/parque-nacional-el-imposible", depth: 4, icon: LayoutDashboard },
                { id: "l4-h4", name: "Visor Final: Río Plátano", path: "/grandes-bosques/historias/reserva-de-la-biosfera-del-rio-platano", depth: 4, icon: LayoutDashboard },
                { id: "l4-h5", name: "Visor Final: Darién", path: "/grandes-bosques/historias/parque-nacional-darien", depth: 4, icon: LayoutDashboard },
              ]
            }
          ]
        },
        {
          id: "indicadores-root", name: "Sección: Indicadores", depth: 2, icon: Activity,
          children: [
            { id: "ind-strat", name: "Visor Final: Monitoreo Estratégico", path: "/monitoring/strategic", depth: 3, icon: LayoutDashboard },
            { id: "ind-oper", name: "Visor Final: Monitoreo Operativo", path: "/monitoring/operational", depth: 3, icon: LayoutDashboard }
          ]
        },
        { 
          id: "bi", name: "Sección: Análisis Multidimensional", depth: 2, icon: Layers,
          children: [{ id: "bi-visor", name: "Visor Final: Dashboard BI", path: "/analisis-multidimensional", depth: 3, icon: LayoutDashboard }]
        },
        { 
          id: "geo", name: "Sección: Análisis Geoespacial Avanzado", depth: 2, icon: Layers,
          children: [
            { 
              id: "geo-visor", name: "Visor Final: Laboratorio", path: "/technical/geo-analysis", depth: 3, icon: LayoutDashboard,
              children: [
                { id: "geo-restr", name: "Análisis: Restricciones de Conservación", path: "/technical/geo-analysis/restrictions", depth: 4, icon: ShieldCheck },
                { id: "geo-defor", name: "Análisis: Detección de Deforestación", path: "/technical/geo-analysis/deforestation", depth: 4, icon: Activity },
                { id: "geo-ecosy", name: "Análisis: Composición de Ecosistemas", path: "/technical/geo-analysis/ecosystems", depth: 4, icon: Layers },
                { id: "geo-proy", name: "Análisis: Cruce de Proyectos", path: "/technical/geo-analysis/projects", depth: 4, icon: Briefcase }
              ]
            }
          ]
        },
        { 
          id: "visor", name: "Sección: Visor Geoespacial Regional", depth: 2, icon: Layers,
          children: [
            { id: "mapas-visor", name: "Visor Final: Explorador Mapas", path: "/technical/maps", depth: 3, icon: LayoutDashboard },
            { id: "comp-visor", name: "Visor Final: Comparador de Mapas", path: "/technical/map-comparator", depth: 3, icon: Activity }
          ]
        },
        {
          id: "plataforma", name: "Plataforma Adaptativa", depth: 2, icon: Settings,
          children: [
            { id: "plat-dash", name: "Dashboard", path: "/technical/dashboard", depth: 3, icon: LayoutDashboard },
            { id: "plat-visor", name: "Visor Interactivo", path: "/technical/map", depth: 3, icon: MapIcon },
            { id: "plat-hist", name: "Historias", path: "/grandes-bosques", depth: 3, icon: FileText }
          ]
        },
        {
          id: "otros", name: "Otros Recursos Técnicos", depth: 2, icon: Folder,
          children: [
            { id: "t3", name: "Portal: Centro de Documentación", path: "/technical/docs", depth: 3, icon: Folder },
            { id: "t4", name: "Portal: Desarrolladores", path: "/technical/developers", depth: 3, icon: Settings },
          ]
        }
    ]
};

const SitemapNode = ({ node, currentPath, onNavigate }) => {
    const isActive = currentPath === node.path;
    const isParentActive = node.children?.some(child => 
        currentPath === child.path || child.children?.some(gc => currentPath === gc.path)
    );

    return (
        <div className="flex flex-col items-start gap-4">
            <div 
                onClick={() => node.path && onNavigate(node.path)}
                className={cn(
                    "relative group flex items-center gap-3 p-3 rounded-2xl border transition-all duration-500",
                    isActive 
                        ? "bg-emerald-500 border-emerald-400 text-white shadow-xl shadow-emerald-500/40 scale-105 z-10" 
                        : isParentActive
                            ? "bg-emerald-900 border-emerald-700 text-emerald-100"
                            : "bg-emerald-950/50 border-emerald-800/50 text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-900/40",
                    node.path ? "cursor-pointer" : "cursor-default"
                )}
            >
                {node.icon && <node.icon className={cn("h-4 w-4", isActive ? "text-white" : "text-emerald-500")} />}
                <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest">{node.name}</span>
                    <span className={cn(
                        "text-[8px] font-bold mt-0.5",
                        isActive ? "text-emerald-100" : "text-emerald-600"
                    )}>
                        [{node.depth} {node.depth === 1 ? 'clic' : 'clics'}]
                    </span>
                </div>
                {isActive && (
                    <div className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </div>
                )}
            </div>

            {node.children && (
                <div className="flex flex-col gap-4 pl-8 border-l border-emerald-500/20 relative">
                    {node.children.map((child, idx) => (
                        <div key={child.id || idx} className="relative">
                            <div className="absolute -left-8 top-1/2 w-8 h-[1px] bg-gradient-to-r from-emerald-500/20 to-emerald-500/50"></div>
                            <SitemapNode node={child} currentPath={currentPath} onNavigate={onNavigate} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export const SitemapModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleNavigate = (path) => {
        navigate(path);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-slate-950/80 backdrop-blur-xl p-4 md:p-8 animate-in fade-in duration-300">
            <Card className="w-full max-w-6xl h-full max-h-[90vh] bg-emerald-950 shadow-2xl p-0 overflow-hidden flex flex-col rounded-[2.5rem] border border-emerald-800/50">
                {/* Background glow effects */}
                <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500 blur-[150px] rounded-full"></div>
                </div>

                {/* Header */}
                <div className="p-8 border-b border-emerald-800/30 flex justify-between items-center bg-emerald-900/30 relative z-10 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-500 rounded-2xl text-white shadow-lg shadow-emerald-500/30">
                            <Globe className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-serif font-black text-white">Mapa del Sitio <span className="text-emerald-400 italic">Esquemático</span></h2>
                            <p className="text-emerald-200/50 text-sm font-light">Jerarquía de navegación y profundidad de clics del portal.</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-3 bg-emerald-900/50 border border-emerald-700/50 text-emerald-100 hover:text-white hover:bg-emerald-800 rounded-2xl transition-all shadow-sm"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Content - Interactive Tree */}
                <div className="flex-1 overflow-auto p-8 md:p-12 scrollbar-none relative z-10">
                    <div className="min-w-max pb-12">
                        <SitemapNode 
                            node={SITEMAP_DATA} 
                            currentPath={location.pathname} 
                            onNavigate={handleNavigate} 
                        />
                    </div>
                </div>

                {/* Footer Info */}
                <div className="p-6 bg-emerald-900/40 border-t border-emerald-800/30 flex justify-between items-center text-[10px] text-emerald-400/40 uppercase tracking-widest font-bold relative z-10">
                    <div className="flex gap-4 items-center">
                        <span>Estructura de Información OAR v2.0</span>
                        <button 
                            onClick={() => handleNavigate('/mapa_sitio_independiente')}
                            className="bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-2 transition-all"
                        >
                            Ver Mapa Full Page <ExternalLink size={10} />
                        </button>
                    </div>
                    <div className="flex gap-6">
                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Ubicación Actual</div>
                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-900 border border-emerald-700"></div> Rutas Disponibles</div>
                    </div>
                </div>
            </Card>
        </div>
    );
};
