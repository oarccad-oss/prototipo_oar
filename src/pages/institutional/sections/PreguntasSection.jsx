import React from 'react';
import { HelpCircle, ArrowRight, ChevronRight } from 'lucide-react';
import { Button, Card } from '../../../components/ui/Shared';

export const PreguntasSection = ({ questions, navigate }) => {
  return (
    <div className="relative bg-white pt-24 z-20">
      <div id="preguntas" className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white shadow-2xl text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-100">
            <HelpCircle className="h-3.5 w-3.5" /> Respuestas a Desafíos Regionales
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {questions.map((q, idx) => (
            <div 
              key={q.id}
              className="group [perspective:1000px] h-[250px]"
              onClick={() => navigate(q.path)}
            >
              <Card
                className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer bg-white/85 backdrop-blur-xl border-white/20 rounded-xl overflow-hidden shadow-md flex flex-col hover-lift animate-reveal opacity-0"
                style={{ 
                  borderTop: `4px solid ${q.color}`, 
                  animationDelay: `${idx * 150 + 400}ms` 
                }}
              >
                {/* Front */}
                <div className="absolute inset-0 [backface-visibility:hidden] p-6 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2.5 rounded-full transition-colors group-hover:bg-opacity-30" style={{ backgroundColor: `${q.color}15` }}>
                      <q.icon className="h-5 w-5" style={{ color: q.color }} />
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-slate-400 group-hover:translate-x-1 transition-all" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-3 leading-tight group-hover:text-brand-primary transition-colors">
                    {q.shortQuestion || q.question}
                  </h3>

                  {q.highlight && (
                    <div
                      className="text-[13px] text-slate-500 leading-snug"
                      dangerouslySetInnerHTML={{ __html: q.highlight }}
                    />
                  )}
                </div>

                {/* Back */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-slate-900 p-8 flex flex-col justify-center items-center text-center">
                  <h4 className="text-white font-bold mb-4">Consulta datos sobre {q.id.replace('-', ' ')}</h4>
                  <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 rounded-full">
                    Ver Análisis Completo
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            className="rounded-full px-8 py-6 border-slate-200 text-slate-600 hover:bg-slate-50 font-bold"
            onClick={() => navigate('/strategic-questions')}
          >
            Consulta más datos importantes de la región <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
