import React from 'react';
import { Globe, ArrowRight } from 'lucide-react';
import { Card } from '../../../components/ui/Shared';
import { cn } from '../../../lib/utils';

export const EjesSection = ({ axes, navigate }) => {
  return (
    <section id="ejes" className="py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-widest mb-6">
            <Globe className="h-3 w-3" /> Marco Estratégico
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-slate-900 leading-tight mb-6">Explorar por <span className="text-emerald-600 font-serif">ejes temáticos</span></h2>
          <p className="text-slate-500 text-lg font-light leading-relaxed">
            Seleccione un área de trabajo para acceder a sus portales dedicados, bibliotecas y herramientas especializadas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {axes.map((axis) => (
            <Card
              key={axis.id}
              className={cn(
                "p-6 bg-white shadow-xl border-t-4 hover:shadow-2xl hover:scale-105 transition-all cursor-pointer group relative overflow-hidden",
                axis.id === 'bosques' ? "ring-2 ring-emerald-500/20" : "opacity-90"
              )}
              style={{ borderTopColor: axis.color }}
              onClick={() => navigate(axis.ruta)}
            >
              {axis.id !== 'bosques' && (
                <div className="absolute top-2 right-2">
                  <span className="text-[7px] font-black uppercase tracking-tighter text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">Próximamente</span>
                </div>
              )}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 rounded-2xl group-hover:scale-110 transition-transform" style={{ backgroundColor: `${axis.color}10` }}>
                  <axis.iconComponent className="h-8 w-8" style={{ color: axis.color }} />
                </div>
                <h3 className="text-sm font-black text-slate-800 leading-tight uppercase tracking-wider">{axis.text}</h3>
                <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 group-hover:text-emerald-600 transition-colors uppercase">
                  Ver Hub <ArrowRight size={10} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
