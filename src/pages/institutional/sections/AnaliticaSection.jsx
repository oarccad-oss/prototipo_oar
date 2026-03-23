import React from 'react';
import { Database, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../../components/ui/Shared';

export const AnaliticaSection = ({ navigate }) => {
  const word = "búsqueda".split("");

  return (
    <section id="analitica" className="mt-32 py-24 bg-gradient-to-b from-white via-slate-50 to-slate-100 overflow-hidden relative border-t border-slate-100">
      <div 
        className="absolute top-0 right-0 w-1/3 h-full bg-brand-primary/5 blur-[120px] rounded-full"
        style={{ animation: 'blob-drift 20s infinite' }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-16 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:flex-1 space-y-8 relative z-30"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-[0.2em] border border-brand-primary/20 shadow-sm">
              <Database className="h-3.5 w-3.5" /> Intelligence Center
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-black leading-tight text-slate-900">
              Haz tu propia <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-emerald-600 italic">
                {word.map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </h2>
            <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed max-w-xl">
              ¿Qué te interesa saber a ti? Explore nuestras bases de datos mediante cruces dinámicos de variables.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <Button
                className="bg-brand-primary text-white hover:bg-brand-primary/90 rounded-full px-10 py-7 h-auto font-black text-base shadow-xl shadow-brand-primary/20 transition-all hover:scale-105 active:scale-95 group overflow-hidden"
                onClick={() => navigate('/analisis-multidimensional')}
              >
                <div className="flex items-center gap-2 relative z-10">
                  Iniciar Análisis <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </Button>
            </div>
          </motion.div>

          <div className="w-full lg:flex-1 relative h-[400px] md:h-[500px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative w-full max-w-md aspect-square"
              >
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-10 left-0 p-6 bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-2xl rotate-[-6deg] hover:rotate-0 transition-all duration-700 z-20 group cursor-pointer"
                >
                  <div className="h-24 w-48 flex items-end gap-2 pt-6">
                    <motion.div 
                      animate={{ height: ["40%", "100%", "40%"] }} 
                      transition={{ duration: 3, repeat: Infinity }}
                      className="flex-1 bg-brand-primary/60 rounded-t-xl shadow-lg shadow-brand-primary/20"
                    ></motion.div>
                    <motion.div 
                      animate={{ height: ["30%", "60%", "30%"] }} 
                      transition={{ duration: 4, repeat: Infinity }}
                      className="flex-1 bg-brand-primary/30 rounded-t-xl"
                    ></motion.div>
                    <motion.div 
                      animate={{ height: ["60%", "85%", "60%"] }} 
                      transition={{ duration: 2.5, repeat: Infinity }}
                      className="flex-1 bg-brand-primary/80 rounded-t-xl shadow-lg shadow-brand-primary/40"
                    ></motion.div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div className="h-2 w-12 bg-slate-200 rounded-full"></div>
                    <div className="h-2 w-8 bg-slate-100 rounded-full"></div>
                  </div>
                </motion.div>
                <div 
                  className="absolute inset-0 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none"
                  style={{ animation: 'blob-drift 15s infinite' }}
                ></div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
