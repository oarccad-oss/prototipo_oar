import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Trees, Shield, Flame, Footprints, CloudRain, Anchor, Droplet, Map as MapIcon,
    ArrowRight, MessageSquare
} from 'lucide-react';
import { Card, Button } from '../../components/ui/Shared';

import { QUESTIONS_DATA } from './questions';

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

export const QuestionsIndex = () => {
    const questions = QUESTIONS_DATA;

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
