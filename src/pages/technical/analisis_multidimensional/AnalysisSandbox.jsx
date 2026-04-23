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
import { DATASETS_CONFIG } from '../../../data/datasets.config';

// --- UTILS ---

const parseCSV = (text) => {
    try {
        if (!text || !text.trim()) return [];
        const lines = text.split('\n');
        
        const normalize = (str) => {
            return str.normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .replace(/[^a-zA-Z0-9\s\(\)\/\.]/g, "")
                      .trim();
        };

        const rawHeaders = lines[0].split(',').map(h => h.trim());
        const headers = rawHeaders.map(h => normalize(h));
        
        return lines.slice(1)
            .filter(line => line.trim())
            .map(line => {
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
                    const cleanVal = val === undefined ? '' : val.replace(/^"|"$/g, '').trim();
                    obj[h] = isNaN(cleanVal) || cleanVal === '' ? cleanVal : parseFloat(cleanVal);
                });
                return obj;
            });
    } catch (e) {
        console.error("Critical error parsing CSV:", e);
        return [];
    }
};

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#F472B6', '#475569', '#15803D', '#7C3AED'];

// --- SUB-COMPONENTS ---

const DatasetCard = ({ dataset, onSelect, isActive }) => (
    <div 
        onClick={() => onSelect(dataset)}
        className={`p-8 rounded-[2rem] border-2 transition-all cursor-pointer group h-full flex flex-col ${
            isActive ? 'border-brand-primary bg-blue-50' : 'border-slate-100 bg-white hover:border-slate-300'
        }`}
    >
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${
            isActive ? 'bg-brand-primary text-white shadow-lg' : 'bg-slate-50 text-slate-400'
        }`}>
            <Database size={28} />
        </div>
        <h3 className="font-bold text-slate-800 text-lg mb-2">{dataset.name}</h3>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{dataset.description}</p>
        <div className="mt-auto pt-6 flex items-center text-xs font-bold text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">
            Explorar Datos <ArrowLeft className="ml-2 h-3.5 w-3.5 rotate-180" />
        </div>
    </div>
);

// --- MAIN COMPONENT ---

export const AnalysisSandbox = () => {
    const navigate = useNavigate();
    const [selectedDataset, setSelectedDataset] = useState(DATASETS_CONFIG[0]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
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
        setError(null);

        fetch(selectedDataset.src)
            .then(res => {
                if (!res.ok) throw new Error(`Error ${res.status}: No se pudo cargar el dataset.`);
                return res.text();
            })
            .then(text => {
                const parsed = parseCSV(text);
                if (parsed.length === 0) throw new Error("El archivo está vacío o tiene un formato incorrecto.");
                setData(parsed);
                
                // Pre-selección inteligente sincronizada con limpieza de cabeceras
                const normalize = (str) => {
                    return str.normalize("NFD")
                              .replace(/[\u0300-\u036f]/g, "")
                              .replace(/[^a-zA-Z0-9\s\(\)\/\.]/g, "")
                              .trim();
                };

                const cleanD1 = normalize(selectedDataset.dimensions[0].id);
                const cleanM = normalize(selectedDataset.metrics[0].id);
                
                setDim1(cleanD1);
                setMetric(cleanM);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading CSV:", err);
                setError(err.message);
                setLoading(false);
            });
    }, [selectedDataset]);

    // Procesar Datos para Recharts
    const chartData = useMemo(() => {
        if (!data.length || !dim1 || !metric) return [];

        const grouped = {};

        data.forEach(row => {
            const key1 = row[dim1] || 'N/A';
            const val = typeof row[metric] === 'number' ? row[metric] : 0;

            if (dim2 && row[dim2]) {
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
                let totalRowValue = 0;
                Object.entries(value).forEach(([subKey, subVal]) => {
                    const calculated = aggMode === 'avg' ? (subVal.total / subVal.count) : (aggMode === 'count' ? subVal.count : subVal.total);
                    result[subKey] = calculated;
                    totalRowValue += calculated;
                });
                result._total = totalRowValue; // Para ordenamiento
                return result;
            } else {
                const val = aggMode === 'avg' ? (value.total / value.count) : (aggMode === 'count' ? value.count : value.total);
                return {
                    name,
                    value: val,
                    _total: val
                };
            }
        }).sort((a, b) => b._total - a._total).slice(0, 15);
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
        <div className="min-h-full bg-slate-50/50 font-sans p-8 pt-24">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-10">
                <div className="flex items-center gap-4 mb-4">
                    <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="rounded-full text-slate-500 hover:text-brand-primary">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Volver al Inicio
                    </Button>
                    <Badge variant="blue" className="bg-brand-primary/10 text-brand-primary uppercase tracking-widest text-[10px] font-black border-none px-3 py-1">
                        Intelligence Center
                    </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-black text-slate-900 mb-2">Haz tu propia búsqueda</h1>
                <p className="text-slate-500 max-w-2xl font-light text-lg">
                    ¿Qué te interesa saber a ti? Explora nuestras bases de datos mediante cruces dinámicos de información regional.
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
                                {/* Dataset Selector */}
                                <div>
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Cambiando Datos</label>
                                    <select
                                        value={selectedDataset.id}
                                        onChange={(e) => {
                                            const ds = DATASETS_CONFIG.find(d => d.id === e.target.value);
                                            if (ds) setSelectedDataset(ds);
                                        }}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-brand-primary/20 outline-none"
                                    >
                                        {DATASETS_CONFIG.map(ds => (
                                            <option key={ds.id} value={ds.id}>{ds.name}</option>
                                        ))}
                                    </select>
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
                            ) : error ? (
                                <div className="flex-1 flex items-center justify-center text-red-500 bg-red-50 rounded-2xl border border-red-100 p-8 text-center flex-col gap-4">
                                    <Activity className="h-10 w-10 opacity-50" />
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Error de Datos</h4>
                                        <p className="text-sm opacity-70">{error}</p>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={() => setSelectedDataset(null)}>Seleccionar otro dataset</Button>
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
                                            {renderChart(chartType, chartData, secondaryKeys, dim2)}
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

const renderChart = (type, data, secondaryKeys, dim2) => {
    if (!data || data.length === 0) {
        return <div className="flex items-center justify-center h-full text-slate-400 italic">No hay datos para esta combinación</div>;
    }

    const primaryKey = dim2 ? (secondaryKeys[0] || 'value') : 'value';

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
                    {secondaryKeys.length > 0 && secondaryKeys.map((k, i) => <Bar key={k} dataKey={k} stackId="a" fill={COLORS[i % COLORS.length]} />)}
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
                    <Pie 
                        data={data} 
                        dataKey={primaryKey} 
                        nameKey="name" 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={150} 
                        label={({name, percent}) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}
                    >
                        {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                    <Legend />
                </PieChart>
            );
        case 'radar':
            return (
                <RadarChart outerRadius={150} data={data}>
                    <PolarGrid stroke="#E2E8F0" />
                    <PolarAngleAxis dataKey="name" tick={{fontSize: 10, fill: '#64748B'}} />
                    <PolarRadiusAxis fontSize={10} stroke="#E2E8F0" />
                    {secondaryKeys.length > 0 
                        ? secondaryKeys.slice(0, 3).map((k, i) => <Radar key={k} dataKey={k} stroke={COLORS[i % COLORS.length]} fill={COLORS[i % COLORS.length]} fillOpacity={0.4} />)
                        : <Radar dataKey="value" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.5} />
                    }
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                </RadarChart>
            );
        case 'treemap':
            return (
                <Treemap
                    data={data}
                    dataKey={primaryKey}
                    aspectRatio={4/3}
                    stroke="#fff"
                    fill="#3B82F6"
                >
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                </Treemap>
            );
        case 'scatter':
            return (
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="name" type="category" fontSize={11} stroke="#64748B" />
                    <YAxis dataKey={primaryKey} fontSize={11} stroke="#64748B" />
                    <ZAxis dataKey={dim2 ? (secondaryKeys[0] || '_total') : 'value'} range={[60, 1000]} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    {secondaryKeys.length > 0
                        ? secondaryKeys.map((k, i) => <Scatter key={k} name={k} data={data.map(d => ({ ...d, [primaryKey]: d[k] }))} fill={COLORS[i % COLORS.length]} />)
                        : <Scatter name="Muestra" data={data} fill="#3B82F6" />
                    }
                </ScatterChart>
            );
        case 'radial':
            return (
                <BarChart innerRadius="20%" outerRadius="100%" data={data} startAngle={180} endAngle={0}>
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                    <Legend iconType="circle" />
                    <Bar dataKey="value" fill="#3B82F6" radius={[0, 10, 10, 0]} />
                </BarChart>
            );
        case 'composed':
            return (
                <ComposedChart data={data}>
                    <CartesianGrid stroke="#E2E8F0" vertical={false} />
                    <XAxis dataKey="name" fontSize={11} stroke="#64748B" />
                    <YAxis fontSize={11} stroke="#64748B" />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                    <Legend />
                    <Bar dataKey={primaryKey} barSize={40} fill="#3B82F6" opacity={0.3} radius={[4, 4, 0, 0]} />
                    <Line type="monotone" dataKey={primaryKey} stroke="#3B82F6" strokeWidth={3} dot={{r: 6}} />
                </ComposedChart>
            );
        default: return null;
    }
};
