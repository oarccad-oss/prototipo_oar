import React from 'react';
import { Map, Zap, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const DATA = [
  { name: 'Sistemas Agropecuarios', value: 25453262, color: '#f97316' },
  { name: 'Ecosistemas Naturales', value: 25828135, color: '#10b981' },
  { name: 'Áreas Urbanas', value: 119929, color: '#64748b' },
];

export default function Q5TerritorioTransformado() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-black uppercase">Territorio Transformado</h1>
          <p className="text-gray-500">¿Qué proporción del territorio ha sido transformada por actividades humanas?</p>
        </header>

        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="text-center p-6 bg-orange-50 rounded-xl border border-orange-100">
              <div className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-1">Área Antrópica</div>
              <div className="text-4xl font-black text-orange-600">50.5%</div>
            </div>
            <div className="text-center p-6 bg-emerald-50 rounded-xl border border-emerald-100">
              <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Área Natural</div>
              <div className="text-4xl font-black text-emerald-600">49.5%</div>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={DATA} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={150} style={{fontSize: '11px'}} />
                <Tooltip />
                <Bar dataKey="value" radius={[0,4,4,0]}>
                  {DATA.map((e,i) => <Cell key={i} fill={e.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
