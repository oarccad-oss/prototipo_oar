import React from 'react';
import { motion } from 'framer-motion';
import { TreePine, TrendingUp, AlertTriangle, Clock, Info, BookOpen, MapPin } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell
} from 'recharts';

/**
 * Q3 — Pérdida de Bosque Reciente (2016-2020)
 * DASHBOARD ANALÍTICO DEL OBSERVATORIO AMBIENTAL REGIONAL (OAR)
 */

const DATA_PERIODS = [
  { p: '2001-2005', v: 275275 },
  { p: '2006-2010', v: 466031 },
  { p: '2011-2015', v: 321901 },
  { p: '2016-2020', v: 611979 },
];

const DATA_COUNTRIES = [
  { name: 'Guatemala', v: 156591 },
  { name: 'Nicaragua', v: 210322 },
  { name: 'Honduras', v: 163690 },
  { name: 'Panamá', v: 38096 },
  { name: 'Belize', v: 34532 },
  { name: 'Costa Rica', v: 5184 },
  { name: 'El Salvador', v: 2677 },
].sort((a,b) => b.v - a.v);

const KPIs = [
  { label: 'Pérdida 2016-2020', value: '611,979', unit: 'ha', icon: TreePine, color: '#10b981' },
  { label: 'Tasa Anual Reciente', value: '122,396', unit: 'ha/año', icon: Clock, color: '#3b82f6' },
  { label: 'Máximo Histórico', value: '+90', unit: '%', detail: 'Vs periodo anterior', icon: TrendingUp, color: '#ef4444' },
];

const fmt = (v) => v.toLocaleString('es-HN');

export default function Q3PerdidaReciente() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans">
      <header className="bg-white border-b border-gray-200 px-6 py-10 text-center">
        <span className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-widest border border-emerald-100">
          <TreePine size={12} /> Eje 4 — Bosques y Paisajes
        </span>
        <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-2 uppercase">Pérdida de Bosque Reciente</h1>
        <p className="text-gray-500 text-sm">Monitoreo del último quinquenio (2016–2020)</p>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="grid md:grid-cols-3 gap-6">
          {KPIs.map((kpi, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <kpi.icon size={20} style={{ color: kpi.color }} className="mb-4" />
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{kpi.label}</div>
              <div className="text-3xl font-black">{kpi.value}<span className="text-sm font-normal ml-1">{kpi.unit}</span></div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold mb-6 flex items-center gap-2"><TrendingUp size={16} /> Evolución de la Tasa Anual</h3>
            <div className="h-80">
              <ResponsiveContainer>
                <BarChart data={DATA_PERIODS}>
                  <XAxis dataKey="p" style={{fontSize: '10px'}} />
                  <YAxis tickFormatter={fmt} style={{fontSize: '10px'}} />
                  <Tooltip />
                  <Bar dataKey="v" fill="#10b981" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold mb-6 flex items-center gap-2"><MapPin size={16} /> Contribución por País (2016-2020)</h3>
            <div className="h-80">
              <ResponsiveContainer>
                <BarChart data={DATA_COUNTRIES} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={90} style={{fontSize: '11px'}} />
                  <Tooltip />
                  <Bar dataKey="v" radius={[0,4,4,0]}>
                    {DATA_COUNTRIES.map((e,i) => <Cell key={i} fill={i < 3 ? '#ef4444' : '#94a3b8'} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
