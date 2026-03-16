import React from 'react';
import { Card } from '../ui/Shared';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TREND_DATA, EMISSION_DATA } from '../../data/mockData';

export const Charts = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
                <h3 className="font-bold text-slate-700 mb-4">Tendencia de Cobertura Boscosa Regional</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={TREND_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorCover" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#15803D" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#15803D" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                            <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M`} tick={{ fill: '#64748B' }} />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                formatter={(val) => [new Intl.NumberFormat('es-ES').format(val) + " Ha", "Cobertura"]}
                            />
                            <Legend />
                            <Area type="monotone" dataKey="cover" name="Cobertura Forestal" stroke="#15803D" fillOpacity={1} fill="url(#colorCover)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="font-bold text-slate-700 mb-4">Emisiones CO2e por País (Sector AFOLU)</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={EMISSION_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                            <XAxis dataKey="country" axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                            <Tooltip
                                cursor={{ fill: '#F1F5F9', radius: 4 }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                formatter={(val) => [new Intl.NumberFormat('es-ES').format(val) + " tCO2e", "Emisiones"]}
                            />
                            <Bar dataKey="emissions" name="Emisiones" fill="#1E3A8A" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
};
