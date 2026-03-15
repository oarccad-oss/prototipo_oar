
import React from 'react';
import { TrendingUp } from 'lucide-react';

export const RegionalEvolutionChart = ({ data, selectedYear, onSelectYear, unit, isSummable }) => {
    if (!data || data.length === 0) return null;

    const minVal = Math.min(...data.map(d => d.value));
    const maxVal = Math.max(...data.map(d => d.value));
    const range = maxVal - minVal || 1;
    const pad = range * 0.2;
    const viewMin = minVal - pad;
    const viewMax = maxVal + pad;

    const width = 800;
    const height = 300;
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((d.value - viewMin) / (viewMax - viewMin)) * height;
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
            <h3 className="text-md font-bold text-slate-800 flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-emerald-500" /> Evolución Histórica Regional
            </h3>

            <div className="flex-1 relative w-full min-h-[250px] mt-2">
                <div className="absolute top-0 left-0 text-[10px] font-mono text-slate-400 -mt-2">{viewMax.toFixed(1)}</div>
                <div className="absolute bottom-10 left-0 text-[10px] font-mono text-slate-400 mb-1">{viewMin.toFixed(1)}</div>

                <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="w-full h-full pb-10 overflow-visible">
                    <polyline fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" points={points} />
                    {data.map((d, i) => {
                        const x = (i / (data.length - 1)) * width;
                        const y = height - ((d.value - viewMin) / (viewMax - viewMin)) * height;
                        const isSelected = d.year === selectedYear;

                        return (
                            <g key={i} className="cursor-pointer" onClick={() => onSelectYear(d.year)}>
                                <text x={x} y={height + 25} fontSize="14" fill="#64748b" textAnchor="middle" className="font-bold">
                                    {d.year % 2 === 0 || isSelected ? d.year : ''}
                                </text>
                                <circle
                                    cx={x} cy={y}
                                    r={isSelected ? "8" : "4"}
                                    fill={isSelected ? "#10b981" : "#ffffff"}
                                    stroke={isSelected ? "#047857" : "#3b82f6"}
                                    strokeWidth="3"
                                    className="transition-all duration-300"
                                />
                                {isSelected && (
                                    <g>
                                        <rect x={x - 30} y={y - 45} width="60" height="25" rx="4" fill="#1e293b" />
                                        <text x={x} y={y - 28} fontSize="14" fontWeight="black" fill="#ffffff" textAnchor="middle">
                                            {d.value}
                                        </text>
                                        <path d={`M ${x-5} ${y-20} L ${x} ${y-12} L ${x+5} ${y-20} Z`} fill="#1e293b" />
                                    </g>
                                )}
                            </g>
                        );
                    })}
                </svg>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center text-xs text-slate-400 font-bold uppercase tracking-widest">
                <span>{data[0].year}</span>
                <span>{isSummable ? 'Sumatoria Regional' : 'Promedio Regional'}</span>
                <span>{data[data.length - 1].year}</span>
            </div>
        </div>
    );
};
