import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Globe, Users, Target, BookOpen, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button, Badge } from '../../components/ui/Shared';

export const QuienesSomos = () => {
    return (
        <div className="relative min-h-screen bg-slate-50 overflow-hidden selection:bg-emerald-500 selection:text-white font-sans">
            <style>{`
                @keyframes blob-drift {
                    0%, 100% { transform: translate(0, 0) scale(1) }
                    33% { transform: translate(40px, -60px) scale(1.1) }
                    66% { transform: translate(-30px, 30px) scale(0.9) }
                }
                .mesh-about {
                    background-image: radial-gradient(circle at 10% 10%, rgba(16, 185, 129, 0.05) 0%, transparent 50%),
                                      radial-gradient(circle at 90% 90%, rgba(14, 165, 233, 0.05) 0%, transparent 50%);
                }
            `}</style>

            {/* Background Decorative Elements */}
            <div className="absolute inset-0 mesh-about pointer-events-none z-0" />
            <div 
                className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none z-0"
                style={{ animation: 'blob-drift 30s infinite alternate' }}
            />
            <div 
                className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-500/5 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none z-0"
                style={{ animation: 'blob-drift 25s infinite alternate-reverse' }}
            />

            {/* Hero Section */}
            <header className="relative pt-32 pb-40 bg-slate-950 overflow-hidden shadow-2xl">
                {/* Hero Background Elements */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] bg-[length:40px_40px]"></div>
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-emerald-500/10 via-transparent to-slate-950/80 pointer-events-none"></div>
                
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-6 py-2 text-[10px] font-black uppercase tracking-[0.4em] mb-12 backdrop-blur-xl shadow-2xl">
                            <Sparkles className="h-4 w-4 mr-2" /> Identidad Regional
                        </Badge>
                        <h1 className="text-5xl md:text-8xl font-serif font-black text-white mb-10 leading-[1.1] tracking-tight">
                            Quiénes <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400 italic">Somos</span>
                        </h1>
                        <p className="text-slate-400 text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
                            El Observatorio Ambiental Regional (OAR) es la herramienta técnica de integración de datos para Centroamérica y la República Dominicana.
                        </p>
                    </motion.div>
                </div>
                
                {/* Floating elements deco */}
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-24 -right-24 w-96 h-96 border border-white/5 rounded-full pointer-events-none opacity-20"
                />
            </header>

            {/* Main Content */}
            <main className="relative z-10 -mt-24 pb-24">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                        <div className="space-y-24">
                            <motion.section 
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-4 bg-emerald-500 rounded-3xl shadow-xl shadow-emerald-500/20">
                                      <Shield className="h-8 w-8 text-white" />
                                    </div>
                                    <h2 className="text-4xl font-serif font-black text-slate-900 tracking-tight">
                                        Misión SICA <span className="text-emerald-600 font-light">&</span> CCAD
                                    </h2>
                                </div>
                                <p className="text-slate-500 text-xl leading-relaxed mb-10 font-light">
                                    El Sistema de la Integración Centroamericana (SICA) a través de la Comisión Centroamericana de Ambiente y Desarrollo (CCAD), impulsa el desarrollo sostenible de la región mediante la cooperación técnica y la armonización de políticas ambientales.
                                </p>
                                <div className="p-10 bg-white/80 backdrop-blur-xl rounded-[3rem] border border-emerald-100 shadow-2xl shadow-emerald-500/5 group">
                                    <h3 className="text-xl font-serif font-black text-slate-900 mb-6 flex items-center justify-between">
                                      ¿Qué es el SICA?
                                      <Globe className="text-emerald-500 group-hover:rotate-12 transition-transform" />
                                    </h3>
                                    <p className="text-slate-500 text-lg leading-relaxed font-light">
                                        Es el marco institucional de la integración regional, constituido por Costa Rica, El Salvador, Guatemala, Honduras, Nicaragua, Panamá, Belice y la República Dominicana.
                                    </p>
                                    <Button variant="link" className="mt-8 p-0 text-emerald-600 font-black uppercase text-[10px] tracking-widest flex items-center gap-2 group">
                                      Portal del Sistema <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                                    </Button>
                                </div>
                            </motion.section>

                            <motion.section 
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-4 bg-sky-500 rounded-3xl shadow-xl shadow-sky-500/20">
                                      <Target className="h-8 w-8 text-white" />
                                    </div>
                                    <h2 className="text-4xl font-serif font-black text-slate-900 tracking-tight">
                                        Objetivos de la <span className="text-sky-600 italic">ERAM</span>
                                    </h2>
                                </div>
                                <p className="text-slate-500 text-xl leading-relaxed mb-10 font-light">
                                    La Estrategia Regional Ambiental (ERAM) 2021-2030 guía nuestras acciones bajo cinco ejes temáticos fundamentales para la resiliencia climática y la conservación del patrimonio natural.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {['Calidad Ambiental', 'Mares y Biodiversidad', 'Gestión Hídrica', 'Bosques y Paisajes', 'Cambio Climático'].map((eje, i) => (
                                        <motion.div 
                                            key={i} 
                                            whileHover={{ x: 10 }}
                                            className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-100 text-slate-700 font-black shadow-sm group cursor-default"
                                        >
                                            <CheckCircle2 className="h-5 w-5 text-sky-500 opacity-20 group-hover:opacity-100 transition-opacity" />
                                            {eje}
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.section>
                        </div>

                        <div className="sticky top-24 space-y-12">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="bg-slate-900 text-white rounded-[4rem] p-12 shadow-[0_50px_100px_rgba(0,0,0,0.15)] border border-slate-800 relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
                                
                                <Users className="h-16 w-16 text-emerald-400 mb-10 relative z-10" />
                                <h3 className="text-4xl font-serif font-black mb-10 relative z-10 leading-tight">Gobernanza <br /> <span className="text-emerald-400 italic">del OAR</span></h3>
                                <div className="space-y-10 relative z-10">
                                    <div className="flex gap-6 items-start group/item transition-all hover:translate-x-3">
                                        <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-all">
                                            <Globe size={24} className="text-emerald-400 group-hover/item:text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-xl mb-1 uppercase tracking-tight">Cooperación Regional</h4>
                                            <p className="text-slate-400 text-base font-light">Integración de ministerios de ambiente de toda la región.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 items-start group/item transition-all hover:translate-x-3">
                                        <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover/item:bg-sky-500 group-hover/item:text-white transition-all">
                                            <BookOpen size={24} className="text-sky-400 group-hover/item:text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-xl mb-1 uppercase tracking-tight">Sello Técnico</h4>
                                            <p className="text-slate-400 text-base font-light">Validación de datos mediante protocolos internacionales.</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="relative rounded-[3.5rem] overflow-hidden group h-80 shadow-2xl"
                            >
                                <img 
                                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800" 
                                    alt="Regional Nature"
                                    className="w-full h-full object-cover transform transition-transform duration-[3000ms] group-hover:scale-125"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                                <div className="absolute bottom-10 left-10">
                                  <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30 px-4 py-2 text-[10px] font-black tracking-widest uppercase">
                                    Nuestra Biodiversidad
                                  </Badge>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Timeline Section */}
            <section className="relative py-32 bg-white overflow-hidden">
                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.6em] mb-6">El Camino Recorrido</h2>
                        <h3 className="text-5xl font-serif font-black text-slate-950 mb-20 tracking-tight">Nuestra <span className="text-emerald-600 italic">Trayectoria</span></h3>
                    </motion.div>
                    
                    <div className="relative max-w-6xl mx-auto">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 hidden md:block" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                            {[
                                { year: '2019', event: 'Diseño Conceptual del OAR', desc: 'Validación por el Consejo de Ministros.', color: 'bg-emerald-500' },
                                { year: '2021', event: 'Lanzamiento Estrategia ERAM', desc: 'Marco operativo 2021-2030.', color: 'bg-sky-500' },
                                { year: '2024', event: 'Plataforma Digital Integrada', desc: 'Nodo central de monitoreo regional.', color: 'bg-slate-900' }
                            ].map((item, idx) => (
                                <motion.div 
                                    key={idx} 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-10 bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-50 group hover:-translate-y-4 transition-transform duration-500"
                                >
                                    <span className={`inline-block px-6 py-2 rounded-full ${item.color} text-white font-black text-sm mb-8 shadow-xl shadow-current/20`}>
                                        {item.year}
                                    </span>
                                    <h4 className="text-xl font-serif font-black text-slate-950 mb-3 tracking-tight">{item.event}</h4>
                                    <p className="text-slate-400 text-sm font-light leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <footer className="max-w-7xl mx-auto px-8 py-20 relative z-10 font-bold text-[10px] uppercase tracking-[0.3em] text-slate-400 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-slate-200/50">
                <div className="flex items-center gap-6">
                    <span>© 2026 Observatorio Ambiental Regional</span>
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>SICA • CCAD • v4.0.1</span>
                </div>
                <div className="flex gap-10 items-center opacity-70">
                    <span className="hover:text-emerald-500 cursor-pointer transition-colors border-b border-transparent hover:border-emerald-500">Transparencia</span>
                    <span className="hover:text-emerald-500 cursor-pointer transition-colors border-b border-transparent hover:border-emerald-500">Contacto</span>
                </div>
            </footer>
        </div>
    );
};
