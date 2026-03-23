import React from 'react';
import { Map, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/Shared';
import { MapViewer } from '../../../components/map/MapViewer';

export const VisorSection = ({ isActiveMap, setIsActiveMap, navigate }) => {
  return (
    <section id="visor" className="py-24 bg-slate-900 text-white overflow-hidden relative">
      {/* Decorative Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-900 to-emerald-900/10 z-0" />
      
      <div className="container mx-auto px-4 mb-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-500/30 shadow-sm"
        >
          <Map className="h-3 w-3 animate-bounce" /> Infraestructura de Datos
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-serif font-black mb-6"
        >
          Visor Geoespacial <span className="text-blue-400 italic text-glow">Regional</span>
        </motion.h2>
        <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto">
          Acceda a capas de información crítica sobre biodiversidad, cobertura forestal y riesgos climáticos en una sola plataforma integrada.
        </p>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative h-[600px] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group/map"
        >
          <MapViewer hideControls={true} />

          {!isActiveMap && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-[1002] bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer group-hover/map:bg-slate-900/30 transition-all duration-500"
              onClick={() => setIsActiveMap(true)}
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-center p-12 bg-slate-900/60 backdrop-blur-xl rounded-[3rem] border border-white/20 shadow-2xl transform transition-transform"
              >
                <motion.div 
                  whileHover={{ rotate: 180 }}
                  className="bg-blue-600 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-600/40"
                >
                  <Map className="h-10 w-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter">Visor Interactivo</h3>
                <p className="text-blue-100 text-sm mb-8 font-light">Haz clic para interactuar con el mapa regional</p>
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 rounded-full px-10 font-black shadow-lg shadow-white/10">
                  Activar Navegación
                </Button>
              </motion.div>
            </motion.div>
          )}

          <div className="absolute bottom-8 right-8 z-[1001]">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-2xl shadow-blue-600/50 px-8 py-6 h-auto rounded-full font-black group overflow-hidden"
              onClick={() => navigate('/technical/maps')}
            >
              <div className="flex items-center gap-2 relative z-10">
                Abrir Centro de Mapas <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
