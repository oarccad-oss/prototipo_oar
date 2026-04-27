import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingUp, Shield, TreePine, Flame, BarChart3, Info, BookOpen, Clock } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

/**
 * Q1 — Riesgo de Colapso de Ecosistemas
 * DASHBOARD ANALÍTICO DEL OBSERVATORIO AMBIENTAL REGIONAL (OAR)
 * ─────────────────────────────────────────────────────────────
 * Este componente implementa la evaluación de la primera pregunta estratégica.
 * Cumple con el estándar OAR-2026-REPORT-REACT.
 */

// ─── DATA CONFIGURATION ──────────────────────────────────────────────────────
const TREND_DATA = [
  { periodo: '2001–2005', ha: 275275 },
  { periodo: '2006–2010', ha: 466031 },
  { periodo: '2011–2015', ha: 321901 },
  { periodo: '2016–2020', ha: 611979 },
];

const COUNTRY_DATA = [
  { name: 'Guatemala',   loss: 543794, rate: 31318, accel: 16.5,  apPct: 61.8, pct: 32.5 },
  { name: 'Nicaragua',   loss: 541813, rate: 42064, accel: 214.1, apPct: 32.5, pct: 32.3 },
  { name: 'Honduras',    loss: 341448, rate: 32738, accel: 332.8, apPct: 56.2, pct: 20.4 },
  { name: 'Panamá',      loss: 112926, rate: 7619,  accel: 153.3, apPct: 18.9, pct: 6.7 },
  { name: 'Belize',      loss: 112381, rate: 6906,  accel: 117.6, apPct: 10.3, pct: 6.7 },
  { name: 'Costa Rica',  loss: 10711,  rate: 1037,  accel: 231.6, apPct: 22.7, pct: 0.6 },
  { name: 'El Salvador', loss: 10229,  rate: 535,   accel: -21.2, apPct: 2.3,  pct: 0.6 },
];

const PA_DATA = [
  { name: 'Dentro de APs', value: 739456 },
  { name: 'Fuera de APs',  value: 935731 },
];

const PA_COLORS = ['#7c3aed', '#e2e8f0'];
const TREND_COLORS = ['#2563eb', '#7c3aed', '#059669', '#dc2626'];
const COUNTRY_COLORS = ['#dc2626','#ea580c','#d97706','#059669','#0891b2','#2563eb','#7c3aed'];

const KPIs = [
  { label: 'Pérdida Acumulada', value: '1.68M', unit: 'ha', detail: 'Deforestación total 2001–2020', icon: TreePine, color: '#dc2626' },
  { label: 'Aceleración', value: '+122', unit: '%', detail: 'Tasa 2016–2020 vs 2001–2005', icon: TrendingUp, color: '#ea580c' },
  { label: 'Ecosistemas Naturales', value: '199', unit: '', detail: 'Unidades ecosistémicas', icon: BarChart3, color: '#2563eb' },
  { label: 'Pérdida en APs', value: '44.1', unit: '%', detail: '739,456 ha dentro de APs', icon: Shield, color: '#7c3aed' },
  { label: 'Tasa Anual', value: '122,396', unit: 'ha/año', detail: 'Promedio 2016–2020', icon: Flame, color: '#059669' },
  { label: 'Emisiones CO₂e', value: '922', unit: 'Mt', detail: 'IPCC Tier 1', icon: AlertTriangle, color: '#0891b2' },
];

const fmt = (n) => n.toLocaleString('es-HN');
const fmtTooltip = (v) => `${fmt(v)} ha`;

// ─── STYLES & ANIMATIONS ─────────────────────────────────────────────────────
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

// ─── SUBCOMPONENTS ───────────────────────────────────────────────────────────

function KpiCard({ kpi, index }) {
  const Icon = kpi.icon;
  return (
    <motion.div
      variants={fadeUp} initial="hidden" animate="visible"
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
    >
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: kpi.color }} />
      <div className="flex items-start justify-between mb-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{kpi.label}</span>
        <Icon size={16} style={{ color: kpi.color }} />
      </div>
      <div className="text-2xl font-black tracking-tight text-gray-900">
        {kpi.value}<span className="text-xs font-medium text-gray-400 ml-1">{kpi.unit}</span>
      </div>
      <p className="text-[10px] text-gray-500 mt-1">{kpi.detail}</p>
    </motion.div>
  );
}

function ChartCard({ title, subtitle, children, delay = 0 }) {
  return (
    <motion.div
      variants={fadeUp} initial="hidden" animate="visible"
      transition={{ delay, duration: 0.5 }}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col"
    >
      <div className="mb-4">
        <h3 className="text-sm font-bold text-gray-800">{title}</h3>
        <p className="text-[11px] text-gray-500">{subtitle}</p>
      </div>
      <div className="h-64 md:h-80 w-full">{children}</div>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function Q1RiesgoColapso() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans">

      {/* 1. HEADER INSTITUCIONAL */}
      <header className="relative bg-white border-b border-gray-200 px-6 py-10 text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500" />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-widest border border-red-100">
            <TreePine size={12} /> Eje 4 — Bosques y Paisajes
          </span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-gray-900 mb-3 uppercase">
            Riesgo de Colapso de Ecosistemas
          </h1>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">
            Evaluación técnica de la pérdida de cobertura forestal y representatividad ecosistémica en los 8 países de la región SICA (2001–2020).
          </p>
        </motion.div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">

        {/* 2. KPI CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {KPIs.map((kpi, i) => <KpiCard key={kpi.label} kpi={kpi} index={i} />)}
        </div>

        {/* 3. INSIGHT PRINCIPAL */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl bg-gray-900 p-8 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <TrendingUp size={120} />
          </div>
          <div className="relative z-10 max-w-3xl">
            <h3 className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <Info size={14} /> Insight Estratégico
            </h3>
            <p className="text-xl md:text-2xl font-light leading-snug">
              "La deforestación regional se ha <span className="text-orange-400 font-bold underline decoration-orange-400/30 underline-offset-4">acelerado un 122%</span> en las últimas dos décadas. Solo tres países concentran el 85% de la pérdida, evidenciando una presión crítica sobre los ecosistemas transfronterizos."
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-[10px] uppercase font-bold text-gray-400">
              <div className="flex items-center gap-1"><Clock size={12} /> Actualizado: Abril 2026</div>
              <div className="flex items-center gap-1"><Shield size={12} /> Datos Verificados (OAR)</div>
            </div>
          </div>
        </motion.div>

        {/* 4. GRÁFICOS ANALÍTICOS */}
        <div className="grid lg:grid-cols-2 gap-8">
          <ChartCard 
            title="Histórico de Deforestación" 
            subtitle="Pérdida de bosque por quinquenios (hectáreas)"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TREND_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="periodo" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748B'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748B'}} tickFormatter={fmt} />
                <Tooltip 
                  cursor={{fill: '#F1F5F9'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '12px'}}
                  formatter={fmtTooltip}
                />
                <Bar dataKey="ha" radius={[6, 6, 0, 0]}>
                  {TREND_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={TREND_COLORS[index % TREND_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard 
            title="Distribución por Áreas Protegidas" 
            subtitle="Pérdida dentro vs fuera de límites legales (2001-2020)"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PA_DATA}
                  cx="50%" cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {PA_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PA_COLORS[index % PA_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={fmtTooltip} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{fontSize: '12px'}} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <ChartCard 
            title="Impacto Acumulado por País" 
            subtitle="Hectáreas totales perdidas (Escala Logarítmica)"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={COUNTRY_DATA} layout="vertical" margin={{ left: 30 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748B'}} tickFormatter={fmt} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 600, fill: '#1E293B'}} />
                <Tooltip formatter={fmtTooltip} />
                <Bar dataKey="loss" radius={[0, 4, 4, 0]}>
                  {COUNTRY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COUNTRY_COLORS[index % COUNTRY_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard 
            title="Aceleración de la Tasa" 
            subtitle="Cambio % (2016-2020 vs 2001-2005)"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={COUNTRY_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748B'}} angle={-30} textAnchor="end" height={60} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748B'}} tickFormatter={v => `${v}%`} />
                <Tooltip />
                <Bar dataKey="accel" radius={[4, 4, 0, 0]}>
                  {COUNTRY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.accel > 0 ? '#EF4444' : '#10B981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* 5. TABLA RESUMEN */}
        <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Matriz de Desempeño por País</h3>
            <span className="text-[10px] text-gray-400 font-bold uppercase">Unidades en Hectáreas</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400">
                  <th className="px-6 py-4">País</th>
                  <th className="px-6 py-4 text-right">Pérdida Total</th>
                  <th className="px-6 py-4 text-right">Tasa Anual</th>
                  <th className="px-6 py-4 text-right">Aceleración</th>
                  <th className="px-6 py-4 text-right">% en APs</th>
                  <th className="px-6 py-4 text-right">% Regional</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-gray-100">
                {COUNTRY_DATA.map((c, i) => (
                  <tr key={c.name} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900">{c.name}</td>
                    <td className="px-6 py-4 text-right tabular-nums font-medium">{fmt(c.loss)}</td>
                    <td className="px-6 py-4 text-right tabular-nums text-gray-500">{fmt(c.rate)}</td>
                    <td className={`px-6 py-4 text-right tabular-nums font-bold ${c.accel > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                      {c.accel > 0 ? '↑' : '↓'} {Math.abs(c.accel)}%
                    </td>
                    <td className="px-6 py-4 text-right tabular-nums text-gray-500">{c.apPct}%</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="font-bold">{c.pct}%</span>
                        <div className="w-12 h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full" style={{ width: `${(c.pct/32.5)*100}%`, background: COUNTRY_COLORS[i] }} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 6. METODOLOGÍA Y FUENTES */}
        <section className="grid md:grid-cols-2 gap-8 pt-8">
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-sm font-bold text-gray-800">
              <BookOpen size={16} className="text-blue-600" /> Nota Metodológica
            </h4>
            <div className="text-[11px] text-gray-500 space-y-3 leading-relaxed">
              <p>
                La **Pérdida de Cobertura Forestal** se basa en el dataset Hansen v1.8 (Global Forest Change) procesado a 30m de resolución. Se define como la eliminación completa de la copa de los árboles en un pixel determinado.
              </p>
              <p>
                La **Aceleración** compara la tasa media anual del último quinquenio (2016-2020) frente al primer periodo base (2001-2005) para identificar tendencias de empeoramiento o recuperación.
              </p>
              <p>
                Las **Emisiones de CO₂e** se estiman mediante el enfoque Tier 1 del IPCC, utilizando una densidad de carbono media de 150 tC/ha para bosques tropicales húmedos (equivalente a 550.5 tCO₂e/ha).
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-sm font-bold text-gray-800">
              <Shield size={16} className="text-emerald-600" /> Fuentes de Datos
            </h4>
            <ul className="text-[11px] text-gray-500 space-y-2">
              <li className="flex justify-between border-b border-gray-100 pb-1">
                <span>Hansen / Google Earth Engine</span>
                <span className="font-bold text-gray-700">v1.8 (2001-2020)</span>
              </li>
              <li className="flex justify-between border-b border-gray-100 pb-1">
                <span>Mapa de Ecosistemas SICA</span>
                <span className="font-bold text-gray-700">Versión 2026.04</span>
              </li>
              <li className="flex justify-between border-b border-gray-100 pb-1">
                <span>WDPA (Áreas Protegidas)</span>
                <span className="font-bold text-gray-700">Update Q1-2026</span>
              </li>
              <li className="flex justify-between border-b border-gray-100 pb-1">
                <span>Límites Administrativos (OAR)</span>
                <span className="font-bold text-gray-700">Estandarizados ISO-3166</span>
              </li>
            </ul>
          </div>
        </section>

      </main>

      {/* 7. FOOTER INSTITUCIONAL */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Observatorio Ambiental Regional</p>
            <p className="text-xs text-gray-500">Sistema de la Integración Centroamericana (SICA)</p>
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Versión</p>
              <p className="text-xs font-bold text-gray-900">1.0.0-Q1</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Licencia</p>
              <p className="text-xs font-bold text-gray-900">OAR-Public</p>
            </div>
          </div>
          <div className="text-right text-[10px] text-gray-400">
            © 2026 OAR-SICA. Prohibida la reproducción parcial sin citar fuente.
          </div>
        </div>
      </footer>
    </div>
  );
}
