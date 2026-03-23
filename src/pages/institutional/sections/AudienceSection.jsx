import React from 'react';
import { Users, BarChart3, Globe, ArrowRight } from 'lucide-react'; 
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../../components/ui/Shared';
import { cn } from '../../../lib/utils';

export const AudienceSection = ({ activeRole, setActiveRole, navigate }) => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div 
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -ml-64 -mt-64 pointer-events-none"
        style={{ animation: 'blob-drift 20s infinite' }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-6 shadow-sm">
            <Users className="h-3 w-3" /> Adaptación de Usuario
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-slate-900 leading-tight mb-6">Plataforma <span className="text-emerald-600 italic text-glow">Adaptativa</span></h2>
          <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed">
            Hemos diseñado flujos de trabajo específicos para cada actor clave en la gestión ambiental regional, asegurando que cada dato llegue con el propósito correcto.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {[
            { id: 'decision', label: 'Dashboard', icon: Users },
            { id: 'tech', label: 'Visor Interactivo', icon: BarChart3 },
            { id: 'citizen', label: 'Historias', icon: Globe }
          ].map((role) => (
            <motion.button
              key={role.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveRole(role.id)}
              className={cn(
                "flex items-center gap-3 px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-widest transition-all shadow-xl",
                activeRole === role.id 
                  ? "bg-slate-900 text-white shadow-slate-900/20" 
                  : "bg-white text-slate-500 hover:text-slate-900 border border-slate-100 hover:border-slate-200"
              )}
            >
              <role.icon className={cn("h-4 w-4", activeRole === role.id ? "text-emerald-400" : "text-slate-300")} />
              {role.label}
            </motion.button>
          ))}
        </div>

        <div className="bg-white rounded-[3rem] p-8 md:p-14 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden min-h-[500px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full"
            >
              <div className="space-y-8 order-2 md:order-1">
                {activeRole === 'decision' && (
                  <div className="space-y-6">
                    <h3 className="text-4xl font-serif font-black text-slate-900 italic">Tableros de Control Ejecutivo</h3>
                    <p className="text-slate-600 text-lg font-light leading-relaxed">
                      Visualice el cumplimiento de metas regionales (ERAM, AFOLU) mediante semáforos de alerta temprana. Acceda a reportes sintetizados para cumbres ministeriales.
                    </p>
                    <ul className="space-y-4">
                      <motion.li initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="flex items-center gap-3 text-slate-700 font-bold">
                        <div className="h-2 w-2 rounded-full bg-emerald-500" /> Monitoreo de Metas 2030
                      </motion.li>
                      <motion.li initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-3 text-slate-700 font-bold">
                        <div className="h-2 w-2 rounded-full bg-emerald-500" /> Resúmenes de Impacto Económico
                      </motion.li>
                    </ul>
                    <Button className="bg-slate-900 text-white rounded-full px-10 h-14 font-black uppercase text-[10px] tracking-widest group shadow-xl" onClick={() => navigate('/technical/dashboard')}>
                      Ver Dashboard <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                    </Button>
                  </div>
                )}

                {activeRole === 'tech' && (
                  <div className="space-y-6">
                    <h3 className="text-4xl font-serif font-black text-slate-900 italic">Datos Abiertos e Interoperabilidad</h3>
                    <p className="text-slate-600 text-lg font-light leading-relaxed">
                      Acceda al catálogo de metadatos geográficos. Descargue capas Shapefile/GeoJSON y conecte sus sistemas mediante servicios WMS/WFS estandarizados.
                    </p>
                    <Button className="bg-slate-900 text-white rounded-full px-10 h-14 font-black uppercase text-[10px] tracking-widest group shadow-xl" onClick={() => navigate('/technical/map')}>
                      Explorar Visor Avanzado <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                    </Button>
                  </div>
                )}

                {activeRole === 'citizen' && (
                  <div className="space-y-6">
                    <h3 className="text-4xl font-serif font-black text-slate-900 italic">Narrativas de Impacto</h3>
                    <p className="text-slate-600 text-lg font-light leading-relaxed">
                      Conozca las historias detrás de los datos. Explore mapas interactivos simplificados sobre la iniciativa "Grandes Bosques" y el estado de la biodiversidad.
                    </p>
                    <Button className="bg-slate-900 text-white rounded-full px-10 h-14 font-black uppercase text-[10px] tracking-widest group shadow-xl" onClick={() => navigate('/grandes-bosques')}>
                      Ver Historias <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="order-1 md:order-2">
                <div className="relative group overflow-hidden rounded-[2.5rem] border border-slate-100 shadow-2xl aspect-[4/3]">
                  <motion.img
                    key={activeRole}
                    initial={{ scale: 1.1, filter: 'blur(10px)' }}
                    animate={{ scale: 1, filter: 'blur(0px)' }}
                    src={
                      activeRole === 'decision' ? "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000" :
                        activeRole === 'tech' ? "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" :
                          "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=1000"
                    }
                    alt="Platform Preview"
                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent opacity-60 pointer-events-none" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
