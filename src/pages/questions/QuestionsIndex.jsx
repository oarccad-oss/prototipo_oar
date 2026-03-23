import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Trees, Shield, Flame, Footprints, CloudRain, Anchor, Droplet, Map as MapIcon,
    ArrowRight, MessageSquare, Globe, Sparkles
} from 'lucide-react';
import { Card, Button, Badge } from '../../components/ui/Shared';

import { QUESTIONS_DATA } from '../../data/questions';

const QuestionCard = ({ icon: Icon, question, path, color, description, delay = 0 }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="h-full"
        >
            <Card 
                className="flex flex-col h-full bg-white/80 backdrop-blur-xl hover:shadow-2xl transition-all duration-500 border-none group cursor-pointer rounded-[2.5rem] relative overflow-hidden p-8 shadow-xl shadow-slate-200/50" 
                onClick={() => navigate(path)}
            >
                {/* Decorative background element for card */}
                <div 
                    className="absolute -right-4 -top-4 w-24 h-24 blur-3xl opacity-10 group-hover:opacity-20 transition-opacity rounded-full pointer-events-none"
                    style={{ backgroundColor: color }}
                />

                <div className="mb-6 relative z-10">
                    <div 
                        className="p-4 rounded-3xl w-fit mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm border border-slate-100" 
                        style={{ backgroundColor: `${color}10` }}
                    >
                        <Icon className="h-8 w-8" style={{ color }} />
                    </div>
                    <h3 className="text-xl font-serif font-black text-slate-900 mb-3 leading-tight group-hover:text-emerald-600 transition-colors">
                        {question}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-light">
                        {description}
                    </p>
                </div>
                
                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between relative z-10">
                    <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-slate-200 text-slate-400 group-hover:border-emerald-200 group-hover:text-emerald-600 transition-colors">
                        Análisis Regional
                    </Badge>
                    <div 
                        className="h-10 w-10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:translate-x-2 shadow-sm border border-slate-100 bg-white"
                        style={{ color }}
                    >
                        <ArrowRight className="h-5 w-5" />
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

export const QuestionsIndex = () => {
    const questions = QUESTIONS_DATA;
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen bg-slate-50 overflow-hidden selection:bg-emerald-500 selection:text-white">
            <style>{`
                @keyframes blob-drift {
                    0%, 100% { transform: translate(0, 0) scale(1) }
                    33% { transform: translate(40px, -60px) scale(1.1) }
                    66% { transform: translate(-30px, 30px) scale(0.9) }
                }
                .mesh-questions {
                    background-image: radial-gradient(circle at 10% 10%, rgba(16, 185, 129, 0.05) 0%, transparent 50%),
                                      radial-gradient(circle at 90% 90%, rgba(14, 165, 233, 0.05) 0%, transparent 50%);
                }
            `}</style>

            {/* Background Decorative Elements */}
            <div className="absolute inset-0 mesh-questions pointer-events-none z-0" />
            <div 
                className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none z-0"
                style={{ animation: 'blob-drift 30s infinite alternate' }}
            />
            <div 
                className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-500/5 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none z-0"
                style={{ animation: 'blob-drift 25s infinite alternate-reverse' }}
            />

            {/* Simple Floating Header for context */}
            <header className="sticky top-0 z-[100] bg-white/70 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-slate-900 rounded-2xl shadow-xl shadow-slate-900/20">
                                <Globe className="h-5 w-5 text-emerald-400 animate-pulse" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">SICA • CCAD</p>
                                <p className="text-xs font-bold text-slate-900 tracking-tight">Observatorio Ambiental Regional</p>
                            </div>
                        </div>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => navigate('/')}
                            className="rounded-full px-6 font-black uppercase text-[9px] tracking-widest border-slate-200 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                        >
                            Volver al Inicio
                        </Button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                {/* Hero Section */}
                <div className="mb-20 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <Badge className="bg-emerald-50 text-emerald-600 border-none px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm">
                            <Sparkles className="h-3 w-3 mr-2" /> Inteligencia Territorial
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-serif font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
                            Preguntas <span className="text-emerald-600 italic">Estratégicas</span> <br /> Regionales
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl leading-relaxed font-light">
                            Navegue a través de la evidencia científica respondiendo a las interrogantes más urgentes para la gestión ambiental y climática de la Región SICA.
                        </p>
                    </motion.div>
                </div>

                {/* Questions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {questions.map((q, idx) => (
                        <QuestionCard 
                            key={idx} 
                            {...q} 
                            delay={idx * 0.05}
                        />
                    ))}
                </div>

                {/* Footer Context */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center mt-32 px-6"
                >
                    <div className="inline-block p-10 bg-white/50 backdrop-blur-xl border border-white rounded-[3rem] shadow-xl shadow-slate-200/40">
                        <MessageSquare className="h-10 w-10 text-slate-200 mx-auto mb-6" />
                        <p className="text-slate-500 text-sm font-light leading-relaxed mb-6">
                            Estas interrogantes estratégicas son actualizadas periódicamente por el <strong>Consejo de Ministros de la CCAD</strong> para reflejar las prioridades ambientales y de desarrollo sostenible emanadas del mandato de los Jefes de Estado de la región.
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <div className="h-px w-12 bg-slate-200" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Evidencia Certificada v4.0</span>
                            <div className="h-px w-12 bg-slate-200" />
                        </div>
                    </div>
                </motion.div>
            </main>

            <footer className="max-w-7xl mx-auto px-8 py-20 relative z-10 font-bold text-[10px] uppercase tracking-[0.3em] text-slate-400 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-slate-200/50">
                <div className="flex items-center gap-6">
                    <span>© 2026 Observatorio Ambiental Regional</span>
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Red Integrada de Monitoreo Territorial</span>
                </div>
                <div className="flex gap-10 items-center opacity-70">
                    <span className="hover:text-emerald-500 cursor-pointer transition-colors border-b border-transparent hover:border-emerald-500">Metodología SICA</span>
                    <span className="hover:text-emerald-500 cursor-pointer transition-colors border-b border-transparent hover:border-emerald-500">Gobernanza de Datos</span>
                </div>
            </footer>
        </div>
    );
};
