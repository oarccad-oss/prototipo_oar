import React from 'react';
import { ShieldAlert, ShieldCheck, TreePine, AlertTriangle, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

/**
 * Q4 — Integridad de Áreas Protegidas
 * DASHBOARD ANALÍTICO DEL OBSERVATORIO AMBIENTAL REGIONAL (OAR)
 */

const DATA_PA = [
  { name: 'Áreas con Pérdida', value: 338, color: '#ef4444' },
  { name: 'Áreas Intactas', value: 679, color: '#10b981' },
];

const DATA_LOSS = [
  { name: 'Dentro de APs', value: 739456, color: '#8b5cf6' },
  { name: 'Fuera de APs', value: 935731, color: '#e2e8f0' },
];

export default function Q4IntegridadAPs() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-black uppercase">Integridad de Áreas Protegidas</h1>
          <p className="text-gray-500">¿Cuánta deforestación ocurre dentro de territorios con protección legal?</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-sm font-bold mb-4">Condición de las 1,017 Áreas Protegidas</h3>
            <div className="h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={DATA_PA} innerRadius={60} outerRadius={80} dataKey="value">
                    {DATA_PA.map((e,i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-gray-500 text-center mt-4">33% de las áreas protegidas registran deforestación activa.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-sm font-bold mb-4">Ubicación de la Pérdida Total</h3>
            <div className="h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={DATA_LOSS} innerRadius={60} outerRadius={80} dataKey="value">
                    {DATA_LOSS.map((e,i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-gray-500 text-center mt-4">El 44.1% de la deforestación regional ocurre en APs.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
