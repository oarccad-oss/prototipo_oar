import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell, PieChart, Pie, Legend
} from 'recharts';
import { Download, Share2, Info, TreeDeciduous, TrendingDown, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Card, Button } from '../../../components/ui/Shared';
import { useNavigate } from 'react-router-dom';

// --- MOCK DATA ESPECÍFICA PARA ESTE REPORTE ---
const dataForestTrend = [
    { year: 1990, value: 22.5 },
    { year: 2000, value: 20.1 },
    { year: 2010, value: 19.2 },
    { year: 2020, value: 18.4 },
    { year: 2024, value: 18.1 },
];

const dataDesignation = [
    { name: 'Producción', value: 25, color: '#F59E0B' }, // Amber
    { name: 'Protección de suelo/agua', value: 15, color: '#3B82F6' }, // Blue
    { name: 'Conservación biodiversidad', value: 45, color: '#15803D' }, // Green (Brand Secondary)
    { name: 'Servicios sociales', value: 10, color: '#EC4899' }, // Pink
    { name: 'Otros', value: 5, color: '#94A3B8' }, // Slate
];

const dataCarbon = [
    { name: 'Biomasa Viva', value: 1200 },
    { name: 'Madera Muerta', value: 150 },
    { name: 'Suelo', value: 1800 },
    { name: 'Hojarasca', value: 80 },
];

// --- COMPONENTES AUXILIARES ---

// eslint-disable-next-line no-unused-vars
const KeyFinding = ({ icon: Icon, value, label, trend }) => (
    <div className="flex flex-col items-center p-6 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <div className="p-3 bg-brand-primary/10 rounded-full mb-3">
            <Icon className="h-6 w-6 text-brand-primary" />
        </div>
        <span className="text-3xl font-bold text-slate-800 mb-1">{value}</span>
        <span className="text-sm text-slate-500 font-medium uppercase tracking-wide text-center">{label}</span>
        {trend && (
            <span className="mt-2 text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-full">
                {trend}
            </span>
        )}
    </div>
);

const SectionHeader = ({ number, title, subtitle }) => (
    <div className="mb-8 border-l-4 border-brand-secondary pl-4">
        <span className="text-brand-secondary font-bold text-sm uppercase tracking-widest block mb-1">
            Sección {number}
        </span>
        <h2 className="text-3xl font-serif font-bold text-slate-800 mb-2">{title}</h2>
        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">{subtitle}</p>
    </div>
);

// --- COMPONENTE PRINCIPAL ---

export const AnswerForestState = () => {
    const navigate = useNavigate();
    return (
        <div className="p-8 bg-[#F8FAFC] min-h-full font-sans space-y-8">
            {/* HERO SECTION - Estilo Reporte Impreso */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
                    <div className="flex justify-between items-start mb-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-primary text-xs font-bold uppercase tracking-wider">
                            <Info className="h-3 w-3" />
                            Reporte Oficial 2024
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="gap-2">
                                <Share2 className="h-4 w-4" /> Compartir
                            </Button>
                            <Button className="gap-2 bg-brand-primary text-white">
                                <Download className="h-4 w-4" /> Descargar PDF
                            </Button>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-slate-900 leading-tight mb-6">
                        El Estado de los Bosques en la Región SICA
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
                        Un análisis integral sobre la extensión, condición y gestión de los recursos forestales en Centroamérica y República Dominicana, alineado con los estándares del FRA 2020 de la FAO.
                    </p>
                </div>
            </div>

            {/* KEY FINDINGS GRID */}
            <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-10 mb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <KeyFinding
                        icon={TreeDeciduous}
                        value="18.1 Mha"
                        label="Superficie Forestal Total"
                        trend="-1.2% anual"
                    />
                    <KeyFinding
                        icon={TrendingDown}
                        value="450k ha"
                        label="Pérdida Neta (2020-2024)"
                        trend="Alta Prioridad"
                    />
                    <KeyFinding
                        icon={ShieldCheck}
                        value="45%"
                        label="Áreas Protegidas"
                        trend="+0.5% anual"
                    />
                </div>
            </div>

            {/* CONTENIDO DEL REPORTE */}
            <div className="max-w-5xl mx-auto px-6 space-y-24 pb-20">

                {/* SECCIÓN 1: EXTENSIÓN */}
                <section>
                    <SectionHeader
                        number="01"
                        title="Extensión y Cambios del Bosque"
                        subtitle="Aunque la tasa de deforestación ha disminuido ligeramente en la última década, la región continúa perdiendo cobertura forestal debido a la expansión agrícola y la urbanización."
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="prose prose-slate text-slate-600">
                            <p>
                                La región SICA cuenta actualmente con <strong>18.1 millones de hectáreas</strong> de bosque.
                                La tendencia histórica muestra una curva descendente constante desde 1990.
                            </p>
                            <p>
                                Sin embargo, es crucial notar que las políticas de <em>forestería comunitaria</em> en Guatemala y Honduras han logrado estabilizar la pérdida en zonas clave.
                            </p>
                            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 text-sm my-4">
                                <strong>Dato Clave:</strong> Tres países de la región han logrado revertir la tendencia y ahora muestran ganancia neta de bosque en 2024.
                            </div>
                        </div>

                        <Card className="p-6 h-[350px]">
                            <h4 className="text-sm font-bold text-slate-500 mb-4 uppercase">Tendencia Histórica (Millones de Ha)</h4>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={dataForestTrend}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#15803D" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#15803D" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                    <YAxis domain={[15, 25]} axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <Area type="monotone" dataKey="value" stroke="#15803D" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </Card>
                    </div>
                </section>

                {/* SECCIÓN 2: DESIGNACIÓN */}
                <section>
                    <SectionHeader
                        number="02"
                        title="Designación y Gestión"
                        subtitle="¿Para qué se utilizan nuestros bosques? La gestión orientada a la conservación de la biodiversidad sigue siendo la prioridad regional."
                    />

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={dataDesignation}
                                            innerRadius={80}
                                            outerRadius={120}
                                            paddingAngle={2}
                                            dataKey="value"
                                        >
                                            {dataDesignation.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-slate-800 mb-4">Objetivo Primario de Gestión</h3>
                                <div className="space-y-3">
                                    {dataDesignation.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                                <span className="text-slate-600 font-medium">{item.name}</span>
                                            </div>
                                            <span className="font-bold text-slate-800">{item.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECCIÓN 3: CARBONO */}
                <section>
                    <SectionHeader
                        number="03"
                        title="Existencias de Carbono"
                        subtitle="Los bosques de la región almacenan más carbono en el suelo que en la biomasa viva, un factor crítico para las estrategias de adaptación climática."
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1 prose prose-slate text-slate-600">
                            <p>
                                El reporte FRA 2024 indica que el stock total de carbono en la región alcanza las <strong>3.2 Gigatoneladas</strong>.
                            </p>
                            <p>
                                Es notable la importancia del <strong>carbono orgánico del suelo</strong>, que representa más del 50% del total almacenado, subrayando la importancia de evitar la degradación del suelo además de la deforestación.
                            </p>
                        </div>
                        <div className="lg:col-span-2">
                            <Card className="p-6 h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={dataCarbon}
                                        layout="vertical"
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                                        <Tooltip cursor={{ fill: 'transparent' }} />
                                        <Bar dataKey="value" fill="#1E3A8A" radius={[0, 4, 4, 0]} barSize={40}>
                                            {
                                                dataCarbon.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={index === 2 ? '#1E3A8A' : '#93C5FD'} />
                                                ))
                                            }
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                                <p className="text-center text-xs text-slate-400 mt-2">Millones de Toneladas de Carbono (Mt C)</p>
                            </Card>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};
