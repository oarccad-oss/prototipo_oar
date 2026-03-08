import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Map as MapIcon, 
    Columns, 
    Layers, 
    ArrowRight,
    Search,
    Globe
} from 'lucide-react';
import { Button, Card } from '../../components/ui/Shared';

const MapModuleCard = ({ icon: Icon, title, description, path, colorClass, delay }) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={() => navigate(path)}
            className={`group relative p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden animate-in fade-in slide-in-from-bottom-4 fill-mode-both`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity`}>
                <Icon size={128} />
            </div>
            
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500 ${colorClass}`}>
                <Icon className="h-7 w-7 text-white" />
            </div>
            
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3 group-hover:text-brand-primary transition-colors">
                {title}
            </h3>
            
            <p className="text-slate-500 leading-relaxed mb-6 font-light">
                {description}
            </p>
            
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-brand-primary transition-colors">
                Abrir visor <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
        </div>
    );
};

export const MapHub = () => {
    return (
        <div className="min-h-full bg-slate-50 font-sans pb-20">
            {/* Header Section */}
            <div className="pt-16 px-8 pb-12 max-w-7xl mx-auto">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-black uppercase tracking-wider">
                        <Globe className="h-3 w-3" /> Infraestructura Geoespacial
                    </div>
                    <h1 className="text-5xl font-serif font-black text-slate-900 leading-tight">
                        Visores <span className="text-blue-600">Mapas</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl leading-relaxed font-light">
                        Explore la región SICA a través de nuestras herramientas avanzadas de visualización geoespacial, permitiendo el monitoreo, análisis y comparación de datos territoriales en tiempo real.
                    </p>
                </div>
            </div>

            {/* Viewers Grid */}
            <div className="max-w-7xl mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <MapModuleCard 
                        icon={MapIcon}
                        title="Visor Geoespacial"
                        description="Navegue por capas interactivas de cobertura forestal, áreas protegidas, focos de calor y más indicadores críticos."
                        path="/technical/map"
                        colorClass="bg-blue-600 shadow-lg shadow-blue-500/30"
                        delay={100}
                    />
                    <MapModuleCard 
                        icon={Columns}
                        title="Visor Comparativo"
                        description="Analice cambios temporales o compare diferentes fuentes de datos mediante un sistema de pantalla dividida."
                        path="/technical/map-comparator"
                        colorClass="bg-cyan-600 shadow-lg shadow-cyan-500/30"
                        delay={200}
                    />
                </div>
            </div>

            {/* Quick Action / Info */}
            <div className="max-w-7xl mx-auto px-8 mt-12">
                <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 shadow-sm">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0">
                        <Layers className="h-8 w-8 text-slate-400" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h4 className="text-lg font-bold text-slate-800 mb-1">Capas e Interoperabilidad</h4>
                        <p className="text-sm text-slate-500 font-light">
                            Nuestros visores consumen servicios OGC (WMS, WFS) y formatos modernos como PMTiles para garantizar la máxima velocidad y detalle en el monitoreo regional.
                        </p>
                    </div>
                    <Button variant="outline" className="rounded-xl px-8 border-slate-200 text-slate-600 hover:bg-slate-50 whitespace-nowrap">
                        Ver Catálogo de Capas
                    </Button>
                </div>
            </div>
        </div>
    );
};
