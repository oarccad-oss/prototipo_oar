import React from 'react';

export const IntroScreen = ({ showIntro, handleStartConnection }) => {
  if (!showIntro) return null;

  return (
    <div id="intro-screen" className="fixed inset-0 z-[10000] flex flex-col justify-center items-center text-center bg-[#021226] overflow-hidden p-6 transition-opacity duration-1000 pointer-events-auto">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f2847] via-[#0a221a] to-[#021226] opacity-80" />
      <div className="relative z-10 space-y-8 max-w-4xl animate-fade-in">
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-[0.2em] uppercase leading-tight drop-shadow-2xl">
          Observatorio Ambiental Regional
        </h1>
        <div className="text-xl md:text-2xl font-bold text-emerald-400/90 tracking-[0.3em] uppercase">
          Centroamérica y República Dominicana
        </div>
        <p className="text-white/80 text-lg font-light leading-relaxed max-w-2xl mx-auto border-l-2 border-emerald-500/30 pl-8 text-left">
          Nuestra región está viva y su latido se siente en cada bosque, río y océano. La Comisión Centroamericana de Ambiente y Desarrollo (CCAD) te da la bienvenida al nuevo OAR, tu espacio interactivo para explorar, comprender y tomar el pulso de los ecosistemas que compartimos.
        </p>
        <button 
          onClick={handleStartConnection}
          className="mt-8 px-14 py-5 bg-transparent hover:bg-emerald-500 text-white hover:text-[#021226] border-2 border-emerald-500 rounded-full font-black text-sm uppercase tracking-[0.4em] transition-all duration-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]"
        >
          Iniciar Conexión
        </button>
      </div>
    </div>
  );
};
