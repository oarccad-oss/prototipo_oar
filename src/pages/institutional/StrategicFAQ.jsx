import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Trees, Shield, Flame, Footprints, CloudRain, Anchor, Droplet, Map as MapIcon,
    ArrowRight, MessageSquare
} from 'lucide-react';
import { Card, Button } from '../../components/ui/Shared';

const QuestionCard = ({ icon: Icon, question, path, color, description }) => {
    const navigate = useNavigate();

    return (
        <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300 border-l-4 group cursor-pointer" style={{ borderLeftColor: color }} onClick={() => navigate(path)}>
            <div className="mb-4">
                <div className="p-3 rounded-full w-fit mb-3 transition-colors group-hover:bg-opacity-20" style={{ backgroundColor: `${color}20` }}>
                    <Icon className="h-8 w-8" style={{ color }} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight group-hover:text-brand-primary transition-colors">
                    {question}
                </h3>
                <p className="text-sm text-slate-500">
                    {description}
                </p>
            </div>
            <div className="mt-auto pt-4 border-t border-slate-100 flex justify-end">
                <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1" style={{ color }}>
                    Ver Análisis <ArrowRight className="h-4 w-4" />
                </span>
            </div>
        </Card>
    );
};

export const StrategicFAQ = () => {
    const questions = [
        {
            icon: Trees,
            question: "¿Cuál es el estado de los bosques de la región?",
            description: "Análisis integral del estado de los recursos forestales (Estado de los Bosques).",
            path: "/technical/reports/fra-2024",
            color: "#15803D" // Deep Green
        },
        {
            icon: Trees,
            question: "¿Dónde y cuánto bosque estamos perdiendo?",
            description: "Análisis anual de pérdida de cobertura arbórea y emisiones asociadas (GFW).",
            path: "/technical/reports/gfw",
            color: "#97BD3D" // Green
        },
        {
            icon: Shield,
            question: "¿Estamos cerca de la meta de conservación 30x30?",
            description: "Estado actual de las áreas protegidas y OECMs reportadas.",
            path: "/technical/reports/biodiversity",
            color: "#3B82F6" // Blue
        },
        {
            icon: Flame,
            question: "¿Dónde hay incendios activos en este momento?",
            description: "Monitoreo en tiempo casi real de alertas de fuego (VIIRS/MODIS).",
            path: "/technical/reports/fires",
            color: "#EF4444" // Red
        },
        {
            icon: Footprints,
            question: "¿Qué nos dicen los registros de especies en vivo?",
            description: "Dashboard de biodiversidad basado en observaciones de GBIF.",
            path: "/technical/reports/gbif",
            color: "#F59E0B" // Amber
        },
        {
            icon: CloudRain,
            question: "¿Cuál es el riesgo de sequía en el Corredor Seco?",
            description: "Indicadores climáticos y proyecciones de estrés hídrico.",
            path: "/technical/reports/climate",
            color: "#8B5CF6" // Purple
        },
        {
            icon: Anchor,
            question: "¿Cuál es el estado de salud de nuestros océanos?",
            description: "Índice de salud oceánica y áreas marinas protegidas.",
            path: "/technical/reports/ocean",
            color: "#06B6D4" // Cyan
        },
        {
            icon: Droplet,
            question: "¿Cuál es el riesgo de seguridad hídrica por país?",
            description: "Disponibilidad y extracción de agua dulce (Aqueduct).",
            path: "/technical/reports/water",
            color: "#3B82F6" // Blue
        },
        {
            icon: MapIcon,
            question: "¿Qué áreas protegidas están reportadas oficialmente?",
            description: "Base de datos mundial sobre áreas protegidas (Protected Planet).",
            path: "/technical/reports/protected-planet",
            color: "#10B981" // Emerald
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-20">
            {/* Simple Header */}
            <div className="pt-8 px-8 pb-4">
                <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">Preguntas Estratégicas</h1>
                <p className="text-lg text-slate-600 max-w-3xl">
                    Navegue a través de la evidencia científica respondiendo a las interrogantes más urgentes para la gestión ambiental de la región SICA.
                </p>
            </div>

            {/* Questions Grid */}
            <div className="p-8 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {questions.map((q, idx) => (
                        <QuestionCard key={idx} {...q} />
                    ))}
                </div>
            </div>

            {/* Footer Context */}
            <div className="max-w-4xl mx-auto text-center mt-20 px-6">
                <p className="text-slate-400 text-sm">
                    Estas preguntas son actualizadas trimestralmente por el Consejo de Ministros de la CCAD para reflejar las prioridades regionales.
                </p>
            </div>
        </div>
    );
};
