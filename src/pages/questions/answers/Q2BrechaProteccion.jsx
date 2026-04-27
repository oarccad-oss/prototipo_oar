import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Globe, Map, Info, BookOpen, Clock, Target } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

/**
 * Q2 — Brecha de Protección Legal
 * DASHBOARD ANALÍTICO DEL OBSERVATORIO AMBIENTAL REGIONAL (OAR)
 * ─────────────────────────────────────────────────────────────
 * Evaluación del cumplimiento de metas de protección regional.
 */

const DATA = [
  { name: 'Área Protegida', value: 12531225, color: '#3b82f6' },
  { name: 'Brecha de Protección', value: 38894889, color: '#e2e8f0' },
];

const BY_COUNTRY = [
  { name: 'Guatemala', protected: 32.5, gap: 67.5 },
  { name: 'Belize', protected: 38.2, gap: 61.8 },
  { name: 'Costa Rica', protected: 26.4, gap: 73.6 },
  { name: 'Panamá', protected: 34.1, gap: 65.9 },
  { name: 'Honduras', protected: 22.3, gap: 77.7 },
  { name: 'Nicaragua', protected: 18.5, gap: 81.5 },
  { name: 'El Salvador', protected: 8.4, gap: 91.6 },
  { name: 'Rep. Dom.', protected: 24.1, gap: 75.9 },
].sort((a, b) => b.protected - a.protected);

const KPIs = [
  { label: 'Área Protegida', value: '12.5M', unit: 'ha', detail: '1,017 áreas declaradas', icon: ShieldCheck, color: '#3b82f6' },
  { label: 'Brecha Regional', value: '75.6', unit: '%', detail: 'Territorio sin protección', icon: ShieldAlert, color: '#ef4444' },
  { label: 'Meta 30x30', value: '195', unit: 'ecos', detail: 'Ecosistemas que cumplen', icon: Target, color: '#10b981' },
  { label: 'Gaps Críticos', value: '1', unit: 'eco', detail: 'Sin ninguna protección', icon: Globe, color: '#f59e0b' },
];

const fmt = (n) => n.toLocaleString('es-HN');

export default function Q2BrechaProteccion() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans">
      <header className="relative bg-white border-b border-gray-200 px-6 py-10 text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-600" />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <span className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest border border-blue-100">
            <ShieldCheck size={12} /> Eje 4 — Bosques y Paisajes
          </span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-gray-900 mb-3 uppercase">
            Brecha de Protección Regional
          </h1>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">
            ¿Qué porcentaje del territorio regional carece de protección legal bajo figuras de conservación?
          </p>
        </motion.div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {KPIs.map((kpi, i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase text-gray-400">{kpi.label}</span>
                <kpi.icon size={16} style={{ color: kpi.color }} />
              </div>
              <div className="text-2xl font-black">{kpi.value}<span className="text-xs font-normal ml-1">{kpi.unit}</span></div>
              <p className="text-[10px] text-gray-500 mt-1">{kpi.detail}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold mb-4">Estado de la Protección Regional</h3>
            <div className="h-80">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={DATA} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value" stroke="none">
                    {DATA.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip formatter={fmt} />
                  <Legend verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold mb-4">Cobertura por País (%)</h3>
            <div className="h-80">
              <ResponsiveContainer>
                <BarChart data={BY_COUNTRY} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} style={{fontSize: '11px'}} />
                  <Tooltip />
                  <Bar dataKey="protected" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <section className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <h4 className="flex items-center gap-2 text-sm font-bold mb-4"><Info size={16} /> Metodología</h4>
          <p className="text-xs text-gray-500 leading-relaxed max-w-3xl">
            La brecha de protección se calcula comparando el área total terrestre regional (8 países SICA) frente a la superficie de las 1,017 Áreas Protegidas registradas en el OAR (integración de inventarios nacionales y WDPA). Se aplica la meta global 30x30 como marco de referencia para cada ecosistema natural individual.
          </p>
        </section>
      </main>

      <footer className="text-center py-8 text-[10px] text-gray-400 border-t border-gray-100">
        © 2026 OAR-SICA · Datos Verificados: WDPA / Mapas Nacionales
      </footer>
    </div>
  );
}
