import React from 'react';
import { Globe, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '../../../components/ui/Shared';
import { cn } from '../../../lib/utils';

export const EjesSection = ({ axes, navigate }) => {
  return (
    <section id="ejes" className="py-24 bg-white border-t border-slate-100 relative overflow-hidden">
      {/* Decorative SVG pattern */}
      <svg className="absolute top-0 right-0 w-64 h-64 text-slate-50 opacity-50 translate-x-1/2 -translate-y-1/2" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
      </svg>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-widest mb-6 border border-slate-200">
            <Globe className="h-3 w-3 animate-spin-slow" /> Marco Estratégico
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-slate-900 leading-tight mb-6">Explorar por <span className="text-emerald-600 font-serif italic text-glow">ejes temáticos</span></h2>
          <p className="text-slate-500 text-lg font-light leading-relaxed">
            Seleccione un área de trabajo para acceder a sus portales dedicados, bibliotecas y herramientas especializadas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {axes.map((axis, idx) => (
            <motion.div
              key={axis.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Card
                className={cn(
                  "h-full p-6 bg-white shadow-lg border-t-4 hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden flex flex-col items-center text-center",
                  axis.id === 'bosques' ? "ring-2 ring-emerald-500/20" : "opacity-90 grayscale-[30%] hover:grayscale-0"
                )}
                style={{ borderTopColor: axis.color }}
                onClick={() => navigate(axis.ruta)}
              >
                {axis.id !== 'bosques' && (
                  <div className="absolute top-2 right-2">
                    <span className="text-[7px] font-black uppercase tracking-tighter text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded shadow-sm">Próximamente</span>
                  </div>
                )}
                <div className="flex flex-col items-center space-y-4">
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="p-4 rounded-2xl group-hover:bg-opacity-20 transition-all duration-500" 
                    style={{ backgroundColor: `${axis.color}15` }}>
                    <axis.iconComponent className="h-8 w-8" style={{ color: axis.color }} />
                  </motion.div>
                  <h3 className="text-sm font-black text-slate-800 leading-tight uppercase tracking-wider group-hover:text-slate-900 transition-colors">{axis.text}</h3>
                  <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 group-hover:text-emerald-600 transition-colors uppercase mt-auto">
                    Ver Hub <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
