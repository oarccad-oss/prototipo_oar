import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Trees, LayoutDashboard, BarChart3, AlertCircle, Target, ClipboardList, Zap, CheckCircle, Clock, AlertTriangle, FileText, Link as LinkIcon, Map as MapIcon, Database, File, X, MapPin, FolderCheck, ChevronRight, HelpCircle, Info, Scale, Activity, Globe, TrendingUp } from 'lucide-react';
import { eramForestData } from '../../data/eramForest';
import { Card, Button, Badge, Input } from '../../components/ui/Shared';

const getProgressColor = (progress) => {
    if (progress >= 75) return "bg-emerald-500";
    if (progress >= 40) return "bg-amber-400";
    return "bg-rose-500";
};

const getStatusData = (progress) => {
    if (progress >= 75) return { text: 'Avanzado', bg: 'bg-emerald-100', textC: 'text-emerald-800', border: 'border-emerald-200', icon: CheckCircle };
    if (progress >= 40) return { text: 'En Proceso', bg: 'bg-amber-100', textC: 'text-amber-800', border: 'border-amber-200', icon: Clock };
    return { text: 'Rezago', bg: 'bg-rose-100', textC: 'text-rose-800', border: 'border-rose-200', icon: AlertTriangle };
};

const getVerificationIcon = (type) => {
    switch (type) {
        case 'pdf': return FileText;
        case 'link': return LinkIcon;
        case 'map': return MapIcon;
        case 'data': return Database;
        case 'doc': return File;
        default: return File;
    }
};

const IndicatorCard = ({ item, onClick }) => {
    const st = getStatusData(item.progress);
    const StatusIcon = st.icon;
    const isImpact = item.type === "impacto";

    return (
        <Card className={`rounded-[1.5rem] shadow-sm border-2 ${isImpact ? 'border-blue-50 hover:border-blue-200' : 'border-emerald-50 hover:border-emerald-200'} p-0 overflow-hidden transition-all group mb-6`}>
            <div className="p-8 flex flex-col lg:flex-row gap-8 items-start lg:items-center">
                <div className="flex-1 w-full text-left">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-lg text-[10px] font-black font-mono bg-slate-100 text-slate-500 border border-slate-200 uppercase tracking-widest">
                            {item.id}
                        </span>
                        <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.1em] border-2 ${isImpact ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'}`}>
                            {isImpact ? (
                                <span className="flex items-center gap-1.5"><Target className="w-3.5 h-3.5" /> Impacto Operativo</span>
                            ) : (
                                <span className="flex items-center gap-1.5"><ClipboardList className="w-3.5 h-3.5" /> Gestión Institucional</span>
                            )}
                        </span>
                    </div>

                    <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors leading-tight">{item.line}</h3>

                    <div className={`mb-6 p-5 rounded-2xl border-2 ${isImpact ? 'bg-blue-50/30 border-blue-50' : 'bg-emerald-50/30 border-emerald-50'}`}>
                        <span className={`text-[10px] font-black uppercase tracking-widest block mb-2 flex items-center gap-1.5 ${isImpact ? 'text-blue-600' : 'text-emerald-600'}`}>
                            <Zap className="w-3.5 h-3.5" /> Acción Estratégica ERAM
                        </span>
                        <p className="text-sm text-slate-600 font-medium italic leading-relaxed">{item.accionEstrategica}</p>
                    </div>

                    <div className="mb-6">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Indicador de Cumplimiento</p>
                         <p className="text-md text-slate-700 font-bold leading-relaxed">{item.indicator}</p>
                    </div>

                    {isImpact ? (
                        <div className="bg-white border-2 border-blue-50 rounded-2xl p-4 inline-flex flex-wrap gap-8 items-center">
                            <div>
                                <span className="block text-[9px] font-black uppercase tracking-widest text-blue-400 mb-1">Volumen Reportado</span>
                                <span className="text-2xl font-black text-blue-700 tabular-nums">
                                    {item.currentValue.toLocaleString()} <span className="text-xs font-bold opacity-60 tracking-normal">{item.unit}</span>
                                </span>
                            </div>
                            <div className="h-10 w-px bg-blue-50"></div>
                            <div>
                                <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Meta Regional 2025</span>
                                <span className="text-2xl font-black text-slate-800 tabular-nums">
                                    {item.targetValue.toLocaleString()} <span className="text-xs font-bold opacity-60 tracking-normal">{item.unit}</span>
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white border-2 border-emerald-50 rounded-2xl p-4 inline-flex flex-wrap gap-8 items-center">
                            <div>
                                <span className="block text-[9px] font-black uppercase tracking-widest text-emerald-500 mb-1">Países / Marcos Habilitados</span>
                                <span className="text-2xl font-black text-emerald-700 tabular-nums">
                                    {item.currentValue} <span className="text-xs font-bold text-slate-400 tracking-normal uppercase ml-1">de {item.targetValue} {item.unit}</span>
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="w-full lg:w-80 shrink-0 bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <div className="flex justify-between items-center mb-4">
                        <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border-2 ${st.bg} ${st.textC} ${st.border} flex items-center gap-1.5`}>
                            <StatusIcon className="w-3.5 h-3.5" />{st.text}
                        </span>
                        <span className="text-3xl font-black text-slate-900 tracking-tighter">{item.progress}%</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-4 mb-6 overflow-hidden border border-slate-100 shadow-inner">
                        <div className={`${getProgressColor(item.progress)} h-full rounded-full transition-all duration-1000 relative`} style={{ width: `${item.progress}%` }}>
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"></div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            onClick={() => onClick(item)}
                            variant="outline"
                            className={`flex-1 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-sm ${
                                isImpact 
                                    ? 'text-blue-600 border-blue-100 hover:bg-blue-600 hover:text-white' 
                                    : 'text-emerald-600 border-emerald-100 hover:bg-emerald-600 hover:text-white'
                            }`}
                        >
                            <BarChart3 className="w-4 h-4 mr-2" /> Evidencia
                        </Button>
                        <Button
                            onClick={() => window.dispatchEvent(new CustomEvent('open-ficha', { detail: item }))}
                            variant="ghost"
                            className="flex-1 py-4 rounded-xl font-black text-xs uppercase tracking-widest text-slate-500 hover:bg-slate-100 transition-all border border-slate-200"
                        >
                            <Info className="w-4 h-4 mr-2" /> Ficha
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export const OperationalMonitoring = () => {
    const [activeItem, setActiveItem] = useState(null);
    const [activeFicha, setActiveFicha] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedResultado, setSelectedResultado] = useState('Todos');
    const [selectedType, setSelectedType] = useState('Todos');
    const [showOnlyLagging, setShowOnlyLagging] = useState(false);

    useEffect(() => {
        const handleOpenFicha = (e) => setActiveFicha(e.detail);
        window.addEventListener('open-ficha', handleOpenFicha);
        return () => window.removeEventListener('open-ficha', handleOpenFicha);
    }, []);


    const availableResults = useMemo(() => {
        const filteredByTipologia = selectedType === 'Todos' 
            ? eramForestData 
            : eramForestData.filter(item => item.type === selectedType);
        return ['Todos', ...new Set(filteredByTipologia.map(item => item.resultado))].sort();
    }, [selectedType]);

    // Reset result filter if it's no longer available in the current typology
    useEffect(() => {
        if (!availableResults.includes(selectedResultado)) {
            setSelectedResultado('Todos');
        }
    }, [availableResults, selectedResultado]);

    const processedData = useMemo(() => {
        return eramForestData
            .map(item => {
                const currentValue = item.countries.reduce((acc, curr) => acc + curr.value, 0);
                const progress = Math.min(100, Math.round((currentValue / item.targetValue) * 100));
                return { ...item, currentValue, progress };
            })
            .filter(item => {
                const searchLower = searchTerm.toLowerCase();
                const matchesSearch = item.resultado.toLowerCase().includes(searchLower) ||
                    item.line.toLowerCase().includes(searchLower) ||
                    item.accionEstrategica.toLowerCase().includes(searchLower) ||
                    item.indicator.toLowerCase().includes(searchLower);
                const matchesFilter = selectedResultado === 'Todos' || item.resultado === selectedResultado;
                const matchesType = selectedType === 'Todos' || item.type === selectedType;
                const matchesLagging = !showOnlyLagging || item.progress < 40;
                
                return matchesSearch && matchesFilter && matchesType && matchesLagging;
            });
    }, [searchTerm, selectedResultado, selectedType, showOnlyLagging]);

    const groupedData = useMemo(() => {
        const groups = {};
        processedData.forEach(item => {
            if (!groups[item.resultado]) groups[item.resultado] = [];
            groups[item.resultado].push(item);
        });
        return Object.keys(groups).sort().reduce((acc, key) => {
            acc[key] = groups[key];
            return acc;
        }, {});
    }, [processedData]);

    const totalProgress = processedData.length > 0
        ? Math.round(processedData.reduce((acc, curr) => acc + curr.progress, 0) / processedData.length)
        : 0;
    const criticalItems = processedData.filter(d => d.progress < 40).length;
    const totalIndicators = processedData.length;
    const activeResults = [...new Set(processedData.map(item => item.resultado))].length;
    const rezagoRatio = totalIndicators > 0 ? Math.round((criticalItems / totalIndicators) * 100) : 0;
    const alertLevel = rezagoRatio > 25 ? "Crítico" : rezagoRatio > 10 ? "Advertencia" : "Normal";

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* HEADER */}
            <header className="bg-slate-900 text-white shadow-xl sticky top-0 z-40 border-b-8 border-emerald-600">
                <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-8 text-left">
                    <div className="flex items-center gap-6">
                        <div className="bg-emerald-600 p-3 rounded-2xl shadow-xl">
                            <Trees className="w-10 h-10 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter">Monitoreo Operativo ERAM</h1>
                            <div className="flex items-center gap-2">
                                <p className="text-emerald-400 text-sm font-bold uppercase tracking-[0.2em]">Eje: Bosques y Paisajes Sostenibles</p>
                                <Link to="/monitoring/strategic" className="bg-emerald-700/50 hover:bg-emerald-600 px-3 py-1 rounded text-[10px] font-black uppercase transition-all flex items-center gap-1.5 ml-2">
                                    <Globe className="w-3 h-3" /> Ver Estratégico
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-full md:w-96">
                        <Input
                            icon={Search}
                            placeholder="Buscar acción o indicador..."
                            className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:ring-emerald-500 focus:border-emerald-500 py-3"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* NARRATIVE ORIENTATION */}
                <div className="mb-10 p-8 bg-emerald-50/50 rounded-[2rem] border border-emerald-100 flex gap-6 items-start">
                    <div className="p-4 bg-emerald-600 rounded-2xl text-white shadow-lg shrink-0">
                        <Info className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                        <h3 className="text-xl font-bold text-emerald-900 mb-2 font-serif">Sobre el Monitoreo Operativo</h3>
                        <p className="text-slate-600 leading-relaxed font-light">
                            Esta vista audita la **gestión técnica** y el avance físico de los ejes temáticos de la ERAM. Aquí podrá ver el cumplimiento de metas específicas por país, la documentación de respaldo (evidencia) y el estado de la institucionalidad ambiental regional. Es una herramienta de transparencia y rendición de cuentas operativa.
                        </p>
                    </div>
                </div>

                {/* FILTROS AVANZADOS */}
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm mb-12 space-y-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Tipología */}
                        <div className="flex flex-col gap-4">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Tipología de Indicadores</span>
                            <div className="flex gap-2">
                                <button onClick={() => { setSelectedType('Todos'); setShowOnlyLagging(false); }} className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border-2 ${selectedType === 'Todos' && !showOnlyLagging ? 'bg-slate-800 text-white border-slate-800 shadow-lg' : 'bg-white text-slate-500 border-slate-100 hover:bg-slate-50'}`}>Todos</button>
                                <button onClick={() => { setSelectedType('impacto'); setShowOnlyLagging(false); }} className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border-2 flex items-center gap-2 ${selectedType === 'impacto' ? 'bg-blue-600 text-white border-blue-600 shadow-lg' : 'bg-white text-blue-600 border-blue-50 hover:bg-blue-50/50'}`}>
                                    <Target className="w-4 h-4"/> Impacto
                                </button>
                                <button onClick={() => { setSelectedType('gestion'); setShowOnlyLagging(false); }} className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border-2 flex items-center gap-2 ${selectedType === 'gestion' ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg' : 'bg-white text-emerald-600 border-emerald-50 hover:bg-emerald-50/50'}`}>
                                    <ClipboardList className="w-4 h-4"/> Gestión
                                </button>
                            </div>
                        </div>

                        {/* Resultados */}
                    <div className="flex flex-col gap-4 flex-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Filtro por Resultado ERAM</span>
                        <div className="flex flex-wrap gap-2">
                            {availableResults.map(res => (
                                <button
                                    key={res}
                                    onClick={() => setSelectedResultado(res)}
                                    className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${
                                        selectedResultado === res 
                                        ? 'bg-slate-800 text-white border-slate-800 shadow-lg' 
                                        : 'bg-white text-slate-500 border-slate-100 hover:bg-slate-50'
                                    }`}
                                >
                                    {res === 'Todos' ? 'Mostrar Todos' : res}
                                </button>
                            ))}
                        </div>
                    </div>
                    </div>

                    {/* KPI SUMMARY */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-slate-50">
                        <div 
                            onClick={() => { setShowOnlyLagging(false); setSelectedResultado('Todos'); setSelectedType('Todos'); }}
                            className="flex items-center gap-4 group cursor-pointer hover:bg-slate-50 p-2 rounded-2xl transition-all"
                        >
                            <div className="bg-emerald-100 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                                <BarChart3 className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Avance Medio</p>
                                <h3 className="text-3xl font-black text-slate-800">{totalProgress}%</h3>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 group cursor-default p-2">
                            <div className="bg-blue-100 p-4 rounded-2xl">
                                <Target className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Resultados ERAM</p>
                                <h3 className="text-3xl font-black text-slate-800">{activeResults}</h3>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 group cursor-default p-2">
                            <div className="bg-indigo-100 p-4 rounded-2xl">
                                <ClipboardList className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">N° Indicadores</p>
                                <h3 className="text-3xl font-black text-slate-800">{totalIndicators}</h3>
                            </div>
                        </div>
                        <div 
                            onClick={() => setShowOnlyLagging(!showOnlyLagging)}
                            className={`flex items-center gap-4 group cursor-pointer p-2 rounded-2xl transition-all border-2 ${
                                showOnlyLagging ? 'bg-rose-50 border-rose-200' : 'hover:bg-rose-50 border-transparent'
                            }`}
                        >
                            <div className={`p-4 rounded-2xl transition-transform ${showOnlyLagging ? 'bg-rose-600 text-white' : 'bg-rose-100 text-rose-600 group-hover:scale-110'}`}>
                                <AlertCircle className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <div className="flex items-center gap-2">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Alertas Rezago</p>
                                    <div className="relative group/tooltip">
                                        <HelpCircle className="w-3.5 h-3.5 text-slate-300 cursor-help hover:text-slate-500 transition-colors" />
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-4 bg-slate-900 text-white text-[11px] rounded-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-50 shadow-2xl pointer-events-none text-left">
                                            <p className="font-bold border-b border-white/10 pb-2 mb-2 uppercase tracking-widest text-[9px] text-rose-400">Lógica de Estimación</p>
                                            <p className="font-light leading-relaxed">
                                                Un indicador se considera en <span className="text-rose-400 font-bold">rezago crítico</span> si su avance es inferior al 40% respecto a la meta 2025. 
                                                La alerta se calcula como la proporción de items críticos sobre el total: 
                                                <span className="block mt-2 font-mono text-emerald-400 bg-emerald-500/10 p-1.5 rounded text-center">
                                                    (Items &lt; 40% / Total) × 100
                                                </span>
                                            </p>
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-3xl font-black text-rose-600">{criticalItems}</h3>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                        alertLevel === 'Crítico' ? 'bg-rose-100 text-rose-600' : 
                                        alertLevel === 'Advertencia' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'
                                    }`}>
                                        {alertLevel}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="space-y-16">
                    {Object.keys(groupedData).length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-200">
                            <Search className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                            <h3 className="text-2xl font-black text-slate-400 uppercase tracking-widest">Sin resultados</h3>
                            <p className="text-slate-400 mt-2 font-medium italic">Intenta con otros términos de búsqueda o filtros.</p>
                        </div>
                    ) : (
                        Object.entries(groupedData).map(([resultadoStr, items]) => {
                            const [resCode, ...resTitleArr] = resultadoStr.split(':');
                            const resTitle = resTitleArr.join(':').trim();

                            return (
                                <div key={resultadoStr} className="text-left">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="bg-slate-900 px-4 py-2 rounded-xl shadow-lg">
                                            <span className="text-white font-black text-xl tabular-nums">{resCode}</span>
                                        </div>
                                        <h2 className="text-2xl font-black text-slate-800 leading-tight border-b-4 border-slate-200 pb-2">{resTitle}</h2>
                                    </div>

                                    <div className="pl-6 border-l-4 border-slate-200 transition-all hover:border-emerald-400">
                                        {items.map((item, idx) => (
                                            <IndicatorCard key={idx} item={item} onClick={setActiveItem} />
                                        ))}
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </main>

            {/* MODAL / ANALISIS DE EVIDENCIA */}
            {activeItem && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={() => setActiveItem(null)}></div>
                    <Card className="relative bg-slate-50 rounded-[2.5rem] shadow-2xl w-full max-w-5xl max-h-[95vh] flex flex-col overflow-hidden p-0 border-none">
                        
                        <div className={`flex items-start justify-between p-8 border-b border-slate-200 ${activeItem.type === 'impacto' ? 'bg-blue-50/40' : 'bg-emerald-50/40'}`}>
                            <div className="text-left">
                                <div className="flex gap-2 mb-4">
                                    <Badge className={`${activeItem.type === 'impacto' ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-emerald-100 text-emerald-700 border-emerald-200'} font-black text-[10px] uppercase tracking-widest`}>
                                        {activeItem.id} • Análisis Operativo
                                    </Badge>
                                    <Badge className="bg-slate-200 text-slate-600 border-none font-black text-[10px] uppercase tracking-widest">Auditoría SIME</Badge>
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 leading-tight mb-4">{activeItem.line}</h2>
                                <div className="flex items-start gap-2 max-w-3xl">
                                    <Zap className={`w-5 h-5 shrink-0 mt-0.5 ${activeItem.type === 'impacto' ? 'text-blue-500' : 'text-emerald-500'}`} />
                                    <p className="text-slate-600 font-medium italic">{activeItem.accionEstrategica}</p>
                                </div>
                            </div>
                            <button onClick={() => setActiveItem(null)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all">
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        <div className="p-8 overflow-y-auto custom-scrollbar flex-1 space-y-10">
                            
                            {/* KPI BOXES */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Card className={`${activeItem.type === 'impacto' ? 'bg-blue-600' : 'bg-emerald-600'} text-white p-8 rounded-3xl shadow-xl flex flex-col justify-center border-none relative overflow-hidden`}>
                                   <div className="absolute top-0 right-0 -mt-4 -mr-4 text-white/10"><BarChart3 className="w-32 h-32" /></div>
                                   <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80 text-left">
                                      {activeItem.type === 'impacto' ? 'Total Regional Ejecutado' : 'Instrumentos Validados'}
                                   </p>
                                   <h3 className="text-5xl font-black tabular-nums text-left">{activeItem.currentValue.toLocaleString()}</h3>
                                   <p className="text-xs font-bold mt-2 opacity-80 text-left">{activeItem.unit}</p>
                                </Card>
                                <Card className="bg-white border-2 border-slate-100 p-8 rounded-3xl shadow-sm flex flex-col justify-center text-left">
                                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Meta Estratégica Regional</p>
                                   <h3 className="text-5xl font-black text-slate-800 tabular-nums">{activeItem.targetValue.toLocaleString()}</h3>
                                   <p className="text-xs font-bold text-slate-400 mt-2">{activeItem.unit}</p>
                                </Card>
                                <Card className="bg-white border-2 border-slate-100 p-8 rounded-3xl shadow-sm flex flex-col justify-center text-left">
                                   <div className="flex justify-between items-end mb-4">
                                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest uppercase">Cumplimiento del Eje</span>
                                     <span className={`text-3xl font-black ${activeItem.progress >= 50 ? 'text-emerald-600' : 'text-amber-600'}`}>{activeItem.progress}%</span>
                                   </div>
                                   <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden shadow-inner">
                                      <div className={`${getProgressColor(activeItem.progress)} h-full rounded-full transition-all duration-1000 relative`} style={{width: `${activeItem.progress}%`}}>
                                          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.1)_50%,rgba(255,255,255,.1)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"></div>
                                      </div>
                                   </div>
                                </Card>
                            </div>

                            {/* PAIS POR PAIS */}
                            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                                <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center px-10">
                                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-3">
                                        <MapPin className={`w-6 h-6 ${activeItem.type === 'impacto' ? 'text-blue-600' : 'text-emerald-600'}`} /> Contribución Nacional al Avance
                                    </h3>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Desglose por Estado Miembro</span>
                                </div>
                                <div className="p-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                        {activeItem.countries.sort((a,b) => b.value - a.value).map((country, idx) => {
                                            let visualWidth = 0;
                                            if (activeItem.type === "gestion") {
                                                visualWidth = country.value > 0 ? 100 : 0;
                                            } else {
                                                const maxCountryValue = Math.max(...activeItem.countries.map(c => c.value));
                                                visualWidth = maxCountryValue > 0 ? (country.value / maxCountryValue) * 100 : 0;
                                            }
                                            
                                            return (
                                                <div key={idx} className="space-y-3 group text-left">
                                                    <div className="flex justify-between items-end">
                                                        <span className="text-sm font-black text-slate-700 uppercase tracking-tighter">{country.name}</span>
                                                        <div className="flex flex-col items-end">
                                                            <span className={`text-lg font-black tabular-nums transition-all group-hover:scale-110 ${activeItem.type === 'impacto' ? 'text-blue-600' : 'text-emerald-600'}`}>
                                                                {country.value.toLocaleString()} 
                                                            </span>
                                                            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{activeItem.type === 'gestion' ? (country.value > 0 ? '✓ Logrado' : '○ Pendiente') : activeItem.unit}</span>
                                                        </div>
                                                    </div>
                                                    <div className="w-full bg-slate-50 h-3 rounded-full overflow-hidden border border-slate-100">
                                                        <div className={`${activeItem.type === 'impacto' ? 'bg-blue-500' : 'bg-emerald-500'} h-full rounded-full transition-all duration-1000 shadow-md`} style={{width: `${visualWidth}%`}}></div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* AUDITORIA */}
                            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden text-left">
                                <div className={`${activeItem.type === 'impacto' ? 'bg-slate-900' : 'bg-emerald-900'} p-8 flex items-center justify-between px-10`}>
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-white/10 rounded-2xl text-white">
                                            <FolderCheck className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-white">Auditoría y Medios de Verificación</h3>
                                            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-1">Respaldo legal y técnico de los datos reportados</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" className="text-white hover:bg-white/10 font-black text-xs uppercase tracking-widest">Descargar Todo (ZIP)</Button>
                                </div>
                                <div className="p-0">
                                    <div className="divide-y divide-slate-100">
                                        {activeItem.verificationMeans.map((mv, i) => {
                                            let req = typeof mv.required === 'number' ? mv.required : mv.uploaded;
                                            let statusPercent = Math.min(100, (mv.uploaded / (req || 1)) * 100);
                                            let isComplete = statusPercent === 100;
                                            const MvIcon = getVerificationIcon(mv.type);

                                            return (
                                                <div key={i} className="p-8 px-10 hover:bg-slate-50 transition-all flex flex-col md:flex-row gap-8 justify-between items-start md:items-center group">
                                                    <div className="flex gap-6 items-start flex-1 w-full">
                                                        <div className={`p-4 rounded-2xl transition-all shadow-md group-hover:scale-110 ${isComplete ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                                                            <MvIcon className="w-8 h-8" />
                                                        </div>
                                                        <div className="flex-1 space-y-3">
                                                            <h4 className="text-lg font-black text-slate-800 leading-tight">{mv.name}</h4>
                                                            <div className="flex flex-col sm:flex-row sm:items-center gap-8">
                                                                <div className="space-y-1">
                                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Documentos Cargados</p>
                                                                    <p className="text-sm font-black text-slate-700 tabular-nums">
                                                                        {mv.uploaded} <span className="text-slate-300 font-bold mx-1">/</span> {mv.required === 'N/A' ? 'Sin Meta Fija' : mv.required}
                                                                    </p>
                                                                </div>
                                                                <div className="flex-1 max-w-sm space-y-2">
                                                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                                        <span className={isComplete ? 'text-emerald-600' : 'text-amber-500'}>{isComplete ? 'Completo' : 'En Carga'}</span>
                                                                        <span>{statusPercent.toFixed(0)}%</span>
                                                                    </div>
                                                                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden shadow-inner">
                                                                        <div className={`${isComplete ? 'bg-emerald-500' : 'bg-amber-400'} h-full rounded-full transition-all duration-1000`} style={{ width: `${statusPercent}%` }}></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Button variant="outline" className="rounded-xl px-8 font-black text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white group-hover:shadow-lg transition-all flex items-center gap-2">
                                                        Explorar Repositorio <ChevronRight className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Card>
                </div>
            )}
            {/* MODAL: FICHA TÉCNICA OPERATIVA */}
            {activeFicha && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setActiveFicha(null)}></div>
                    <Card className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden p-0 border-none">
                        <div className={`flex items-start justify-between p-8 border-b border-slate-100 ${activeFicha.type === 'impacto' ? 'bg-blue-50/30' : 'bg-emerald-50/30'}`}>
                            <div className="text-left">
                                <Badge className={`${activeFicha.type === 'impacto' ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-emerald-100 text-emerald-700 border-emerald-200'} px-3 py-1 mb-3 font-black uppercase text-[10px]`}>
                                    {activeFicha.id} • Ficha Técnica Operativa
                                </Badge>
                                <h2 className="text-2xl md:text-3xl font-black text-slate-900">{activeFicha.line}</h2>
                            </div>
                            <button onClick={() => setActiveFicha(null)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all text-left">
                                <X className="w-8 h-8" />
                            </button>
                        </div>
                        
                        <div className="p-8 overflow-y-auto space-y-8 flex-1 custom-scrollbar text-left">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                                    <div className={`p-2 rounded-lg ${activeFicha.type === 'impacto' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                        <Target className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-xl font-bold text-slate-800">Indicador: {activeFicha.indicator}</h4>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-left">
                                        <h5 className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest leading-none">
                                            <Scale className="w-4 h-4" /> Unidad de Medida
                                        </h5>
                                        <span className="text-lg font-black text-slate-800">{activeFicha.unit}</span>
                                    </div>
                                    <div className="bg-amber-50/30 p-6 rounded-2xl border border-amber-100 text-left">
                                        <h5 className="flex items-center gap-2 text-[10px] font-black uppercase text-amber-700 mb-4 tracking-widest leading-none">
                                            <Activity className="w-4 h-4" /> Meta ERAM 2025
                                        </h5>
                                        <p className="text-sm text-slate-700 leading-relaxed font-medium">{activeFicha.targetText}</p>
                                    </div>
                                </div>

                                <div className={`${activeFicha.type === 'impacto' ? 'bg-blue-50/30 border-blue-100' : 'bg-emerald-50/30 border-emerald-100'} p-6 rounded-2xl border text-left`}>
                                    <h5 className={`flex items-center gap-2 text-[10px] font-black uppercase mb-4 tracking-widest leading-none ${activeFicha.type === 'impacto' ? 'text-blue-800' : 'text-emerald-800'}`}>
                                        <TrendingUp className="w-4 h-4" /> Método de Cálculo del Avance
                                    </h5>
                                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                                        {activeFicha.calculationMethod || "Definición técnica del algoritmo de cálculo regional basado en reportes nacionales consolidados."}
                                    </p>
                                </div>

                                <div className="bg-slate-900 p-8 rounded-[2rem] text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-10">
                                        <Zap className="w-48 h-48" />
                                    </div>
                                    <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-4">Acción Estratégica ERAM</h5>
                                    <p className="text-lg font-medium italic leading-relaxed relative z-10">
                                        "{activeFicha.accionEstrategica}"
                                    </p>
                                </div>

                                <div className={`${activeFicha.type === 'impacto' ? 'bg-blue-50/30 border-blue-100' : 'bg-emerald-50/30 border-emerald-100'} p-6 rounded-2xl border`}>
                                    <h5 className={`flex items-center gap-2 text-[10px] font-black uppercase mb-6 tracking-widest leading-none ${activeFicha.type === 'impacto' ? 'text-blue-800' : 'text-emerald-800'}`}>
                                        <Database className="w-4 h-4" /> Resultado Asociado
                                    </h5>
                                    <div className="space-y-2">
                                        <p className="text-sm text-slate-600 leading-relaxed font-bold">{activeFicha.resultado}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};
