import React from 'react';
import { Database, ArrowRight } from 'lucide-react';
import { Button } from '../../../components/ui/Shared';

export const AnaliticaSection = ({ navigate }) => {
  return (
    <section id="analitica" className="mt-32 py-24 bg-gradient-to-b from-white via-slate-50 to-slate-100 overflow-hidden relative border-t border-slate-100">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-primary/5 blur-[120px] rounded-full"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-[0.2em] border border-brand-primary/20">
              <Database className="h-3.5 w-3.5" /> Intelligence Center
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-black leading-tight text-slate-900">
              Haz tu propia <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-emerald-600">búsqueda</span>
            </h2>
            <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed max-w-xl">
              ¿Qué te interesa saber a ti? Explore nuestras bases de datos mediante cruces dinámicos de variables.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <Button
                className="bg-brand-primary text-white hover:bg-brand-primary/90 rounded-full px-10 py-7 h-auto font-black text-base shadow-xl shadow-brand-primary/20 transition-all hover:scale-105 active:scale-95"
                onClick={() => navigate('/analisis-multidimensional')}
              >
                Iniciar Análisis <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex-1 relative w-full lg:w-auto h-[400px] md:h-[500px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square">
                <div className="absolute top-10 left-0 p-4 bg-white/60 backdrop-blur-xl rounded-2xl border border-white shadow-2xl rotate-[-6deg] hover:rotate-0 transition-transform duration-500 z-20">
                  <div className="h-20 w-40 flex items-end gap-1 pt-4">
                    <div className="flex-1 bg-brand-primary/60 rounded-t h-full animate-[pulse_3s_infinite]"></div>
                    <div className="flex-1 bg-brand-primary/30 rounded-t h-[60%] animate-[pulse_4s_infinite]"></div>
                    <div className="flex-1 bg-brand-primary/80 rounded-t h-[85%] animate-[pulse_2s_infinite]"></div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-brand-primary/5 rounded-full blur-[100px]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
