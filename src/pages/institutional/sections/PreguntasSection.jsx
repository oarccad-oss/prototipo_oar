import React from 'react';
import { HelpCircle, ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, Card } from '../../../components/ui/Shared';
import AXES_DATA from '../../../data/axes.json';

export const PreguntasSection = ({ questions, navigate }) => {
  return (
    <div className="relative bg-white pt-24 z-20 overflow-hidden">
      {/* Background Mesh Gradient */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{ 
          background: 'radial-gradient(circle at 20% 30%, rgba(16,185,129,0.05) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(59,130,246,0.05) 0%, transparent 50%)',
          animation: 'mesh-drift 15s infinite alternate'
        }}
      />

      <div id="preguntas" className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white shadow-2xl text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-100">
            <HelpCircle className="h-3.5 w-3.5" /> Respuestas a Desafíos Regionales
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {questions.map((q, idx) => (
            <motion.div 
              key={q.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer h-full"
              onClick={() => navigate(q.path)}
            >
              <Card
                className="relative h-full w-full transition-all duration-500 bg-white/80 backdrop-blur-xl border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl flex flex-col p-8"
                style={{ 
                  borderTop: `4px solid ${q.color}`,
                }}
              >
                <div className="flex justify-between items-start mb-6">
                  <motion.div 
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="p-3.5 rounded-2xl transition-all shadow-lg" 
                    style={{ backgroundColor: `${q.color}15` }}>
                  <q.icon className="h-6 w-6" style={{ color: q.color }} />
                  </motion.div>
                  <div className="flex gap-2">
                    {q.categories && q.categories.length > 0 && q.categories.map(catId => {
                      const axis = AXES_DATA.find(a => a.id === catId);
                      return axis ? (
                        <span 
                          key={catId}
                          className="px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border"
                          style={{ 
                            backgroundColor: `${axis.color}10`,
                            color: axis.color,
                            borderColor: `${axis.color}20`
                          }}
                        >
                          {axis.text}
                        </span>
                      ) : null;
                    })}
                  </div>
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </div>

                <h3 className="text-xl font-serif font-black text-slate-900 mb-4 leading-tight group-hover:text-brand-primary transition-colors">
                  {q.shortQuestion || q.question}
                </h3>

                {q.highlight && (
                  <div
                    className="text-slate-500 text-sm font-light leading-snug mb-8 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: q.highlight }}
                  />
                )}

                <div className="mt-auto space-y-4">
                  <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full" 
                      style={{ backgroundColor: q.color }} 
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-600 transition-colors">
                    <span>Ver Análisis</span>
                    <span style={{ color: q.color }}>Explorar Datos</span>
                  </div>
                </div>
              </Card>
            </motion.div>
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
