import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
    Activity, 
    ShieldAlert, 
    Trees, 
    Layers, 
    Briefcase,
    ChevronRight,
    Search as SearchIcon,
    LayoutDashboard
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const GeoAnalysisLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');

    const analyticalTools = [
        {
            icon: ShieldAlert,
            title: "Restricciones de Conservación",
            path: "/technical/geo-analysis/restrictions",
            color: "#EF4444"
        },
        {
            icon: Trees,
            title: "Detección de Deforestación",
            path: "/technical/geo-analysis/deforestation",
            color: "#15803D"
        },
        {
            icon: Layers,
            title: "Análisis de Ecosistemas",
            path: "/technical/geo-analysis/ecosystems",
            color: "#3B82F6"
        },
        {
            icon: Briefcase,
            title: "Cruces de Proyectos",
            path: "/technical/geo-analysis/projects",
            color: "#F59E0B"
        }
    ];

    const filteredTools = analyticalTools.filter(t => 
        t.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex h-[calc(100vh-64px)] bg-slate-50 overflow-hidden font-sans">
            {/* Internal Sidebar */}
            <aside className="w-80 border-r border-slate-200 bg-white flex flex-col shrink-0 hidden lg:flex">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-2 text-brand-secondary mb-4">
                        <Activity className="h-5 w-5 text-emerald-600" />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-500">Módulos de Análisis</span>
                    </div>
                    <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Buscar análisis..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/30 transition-all font-light"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-1">
                    <div className="px-3 py-2 flex items-center justify-between">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Algoritmos Disponibles</h3>
                    </div>
                    
                    {filteredTools.map((t, idx) => (
                        <button
                            key={idx}
                            onClick={() => navigate(t.path)}
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-3 rounded-2xl transition-all text-left group",
                                location.pathname === t.path 
                                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10" 
                                    : "text-slate-500 hover:bg-slate-50 hover:text-emerald-600"
                            )}
                        >
                            <div className={cn(
                                "shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                                location.pathname === t.path 
                                    ? "bg-white/10 text-white scale-110" 
                                    : "bg-slate-100 text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-600"
                            )}>
                                <t.icon className="h-5 w-5" />
                            </div>
                            <div className="overflow-hidden flex-1">
                                <p className={cn(
                                    "text-sm font-bold leading-tight truncate",
                                    location.pathname === t.path ? "text-white" : "text-slate-700"
                                )}>
                                    {t.title}
                                </p>
                            </div>
                            {location.pathname === t.path && <ChevronRight className="h-4 w-4 ml-auto text-emerald-400" />}
                        </button>
                    ))}
                </div>

                {/* Status indicator */}
                <div className="p-4 border-t border-slate-100">
                    <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                        <div className="flex items-center gap-2 text-emerald-700 mb-1">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span className="text-[10px] font-black uppercase tracking-wider">Motor Python Activo</span>
                        </div>
                        <p className="text-[10px] text-emerald-600/70 font-medium">SpatiaLite v5.1.0 Ready</p>
                    </div>
                </div>
            </aside>

            {/* Content Area */}
            <main className="flex-1 overflow-y-auto relative bg-[#f8fafc]">
                <Outlet />
            </main>
        </div>
    );
};
