import React from 'react';
import { Focus, MapPin, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const DATA = [
  { name: 'Guatemala', loss: 543794, pct: 32.5 },
  { name: 'Nicaragua', loss: 541813, pct: 32.3 },
  { name: 'Honduras', loss: 341448, pct: 20.4 },
  { name: 'Resto de Región', loss: 248132, pct: 14.8 },
];

export default function Q6ConcentracionPresion() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-black uppercase tracking-tighter">Concentración de Presión</h1>
          <p className="text-gray-500 text-sm">¿Qué países concentran la mayor pérdida de bosque regional?</p>
        </header>

        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-blue-600"><Focus size={200} /></div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <h4 className="text-[10px] font-bold text-blue-400 uppercase mb-2">Puntos Críticos</h4>
              <p className="text-2xl font-black text-blue-700">3 Países</p>
              <p className="text-[10px] text-blue-500 mt-1">Acumulan el 85.2% de la pérdida</p>
            </div>
            {DATA.slice(0,2).map((c,i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-2">{c.name}</h4>
                <p className="text-2xl font-black text-gray-900">{c.pct}%</p>
                <p className="text-[10px] text-gray-500 mt-1">del total regional</p>
              </div>
            ))}
          </div>

          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={DATA}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="loss" radius={[8,8,0,0]}>
                  {DATA.map((e,i) => <Cell key={i} fill={i < 3 ? '#3b82f6' : '#e2e8f0'} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
