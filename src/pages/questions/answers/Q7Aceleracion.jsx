import React from 'react';
import { Zap, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Q7Aceleracion() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto space-y-8 text-center">
        <header>
          <div className="inline-block p-3 rounded-2xl bg-red-50 text-red-600 mb-4"><Zap size={32} /></div>
          <h1 className="text-3xl font-black uppercase">Aceleración Crítica</h1>
          <p className="text-gray-500">¿En cuántos ecosistemas se ha acelerado la deforestación?</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border-2 border-red-100 shadow-xl">
            <h2 className="text-6xl font-black text-red-600 mb-2">51</h2>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Ecosistemas Acelerados</p>
            <div className="mt-6 flex items-center justify-center gap-2 text-red-500 font-bold">
              <ArrowUpRight size={20} /> Incremento &gt; 50%
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-200 text-left space-y-4">
            <h3 className="font-bold flex items-center gap-2 text-gray-800"><AlertTriangle size={18} /> Criterio de Riesgo</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Se identifican como acelerados aquellos ecosistemas donde la pérdida en el último quinquenio (2016-2020) superó en al menos 1.5 veces la pérdida del periodo anterior, excluyendo variaciones marginales inferiores a 500 ha.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
