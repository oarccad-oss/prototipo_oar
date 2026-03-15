
import React, { useState, useMemo } from 'react';
import { Search, Globe, ShieldAlert, Leaf, BookOpen, Target, BarChart3, Info, X, MapPin, Activity, CalendarDays, TrendingUp, TableProperties, Database, Scale, ClipboardList } from 'lucide-react';
import { indicatorsData } from '../../data/monitoring/indicators';
import { RegionalEvolutionChart } from '../../components/monitoring/RegionalChart';
import { Card, Button, Badge, Input } from '../../components/ui/Shared';

const generateMockData = (indicator) => {
    const countries = ["Belice", "Costa Rica", "El Salvador", "Guatemala", "Honduras", "Nicaragua", "Panamá", "Rep. Dominicana"];
    const mainMetric = indicator.metrics[0];
    const unit = mainMetric.unit;
    const isPercentage = unit.includes('%');
    const isIndex = unit.includes('Índice');
    const isSummable = !isPercentage && !isIndex;
    const startYear = 2015;
    const endYear = 2025;
    const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
    let allData = [];
    countries.forEach(c => {
        let baseVal = isPercentage ? (Math.random() * 30 + 10) :
            isIndex ? (Math.random() * 0.4 + 0.4) :
                (Math.random() * 800 + 50);
        let trend = (Math.random() - 0.2) * (isPercentage ? 1.5 : isIndex ? 0.01 : 20);
        years.forEach(y => {
            let val = baseVal + trend * (y - startYear) + (Math.random() * (isPercentage ? 2 : isIndex ? 0.01 : 15) - (isPercentage ? 1 : isIndex ? 0.005 : 7.5));
            if (isPercentage) val = Math.max(0, Math.min(100, val));
            if (isIndex) val = Math.max(0, Math.min(1, val));
            if (!isPercentage && !isIndex) val = Math.max(0, val);
            allData.push({
                country: c,
                year: y,
                value: isIndex ? Number(val.toFixed(3)) : Number(val.toFixed(1)),
                unit: unit
            });
        });
    });
    return { data: allData, years, isSummable, unit };
};

export const StrategicMonitoring = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [activeIndicator, setActiveIndicator] = useState(null);
    const [activeDataView, setActiveDataView] = useState(null);
    const [selectedType, setSelectedType] = useState('Todas');
    const [selectedYear, setSelectedYear] = useState(2024);

    const categories = ['Todas', ...new Set(indicatorsData.map(item => item.category))];

    const filteredIndicators = indicatorsData.filter(indicator => {
        const matchesSearch = indicator.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            indicator.metrics.some(m => m.variable.toLowerCase().includes(searchTerm.toLowerCase())) ||
            indicator.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Todas' || indicator.category === selectedCategory;
        const matchesType = selectedType === 'Todas' || indicator.type === selectedType;
        return matchesSearch && matchesCategory && matchesType;
    });

    const dataset = useMemo(() => {
        if (!activeDataView) return null;
        return generateMockData(activeDataView);
    }, [activeDataView]);

    const { regionalData, currentYearData } = useMemo(() => {
        if (!dataset) return { regionalData: [], currentYearData: [] };
        const regional = dataset.years.map(y => {
            const yearRecords = dataset.data.filter(d => d.year === y);
            const sum = yearRecords.reduce((acc, curr) => acc + curr.value, 0);
            const val = dataset.isSummable ? sum : (sum / yearRecords.length);
            return {
                year: y,
                value: Number(val.toFixed(dataset.unit.includes('Índice') ? 3 : 1))
            };
        });
        const current = dataset.data
            .filter(d => d.year === selectedYear)
            .sort((a, b) => b.value - a.value);
        return { regionalData: regional, currentYearData: current };
    }, [dataset, selectedYear]);

    const getSynergyColor = (synergy) => {
        switch (synergy) {
            case 'CDB': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'CMNUCC': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'CNULD': return 'bg-amber-100 text-amber-800 border-amber-200';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'Objetivos Globales': return <Globe className="w-5 h-5 text-indigo-500" />;
            case 'Metas de Reducción de Amenazas': return <ShieldAlert className="w-5 h-5 text-red-500" />;
            case 'Metas de Uso Sostenible y Beneficios': return <Leaf className="w-5 h-5 text-green-500" />;
            case 'Herramientas y Soluciones': return <BookOpen className="w-5 h-5 text-blue-500" />;
            default: return <Target className="w-5 h-5" />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* HEADER */}
            <header className="bg-indigo-900 text-white shadow-lg sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4">
                        <div className="bg-indigo-700 p-2.5 rounded-xl shadow-inner text-white flex items-center justify-center">
                            <Globe className="w-8 h-8" />
                        </div>
                        <div className="text-left">
                            <h1 className="text-xl md:text-2xl font-black leading-tight uppercase tracking-tight">Monitoreo Estratégico</h1>
                            <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest">SICA | Sinergias Convenciones de Río</p>
                        </div>
                    </div>
                    <div className="w-full sm:w-80">
                        <Input
                            icon={Search}
                            placeholder="Buscar indicador..."
                            className="bg-indigo-950/50 border-indigo-700 text-white placeholder-indigo-400 focus:ring-indigo-400 focus:border-indigo-400"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* FILTROS */}
                <div className="mb-10 flex flex-col md:flex-row gap-8 items-start md:items-center bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <div className="flex flex-col gap-3 flex-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Filtrar por Categoría</span>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                                        selectedCategory === cat
                                            ? 'bg-indigo-600 text-white shadow-lg scale-105'
                                            : 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-indigo-50 hover:text-indigo-700'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Tipología</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setSelectedType('Todas')}
                                className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                                    selectedType === 'Todas'
                                        ? 'bg-slate-800 text-white shadow-lg'
                                        : 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100'
                                }`}
                            >
                                Todas
                            </button>
                            <button
                                onClick={() => setSelectedType('impacto')}
                                className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                                    selectedType === 'impacto'
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'bg-white text-blue-600 border border-blue-100 hover:bg-blue-50'
                                }`}
                            >
                                <Target className="w-4 h-4" /> Impacto
                            </button>
                            <button
                                onClick={() => setSelectedType('gestion')}
                                className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                                    selectedType === 'gestion'
                                        ? 'bg-emerald-600 text-white shadow-lg'
                                        : 'bg-white text-emerald-600 border border-emerald-100 hover:bg-emerald-50'
                                }`}
                            >
                                <ClipboardList className="w-4 h-4" /> Gestión
                            </button>
                        </div>
                    </div>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredIndicators.map((indicator, idx) => (
                        <Card key={idx} className="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full hover:shadow-xl transition-all group">
                            <div className="p-8 flex-grow">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        {getCategoryIcon(indicator.category)}
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                            {indicator.id}
                                        </span>
                                    </div>
                                    <Badge className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter ${
                                        indicator.type === 'impacto' 
                                        ? 'bg-blue-50 text-blue-600 border-blue-100' 
                                        : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                    }`}>
                                        {indicator.type === 'impacto' ? 'Impacto' : 'Gestión'}
                                    </Badge>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 leading-tight mb-4 group-hover:text-indigo-700 transition-colors">
                                    {indicator.title}
                                </h3>
                                <div className="flex flex-wrap gap-1.5 mb-6">
                                    {indicator.synergies.map((syn) => (
                                        <span key={syn} className={`px-2.5 py-1 rounded-md text-[9px] font-black border uppercase tracking-tighter ${getSynergyColor(syn)}`}>
                                            {syn}
                                        </span>
                                    ))}
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Variable Principal</p>
                                    <p className="text-sm text-slate-700 font-medium line-clamp-2">
                                        {indicator.metrics[0].variable}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex border-t border-slate-50 bg-slate-50/50">
                                <button
                                    onClick={() => { setActiveDataView(indicator); setSelectedYear(2024); }}
                                    className="flex-1 py-4 px-4 flex justify-center items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-600 hover:bg-blue-50 transition-all border-r border-slate-100"
                                >
                                    <BarChart3 className="w-4 h-4" /> Ver Datos
                                </button>
                                <button
                                    onClick={() => setActiveIndicator(indicator)}
                                    className="flex-1 py-4 px-4 flex justify-center items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-600 hover:bg-indigo-50 transition-all"
                                >
                                    <Info className="w-4 h-4" /> Abrir Ficha
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
            </main>

            {/* MODAL: FICHA TÉCNICA */}
            {activeIndicator && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setActiveIndicator(null)}></div>
                    <Card className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden p-0 border-none">
                        <div className="flex items-start justify-between p-8 border-b border-slate-100 bg-indigo-50/30">
                            <div>
                                <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200 px-3 py-1 mb-3 font-black uppercase text-[10px]">
                                    {activeIndicator.category} • Metodología
                                </Badge>
                                <h2 className="text-2xl md:text-3xl font-black text-slate-900">{activeIndicator.title}</h2>
                            </div>
                            <button onClick={() => setActiveIndicator(null)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <div className="p-8 overflow-y-auto space-y-8 flex-1 custom-scrollbar">
                            {activeIndicator.metrics.map((metric, index) => (
                                <div key={index} className="space-y-6">
                                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                                        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                                            <Target className="w-6 h-6" />
                                        </div>
                                        <h4 className="text-xl font-bold text-slate-800">{metric.variable}</h4>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                            <h5 className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest leading-none">
                                                <Scale className="w-4 h-4" /> Unidad de Medida
                                            </h5>
                                            <span className="text-lg font-black text-slate-800">{metric.unit}</span>
                                        </div>
                                        <div className="bg-amber-50/30 p-6 rounded-2xl border border-amber-100">
                                            <h5 className="flex items-center gap-2 text-[10px] font-black uppercase text-amber-700 mb-4 tracking-widest leading-none">
                                                <Activity className="w-4 h-4" /> Método de Cálculo
                                            </h5>
                                            <p className="text-sm text-slate-700 leading-relaxed font-medium">{metric.method}</p>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50/30 p-6 rounded-2xl border border-blue-100">
                                        <h5 className="flex items-center gap-2 text-[10px] font-black uppercase text-blue-800 mb-6 tracking-widest leading-none">
                                            <Database className="w-4 h-4" /> Fuentes de Datos Sugeridas
                                        </h5>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {metric.sources.national && (
                                                <div className="space-y-2">
                                                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1.5">
                                                        <MapPin className="w-3.5 h-3.5"/> Nivel Nacional
                                                    </span>
                                                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{metric.sources.national}</p>
                                                </div>
                                            )}
                                            {metric.sources.regional && (
                                                <div className="space-y-2">
                                                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1.5">
                                                        <Globe className="w-3.5 h-3.5"/> Nivel Regional
                                                    </span>
                                                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{metric.sources.regional}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            )}

            {/* MODAL: DASHBOARD DE DATOS */}
            {activeDataView && dataset && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setActiveDataView(null)}></div>
                    <Card className="relative bg-slate-50 rounded-[2.5rem] shadow-2xl w-full max-w-6xl max-h-[95vh] flex flex-col overflow-hidden p-0 border-none">
                        <div className="flex items-start justify-between p-8 border-b border-slate-200 bg-white">
                            <div className="text-left">
                                <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1 mb-3 font-black uppercase text-[10px] tracking-widest">
                                    <Activity className="w-4 h-4 mr-1.5 inline" /> Dashboard Analítico • SICA
                                </Badge>
                                <h2 className="text-2xl md:text-3xl font-black text-slate-900">{activeDataView.title}</h2>
                                <p className="text-sm text-slate-500 mt-2 font-medium">Variable: <span className="text-slate-800 font-bold">{activeDataView.metrics[0].variable}</span></p>
                            </div>
                            <button onClick={() => setActiveDataView(null)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-8 overflow-y-auto space-y-8 flex-1 custom-scrollbar">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="space-y-6">
                                    <Card className="p-6 border-slate-200 rounded-2xl shadow-sm bg-white">
                                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-6 leading-none">
                                            <CalendarDays className="w-4 h-4 text-blue-500" /> Historial Temporal
                                        </h3>
                                        <div className="flex justify-between items-end mb-4">
                                            <span className="text-lg font-bold text-slate-400 leading-none">{dataset.years[0]}</span>
                                            <span className="text-4xl font-black text-blue-600 leading-none">{selectedYear}</span>
                                            <span className="text-lg font-bold text-slate-400 leading-none">{dataset.years[dataset.years.length - 1]}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min={dataset.years[0]}
                                            max={dataset.years[dataset.years.length - 1]}
                                            step="1"
                                            value={selectedYear}
                                            onChange={(e) => setSelectedYear(Number(e.target.value))}
                                            className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                        />
                                        <p className="text-[10px] font-black uppercase text-slate-400 mt-4 text-center tracking-tighter">Desliza para actualizar el año</p>
                                    </Card>

                                    <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-2xl shadow-xl border-none text-white relative overflow-hidden flex flex-col justify-center">
                                        <div className="absolute top-0 right-0 -mt-8 -mr-8 text-white/10">
                                            <Globe className="w-48 h-48" />
                                        </div>
                                        <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-200 flex items-center gap-2 mb-4 leading-none relative z-10">
                                            <TrendingUp className="w-4 h-4" /> Agregado Regional SICA
                                        </h3>
                                        <div className="relative z-10 flex items-baseline gap-2">
                                            <span className="text-5xl font-black tracking-tighter">
                                                {regionalData.find(d => d.year === selectedYear)?.value.toLocaleString() || 0}
                                            </span>
                                            <span className="text-xl font-bold text-blue-200">
                                                {dataset.unit}
                                            </span>
                                        </div>
                                        <p className="text-xs font-medium text-blue-100 mt-4 relative z-10 opacity-80">
                                            {dataset.isSummable ? "Sumatoria Total Regional" : "Promedio Ponderado Regional"}
                                        </p>
                                    </Card>
                                </div>

                                <div className="lg:col-span-2">
                                    <RegionalEvolutionChart
                                        data={regionalData}
                                        selectedYear={selectedYear}
                                        onSelectYear={setSelectedYear}
                                        unit={dataset.unit}
                                        isSummable={dataset.isSummable}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <Card className="p-8 border-slate-200 rounded-2xl shadow-sm bg-white">
                                    <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-2">
                                        <BarChart3 className="w-6 h-6 text-blue-500" /> Distribución por País ({selectedYear})
                                    </h3>
                                    <div className="space-y-5">
                                        {currentYearData.map((d, i) => {
                                            const maxVal = Math.max(...currentYearData.map(item => item.value));
                                            const widthPercent = (d.value / (maxVal || 1)) * 100;
                                            return (
                                                <div key={i} className="flex items-center gap-4">
                                                    <div className="w-32 text-xs font-black text-slate-500 text-right uppercase tracking-tighter truncate">{d.country}</div>
                                                    <div className="flex-1 h-3 bg-slate-100 rounded-full relative overflow-hidden">
                                                        <div
                                                            className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-700 ease-out"
                                                            style={{ width: `${widthPercent}%` }}
                                                        ></div>
                                                    </div>
                                                    <div className="w-20 text-sm font-black text-slate-900 text-left">
                                                        {d.value.toLocaleString()}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </Card>

                                <Card className="p-0 border-slate-200 rounded-2xl shadow-sm bg-white overflow-hidden flex flex-col">
                                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                                        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                                            <TableProperties className="w-6 h-6 text-emerald-500" /> Registros Detallados
                                        </h3>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-sm">
                                            <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                                                <tr>
                                                    <th className="px-6 py-4">País</th>
                                                    <th className="px-6 py-4">Año</th>
                                                    <th className="px-6 py-4 text-right">Valor</th>
                                                    <th className="px-6 py-4">Unidad</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-50">
                                                {currentYearData.map((d, i) => (
                                                    <tr key={i} className="hover:bg-slate-50 transition-colors group">
                                                        <td className="px-6 py-4 font-bold text-slate-900">{d.country}</td>
                                                        <td className="px-6 py-4 text-slate-500 font-medium">{d.year}</td>
                                                        <td className="px-6 py-4 text-right font-black text-blue-600">{d.value.toLocaleString()}</td>
                                                        <td className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-tighter">{d.unit}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};
