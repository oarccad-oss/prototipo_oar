import React from 'react';
import { Layers, Globe, Shield } from 'lucide-react';

export default function Q9DiversidadEcosistemica() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center">
          <div className="inline-block p-4 rounded-3xl bg-emerald-100 text-emerald-600 mb-6"><Layers size={40} /></div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">Diversidad Ecosistémica</h1>
          <p className="text-gray-500">¿Cuántos ecosistemas naturales alberga la región SICA?</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border-2 border-emerald-100 shadow-xl flex flex-col items-center justify-center text-center">
            <h2 className="text-7xl font-black text-emerald-600 mb-2">199</h2>
            <p className="text-xs font-black text-emerald-400 uppercase tracking-[0.2em]">Ecosistemas Naturales</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-200 flex flex-col items-center justify-center text-center">
            <h2 className="text-7xl font-black text-gray-800 mb-2">6</h2>
            <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Categorías Antrópicas</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-200">
          <h3 className="font-bold flex items-center gap-2 mb-6"><Globe size={18} /> Riqueza Regional</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Guatemala: 132', 'Nicaragua: 114', 'Honduras: 98', 'Belice: 85', 'Costa Rica: 72', 'Panamá: 68', 'Rep. Dom.: 54', 'El Salvador: 42'].map(e => (
              <div key={e} className="p-3 bg-gray-50 rounded-xl text-[11px] font-bold text-gray-600 border border-gray-100">{e}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
