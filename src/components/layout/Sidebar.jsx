import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { LayoutDashboard, Map, Columns, FileText, Code, Settings, BarChart3, HelpCircle, Trees, Shield, Flame, Footprints, Droplet, Anchor, Database, BookOpen, Wind, Waves, CloudRain, Activity } from 'lucide-react';

export const Sidebar = ({ isOpen }) => {
    const location = useLocation();

    return (
        <aside className={cn(
            "fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-slate-900 border-r border-slate-800 transition-transform duration-300 z-40 overflow-y-auto shadow-xl",
            isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
            <div className="py-6">

                <div className="px-4 mb-2">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ejes Estratégicos ERAM</p>
                </div>

                <nav className="space-y-1 px-2">
                    <Link
                        to="/strategic-axis/calidad"
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors",
                            location.pathname === '/strategic-axis/calidad' && "bg-blue-600 text-white font-medium shadow-inner"
                        )}
                    >
                        <Wind className="h-5 w-5" />
                        <span>Calidad Ambiental</span>
                    </Link>

                    <Link
                        to="/strategic-axis/mares"
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors",
                            location.pathname === '/strategic-axis/mares' && "bg-cyan-600 text-white font-medium shadow-inner"
                        )}
                    >
                        <Waves className="h-5 w-5" />
                        <span>Mares y Biodiversidad</span>
                    </Link>

                    <Link
                        to="/strategic-axis/agua"
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors",
                            location.pathname === '/strategic-axis/agua' && "bg-blue-500 text-white font-medium shadow-inner"
                        )}
                    >
                        <Droplet className="h-5 w-5" />
                        <span>Recurso Hídrico</span>
                    </Link>

                    <Link
                        to="/strategic-axis/bosques"
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors",
                            location.pathname === '/strategic-axis/bosques' && "bg-emerald-600 text-white font-medium"
                        )}
                    >
                        <Trees className="h-5 w-5" />
                        <span>Bosques y Paisajes</span>
                    </Link>

                    <Link
                        to="/strategic-axis/clima"
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors",
                            location.pathname === '/strategic-axis/clima' && "bg-purple-600 text-white font-medium shadow-inner"
                        )}
                    >
                        <CloudRain className="h-5 w-5" />
                        <span>Cambio Climático</span>
                    </Link>
                </nav>


                <Link
                    to="/strategic-questions"
                    className={cn(
                        "flex items-center gap-3 px-4 py-3 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors",
                        location.pathname === '/strategic-questions' && "bg-slate-700 text-white font-medium"
                    )}
                >
                    <HelpCircle className="h-5 w-5" />
                    <span>Preguntas Estratégicas</span>
                </Link>

                <div className="px-4 mt-8 mb-2">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Laboratorio</p>
                </div>

                <nav className="space-y-1 px-2">
                    <Link
                        to="/technical/geo-analysis"
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors",
                            location.pathname.startsWith('/technical/geo-analysis') && "bg-emerald-600 text-white font-medium shadow-lg shadow-emerald-900/40"
                        )}
                    >
                        <Activity className="h-5 w-5" />
                        <span>Análisis Geoespacial</span>
                    </Link>
                </nav>


                <div className="px-4 mt-8 mb-2">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Interoperabilidad</p>
                </div>

                <nav className="space-y-1 px-2">
                    <Link
                        to="/technical/developers"
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors",
                            location.pathname === '/technical/developers' && "bg-brand-primary text-white font-medium"
                        )}
                    >
                        <Code className="h-5 w-5" />
                        <span>API y Estándares</span>
                    </Link>
                </nav>

            </div>

            <div className="absolute bottom-4 left-0 w-full px-4">
                <div className="bg-slate-800/50 p-3 rounded-md border border-slate-700">
                    <p className="text-[10px] text-slate-500 text-center">
                        © 2024 CCAD / SICA<br />
                        v2.0.0 (Phase 2 MVP)
                    </p>
                </div>
            </div>
        </aside>
    );
};
