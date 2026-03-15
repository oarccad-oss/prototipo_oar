import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    Home, Trees, Database, HelpCircle, Map as MapIcon, 
    ShieldCheck, X, Activity, Globe, LayoutDashboard, ExternalLink
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { QUESTIONS_DATA } from '../../pages/questions/questions';
import { getEramAxes } from '../../lib/eram';
import { Card } from '../ui/Shared';

const SITEMAP_DATA = {
    id: 'root',
    name: "OAR Home",
    icon: Home,
    path: "/",
    depth: 1,
    children: [
        {
            id: 'ejes',
            name: "Ejes Estratégicos ERAM",
            icon: Globe,
            depth: 2,
            children: getEramAxes().map(axis => ({
                id: axis.id,
                name: axis.text,
                icon: axis.iconComponent,
                path: axis.ruta,
                depth: 3,
                children: axis.id === 'mares' ? [
                    {
                        id: 'preguntas_biodiv',
                        name: "Preguntas de Biodiversidad",
                        path: "/strategic-questions",
                        depth: 4,
                        children: QUESTIONS_DATA.filter(q => ['Biodiversidad', 'Mares'].includes(q.category)).map(q => ({
                            id: q.id,
                            name: q.shortQuestion || q.question,
                            path: q.path,
                            depth: 5
                        }))
                    }
                ] : axis.id === 'agua' ? [
                    {
                        id: 'preguntas_agua',
                        name: "Preguntas de Agua",
                        path: "/strategic-questions",
                        depth: 4,
                        children: QUESTIONS_DATA.filter(q => q.category === 'Agua').map(q => ({
                            id: q.id,
                            name: q.shortQuestion || q.question,
                            path: q.path,
                            depth: 5
                        }))
                    }
                ] : axis.id === 'bosques' ? [
                    {
                        id: 'historias_bosques',
                        name: "Grandes Bosques (Historias)",
                        icon: Trees,
                        path: "/grandes-bosques",
                        depth: 4,
                        children: [
                            { id: 'mm', name: "Montañas Mayas", path: "/grandes-bosques/historias/montanas-mayas", depth: 5 },
                            { id: 'bm', name: "Biosfera Maya", path: "/grandes-bosques/historias/reserva-de-la-biosfera-maya", depth: 5 },
                            { id: 'ei', name: "El Imposible", path: "/grandes-bosques/historias/parque-nacional-el-imposible", depth: 5 },
                            { id: 'rp', name: "Río Plátano", path: "/grandes-bosques/historias/reserva-de-la-biosfera-del-rio-platano", depth: 5 },
                            { id: 'da', name: "Darién", path: "/grandes-bosques/historias/parque-nacional-darien", depth: 5 }
                        ]
                    },
                    { 
                        id: 'preguntas_bosques', 
                        name: "Preguntas de Bosques", 
                        path: "/strategic-questions", 
                        icon: HelpCircle, 
                        depth: 4,
                        children: QUESTIONS_DATA.filter(q => q.category === 'Bosques' || q.category === 'Incendios').map(q => ({
                            id: q.id,
                            name: q.shortQuestion || q.question,
                            path: q.path,
                            depth: 5
                        }))
                    }
                ] : axis.id === 'clima' ? [
                    {
                        id: 'preguntas_clima',
                        name: "Preguntas de Clima",
                        path: "/strategic-questions",
                        depth: 4,
                        children: QUESTIONS_DATA.filter(q => q.category === 'Clima').map(q => ({
                            id: q.id,
                            name: q.shortQuestion || q.question,
                            path: q.path,
                            depth: 5
                        }))
                    }
                ] : undefined
            }))
        },
        {
            id: 'intelligence',
            name: "Intelligence Center",
            icon: Activity,
            depth: 2,
            children: [
                { id: 'cifras', name: "Centro de Cifras", path: "/data/cifras", icon: Database, depth: 3 },
                { id: 'questions', name: "Preguntas Estratégicas", path: "/preguntas", icon: HelpCircle, depth: 3 },
                { 
                    id: 'monitoreo', 
                    name: "Monitoreo Regional", 
                    path: "/monitoring", 
                    icon: LayoutDashboard,
                    depth: 3,
                    children: [
                        { id: 'mon_strat', name: "Monitoreo Estratégico", path: "/monitoring/strategic", depth: 4 },
                        { id: 'mon_oper', name: "Monitoreo Operativo ERAM", path: "/monitoring/operational", depth: 4 }
                    ]
                },
                { id: 'bi', name: "Análisis Multidimensional", path: "/analisis-multidimensional", icon: Activity, depth: 3 }
            ]
        },
        {
            id: 'technical',
            name: "Herramientas Técnicas",
            icon: MapIcon,
            depth: 2,
            children: [
                { id: 'explorador', name: "Explorador de Mapas", path: "/technical/maps", depth: 3 },
                { id: 'geo', name: "Laboratorio Geoespacial", path: "/technical/geo-analysis", depth: 3 },
                { id: 'docs', name: "Centro de Documentación", path: "/technical/docs", depth: 3 },
                { id: 'devs', name: "Portal Desarrolladores", path: "/technical/developers", depth: 3 }
            ]
        },
        {
            id: 'auth',
            name: "Institucional",
            icon: ShieldCheck,
            depth: 2,
            children: [
                { id: 'login', name: "Acceso Funcionarios", path: "/auth/login", depth: 3 }
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
