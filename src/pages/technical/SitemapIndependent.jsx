import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Home, Database, HelpCircle, Map as MapIcon, 
    ShieldCheck, Activity, Globe, LayoutDashboard,
    ChevronRight, ChevronDown, ExternalLink, Search,
    Filter, Info, Trees, X, Eye, MousePointer2, Layers,
    Maximize, FileText, Folder, Lock, Wind, Waves, Droplet,
    Target, Settings, Droplets, CloudRain, ShieldAlert, Briefcase
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { QUESTIONS_DATA } from '../../data/questions';
import { getEramAxes } from '../../lib/eram';
import { Card, Button, Badge } from '../../components/ui/Shared';
import VIEW_GUIDES from '../../data/guides/viewGuides.json';

const LEVEL_STYLES = {
    1: { bg: 'bg-indigo-700', text: 'text-indigo-50', border: 'border-indigo-800', badge: 'bg-indigo-900 text-indigo-100', icon: 'text-indigo-200' },
    2: { bg: 'bg-blue-600', text: 'text-blue-50', border: 'border-blue-700', badge: 'bg-blue-800 text-blue-100', icon: 'text-blue-200' },
    3: { bg: 'bg-sky-50', text: 'text-sky-900', border: 'border-sky-300', badge: 'bg-sky-200 text-sky-800', icon: 'text-sky-600' },
    4: { bg: 'bg-amber-50', text: 'text-amber-900', border: 'border-amber-300', badge: 'bg-amber-200 text-amber-800', icon: 'text-amber-600' },
    5: { bg: 'bg-emerald-50', text: 'text-emerald-900', border: 'border-emerald-300', badge: 'bg-emerald-200 text-emerald-800', icon: 'text-emerald-600' },
};

const NodeCard = ({ node, isActive, onHover, colors }) => {
    const navigate = useNavigate();
    return (
        <div 
            onMouseEnter={() => onHover(node)}
            onMouseLeave={() => onHover(null)}
            onClick={() => node.path && navigate(node.path)}
            className={cn(
                "group relative flex flex-col p-4 rounded-2xl border transition-all duration-300 transform w-[260px] shadow-sm",
                `${colors.bg} ${colors.border} ${node.path ? 'cursor-pointer hover:scale-[1.03] hover:shadow-md' : 'cursor-default'}`,
                isActive && `ring-4 ring-indigo-500/50 shadow-2xl z-20`
            )}
        >
            <div className="flex justify-between items-start gap-2 mb-3">
                <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300",
                    node.path ? `${colors.icon}` : "text-slate-400",
                    isActive && "scale-110"
                )}>
                    {node.icon ? <node.icon className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </div>
                <span className={cn(
                    "text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter",
                    colors.badge
                )}>
                    D-{node.depth}
                </span>
            </div>
            
            <h4 className={cn(
                "font-bold text-sm leading-tight mb-2 transition-colors",
                colors.text
            )}>
                {node.name || "Sección OAR"}
            </h4>
            
            {node.path && (
                <div className="flex items-center justify-between gap-2 mt-auto">
                    <span className={cn(
                        "text-[9px] font-mono truncate block opacity-60",
                        colors.text
                    )}>
                        {node.path}
                    </span>
                    {(VIEW_GUIDES[node.path] || VIEW_GUIDES[node.path.replace(/\/$/, '')] || node.path.startsWith('/preguntas') || node.path.startsWith('/strategic-questions')) && (
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)] shrink-0" />
                    )}
                </div>
            )}
        </div>
    );
};

const TreeNodeHorizontal = ({ node, onHover, hoveredNodeId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = node.children && node.children.length > 0;
    const isActive = hoveredNodeId === node.id;
    const colors = LEVEL_STYLES[node.depth] || LEVEL_STYLES[5];

    return (
        <div className="flex flex-row items-center">
            <div className="relative shrink-0 z-10 py-1 group">
                <NodeCard 
                    node={node} 
                    isActive={isActive} 
                    onHover={onHover} 
                    colors={colors}
                />
                
                {hasChildren && (
                    <button 
                        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
                        className={cn(
                            "absolute -right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border border-slate-300 shadow-lg flex items-center justify-center transition-all z-20 hover:border-indigo-500 text-slate-400 hover:text-indigo-500",
                            isOpen ? "" : "rotate-180"
                        )}
                    >
                        <ChevronRight size={14} />
                    </button>
                )}
            </div>

            {hasChildren && isOpen && (
                <div className="flex flex-row items-center animate-in fade-in slide-in-from-left-4 duration-500">
                    <div className="w-12 h-px bg-slate-300 shrink-0"></div>
                    
                    <div className="flex flex-col gap-4 relative py-4">
                        {node.children.map((child, index) => {
                            const isFirst = index === 0;
                            const isLast = index === node.children.length - 1;
                            const isOnly = node.children.length === 1;

                            return (
                                <div key={child.id} className="relative flex items-center">
                                    {!isOnly && (
                                        <div className={cn(
                                            "absolute -left-12 w-px bg-slate-200",
                                            isFirst ? 'top-1/2 bottom-0' : '',
                                            isLast ? 'top-0 h-1/2' : '',
                                            !isFirst && !isLast ? 'top-0 bottom-0' : ''
                                        )}></div>
                                    )}
                                    <div className="absolute -left-12 top-1/2 w-12 h-px bg-slate-300"></div>
                                    <TreeNodeHorizontal 
                                        node={child} 
                                        onHover={onHover} 
                                        hoveredNodeId={hoveredNodeId}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

const QuickPeek = ({ guide, position }) => {
    if (!guide) return null;
    return (
        <div 
            className="fixed z-[100] w-72 animate-in zoom-in-95 fade-in duration-200 pointer-events-none"
            style={{ 
                left: `${position.x + 20}px`, 
                top: `${position.y - 40}px`,
                maxHeight: '400px'
            }}
        >
            <Card className="bg-slate-900/95 backdrop-blur-2xl border-emerald-500/40 p-0 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-t-4 border-t-emerald-500">
                {guide.image && (
                    <div className="h-32 w-full overflow-hidden relative">
                        <img src={guide.image} alt={guide.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                    </div>
                )}
                <div className="p-4 space-y-3">
                    <div className="flex items-center gap-2">
                        <Eye className="h-3 w-3 text-emerald-500" />
                        <h4 className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">{guide.title}</h4>
                    </div>
                    <p className="text-[10px] text-slate-300 leading-relaxed line-clamp-4 font-light italic">
                        "{guide.description}"
                    </p>
                    {guide.features && (
                        <div className="space-y-1.5 pt-2 border-t border-slate-800/50">
                            <h5 className="text-[7px] font-black uppercase tracking-widest text-emerald-500/80 mb-1">Funcionalidades Destacadas</h5>
                            {guide.features.slice(0, 6).map((f, i) => (
                                <div key={i} className="flex items-start gap-2 text-[8px] text-slate-400 leading-tight">
                                    <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1 shrink-0" />
                                    <span>{f}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    {guide.source && (
                        <div className="pt-2 border-t border-slate-800/50">
                            <h5 className="text-[7px] font-black uppercase tracking-widest text-slate-500 mb-1">Origen de Datos</h5>
                            <p className="text-[8px] text-slate-500 leading-tight">{guide.source}</p>
                        </div>
                    )}
                    {guide.learnMore && (
                        <div className="pt-2 flex justify-end">
                            <span className="text-[8px] font-bold text-emerald-500 flex items-center gap-1">
                                Saber más <ChevronRight size={8} />
                            </span>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

const OnboardingTour = ({ step, onNext, onPrev, onClose }) => {
    const steps = [
        {
            title: "Bienvenido al Flujo Maestro",
            desc: "Esta vista despliega la arquitectura del OAR en dos modos: Flujo Horizontal y Vista por Niveles de clic.",
            target: "header"
        },
        {
            title: "Cruces de Información",
            desc: "Utiliza el modo 'Flujo Horizontal' para entender el camino lógico desde el portal hasta cualquier visor de datos.",
            target: "node-root"
        },
        {
            title: "Quick Peek",
            desc: "Pasa el ratón sobre cualquier tarjeta para ver el contenido estratégico sin navegar.",
            target: "node-root"
        }
    ];

    const current = steps[step];

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4 animate-in fade-in duration-500">
            <Card className="max-w-md bg-slate-900 border-emerald-500 border-2 shadow-[0_0_50px_rgba(16,185,129,0.3)] relative overflow-hidden rounded-[3rem]">
                <div className="absolute top-0 right-0 p-6">
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors"><X size={24}/></button>
                </div>
                <div className="p-10 space-y-8">
                    <div className="w-16 h-16 bg-emerald-500 text-white rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-emerald-500/20">
                        <MousePointer2 className="h-8 w-8" />
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-3xl font-serif font-black text-white italic tracking-tight">{current.title}</h3>
                        <p className="text-slate-400 text-base leading-relaxed font-light">{current.desc}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                        <div className="flex gap-2">
                            {steps.map((_, i) => (
                                <div key={i} className={cn("w-1.5 h-1.5 rounded-full transition-all duration-500", i === step ? "bg-emerald-500 w-8" : "bg-slate-800")} />
                            ))}
                        </div>
                        <div className="flex gap-3">
                            {step > 0 && (
                                <Button variant="outline" size="sm" onClick={onPrev} className="rounded-full border-slate-700 text-slate-400 px-6">
                                    Atrás
                                </Button>
                            )}
                            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-8 shadow-lg shadow-emerald-600/30" size="sm" onClick={step === steps.length - 1 ? onClose : onNext}>
                                {step === steps.length - 1 ? "Comenzar" : "Siguiente"}
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export const SitemapIndependent = () => {
    const navigate = useNavigate();
    const [hoveredNode, setHoveredNode] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [tourStep, setTourStep] = useState(null);
    const [viewMode, setViewMode] = useState('horizontal');

    useEffect(() => {
        const hasSeenTour = localStorage.getItem('oar_sitemap_tour_v4');
        if (!hasSeenTour) setTourStep(0);
    }, []);

    const handleCloseTour = () => {
        setTourStep(null);
        localStorage.setItem('oar_sitemap_tour_v4', 'true');
    };

    const handleMouseMove = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    // Tree Structure Data
    const sitemapData = {
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
                    { id: "geo-restr", name: "Análisis: Restricciones de Conservación", path: "/technical/geo-analysis/restrictions", depth: 4, icon: ShieldAlert },
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

    const flattenData = (node, parentName = "Ninguno") => {
        let result = [];
        const current = { ...node, parentName };
        result.push(current);
        if (node.children) {
            node.children.forEach(child => {
                result = result.concat(flattenData(child, node.name));
            });
        }
        return result;
    }

    const flatNodes = flattenData(sitemapData);
    const getDepthNodes = (depthNum) => flatNodes.filter(n => n.depth === depthNum);

    return (
        <div 
            className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-500/30 overflow-x-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200" id="header">
                <div className="container mx-auto px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <div className="w-11 h-11 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 rotate-3">
                            <Layers className="text-white h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Sitemap <span className="text-indigo-600 italic">Architect</span></h1>
                            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em]">Flujo de Navegación Maestro</p>
                        </div>
                    </div>
                    
                    <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-sm shrink-0">
                        <button 
                            onClick={() => setViewMode('horizontal')}
                            className={cn(
                                "px-6 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-2",
                                viewMode === 'horizontal' ? 'bg-white shadow-md text-indigo-700' : 'text-slate-500 hover:text-slate-800'
                            )}
                        >
                            <Maximize size={14} /> Flujo Horizontal
                        </button>
                        <button 
                            onClick={() => setViewMode('columns')}
                            className={cn(
                                "px-6 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-2",
                                viewMode === 'columns' ? 'bg-white shadow-md text-indigo-700' : 'text-slate-500 hover:text-slate-800'
                            )}
                        >
                            <Layers size={14} /> Niveles
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="border-slate-200 text-slate-500 hover:text-slate-800 rounded-2xl px-6" onClick={() => navigate('/')}>
                            Inicio
                        </Button>
                    </div>
                </div>
            </header>

            {/* Breadcrumbs Floating Bar - Fixed */}
            <div className="fixed top-20 left-0 right-0 z-40 bg-white/70 backdrop-blur-md border-b border-slate-200 py-4 shadow-sm">
                <div className="container mx-auto px-8 flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
                    <div className="flex items-center gap-2 text-indigo-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping" />
                        <Home size={14} />
                        <span>OAR_SYSTEM</span>
                    </div>
                    <ChevronRight size={12} className="text-slate-300" />
                    <span className="text-slate-700 bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
                        {hoveredNode?.name || "LOG_IDLE"}
                    </span>
                    {hoveredNode?.path && (
                        <>
                            <ChevronRight size={12} className="text-slate-300" />
                            <span className="text-indigo-600 font-mono lower-case tracking-widest bg-indigo-50 px-3 py-1 rounded-md border border-indigo-100">
                                {hoveredNode.path}
                            </span>
                        </>
                    )}
                </div>
            </div>

            {/* Spacer to avoid content being hidden behind the fixed bars */}
            <div className="h-[136px]" />

            <main className="flex-1 overflow-auto p-12 bg-slate-50/50 min-h-[calc(100vh-160px)]">
                <div className="min-w-max h-full">
                    {viewMode === 'horizontal' ? (
                        <div className="bg-white p-12 rounded-[5rem] border border-slate-200 shadow-sm inline-block min-w-full">
                            <TreeNodeHorizontal 
                                node={sitemapData} 
                                onHover={setHoveredNode}
                                hoveredNodeId={hoveredNode?.id}
                            />
                        </div>
                    ) : (
                        <div className="flex gap-10 pb-12">
                            {[1, 2, 3, 4, 5].map((level) => (
                                <div key={level} className="flex flex-col gap-6 w-[280px] shrink-0">
                                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-md sticky top-8 z-30">
                                        <h3 className="font-black text-slate-800 text-[10px] uppercase tracking-[0.3em] flex justify-between items-center">
                                            Nivel {level}
                                            <span className="text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full text-[8px]">{getDepthNodes(level).length} nodos</span>
                                        </h3>
                                    </div>
                                    
                                    <div className="flex flex-col gap-5">
                                        {getDepthNodes(level).map((node) => {
                                            const colors = LEVEL_STYLES[node.depth] || LEVEL_STYLES[5];
                                            return (
                                                <div key={node.id} className="relative animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                    {node.depth > 1 && (
                                                        <div className="text-[8px] text-slate-400 font-black mb-2 ml-1 flex items-center gap-1 uppercase tracking-widest">
                                                            <ChevronRight size={10} /> De: {node.parentName}
                                                        </div>
                                                    )}
                                                    <NodeCard 
                                                        node={node} 
                                                        isActive={hoveredNode?.id === node.id}
                                                        onHover={setHoveredNode}
                                                        colors={colors}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Overlays */}
            {hoveredNode?.path && (
                <QuickPeek 
                    guide={
                        VIEW_GUIDES[hoveredNode.path] || 
                        VIEW_GUIDES[hoveredNode.path.replace(/\/$/, '')] || 
                        (hoveredNode.path.startsWith('/preguntas') ? VIEW_GUIDES['/preguntas'] : null) ||
                        (hoveredNode.path.startsWith('/strategic-questions') ? VIEW_GUIDES['/preguntas'] : null) ||
                        (hoveredNode.path === '/' ? VIEW_GUIDES['/'] : null)
                    } 
                    position={mousePos} 
                />
            )}
            

            {tourStep !== null && (
                <OnboardingTour 
                    step={tourStep} 
                    onNext={() => setTourStep(prev => prev + 1)}
                    onPrev={() => setTourStep(prev => prev - 1)}
                    onClose={handleCloseTour}
                />
            )}

            {/* Footer Divider / Context */}
            <div className="max-w-7xl mx-auto px-8 pb-4 mt-6 mb-4">
                <div className="border-t border-slate-200 py-4 text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    Observatorio Ambiental Regional (OAR) • Estrategia Regional Ambiental de Centroamérica y República Dominicana
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                ::-webkit-scrollbar { width: 8px; height: 8px; }
                ::-webkit-scrollbar-track { background: #f8fafc; }
                ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
                ::-webkit-scrollbar-thumb:hover { background: #c3dafe; }
            ` }} />
        </div>
    );
};
