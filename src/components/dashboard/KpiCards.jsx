import React, { useEffect, useRef } from 'react';
import { Card } from '../ui/Shared';
import { KPI_DATA } from '../../data/mockData';
import { Trees, CloudFog, Flame, ArrowUpRight, ArrowDownRight, Info, AlertOctagon, CheckCircle2, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

export const KpiCards = ({ countryCode = 'Regional', highlightKey = null }) => {
    const data = countryCode === 'Regional' ? KPI_DATA.regional : (KPI_DATA.byCountry[countryCode] || KPI_DATA.regional);
    const highlightRef = useRef(null);

    // Scroll to highlighted card if present
    useEffect(() => {
        if (highlightRef.current) {
            highlightRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [highlightKey]);

    // Helper to format numbers safely
    const fmt = (n) => n ? new Intl.NumberFormat('es-ES').format(n) : '0';

    const getStatusIcon = (status) => {
        switch (status) {
            case 'success': return <CheckCircle2 className="h-5 w-5 text-green-500" />;
            case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
            case 'danger': return <AlertOctagon className="h-5 w-5 text-red-500" />;
            default: return null;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'success': return "bg-green-100/50 border-green-200 text-green-800";
            case 'warning': return "bg-yellow-100/50 border-yellow-200 text-yellow-800";
            case 'danger': return "bg-red-100/50 border-red-200 text-red-800";
            default: return "bg-slate-100 text-slate-800";
        }
    };

    const cards = [
        {
            key: 'forestCover',
            title: "Cobertura Boscosa",
            value: fmt(data.forestCover.value),
            unit: data.forestCover.unit,
            icon: Trees,
            color: "text-green-600",
            bgColor: "bg-green-50",
            trend: data.forestCover.trend,
            trendValue: `${Math.abs(data.forestCover.change)}% anual`,
            status: data.forestCover.status || 'warning',
            meta: data.forestCover
        },
        {
            key: 'emissions',
            title: "Emisiones CO2e",
            value: fmt(data.emissions.value),
            unit: "tCO2e (AFOLU)",
            icon: CloudFog,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            trend: data.emissions.trend,
            trendValue: `${Math.abs(data.emissions.change)}% vs año ant.`,
            status: data.emissions.status || 'danger',
            meta: data.emissions
        },
        {
            key: 'fireAlerts',
            title: "Alertas de Incendio",
            value: fmt(data.fireAlerts.value),
            unit: "VIIRS (24h)",
            icon: Flame,
            color: "text-red-600",
            bgColor: "bg-red-50",
            trend: data.fireAlerts.trend,
            trendValue: `+${data.fireAlerts.change}% vs ayer`,
            status: data.fireAlerts.status || 'danger',
            meta: data.fireAlerts
        },
        {
            key: 'restoration', // Ensuring key exists in mockData or defaulting
            title: "Restauración",
            value: fmt(data.restoration?.value || 0),
            unit: "Hectáreas",
            icon: Trees,
            color: "text-emerald-600",
            bgColor: "bg-emerald-50",
            trend: data.restoration?.trend || 'up',
            trendValue: `Avance Meta 2030`,
            status: data.restoration?.status || 'success',
            meta: data.restoration
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {cards.map((card, idx) => {
                const isHighlighted = highlightKey && card.key === highlightKey;

                return (
                    <Card
                        key={idx}
                        ref={isHighlighted ? highlightRef : null}
                        className={cn(
                            "relative overflow-hidden hover:shadow-md transition-all duration-300 group",
                            isHighlighted ? "ring-2 ring-brand-primary scale-105 shadow-xl" : ""
                        )}
                    >
                        {/* Metadata Tooltip (Simulated on Hover/Click via Popover logic would be better but this is MVP) */}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div title={`Fuente: ${card.meta?.source}\nMétodo: ${card.meta?.method}\nActualizado: ${card.meta?.updated}`} className="cursor-help text-slate-300 hover:text-brand-primary">
                                <Info className="h-4 w-4" />
                            </div>
                        </div>

                        <div className="flex justify-between items-start mb-4">
                            <div className={cn("p-2 rounded-lg", card.bgColor)}>
                                <card.icon className={cn("h-6 w-6", card.color)} />
                            </div>
                            <div className={cn("px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 border", getStatusColor(card.status))}>
                                {getStatusIcon(card.status)}
                                {card.status === 'success' ? 'En Meta' : card.status === 'warning' ? 'Riesgo' : 'Crítico'}
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-slate-500 mb-1">{card.title}</p>
                            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{card.value}</h3>
                            <p className="text-xs text-slate-400 mt-1">{card.unit}</p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                            <div className={cn(
                                "flex items-center text-xs font-bold",
                                card.trend === 'up' && card.title !== 'Restauración' ? "text-red-500" : "text-emerald-600" // Logic tweak: Up is bad for emissions/fire, good for restoration
                            )}>
                                {card.trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                                {card.trendValue}
                            </div>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
};
