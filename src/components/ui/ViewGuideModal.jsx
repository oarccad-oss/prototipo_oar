import React, { useState, useEffect } from 'react';
import { X, Info, CheckCircle2, Database, ExternalLink, Lightbulb } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import guidesData from '../../data/guides/viewGuides.json';
import { Card, Button } from './Shared';

export const ViewGuideModal = ({ isOpen, onClose }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [guide, setGuide] = useState(null);

    useEffect(() => {
        // Find best match for current route
        const currentPath = location.pathname;
        const matchedPath = Object.keys(guidesData).find(path => 
            path === currentPath || (path !== '/' && currentPath.startsWith(path))
        );
        
        setGuide(guidesData[matchedPath] || guidesData['/']);
    }, [location.pathname, isOpen]);

    if (!isOpen || !guide) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6">
            {/* Backdrop with Glassmorphism */}
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300"
                onClick={onClose}
            />
            
            {/* Modal Content */}
            <Card className="relative w-full max-w-2xl bg-white/95 backdrop-blur-xl border-none shadow-2xl rounded-[2.5rem] overflow-hidden animate-in zoom-in-95 fade-in duration-300">
                {/* Header Image / Pattern */}
                <div className="h-48 relative overflow-hidden">
                    <img 
                        src={guide.image || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"} 
                        alt={guide.title} 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-slate-900 transition-all border border-white/30"
                    >
                        <X className="h-6 w-6" />
                    </button>
                    
                    <div className="absolute bottom-6 left-8 flex items-center gap-3">
                        <div className="p-3 bg-brand-primary rounded-2xl shadow-lg border border-white/50">
                            <Lightbulb className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 font-serif leading-none mt-2">
                            {guide.title}
                        </h2>
                    </div>
                </div>

                <div className="p-8 space-y-8">
                    {/* Description */}
                    <p className="text-slate-600 text-lg font-light leading-relaxed">
                        {guide.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Funcionalidades Destacadas</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {guide.features.map((feature, idx) => (
                                <div key={idx} className="flex gap-3 items-start p-3 rounded-2xl bg-slate-50 border border-slate-100/50">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                                    <span className="text-xs font-bold text-slate-700 leading-tight">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Data Source & Meta */}
                    <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <Database className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                                <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400">Origen de Datos</span>
                                <span className="text-xs font-bold text-slate-600">{guide.source}</span>
                            </div>
                        </div>

                        <Button 
                            variant="primary" 
                            size="sm" 
                            className="w-full md:w-auto rounded-full px-6 font-black uppercase text-[10px] tracking-widest shadow-xl shadow-brand-primary/20"
                            onClick={() => {
                                onClose();
                                if (guide.learnMore.startsWith('http')) {
                                    window.open(guide.learnMore, '_blank');
                                } else {
                                    navigate(guide.learnMore);
                                }
                            }}
                        >
                            Saber más <ExternalLink className="ml-2 h-3.5 w-3.5" />
                        </Button>
                    </div>
                </div>

                {/* Footer Deco */}
                <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em]">Observatorio Ambiental Regional • SICA</p>
                </div>
            </Card>
        </div>
    );
};
