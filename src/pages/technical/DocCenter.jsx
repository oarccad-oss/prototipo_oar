import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { DocSearch } from '../../components/docs/DocSearch';
import { ChevronRight, Home, BookOpen } from 'lucide-react';

export const DocCenter = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const query = searchParams.get('q') || "";

    return (
        <div className="p-8 space-y-12 bg-slate-50 min-h-full">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <button onClick={() => navigate('/')} className="hover:text-brand-primary transition-colors flex items-center gap-1">
                    <Home className="h-3 w-3" /> Inicio
                </button>
                <ChevronRight className="h-3 w-3" />
                <span className="text-slate-300">Área Técnica</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-brand-primary">Centro de Documentación</span>
            </nav>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-serif font-black text-slate-900 leading-tight flex items-center gap-4">
                        <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
                            <BookOpen className="h-8 w-8 text-brand-primary" />
                        </div>
                        Centro de Documentación
                    </h1>
                    <p className="text-slate-500 text-lg mt-2 font-light">
                        Biblioteca institucional de recursos, reportes y normativas regionales.
                    </p>
                </div>
            </div>

            {/* Key attribute to force re-render if query changes */}
            <DocSearch key={query} initialQuery={query} />
        </div>
    );
};
