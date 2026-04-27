import React from 'react';
import { Globe, AlertTriangle, TrendingDown } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const DATA = [
  { name: 'Área Natural Remanente', value: 24297665, color: '#14b8a6' },
  { name: 'Pérdida (2001-2020)', value: 1675187, color: '#ef4444' },
];

export default function Q10PresionNatural() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center">
          <div className="inline-block p-4 rounded-full bg-teal-50 text-teal-600 mb-6 border border-teal-100"><Globe size={40} /></div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Presión sobre el Área Natural</h1>
          <p className="text-gray-500">¿Qué porcentaje del área natural remanente se ha perdido en 20 años?</p>
        </header>

        <div className="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm flex flex-col items-center">
          <div className="h-80 w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={DATA} innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value" stroke="none">
                  {DATA.map((e,i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-8 text-center">
            <h2 className="text-6xl font-black text-red-600">6.5%</h2>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-2">Tasa de Reducción Total</p>
          </div>
        </div>

        <div className="p-6 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-4">
          <AlertTriangle className="text-red-600 shrink-0" size={24} />
          <div>
            <h4 className="text-sm font-bold text-red-800 mb-1">Riesgo de Fragmentación</h4>
            <p className="text-xs text-red-700 leading-relaxed">
              La pérdida del 6.5% del área natural remanente no es uniforme; se concentra en corredores biológicos críticos, lo que aumenta exponencialmente el riesgo de aislamiento genético y colapso funcional de los ecosistemas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
