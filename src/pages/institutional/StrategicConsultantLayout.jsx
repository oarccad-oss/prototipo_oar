import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet, Link } from 'react-router-dom';
import { 
    Trees, 
    Shield, 
    Flame, 
    Footprints, 
    CloudRain, 
    Anchor, 
    Droplet, 
    Map as MapIcon,
    Search,
    MessageSquare,
    ChevronRight,
    Search as SearchIcon
} from 'lucide-react';
import { cn } from '../../lib/utils';

import { QUESTIONS_DATA } from '../../data/questions';

export const StrategicConsultantLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');

    const questions = QUESTIONS_DATA;

    const filteredQuestions = questions.filter(q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex h-[calc(100vh-64px)] bg-slate-50 overflow-hidden">
            {/* Internal Sidebar - Hidden on landing Hubs */}
            {location.pathname !== '/strategic-questions' && !location.pathname.startsWith('/strategic-axis') && (
                <aside className="w-80 border-r border-slate-200 bg-white flex flex-col shrink-0 hidden lg:flex">
                <div className="p-6 border-b border-slate-100">
                    <div className="flex items-center gap-2 text-brand-secondary mb-4">
                        <MessageSquare className="h-5 w-5" />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-500">Módulo de Consulta</span>
                    </div>
                    <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Buscar pregunta..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-1">
                    <h3 className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Preguntas Estratégicas</h3>
                    {filteredQuestions.map((q, idx) => (
                        <button
                            key={idx}
                            onClick={() => navigate(q.path)}
                            title={q.question}
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-left group",
                                location.pathname === q.path 
                                    ? "bg-slate-100 text-slate-900 shadow-sm" 
                                    : "text-slate-500 hover:bg-slate-50 hover:text-brand-primary"
                            )}
                        >
                            <div className={cn(
                                "shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                                location.pathname === q.path ? "bg-white text-brand-primary shadow-sm" : "bg-slate-50 text-slate-400 group-hover:text-brand-primary"
                            )}>
                                <q.icon className="h-4 w-4" style={{ color: location.pathname === q.path ? q.color : undefined }} />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold truncate leading-tight" title={q.question}>
                                    {q.shortQuestion || q.question}
                                </p>
                            </div>
                            {location.pathname === q.path && <ChevronRight className="h-4 w-4 ml-auto text-brand-primary" />}
                        </button>
                    ))}
                </div>

            </aside>
            )}

            {/* Content Area */}
            <main className="flex-1 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};
