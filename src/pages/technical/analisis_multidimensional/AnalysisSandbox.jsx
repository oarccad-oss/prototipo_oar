import React, { useState, useMemo, useEffect } from 'react';
import { 
    BarChart, Bar, 
    LineChart, Line, 
    AreaChart, Area, 
    PieChart, Pie, Cell,
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    ScatterChart, Scatter, ZAxis,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    ComposedChart, Treemap
} from 'recharts';
import { 
    Database, 
    BarChart3, 
    ArrowLeft, 
    Layers, 
    Settings2, 
    Download, 
    LayoutGrid, 
    PieChart as PieIcon, 
    TrendingUp, 
    Activity,
    Hexagon,
    Target,
    Maximize2,
    RefreshCw
} from 'lucide-react';
import { Card, Button, Badge } from '../../../components/ui/Shared';
import { useNavigate } from 'react-router-dom';
import { DATASETS_CONFIG } from './datasets.config';

// --- UTILS ---

const parseCSV = (text) => {
    const lines = text.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    return lines.slice(1).filter(line => line.trim()).map(line => {
        const values = [];
        let current = '';
        let inQuotes = false;
        
        for (let char of line) {
            if (char === '"') inQuotes = !inQuotes;
            else if (char === ',' && !inQuotes) {
                values.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        values.push(current.trim());
        
        const obj = {};
        headers.forEach((h, i) => {
            const val = values[i];
            obj[h] = isNaN(val) || val === '' ? val : parseFloat(val);
        });
        return obj;
    });
};

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#F472B6', '#475569', '#15803D', '#7C3AED'];

// --- SUB-COMPONENTS ---

const DatasetCard = ({ dataset, onSelect, isActive }) => (
    <div 
        onClick={() => onSelect(dataset)}
        className={`p-6 rounded-3xl border-2 transition-all cursor-pointer group ${
            isActive ? 'border-brand-primary bg-blue-50' : 'border-slate-100 bg-white hover:border-slate-300'
        }`}
    >
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
            isActive ? 'bg-brand-primary text-white' : 'bg-slate-100 text-slate-500'
        }`}>
            <Database size={24} />
        </div>
        <h3 className="font-bold text-slate-800 mb-1">{dataset.name}</h3>
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{dataset.description}</p>
    </div>
);

// --- MAIN COMPONENT ---

export const AnalysisSandbox = () => {
    const navigate = useNavigate();
    const [selectedDataset, setSelectedDataset] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Configuración del Cruzado
    const [dim1, setDim1] = useState('');
    const [dim2, setDim2] = useState('');
    const [metric, setMetric] = useState('');
    const [aggMode, setAggMode] = useState('sum'); // sum, avg, count
    const [chartType, setChartType] = useState('bar');

    // Cargar Datos
    useEffect(() => {
        if (!selectedDataset) return;
        setLoading(true);
        fetch(selectedDataset.src)
            .then(res => res.text())
            .then(text => {
                const parsed = parseCSV(text);
                setData(parsed);
                // Pre-selección inteligente
                setDim1(selectedDataset.dimensions[0].id);
                setMetric(selectedDataset.metrics[0].id);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading CSV:", err);
                setLoading(false);
            });
    }, [selectedDataset]);

    // Procesar Datos para Recharts
    const chartData = useMemo(() => {
        if (!data.length || !dim1 || !metric) return [];

        const grouped = {};

        data.forEach(row => {
            const key1 = row[dim1] || 'N/A';
            const val = row[metric] || 0;

            if (dim2) {
                const key2 = row[dim2] || 'N/A';
                if (!grouped[key1]) grouped[key1] = {};
                if (!grouped[key1][key2]) grouped[key1][key2] = { total: 0, count: 0 };
                grouped[key1][key2].total += val;
                grouped[key1][key2].count += 1;
            } else {
                if (!grouped[key1]) grouped[key1] = { total: 0, count: 0 };
                grouped[key1].total += val;
                grouped[key1].count += 1;
            }
        });

        // Formatear según modo de agregación
        return Object.entries(grouped).map(([name, value]) => {
            if (dim2) {
                const result = { name };
                Object.entries(value).forEach(([subKey, subVal]) => {
                    result[subKey] = aggMode === 'avg' ? (subVal.total / subVal.count) : (aggMode === 'count' ? subVal.count : subVal.total);
                });
                return result;
            } else {
                return {
                    name,
                    value: aggMode === 'avg' ? (value.total / value.count) : (aggMode === 'count' ? value.count : value.total)
                };
            }
        }).sort((a, b) => (b.value || 0) - (a.value || 0)).slice(0, 15); // Top 15 para legibilidad
    }, [data, dim1, dim2, metric, aggMode]);

    // Obtener llaves únicas secundarias para series agrupadas
    const secondaryKeys = useMemo(() => {
        if (!dim2) return [];
        const keys = new Set();
        chartData.forEach(item => {
            Object.keys(item).forEach(k => {
                if (k !== 'name') keys.add(k);
            });
        });
        return Array.from(keys);
    }, [chartData, dim2]);

    return (
        <div className="min-h-full bg-slate-50 font-sans p-8 pt-20">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-10">
                <div className="flex items-center gap-4 mb-4">
                    <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="rounded-full">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Volver
                    </Button>
                    <Badge variant="blue" className="bg-blue-100 text-blue-700 uppercase tracking-widest text-[10px] font-black">
                        Módulo Experimental
                    </Badge>
                </div>
                <h1 className="text-4xl font-serif font-black text-slate-900 mb-2">Análisis Multidimensional</h1>
                <p className="text-slate-500 max-w-2xl font-light">
                    Combine variables de diferentes fuentes de datos para descubrir tendencias y correlaciones regionales.
                </p>
            </div>

            {/* Step 1: Select Dataset */}
            {!selectedDataset ? (
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4">
                        {DATASETS_CONFIG.map(ds => (
                            <DatasetCard 
                                key={ds.id} 
                                dataset={ds} 
                                onSelect={setSelectedDataset}
                                isActive={false}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
                    
                    {/* Sidebar Configuration */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="p-6 border-slate-200 shadow-sm sticky top-24">
                            <div className="flex items-center gap-2 mb-6 text-slate-800 font-bold">
                                <Settings2 className="h-5 w-5 text-brand-primary" /> Configurador
                            </div>

                            <div className="space-y-6">
                                {/* Dataset Indicator */}
                                <div>
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Cambiando Datos</label>
                                    <div className="p-3 bg-slate-100 rounded-xl flex items-center justify-between group">
                                        <span className="text-xs font-bold text-slate-600 truncate">{selectedDataset.name}</span>
                                        <button onClick={() => setSelectedDataset(null)} className="text-slate-400 hover:text-red-500 p-1">
                                            <RefreshCw className="h-3 w-3" />
                                        </button>
                                    </div>
                                </div>

                                {/* Variable 1 */}
                                <div>
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Variable A (Dimensión)</label>
                                    <select 
                                        value={dim1}
                                        onChange={(e) => setDim1(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-brand-primary/20 outline-none"
                                    >
                                        {selectedDataset.dimensions.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                    </select>
                                </div>

                                {/* Variable 2 (Opcional) */}
                                <div>
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Variable B (Agrupado)</label>
                                    <select 
                                        value={dim2}
                                        onChange={(e) => setDim2(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-brand-primary/20 outline-none"
                                    >
                                        <option value="">(Ninguna)</option>
                                        {selectedDataset.dimensions.filter(d => d.id !== dim1).map(d => (
                                            <option key={d.id} value={d.id}>{d.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Métrica */}
                                <div>
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Valor Numérico (Métrica)</label>
                                    <select 
                                        value={metric}
                                        onChange={(e) => setMetric(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-brand-primary/20 outline-none"
                                    >
                                        {selectedDataset.metrics.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                                    </select>
                                </div>

                                {/* Modo de Agregación */}
                                <div>
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Cálculo</label>
                                    <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
                                        {['sum', 'avg', 'count'].map(m => (
                                            <button 
                                                key={m}
                                                onClick={() => setAggMode(m)}
                                                className={`py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all ${
                                                    aggMode === m ? 'bg-white text-brand-primary shadow-sm' : 'text-slate-500 hover:bg-white/50'
                                                }`}
                                            >
                                                {m === 'sum' ? 'Suma' : m === 'avg' ? 'Prom' : 'Rec'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Chart Area */}
                    <div className="lg:col-span-3 space-y-6">
                        
                        {/* Visualization Selector - 10 Types */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            <ChartTypeButton type="bar" icon={BarChart3} label="Barras" active={chartType} onClick={setChartType} />
                            <ChartTypeButton type="line" icon={TrendingUp} label="Líneas" active={chartType} onClick={setChartType} />
                            <ChartTypeButton type="area" icon={Activity} label="Área" active={chartType} onClick={setChartType} />
                            <ChartTypeButton type="pie" icon={PieIcon} label="Pie" active={chartType} onClick={setChartType} />
                            <ChartTypeButton type="bar_stacked" icon={Layers} label="Apilado" active={chartType} onClick={setChartType} />
                            <ChartTypeButton type="radar" icon={Hexagon} label="Radar" active={chartType} onClick={setChartType} />
                            <ChartTypeButton type="treemap" icon={LayoutGrid} label="Treemap" active={chartType} onClick={setChartType} />
                            <ChartTypeButton type="scatter" icon={Target} label="Burbujas" active={chartType} onClick={setChartType} />
                            <ChartTypeButton type="radial" icon={Maximize2} label="Radial" active={chartType} onClick={setChartType} />
                            <ChartTypeButton type="composed" icon={RefreshCw} label="Mix" active={chartType} onClick={setChartType} />
                        </div>

                        <Card className="p-8 bg-white border-slate-200 shadow-sm min-h-[500px] flex flex-col">
                            {loading ? (
                                <div className="flex-1 flex items-center justify-center">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-12 h-12 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin"></div>
                                        <p className="text-slate-400 font-medium italic">Procesando millones de datos...</p>
                                    </div>
                                </div>
                            ) : chartData.length > 0 ? (
                                <div className="flex-1">
                                    <div className="mb-8 flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900">
                                                {metric} por {dim1} {dim2 ? `y ${dim2}` : ''}
                                            </h3>
                                            <p className="text-sm text-slate-500">Vista de top resultados procesada en navegador.</p>
                                        </div>
                                        <Button variant="outline" size="sm" className="rounded-full">
                                            <Download className="h-4 w-4 mr-2" /> PNG
                                        </Button>
                                    </div>
                                    
                                    <div className="h-[450px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            {renderChart(chartType, chartData, secondaryKeys)}
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 flex items-center justify-center text-slate-400 italic">
                                    No hay datos suficientes para visualizar esta combinación.
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
};

const ChartTypeButton = ({ type, icon: Icon, label, active, onClick }) => (
    <button 
        onClick={() => onClick(type)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all shrink-0 font-bold text-xs ${
            active === type 
                ? 'bg-slate-900 border-slate-900 text-white shadow-lg' 
                : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
        }`}
    >
        <Icon className="h-4 w-4" />
        {label}
    </button>
);

const renderChart = (type, data, secondaryKeys) => {
    switch(type) {
        case 'bar':
            return (
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="name" fontSize={11} stroke="#64748B" />
                    <YAxis fontSize={11} stroke="#64748B" />
                    <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Legend />
                    {secondaryKeys.length > 0 
                        ? secondaryKeys.map((k, i) => <Bar key={k} dataKey={k} fill={COLORS[i % COLORS.length]} radius={[4, 4, 0, 0]} />)
                        : <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    }
                </BarChart>
            );
        case 'bar_stacked':
            return (
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="name" fontSize={11} stroke="#64748B" />
                    <YAxis fontSize={11} stroke="#64748B" />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                    <Legend />
                    {secondaryKeys.map((k, i) => <Bar key={k} dataKey={k} stackId="a" fill={COLORS[i % COLORS.length]} />)}
                </BarChart>
            );
        case 'line':
            return (
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="name" fontSize={11} stroke="#64748B" />
                    <YAxis fontSize={11} stroke="#64748B" />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                    <Legend />
                    {secondaryKeys.length > 0 
                        ? secondaryKeys.map((k, i) => <Line key={k} type="monotone" dataKey={k} stroke={COLORS[i % COLORS.length]} strokeWidth={3} dot={{r: 4}} />)
                        : <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} dot={{r: 6}} />
                    }
                </LineChart>
            );
        case 'area':
            return (
                <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="name" fontSize={11} stroke="#64748B" />
                    <YAxis fontSize={11} stroke="#64748B" />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                    <Legend />
                    {secondaryKeys.length > 0 
                        ? secondaryKeys.map((k, i) => <Area key={k} type="monotone" dataKey={k} stroke={COLORS[i % COLORS.length]} fill={COLORS[i % COLORS.length]} fillOpacity={0.1} />)
                        : <Area type="monotone" dataKey="value" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
                    }
                </AreaChart>
            );
        case 'pie':
            return (
                <PieChart>
                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
                        {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            );
        case 'radar':
            return (
                <RadarChart outerRadius={150} data={data}>
                    <PolarGrid stroke="#E2E8F0" />
                    <PolarAngleAxis dataKey="name" tick={{fontSize: 10}} />
                    <PolarRadiusAxis fontSize={10} />
                    <Radar dataKey="value" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.5} />
                    <Tooltip />
                </RadarChart>
            );
        case 'treemap':
            return (
                <Treemap
                    data={data}
                    dataKey="value"
                    aspectRatio={4 / 3}
                    stroke="#fff"
                    fill="#3B82F6"
                >
                    <Tooltip />
                </Treemap>
            );
        case 'scatter':
            // Transformar para que sea legible en burbujas
            return (
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="name" fontSize={11} />
                    <YAxis dataKey="value" fontSize={11} />
                    <ZAxis dataKey="value" range={[60, 400]} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Datos" data={data} fill="#3B82F6" />
                </ScatterChart>
            );
        case 'radial':
            return (
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} innerRadius="10%" outerRadius="80%" barSize={20} startAngle={180} endAngle={0}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey="name" hide />
                        <YAxis hide />
                        <Tooltip />
                        <Bar dataKey="value" fill="#3B82F6" radius={[0, 10, 10, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            );
        case 'composed':
            return (
                <ComposedChart data={data}>
                    <CartesianGrid stroke="#E2E8F0" />
                    <XAxis dataKey="name" fontSize={11} />
                    <YAxis fontSize={11} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" barSize={40} fill="#3B82F6" opacity={0.3} />
                    <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} />
                </ComposedChart>
            );
        default: return null;
    }
};
