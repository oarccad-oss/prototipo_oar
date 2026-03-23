import React from 'react';
import { ChevronRight } from 'lucide-react';

export const NavigatorSection = () => {
  return (
    <div className="relative z-10 w-full h-screen overflow-hidden bg-[#021226]">
      <iframe 
        src="/navegador.html" 
        className="w-full h-full border-none"
        title="OAR 3D Navigator"
      />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[90] hidden md:flex animate-bounce text-white/50 flex-col items-center gap-2 pointer-events-none">
        <span className="text-[9px] uppercase tracking-widest font-bold">Descubrir Portal</span>
        <ChevronRight className="rotate-90" />
      </div>
    </div>
  );
};
