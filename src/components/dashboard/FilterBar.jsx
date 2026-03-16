import React from 'react';
import { COUNTRIES, ZONES } from '../../data/mockData';
import { Card } from '../ui/Shared';
import { Calendar, Layers, MapPin } from 'lucide-react';

export const FilterBar = ({ filters, onFilterChange }) => {
    const handleChange = (key, value) => {
        onFilterChange({ ...filters, [key]: value });
    };

    const years = [2024, 2023, 2022, 2021, 2020];
    const sectors = ["Todos", "Bosques", "Agricultura", "Energía", "Residuos"];

    return (
        <Card className="mb-6 p-4">
            <div className="flex flex-wrap items-center gap-4">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mr-2">Filtros Globales:</h3>

                {/* Country Filter */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-4 w-4 text-slate-400" />
                    </div>
                    <select
                        value={filters.country}
                        onChange={(e) => handleChange('country', e.target.value)}
                        className="pl-9 pr-8 py-2 border border-slate-300 rounded-md text-sm focus:ring-brand-primary focus:border-brand-primary bg-white shadow-sm"
                    >
                        <option value="Regional">Regional (SICA)</option>
                        {COUNTRIES.map((c) => (
                            <option key={c.code} value={c.code}>
                                {c.flag} {c.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Zone Filter (Corredor Seco support) */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-4 w-4 text-orange-400" />
                    </div>
                    <select
                        className="pl-9 pr-8 py-2 border border-slate-300 rounded-md text-sm focus:ring-brand-primary bg-white shadow-sm"
                        onChange={(e) => handleChange('zone', e.target.value)}
                        defaultValue=""
                    >
                        <option value="">Territorio Nacional (Todo)</option>
                        <optgroup label="Zonas Prioritarias ERAM">
                            {ZONES.map((z) => (
                                <option key={z.id} value={z.id}>{z.name}</option>
                            ))}
                        </optgroup>
                    </select>
                </div>

                {/* Year Filter */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-4 w-4 text-slate-400" />
                    </div>
                    <select
                        value={filters.year}
                        onChange={(e) => handleChange('year', e.target.value)}
                        className="pl-9 pr-8 py-2 border border-slate-300 rounded-md text-sm focus:ring-brand-primary focus:border-brand-primary bg-white shadow-sm"
                    >
                        {years.map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>

                {/* Sector Filter */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Layers className="h-4 w-4 text-slate-400" />
                    </div>
                    <select
                        value={filters.sector}
                        onChange={(e) => handleChange('sector', e.target.value)}
                        className="pl-9 pr-8 py-2 border border-slate-300 rounded-md text-sm focus:ring-brand-primary focus:border-brand-primary bg-white shadow-sm"
                    >
                        {sectors.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
            </div>
        </Card>
    );
};
