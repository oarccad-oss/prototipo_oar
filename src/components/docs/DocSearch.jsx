import React, { useState, useMemo } from 'react';
import { DOCUMENTATION_DATA } from '../../data/documentation';
import { Card, Button, Input, Badge } from '../ui/Shared';
import { Search, FileText, Download, Eye, FileSpreadsheet, Map, Filter, Globe, BookOpen, Clock, ChevronDown, ExternalLink } from 'lucide-react';
import { cn } from '../../lib/utils';
import { SICA_COUNTRIES } from '../../data/constants';

export const DocSearch = ({ initialQuery = "" }) => {
    const [searchTerm, setSearchTerm] = useState(initialQuery);
    const [selectedCountry, setSelectedCountry] = useState('Todos');
    const [selectedAxis, setSelectedAxis] = useState('Todos');

    const axes = useMemo(() => {
        const allAxes = DOCUMENTATION_DATA.flatMap(doc => doc.ejes);
        return ['Todos', ...new Set(allAxes)];
    }, []);

    const countries = useMemo(() => {
        return ['Todos', 'Regional', ...SICA_COUNTRIES.map(c => c.name)];
    }, []);

    const filteredDocs = useMemo(() => {
        return DOCUMENTATION_DATA.filter(doc => {
            const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.author.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesCountry = selectedCountry === 'Todos' || doc.country === selectedCountry;
            const matchesAxis = selectedAxis === 'Todos' || doc.ejes.includes(selectedAxis);
            
            return matchesSearch && matchesCountry && matchesAxis;
        });
    }, [searchTerm, selectedCountry, selectedAxis]);

    const getIcon = (type) => {
        switch (type.toUpperCase()) {
            case 'PDF': return <FileText className="h-8 w-8 text-rose-500" />;
            case 'EXCEL': return <FileSpreadsheet className="h-8 w-8 text-emerald-500" />;
            case 'MAPA': return <Map className="h-8 w-8 text-blue-500" />;
            case 'ESTRATEGIA': return <BookOpen className="h-8 w-8 text-indigo-500" />;
            default: return <FileText className="h-8 w-8 text-slate-400" />;
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header / Search Controls */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col gap-8">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex-1 w-full relative">
                        <Input
                            icon={Search}
                            placeholder="Buscar por título, autor o palabras clave..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="h-14 text-lg shadow-inner bg-slate-50 border-none rounded-2xl"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 items-center border-t border-slate-50 pt-6">
                    <div className="flex items-center gap-2 text-slate-400 mr-2">
                        <Filter className="h-4 w-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Filtros Avanzados</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <div className="relative">
                            <select 
                                value={selectedCountry}
                                onChange={(e) => setSelectedCountry(e.target.value)}
                                className="appearance-none bg-slate-50 border-none rounded-xl px-4 py-2 pr-10 text-xs font-bold text-slate-600 focus:ring-2 focus:ring-brand-primary outline-none transition-all cursor-pointer"
                            >
                                {countries.map(c => (
                                    <option key={c} value={c}>
                                        {c === 'Todos' ? 'Todos los Países' : c}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                        </div>

                        <div className="relative">
                            <select 
                                value={selectedAxis}
                                onChange={(e) => setSelectedAxis(e.target.value)}
                                className="appearance-none bg-slate-50 border-none rounded-xl px-4 py-2 pr-10 text-xs font-bold text-slate-600 focus:ring-2 focus:ring-brand-primary outline-none transition-all cursor-pointer"
                            >
                                {axes.map(a => (
                                    <option key={a} value={a}>
                                        {a === 'Todos' ? 'Todos los Ejes' : a}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                        </div>
                    </div>

                    <div className="ml-auto text-xs font-bold text-slate-400 bg-slate-50 px-4 py-2 rounded-full">
                        {filteredDocs.length} documentos encontrados
                    </div>
                </div>
            </div>

            {/* Grid of Docs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDocs.map((doc) => (
                    <Card key={doc.id} className="group flex flex-col hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
                        <div className="h-40 overflow-hidden relative">
                            <img 
                                src={doc.thumbnail || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400"} 
                                alt={doc.name} 
                                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                            
                            <div className="absolute top-4 left-4 flex gap-2">
                                <Badge className="bg-white/80 backdrop-blur-md text-slate-800 border-none text-[9px] font-black uppercase">
                                    {doc.type}
                                </Badge>
                                <Badge className="bg-brand-primary/80 backdrop-blur-md text-white border-none text-[9px] font-black uppercase">
                                    {doc.country}
                                </Badge>
                            </div>
                        </div>

                        <div className="px-8 pb-8 flex-grow flex flex-col -mt-12 relative z-10">
                            <div className="bg-white rounded-2xl p-4 shadow-lg mb-4 inline-flex self-start group-hover:scale-110 transition-transform duration-500">
                                {getIcon(doc.type)}
                            </div>

                            <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-2 leading-tight group-hover:text-brand-primary transition-colors">
                                {doc.name}
                            </h3>

                            <p className="text-slate-500 text-xs font-medium leading-relaxed mb-4 line-clamp-3">
                                {doc.description}
                            </p>

                            <div className="flex flex-wrap gap-1.5 mb-6">
                                {doc.ejes.map((eje, idx) => (
                                    <span key={idx} className="text-[9px] font-black uppercase tracking-wider text-brand-primary/70 bg-brand-primary/5 px-2 py-0.5 rounded-md">
                                        {eje}
                                    </span>
                                ))}
                            </div>

                            {/* Versions Selector if more than 1, or just info */}
                            <div className="mt-auto space-y-4">
                                {doc.versions && doc.versions.length > 1 ? (
                                    <div className="bg-slate-50 rounded-xl p-3">
                                        <div className="flex items-center gap-2 mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <Clock className="h-3 w-3" /> Historial de Versiones
                                        </div>
                                        <div className="space-y-1">
                                            {doc.versions.map((v, i) => (
                                                <button key={i} className="flex items-center justify-between w-full text-[11px] font-bold text-slate-600 hover:text-brand-primary py-1 transition-colors group/ver">
                                                    <span>{v.label} ({v.year})</span>
                                                    <Download className="h-3 w-3 opacity-0 group-hover/ver:opacity-100" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50 p-2 rounded-lg">
                                        <Clock className="h-3 w-3" /> Actualizado: {doc.date}
                                    </div>
                                )}

                                <div className="flex gap-2 pt-4 border-t border-slate-50">
                                    <Button variant="primary" size="sm" className="flex-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brand-primary/20">
                                        <Eye className="h-3.5 w-3.5 mr-2" />
                                        Ver Documento
                                    </Button>
                                    <Button variant="white" size="sm" className="px-3 rounded-full border-slate-100 hover:bg-slate-50 text-slate-400 hover:text-brand-primary transition-colors shadow-sm">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}

                {filteredDocs.length === 0 && (
                    <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100 shadow-inner">
                        <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="h-10 w-10 text-slate-200" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Sin resultados encontrados</h3>
                        <p className="text-slate-500 max-w-sm mx-auto font-light">
                            No encontramos documentos que coincidan con "{searchTerm}". Intenta ajustar tus filtros de búsqueda.
                        </p>
                        <Button 
                            variant="ghost" 
                            className="mt-6 text-brand-primary font-bold"
                            onClick={() => { setSearchTerm(''); setSelectedCountry('Todos'); setSelectedAxis('Todos'); }}
                        >
                            Limpiar todos los filtros
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
