import React from 'react';
import { Map, ArrowRight } from 'lucide-react';
import { Button } from '../../../components/ui/Shared';
import { MapViewer } from '../../../components/map/MapViewer';

export const VisorSection = ({ isActiveMap, setIsActiveMap, navigate }) => {
  return (
    <section id="visor" className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 mb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-black uppercase tracking-widest mb-6">
          <Map className="h-3 w-3" /> Infraestructura de Datos
        </div>
        <h2 className="text-3xl md:text-5xl font-serif font-black mb-6">
          Visor Geoespacial <span className="text-blue-400">Regional</span>
        </h2>
        <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto">
          Acceda a capas de información crítica sobre biodiversidad, cobertura forestal y riesgos climáticos en una sola plataforma integrada.
        </p>
      </div>

      <div className="container mx-auto px-4">
        <div className="relative h-[600px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group/map">
          <MapViewer hideControls={true} />

          {!isActiveMap && (
            <div
              className="absolute inset-0 z-[1002] bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer group-hover/map:bg-slate-900/30 transition-all duration-500"
              onClick={() => setIsActiveMap(true)}
            >
              <div className="text-center p-8 bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20 shadow-2xl transform transition-transform group-hover/map:scale-105">
                <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-600/40">
                  <Map className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Visor Interactivo</h3>
                <p className="text-blue-100 text-sm mb-6">Haz clic para interactuar con el mapa</p>
                <Button size="sm" className="bg-white text-blue-900 hover:bg-blue-50">
                  Activar Navegación
                </Button>
              </div>
            </div>
          )}

          <div className="absolute bottom-8 right-8 z-[1001]">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-xl px-8"
              onClick={() => navigate('/technical/maps')}
            >
              Abrir Centro de Mapas <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
