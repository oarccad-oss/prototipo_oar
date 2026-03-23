import React from 'react';
import { FileText, Trees, BarChart3, Shield, Waves } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '../../../components/ui/Shared';

export const ReportesSection = ({ navigate }) => {
  return (
    <section id="reportes" className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Background Decorative Blob */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none z-0"
        style={{ animation: 'blob-drift 30s infinite' }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8"
        >
          <div className="max-w-4xl text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-black uppercase tracking-[0.2em] mb-6 border border-emerald-100/50 shadow-sm">
              <FileText className="h-3.5 w-3.5" /> Conocimiento Estratégico
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-slate-900 leading-[1.1] mb-6">
              Reportes <span className="text-emerald-600 block md:inline italic text-glow">Temáticos de Estado</span>
            </h2>
            <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed max-w-3xl">
              Análisis científicos exhaustivos que transforman datos complejos en narrativas procesables para la resiliencia regional.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group relative flex flex-col h-full bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 transition-all duration-700 cursor-pointer overflow-hidden border-b-8 border-b-emerald-500"
            onClick={() => navigate('/technical/reports/fra-2024')}
          >
            <div className="h-64 relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200"
                alt="Forest Report"
                className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
              />
              <div 
                className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent opacity-60"
                style={{ backgroundSize: '200% 200%', animation: 'gradient-move 5s infinite alternate' }}
              ></div>
              <div className="absolute top-6 left-6">
                <Badge className="bg-emerald-500 text-white border-none px-4 py-1 shadow-lg shadow-emerald-500/30 text-[10px] uppercase font-black tracking-widest animate-pulse">
                  Publicado 2024
                </Badge>
              </div>
            </div>

            <div className="p-10 flex flex-col flex-1 relative bg-white">
              <motion.div 
                whileHover={{ rotate: 15 }}
                className="bg-emerald-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 -mt-16 relative z-10 shadow-lg group-hover:bg-emerald-500 transition-colors duration-500">
                <Trees className="h-7 w-7 text-emerald-600 group-hover:text-white transition-colors" />
              </motion.div>
              <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors">Estado de los Bosques</h3>
              <p className="text-slate-500 text-base leading-relaxed mb-10 flex-1 font-light">
                El análisis más robusto de la década sobre la salud forestal del SICA, integrando datos del FRA-2020/2025 y alertas satelitales en tiempo real.
              </p>
              <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-8 mt-auto">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => { e.stopPropagation(); navigate('/technical/reports/fra-2024'); }}
                  className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-all duration-300 group/btn"
                >
                  <FileText className="h-5 w-5" />
                  <span className="text-[10px] font-black uppercase tracking-tighter">Explorar Reporte</span>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => { e.stopPropagation(); navigate('/technical/dashboard'); }}
                  className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition-all duration-300 group/btn"
                >
                  <BarChart3 className="h-5 w-5 rotate-0 group-hover/btn:rotate-12 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-tighter">Explorar Dashboard</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group flex flex-col h-full bg-slate-50/50 rounded-[2.5rem] border border-dashed border-slate-200 opacity-80 cursor-not-allowed overflow-hidden"
          >
            <div className="h-64 relative overflow-hidden grayscale opacity-40">
              <img
                src="https://images.unsplash.com/photo-1452570053594-1b985d6ea890?auto=format&fit=crop&q=80&w=1200"
                alt="Bio Report"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-200/20"></div>
            </div>
            <div className="p-10 flex flex-col flex-1">
              <div className="bg-slate-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 -mt-16 relative z-10 shadow-sm">
                <Shield className="h-7 w-7 text-slate-400" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-400 mb-4 tracking-tight">Estado de la Biodiversidad</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1 font-light italic">
                En desarrollo: Monitoreo regional de especies clave y efectividad de zonas protegidas 30x30.
              </p>
              <div className="grid grid-cols-2 gap-4 border-t border-slate-100/50 pt-8 mt-auto opacity-40">
                <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-100 text-slate-400">
                  <FileText className="h-5 w-5" />
                  <span className="text-[10px] font-black uppercase tracking-tighter">Reporte</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-100 text-slate-400">
                  <BarChart3 className="h-5 w-5" />
                  <span className="text-[10px] font-black uppercase tracking-tighter">Dashboard</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="group flex flex-col h-full bg-slate-50/50 rounded-[2.5rem] border border-dashed border-slate-200 opacity-80 cursor-not-allowed overflow-hidden"
          >
            <div className="h-64 relative overflow-hidden grayscale opacity-40">
              <img
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1200"
                alt="Ocean Report"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-10 flex flex-col flex-1">
              <div className="bg-slate-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 -mt-16 relative z-10 shadow-sm">
                <Waves className="h-7 w-7 text-slate-400" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-400 mb-4 tracking-tight">Estado de los Mares</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1 font-light italic">
                En desarrollo: Evaluación de la salud de arrecifes y estrés térmico en las costas del SICA.
              </p>
              <div className="grid grid-cols-2 gap-4 border-t border-slate-100/50 pt-8 mt-auto opacity-40">
                <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-100 text-slate-400">
                  <FileText className="h-5 w-5" />
                  <span className="text-[10px] font-black uppercase tracking-tighter">Reporte</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-100 text-slate-400">
                  <BarChart3 className="h-5 w-5" />
                  <span className="text-[10px] font-black uppercase tracking-tighter">Dashboard</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
