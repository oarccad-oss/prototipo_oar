import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
    Map as MapIcon, 
    Columns, 
    Globe,
    ChevronRight,
    Search as SearchIcon,
    Layers
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const MapConsultantLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');

    const mapViews = [
        {
            icon: MapIcon,
            name: "Visor Geoespacial",
            path: "/technical/map",
            description: "Monitoreo de capas en tiempo real",
            color: "#2563EB"
        },
        {
            icon: Columns,
            name: "Visor Comparativo",
            path: "/technical/map-comparator",
            description: "Análisis temporal y comparativo",
            color: "#0891B2"
        }
    ];

    const filteredViews = mapViews.filter(v => 
        v.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // No ocultamos el sidebar principal aquí, sino que este es un sidebar interno
    const isHub = location.pathname === '/technical/maps';

    return (
        <div className="flex h-[calc(100vh-64px)] bg-slate-50 overflow-hidden">
            {/* Internal Sidebar - Hidden on Hub landing page */}
            {!isHub && (
                <aside className="w-80 border-r border-slate-200 bg-white flex flex-col shrink-0 hidden lg:flex">
                    <div className="p-6 border-b border-slate-100">
                        <div className="flex items-center gap-2 text-blue-600 mb-4">
                            <Layers className="h-5 w-5" />
                            <span className="text-xs font-black uppercase tracking-widest text-slate-500">Herramientas de Mapa</span>
                        </div>
                        <div className="relative">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Buscar visor..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-1">
                        <h3 className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Visores Disponibles</h3>
                        {filteredViews.map((v, idx) => (
                            <button
                                key={idx}
                                onClick={() => navigate(v.path)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-left group",
                                    location.pathname === v.path 
                                        ? "bg-blue-50 text-blue-900 shadow-sm border border-blue-100" 
                                        : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
                                )}
                            >
                                <div className={cn(
                                    "shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                                    location.pathname === v.path ? "bg-white text-blue-600 shadow-sm" : "bg-slate-50 text-slate-400 group-hover:text-blue-600"
                                )}>
                                    <v.icon className="h-4 w-4" />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-sm font-bold truncate leading-tight">{v.name}</p>
                                    <p className="text-[10px] text-slate-400 truncate mt-0.5">{v.description}</p>
                                </div>
                                {location.pathname === v.path && <ChevronRight className="h-4 w-4 ml-auto text-blue-600" />}
                            </button>
                        ))}
                    </div>

                    <div className="p-4 mt-auto">
                        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                            <p className="text-[10px] text-blue-800 font-bold uppercase tracking-wider mb-1">Tip de Uso</p>
                            <p className="text-xs text-blue-700 leading-relaxed italic">
                                Puede alternar entre el visor único y el comparativo para analizar cambios temporales en la cobertura boscosa.
                            </p>
                        </div>
                    </div>
                </aside>
            )}

            {/* Content Area */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden">
                <Outlet />
            </main>
        </div>
    );
};
