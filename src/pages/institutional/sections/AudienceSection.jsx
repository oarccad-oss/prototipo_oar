import React from 'react';
import { Users, BarChart3, Globe } from 'lucide-react';
import { Button } from '../../../components/ui/Shared';
import { cn } from '../../../lib/utils';

export const AudienceSection = ({ activeRole, setActiveRole, navigate }) => {
  return (
    <section className="py-24 bg-slate-50 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-6">
            <Users className="h-3 w-3" /> Adaptación de Usuario
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-slate-900 leading-tight mb-6">Plataforma Adaptativa</h2>
          <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed">
            Hemos diseñado flujos de trabajo específicos para cada actor clave en la gestión ambiental regional, asegurando que cada datos llegue con el propósito correcto.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { id: 'decision', label: 'Dashboard', icon: Users },
            { id: 'tech', label: 'Visor Interactivo', icon: BarChart3 },
            { id: 'citizen', label: 'Historias', icon: Globe }
          ].map((role) => (
            <button
              key={role.id}
              onClick={() => setActiveRole(role.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all text-sm md:text-base",
                activeRole === role.id
                  ? "bg-emerald-600 text-white shadow-lg ring-2 ring-offset-2 ring-emerald-600"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              )}
            >
              <role.icon className="h-4 w-4" />
              {role.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 space-y-6">
            {activeRole === 'decision' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900">Tableros de Control Ejecutivo</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Visualice el cumplimiento de metas regionales (ERAM, AFOLU) mediante semáforos de alerta temprana. Acceda a reportes sintetizados para cumbres ministeriales.
                </p>
                <ul className="space-y-3 pt-4">
                  <li className="flex items-center gap-2 text-slate-700">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" /> Monitoreo de Metas 2030
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" /> Resúmenes de Impacto Económico
                  </li>
                </ul>
                <Button className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => navigate('/technical/dashboard')}>
                  Ver Dashboard Ejecutivo
                </Button>
              </div>
            )}

            {activeRole === 'tech' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900">Datos Abiertos e Interoperabilidad</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Acceda al catálogo de metadatos geográficos. Descargue capas Shapefile/GeoJSON y conecte sus sistemas mediante servicios WMS/WFS estandarizados.
                </p>
                <Button className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => navigate('/technical/map')}>
                  Explorar Visor Avanzado
                </Button>
              </div>
            )}

            {activeRole === 'citizen' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900">Narrativas de Impacto</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Conozca las historias detrás de los datos. Explore mapas interactivos simplificados sobre la iniciativa "Grandes Bosques" y el estado de la biodiversidad.
                </p>
                <Button className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => navigate('/grandes-bosques')}>
                  Ver Historias
                </Button>
              </div>
            )}
          </div>

          <div className="order-1 md:order-2">
            <div className="aspect-square md:aspect-[4/3] bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 relative group">
              <img
                src={
                  activeRole === 'decision' ? "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000" :
                    activeRole === 'tech' ? "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" :
                      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=1000"
                }
                alt="Platform Preview"
                className="object-cover w-full h-full transform transition-transform group-hover:scale-105 duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
