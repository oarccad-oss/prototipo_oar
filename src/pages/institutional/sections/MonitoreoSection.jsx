import React from 'react';
import { Globe, LayoutDashboard, ArrowRight } from 'lucide-react';

export const MonitoreoSection = ({ navigate }) => {
  return (
    <section id="monitoreo" className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-[length:24px_24px]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-2 rounded-full bg-slate-800 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
            SISTEMA INTEGRADO DE SEGUIMIENTO DE INDICADORES AMBIENTALES
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-white leading-tight mb-6">
            Monitoreo de Impacto y <span className="text-emerald-400">Cumplimiento</span>
          </h2>
          <p className="text-slate-400 text-lg font-light leading-relaxed max-w-3xl mx-auto">
            Seguimiento en tiempo real de los compromisos internacionales (Convenciones) y la ejecución técnica de la Estrategia Regional Ambiental (ERAM).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className="bg-slate-800/50 border border-slate-700 p-8 rounded-[2rem] hover:bg-slate-800 transition-all border-t-4 border-t-blue-500 group cursor-pointer hover-lift animate-reveal shadow-2xl shadow-blue-500/10"
            onClick={() => navigate('/monitoring?level=estrategico')}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                <Globe className="w-8 h-8" />
              </div>
              <span className="bg-blue-500/10 text-blue-400 border-none px-3 py-1 rounded-full uppercase text-[9px] font-black tracking-widest">
                Indicadores Estratégicos
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors italic font-serif">Meta Global: Convenciones de Río</h3>
            <p className="text-slate-400 font-light leading-relaxed mb-6">
              Monitoreo de sinergias entre las agendas de Biodiversidad, Cambio Climático y Neutralidad de Degradación de la Tierra.
            </p>
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm uppercase tracking-widest">
              Explorar Nivel Estratégico <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>

          <div
            className="bg-slate-800/50 border border-slate-700 p-8 rounded-[2rem] hover:bg-slate-800 transition-all border-t-4 border-t-emerald-500 group cursor-pointer"
            onClick={() => navigate('/monitoring?level=operativo')}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                <LayoutDashboard className="w-8 h-8" />
              </div>
              <span className="bg-emerald-500/10 text-emerald-400 border-none px-3 py-1 rounded-full uppercase text-[9px] font-black tracking-widest">
                Indicadores Operativos
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors italic font-serif">Seguimiento ERAM 2025</h3>
            <p className="text-slate-400 font-light leading-relaxed mb-6">
              Auditoría técnica de la ejecución de metas nacionales, gestión institucional y avance físico en el territorio.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-widest">
              Explorar Indicadores ERAM <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
