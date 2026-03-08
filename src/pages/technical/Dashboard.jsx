import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterBar } from '../../components/dashboard/FilterBar';
import { KpiCards } from '../../components/dashboard/KpiCards';
import { Charts } from '../../components/dashboard/Charts';

export const Dashboard = () => {
    const [searchParams] = useSearchParams();
    const kpiParam = searchParams.get('kpi');

    const [filters, setFilters] = useState({
        country: "Regional",
        year: 2024,
        sector: "Todos"
    });

    return (
        <div className="p-6 space-y-6 bg-slate-50 min-h-full">
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-serif font-bold text-slate-800">
                    Dashboard Regional
                </h1>
                <span className="text-xs text-slate-400">
                    Última actualización: {new Date().toLocaleDateString()}
                </span>
            </div>

            <FilterBar filters={filters} onFilterChange={setFilters} />

            <KpiCards countryCode={filters.country} highlightKey={kpiParam} />

            <Charts />
        </div>
    );
};
