import React from 'react';
import { Activity, ArrowRight } from 'lucide-react';
import { Button, Card } from '../../../components/ui/Shared';

export const CifrasSection = ({ cifras, navigate }) => {
  const axisColors = {
    'Bosques': '#97BD3D',
    'Biodiversidad': '#10B981',
    'Agua': '#3B82F6',
    'Mares': '#06B6D4',
    'Clima': '#8B5CF6',
    'Calidad Ambiental': '#475569',
    'Incendios': '#EF4444'
  };

  return (
    <section id="cifras" className="py-20 bg-slate-50/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-2xl font-serif font-black text-slate-900 mb-2">Cifras Regionales</h2>
            <p className="text-slate-500">Indicadores clave extraídos de bases de datos satelitales y reportes oficiales.</p>
          </div>
          <Activity className="h-8 w-8 text-emerald-500 opacity-20" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cifras.map((item, idx) => {
            const color = axisColors[item.eje_tematico] || '#10B981';

            return (
              <Card 
                key={idx} 
                className="bg-white border-t-4 rounded-none shadow-sm p-8 hover-lift animate-reveal" 
                style={{ borderTopColor: color, animationDelay: `${idx * 150}ms` }}
              >
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-6">
                  {item.titulo}
                </span>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-black text-slate-900 tracking-tight">
                    {item.valor}
                  </span>
                  <span className="text-lg font-bold text-slate-400">
                    {item.unidad_medida}
                  </span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {item.bajada}
                </p>
                <div className="mt-8 pt-4 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{item.fuente}</span>
                  <div className="px-2 py-0.5 rounded bg-slate-50 text-[9px] font-bold text-slate-400 border border-slate-100 uppercase italic">
                    {item.eje_tematico}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 flex justify-center">
          <Button
            className="bg-slate-900 text-white hover:bg-slate-800 rounded-full px-12 py-7 h-auto font-black text-lg shadow-2xl shadow-slate-900/20 transform hover:scale-105 active:scale-95 transition-all group"
            onClick={() => navigate('/data/cifras')}
          >
            <span className="flex items-center gap-3">
              <Activity className="h-5 w-5 text-emerald-400" />
              Ir al Centro de Cifras
              <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};
