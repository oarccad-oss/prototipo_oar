import React, { useState, useMemo, useEffect } from 'react';
import { Search, Map, FileText, BarChart2, X, ArrowRight } from 'lucide-react';
import { Card } from './Shared';
import { MAP_LAYERS, DOCUMENTS, KPI_DATA } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';

export const GlobalSearch = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    // Reset query when closed
    useEffect(() => {
        if (!isOpen) setQuery("");
    }, [isOpen]);

    // Handle Esc and Scroll Lock
    useEffect(() => {
        if (!isOpen) return;

        // Prevent background scrolling
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    const results = useMemo(() => {
        if (query.length < 2) {
            return { maps: [], docs: [], kpis: [] };
        }

        const lowerQ = query.toLowerCase();

        // Mock Search Logic
        const maps = MAP_LAYERS.filter(l =>
            l.name.toLowerCase().includes(lowerQ) || l.category.toLowerCase().includes(lowerQ)
        );

        const docs = DOCUMENTS.filter(d =>
            d.title.toLowerCase().includes(lowerQ) || d.category.toLowerCase().includes(lowerQ)
        );

        const kpis = Object.entries(KPI_DATA.regional).filter(([key, val]) =>
            key.toLowerCase().includes(lowerQ) || val.unit.toLowerCase().includes(lowerQ)
        ).map(([key, val]) => ({ key, ...val }));

        return { maps, docs, kpis };

    }, [query]);

    if (!isOpen) return null;

    const handleNavigate = (path) => {
        navigate(path);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-20 bg-slate-900/50 backdrop-blur-sm p-4">
            <Card className="w-full max-w-2xl bg-white shadow-2xl p-0 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center border-b border-slate-200 p-4">
                    <Search className="h-5 w-5 text-slate-400 mr-3" />
                    <input
                        autoFocus
                        className="flex-1 outline-none text-lg text-slate-700 placeholder:text-slate-400"
                        placeholder="Buscar..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full">
                        <X className="h-5 w-5 text-slate-500" />
                    </button>
                </div>

                <div className="max-h-[60vh] overflow-y-auto bg-slate-50">
                    {query.length < 2 ? (
                        <div className="p-8 text-center text-slate-400">
                            <Search className="h-12 w-12 mx-auto mb-3 opacity-20" />
                            <p>Escribe al menos 2 caracteres para buscar...</p>
                        </div>
                    ) : (
                        <div className="p-4 space-y-6">
                            {/* Maps Results */}
                            {results.maps.length > 0 && (
                                <section>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                        <Map className="h-3 w-3" /> Mapas y Capas
                                    </h4>
                                    <div className="space-y-2">
                                        {results.maps.map(map => (
                                            <div
                                                key={map.id}
                                                className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 hover:border-brand-primary cursor-pointer group transition-colors"
                                                onClick={() => handleNavigate('/technical/map?layer=' + map.id)}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="h-2 w-2 rounded-full" style={{ background: map.color }} />
                                                    <span className="font-medium text-slate-700">{map.name}</span>
                                                </div>
                                                <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-brand-primary" />
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* KPI Results */}
                            {results.kpis.length > 0 && (
                                <section>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                        <BarChart2 className="h-3 w-3" /> Indicadores
                                    </h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {results.kpis.map((kpi, idx) => (
                                            <div
                                                key={idx}
                                                className="p-3 bg-white rounded-lg border border-slate-200 hover:border-brand-primary cursor-pointer hover:shadow-sm"
                                                onClick={() => handleNavigate('/technical/dashboard?kpi=' + kpi.key)}
                                            >
                                                <div className="text-sm font-medium text-slate-600 capitalize">{kpi.key}</div>
                                                <div className="text-lg font-bold text-slate-900">
                                                    {new Intl.NumberFormat('es-ES').format(kpi.value)} <span className="text-xs font-normal text-slate-400">{kpi.unit}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Docs Results */}
                            {results.docs.length > 0 && (
                                <section>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                        <FileText className="h-3 w-3" /> Documentos
                                    </h4>
                                    <div className="space-y-2">
                                        {results.docs.map(doc => (
                                            <div
                                                key={doc.id}
                                                className="p-3 bg-white rounded-lg border border-slate-200 hover:border-brand-primary cursor-pointer group"
                                                onClick={() => handleNavigate('/technical/docs?q=' + doc.title)}
                                            >
                                                <div className="font-medium text-slate-700 group-hover:text-brand-primary transition-colors">{doc.title}</div>
                                                <div className="flex gap-2 mt-1">
                                                    <span className="text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">{doc.country}</span>
                                                    <span className="text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">{doc.year}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {results.maps.length === 0 && results.docs.length === 0 && results.kpis.length === 0 && (
                                <div className="p-4 text-center text-slate-500 bg-white rounded-lg border border-dashed border-slate-300">
                                    No se encontraron resultados.
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 text-xs text-slate-500 flex justify-end">
                    <span>Presiona <kbd className="bg-white border border-slate-300 rounded px-1">Esc</kbd> para cerrar</span>
                </div>
            </Card>
        </div>
    );
};
