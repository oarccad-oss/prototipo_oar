import React, { useState, useMemo, useEffect } from 'react';
import { Card, Button, Badge, Input } from '../../components/ui/Shared';
import { 
    Search, 
    Filter, 
    X, 
    Download, 
    ChevronLeft, 
    ChevronRight, 
    RotateCcw,
    FileText,
    Grid,
    LayoutList,
    Globe,
    Activity
} from 'lucide-react';
import CIFRAS_DATA from '../../data/cifras/cifras.json';
import { getEramAxes, getAxisColor } from '../../lib/eram';
import { cn } from '../../lib/utils';

// Helper to get color for an axis
const getAxisColorHelper = (axis) => getAxisColor(axis);

// Helper to get country emoji
const getCountryEmoji = (country) => {
    const flags = {
        'Belice': '🇧🇿',
        'Guatemala': '🇬🇹',
        'El Salvador': '🇸🇻',
        'Honduras': '🇭🇳',
        'Nicaragua': '🇳🇮',
        'Costa Rica': '🇨🇷',
        'Panamá': '🇵🇦',
        'República Dominicana': '🇩🇴',
        'Regional': '🌎'
    };
    return flags[country] || '📍';
};

export const CifrasCenter = () => {
    // States
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [selectedAxes, setSelectedAxes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isInitialView, setIsInitialView] = useState(true);
    
    const ITEMS_PER_PAGE = 20;

    // Derived metadata
    const countries = useMemo(() => Array.from(new Set(CIFRAS_DATA.map(i => i.pais))).sort(), []);
    const axes = useMemo(() => Array.from(new Set(CIFRAS_DATA.map(i => i.eje_tematico))).sort(), []);

    // Filter logic
    const filteredData = useMemo(() => {
        const hasFilters = searchTerm || selectedCountries.length > 0 || selectedAxes.length > 0;
        
        if (!hasFilters && isInitialView) {
            // Initial view: show a subset of random items (simulated with a fixed shuffle based on data)
            return [...CIFRAS_DATA].slice(0, 10);
        }

        return CIFRAS_DATA.filter(item => {
            const matchesSearch = searchTerm === '' || 
                item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.bajada.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesCountry = selectedCountries.length === 0 || selectedCountries.includes(item.pais);
            const matchesAxis = selectedAxes.length === 0 || selectedAxes.includes(item.eje_tematico);
            
            return matchesSearch && matchesCountry && matchesAxis;
        });
    }, [searchTerm, selectedCountries, selectedAxes, isInitialView]);

    // Update initial view state
    useEffect(() => {
        const hasFilters = searchTerm || selectedCountries.length > 0 || selectedAxes.length > 0;
        if (hasFilters) {
            setIsInitialView(false);
        }
    }, [searchTerm, selectedCountries, selectedAxes]);

    // Reset all
    const resetFilters = () => {
        setSearchTerm('');
        setSelectedCountries([]);
        setSelectedAxes([]);
        setCurrentPage(1);
        setIsInitialView(true);
    };

    // Pagination
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Export helpers
    const exportCSV = () => {
        const headers = ["Titulo", "Valor", "Unidad", "Pais", "Eje", "Fuente", "Descripcion"];
        const rows = filteredData.map(item => [
            `"${item.titulo}"`,
            `"${item.valor}"`,
            `"${item.unidad_medida}"`,
            `"${item.pais}"`,
            `"${item.eje_tematico}"`,
            `"${item.fuente}"`,
            `"${item.bajada}"`
        ]);
        
        const csvContent = "data:text/csv;charset=utf-8," + 
            headers.join(",") + "\n" + 
            rows.map(e => e.join(",")).join("\n");
            
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `cifras_oar_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportPDF = () => {
        // Simple print-based "PDF" simulation as a senior dev would do without heavy deps like jsPDF unless required
        window.print();
    };

    const toggleSelection = (list, setList, item) => {
        if (list.includes(item)) {
            setList(list.filter(i => i !== item));
        } else {
            setList([...list, item]);
        }
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header Section */}
            <div className="bg-white border-b border-slate-200 pt-12 pb-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl">
                        <Badge variant="info" className="mb-4 uppercase tracking-[0.2em] font-black px-4 py-1.5">
                            Centro de Datos
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-serif font-black text-slate-900 leading-tight mb-6">
                            Centro de <span className="text-emerald-600 block sm:inline">Cifras Regionales</span>
                        </h1>
                        <p className="text-slate-500 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                            Consulte el inventario completo de indicadores ambientales estratégicos del SICA. Filtre por país o eje temático para análisis específicos.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 -mt-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Filter Sidebar */}
                    <aside className="w-full lg:w-80 space-y-6">
                        <Card className="sticky top-24 shadow-xl border-slate-200/60 p-0 overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <div className="flex items-center gap-2 font-bold text-slate-900">
                                    <Filter className="h-4 w-4" /> Filtros
                                </div>
                                <button 
                                    onClick={resetFilters}
                                    className="text-xs text-slate-400 hover:text-emerald-600 flex items-center gap-1 transition-colors font-bold uppercase tracking-tighter"
                                >
                                    <RotateCcw className="h-3 w-3" /> Limpiar
                                </button>
                            </div>

                            <div className="p-6 space-y-8 max-h-[calc(100vh-250px)] overflow-y-auto custom-scrollbar">
                                {/* Search */}
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-3">Buscar</label>
                                    <Input 
                                        placeholder="Título, palabra clave..." 
                                        icon={Search}
                                        value={searchTerm}
                                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                    />
                                </div>

                                {/* Countries */}
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-3">Países ({selectedCountries.length})</label>
                                    <div className="flex flex-wrap gap-2">
                                        {countries.map(country => (
                                            <button
                                                key={country}
                                                onClick={() => toggleSelection(selectedCountries, setSelectedCountries, country)}
                                                className={cn(
                                                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all border",
                                                    selectedCountries.includes(country)
                                                        ? "bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/20 scale-105"
                                                        : "bg-white border-slate-200 text-slate-600 hover:border-emerald-200 hover:bg-emerald-50/30"
                                                )}
                                            >
                                                {getCountryEmoji(country)} {country}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Axes */}
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-3">Ejes Estratégicos ({selectedAxes.length})</label>
                                    <div className="space-y-2">
                                        {axes.map(axis => (
                                            <button
                                                key={axis}
                                                onClick={() => toggleSelection(selectedAxes, setSelectedAxes, axis)}
                                                className={cn(
                                                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all border group",
                                                    selectedAxes.includes(axis)
                                                        ? "bg-slate-900 border-slate-900 text-white"
                                                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                                                )}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div 
                                                        className="h-2 w-2 rounded-full" 
                                                        style={{ backgroundColor: getAxisColorHelper(axis) }} 
                                                    />
                                                    {axis}
                                                </div>
                                                <div className={cn(
                                                    "h-1.5 w-1.5 rounded-full transition-all",
                                                    selectedAxes.includes(axis) ? "bg-emerald-400 scale-125 shadow-[0_0_8px_rgba(52,211,153,0.8)]" : "bg-slate-200 group-hover:bg-slate-300"
                                                )} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </aside>

                    {/* Results Area */}
                    <div className="flex-1 space-y-6">
                        {/* Results Header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-emerald-50 rounded-lg">
                                    <Activity className="h-5 w-5 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                                        {isInitialView ? 'Selección del día' : 'Resultados del filtro'}
                                    </p>
                                    <p className="text-slate-900 font-black">
                                        {filteredData.length} registros encontrados
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <Button variant="outline" size="sm" className="flex-1 sm:flex-none border-slate-200 text-[10px] font-black uppercase" onClick={exportCSV}>
                                    <FileText className="h-3 w-3 mr-2" /> CSV
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1 sm:flex-none border-slate-200 text-[10px] font-black uppercase" onClick={exportPDF}>
                                    <Download className="h-3 w-3 mr-2" /> PDF
                                </Button>
                            </div>
                        </div>

                        {/* Infinite Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                            {paginatedData.map((item, idx) => {
                                const color = getAxisColorHelper(item.eje_tematico);
                                return (
                                    <Card 
                                        key={`${item.titulo}-${idx}`} 
                                        className="group bg-white border-t-4 rounded-none shadow-md hover:shadow-2xl transition-all p-8 flex flex-col h-full border-slate-100" 
                                        style={{ borderTopColor: color }}
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-600 transition-colors">
                                                {item.titulo}
                                            </span>
                                            <span className="text-xl" title={item.pais}>
                                                {getCountryEmoji(item.pais)}
                                            </span>
                                        </div>
                                        
                                        <div className="flex items-baseline gap-2 mb-4">
                                            <span className="text-4xl font-black text-slate-900 tracking-tight group-hover:scale-105 transition-transform origin-left duration-500">
                                                {item.valor}
                                            </span>
                                            <span className="text-lg font-bold text-slate-400">
                                                {item.unidad_medida}
                                            </span>
                                        </div>
                                        
                                        <p className="text-sm text-slate-500 leading-relaxed font-medium mb-8 flex-1">
                                            {item.bajada}
                                        </p>
                                        
                                        <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                                            <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{item.fuente}</span>
                                            <div 
                                                className="px-2 py-0.5 rounded text-[9px] font-black uppercase border"
                                                style={{ 
                                                    backgroundColor: `${color}08`, 
                                                    color: color,
                                                    borderColor: `${color}20`
                                                }}
                                            >
                                                {item.eje_tematico}
                                            </div>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>

                        {/* Empty State */}
                        {filteredData.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search className="h-10 w-10 text-slate-200" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">No se encontraron resultados</h3>
                                <p className="text-slate-500 mb-8">Intenta ajustar los filtros de búsqueda o limpia la selección.</p>
                                <Button onClick={resetFilters} variant="outline" className="rounded-full px-8">
                                    Ver todas las cifras
                                </Button>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-4 mt-12 bg-white p-4 rounded-full border border-slate-200/60 shadow-sm w-fit mx-auto">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                    className="rounded-full w-10 h-10 p-0"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </Button>
                                
                                <span className="text-sm font-bold text-slate-600 px-4">
                                    Página <span className="text-slate-900">{currentPage}</span> de {totalPages}
                                </span>
                                
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                    className="rounded-full w-10 h-10 p-0"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Print Styles */}
            <style dangerouslySetInnerHTML={{ __html: `
                @media print {
                    aside { display: none !important; }
                    .no-print { display: none !important; }
                    .min-h-screen { height: auto !important; }
                    .bg-slate-50 { background: white !important; }
                    button { display: none !important; }
                    .grid { display: block !important; }
                    .Card { 
                        page-break-inside: avoid !important;
                        margin-bottom: 2rem !important;
                        border: 1px solid #eee !important;
                    }
                }
            ` }} />
        </div>
    );
};
