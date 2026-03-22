import React from 'react';
import { Shield, Globe, Users, Target, BookOpen } from 'lucide-react';

export const QuienesSomos = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section */}
            <header className="relative py-24 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-[length:32px_32px]"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-serif font-black text-white mb-6">
                        Quiénes Somos
                    </h1>
                    <p className="text-slate-300 text-xl font-light max-w-3xl mx-auto leading-relaxed">
                        El Observatorio Ambiental Regional (OAR) es la herramienta técnica de integración de datos para Centroamérica y la República Dominicana.
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div className="space-y-12">
                            <section>
                                <h2 className="text-3xl font-serif font-black text-slate-900 mb-6 flex items-center gap-3">
                                    <Shield className="h-8 w-8 text-emerald-600" />
                                    Misión SICA y CCAD
                                </h2>
                                <p className="text-slate-600 text-lg leading-relaxed mb-6 font-light">
                                    El Sistema de la Integración Centroamericana (SICA) a través de la Comisión Centroamericana de Ambiente y Desarrollo (CCAD), impulsa el desarrollo sostenible de la región mediante la cooperación técnica y la armonización de políticas ambientales.
                                </p>
                                <div className="p-8 bg-emerald-50 rounded-[2rem] border border-emerald-100">
                                    <h3 className="text-xl font-bold text-emerald-900 mb-4">¿Qué es el SICA?</h3>
                                    <p className="text-emerald-800/80 text-sm leading-relaxed">
                                        Es el marco institucional de la integración regional, constituido por Costa Rica, El Salvador, Guatemala, Honduras, Nicaragua, Panamá, Belice y la República Dominicana.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-3xl font-serif font-black text-slate-900 mb-6 flex items-center gap-3">
                                    <Target className="h-8 w-8 text-blue-600" />
                                    Objetivos de la ERAM
                                </h2>
                                <p className="text-slate-600 text-lg leading-relaxed mb-6 font-light">
                                    La Estrategia Regional Ambiental (ERAM) 2021-2030 guía nuestras acciones bajo cinco ejes temáticos fundamentales para la resiliencia climática y la conservación del patrimonio natural.
                                </p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {['Calidad Ambiental', 'Mares y Biodiversidad', 'Gestión Hídrica', 'Bosques y Paisajes', 'Cambio Climático'].map((eje, i) => (
                                        <li key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 font-bold">
                                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                                            {eje}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>

                        <div className="sticky top-24 space-y-8">
                            <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/50 border border-slate-100">
                                <Users className="h-12 w-12 text-blue-600 mb-6" />
                                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-6">Gobernanza del OAR</h3>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                            <Globe size={18} className="text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800">Cooperación Regional</h4>
                                            <p className="text-sm text-slate-500">Integración de ministerios de ambiente de toda la región.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                                            <BookOpen size={18} className="text-emerald-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800">Sello Técnico</h4>
                                            <p className="text-sm text-slate-500">Validación de datos mediante protocolos internacionales.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <img 
                                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800" 
                                alt="Regional Nature"
                                className="w-full h-64 object-cover rounded-[2.5rem] shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </main>

            {/* Interactive Timeline Simulation */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-serif font-black text-slate-900 mb-16">Nuestra Trayectoria</h2>
                    <div className="relative max-w-5xl mx-auto">
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 hidden md:block" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                            {[
                                { year: '2019', event: 'Diseño Conceptual del OAR' },
                                { year: '2021', event: 'Lanzamiento Estrategia ERAM' },
                                { year: '2024', event: 'Plataforma Digital Integrada' }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                                    <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600 text-white font-black text-sm mb-4">
                                        {item.year}
                                    </span>
                                    <p className="font-bold text-slate-800">{item.event}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
