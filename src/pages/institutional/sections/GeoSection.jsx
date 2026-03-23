import React from 'react';
import { Activity, ArrowRight, ShieldAlert, Trees, Layers, Briefcase } from 'lucide-react';
import { Button } from '../../../components/ui/Shared';

export const GeoSection = ({ navigate }) => {
  const geoItems = [
    {
      title: "Restricciones",
      icon: ShieldAlert,
      description: "Validación legal de polígonos por áreas protegidas.",
      color: "bg-red-500",
      path: "/technical/geo-analysis/restrictions"
    },
    {
      title: "Deforestación",
      icon: Trees,
      description: "Historial de pérdida de cobertura en tiempo real.",
      color: "bg-emerald-600",
      path: "/technical/geo-analysis/deforestation"
    },
    {
      title: "Ecosistemas",
      icon: Layers,
      description: "Inventario de biodiversidad y vegetación.",
      color: "bg-blue-600",
      path: "/technical/geo-analysis/ecosystems"
    },
    {
      title: "Proyectos",
      icon: Briefcase,
      description: "Cruce de cooperación regional activa.",
      color: "bg-orange-500",
      path: "/technical/geo-analysis/projects"
    }
  ];

  return (
    <section id="geo" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest mb-6">
              <Activity className="h-3 w-3 animate-pulse" /> Laboratorio Inteligente
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-slate-900 leading-tight mb-6">
              Análisis Geoespacial <span className="text-blue-600">Avanzado</span>
            </h2>
            <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed">
              Ejecute algoritmos complejos de cruce espacial en tiempo real. Integre capas oficiales para responder a desafíos territoriales críticos.
            </p>
          </div>
          <Button
            variant="outline"
            className="rounded-full px-8 py-6 h-auto border-slate-200 hover:bg-slate-900 hover:text-white transition-all group"
            onClick={() => navigate('/technical/geo-analysis')}
          >
            Ver Todo el Laboratorio <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {geoItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate(item.path)}
              className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-serif font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed mb-4">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
