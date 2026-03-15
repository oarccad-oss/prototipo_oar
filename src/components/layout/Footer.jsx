import { Facebook, Twitter, Instagram, Mail, Layout } from 'lucide-react';
import { SitemapModal } from './SitemapModal';
import { useState } from 'react';

export const Footer = () => {
    const [isSitemapOpen, setIsSitemapOpen] = useState(false);

    return (
        <footer className="footer-root">
            <div className="bg-emerald-950 text-white py-6 border-t-4 border-emerald-500">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-3">
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
                        <h4 className="font-bold mb-3 text-emerald-400 uppercase tracking-widest text-[10px]">Navegación</h4>
                        <ul className="space-y-2 text-xs text-emerald-100/80">
                            <li><button onClick={() => setIsSitemapOpen(true)} className="hover:text-emerald-400 transition-colors flex items-center gap-2 cursor-pointer text-left w-full"><Layout className="h-4 w-4" /> Mapa del Sitio Esquemático</button></li>
                            <li><a href="https://www.sica.int" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-2">SICA</a></li>
                            <li><a href="https://www.sica.int/ccad" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-2">CCAD</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-3 text-emerald-400 uppercase tracking-widest text-[10px]">Síguenos</h4>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 rounded-full bg-emerald-900 text-emerald-100 hover:bg-emerald-500 hover:text-white transition-all"><Facebook className="h-5 w-5" /></a>
                            <a href="#" className="p-2 rounded-full bg-emerald-900 text-emerald-100 hover:bg-emerald-500 hover:text-white transition-all"><Twitter className="h-5 w-5" /></a>
                            <a href="#" className="p-2 rounded-full bg-emerald-900 text-emerald-100 hover:bg-emerald-500 hover:text-white transition-all"><Instagram className="h-5 w-5" /></a>
                            <a href="#" className="p-2 rounded-full bg-emerald-900 text-emerald-100 hover:bg-emerald-500 hover:text-white transition-all"><Mail className="h-5 w-5" /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-emerald-900 mt-10 pt-6 text-center text-[10px] text-emerald-100/40 uppercase tracking-widest">
                    <p>© {new Date().getFullYear()} Observatorio Ambiental Regional · CCAD · Integración de Datos para la Acción Climática</p>
                </div>
            </div>
            </div>
            <SitemapModal isOpen={isSitemapOpen} onClose={() => setIsSitemapOpen(false)} />
        </footer>
    );
};
