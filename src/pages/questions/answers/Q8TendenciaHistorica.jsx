import React from 'react';
import { TrendingUp, Clock, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DATA = [
  { year: '2001-05', rate: 55055 },
  { year: '2006-10', rate: 93206 },
  { year: '2011-15', rate: 64380 },
  { year: '2016-20', rate: 122396 },
];

export default function Q8TendenciaHistorica() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans text-gray-900">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter">Tendencia Histórica</h1>
            <p className="text-gray-500">Evolución de la tasa de deforestación (2001-2020)</p>
          </div>
          <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
            <TrendingUp size={16} /> +122% Aceleración Total
          </div>
        </header>

        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
          <div className="h-96">
            <ResponsiveContainer>
              <LineChart data={DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} style={{fontSize: '12px'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} style={{fontSize: '12px'}} tickFormatter={v => v.toLocaleString()} />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="#eab308" strokeWidth={4} dot={{r:6, fill:'#eab308'}} activeDot={{r:8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-2xl border border-gray-100">
            <h4 className="text-xs font-bold text-gray-400 uppercase mb-4 flex items-center gap-2"><Clock size={14} /> Tasa Inicial (2001)</h4>
            <p className="text-3xl font-black">55,055 <span className="text-sm font-normal text-gray-400">ha/año</span></p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-gray-100">
            <h4 className="text-xs font-bold text-gray-400 uppercase mb-4 flex items-center gap-2"><BarChart3 size={14} /> Tasa Reciente (2020)</h4>
            <p className="text-3xl font-black">122,396 <span className="text-sm font-normal text-gray-400">ha/año</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
