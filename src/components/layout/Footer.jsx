import React from 'react';

import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-emerald-950 text-white py-16 border-t-4 border-emerald-500">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <img 
                                src="https://centroclima.org/wp-content/uploads/2016/06/CCAD-300x76.png" 
                                alt="CCAD Logo" 
                                className="h-12 w-auto object-contain"
                            />
                        </div>
                        <p className="text-emerald-100/70 text-sm leading-relaxed max-w-md">
                            El Observatorio Ambiental Regional es una iniciativa de la Comisión Centroamericana de Ambiente y Desarrollo (CCAD) para la integración y visualización de datos ambientales en la región SICA.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-emerald-400 uppercase tracking-widest text-xs">Enlaces Institucionales</h4>
                        <ul className="space-y-3 text-sm text-emerald-100/80">
                            <li><a href="https://www.sica.int" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-2">SICA</a></li>
                            <li><a href="https://www.sica.int/ccad" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-2">CCAD</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-emerald-400 uppercase tracking-widest text-xs">Síguenos</h4>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 rounded-full bg-emerald-900 text-emerald-100 hover:bg-emerald-500 hover:text-white transition-all"><Facebook className="h-5 w-5" /></a>
                            <a href="#" className="p-2 rounded-full bg-emerald-900 text-emerald-100 hover:bg-emerald-500 hover:text-white transition-all"><Twitter className="h-5 w-5" /></a>
                            <a href="#" className="p-2 rounded-full bg-emerald-900 text-emerald-100 hover:bg-emerald-500 hover:text-white transition-all"><Instagram className="h-5 w-5" /></a>
                            <a href="#" className="p-2 rounded-full bg-emerald-900 text-emerald-100 hover:bg-emerald-500 hover:text-white transition-all"><Mail className="h-5 w-5" /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-emerald-900 mt-16 pt-8 text-center text-[10px] text-emerald-100/40 uppercase tracking-widest">
                    <p>© {new Date().getFullYear()} Observatorio Ambiental Regional · CCAD · Integración de Datos para la Acción Climática</p>
                </div>
            </div>
        </footer>
    );
};
