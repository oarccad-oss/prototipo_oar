import React from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const NavigatorSection = () => {
  return (
    <div className="relative z-10 w-full h-screen overflow-hidden bg-[#021226]">
      {/* Decorative Blobs */}
      <div 
        className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full blur-[120px] pointer-events-none z-0"
        style={{ backgroundColor: 'rgba(16,185,129,0.08)', animation: 'blob-drift 20s infinite ease-in-out' }}
      />
      <div 
        className="absolute bottom-[-10%] right-[-5%] w-[45vw] h-[45vw] rounded-full blur-[120px] pointer-events-none z-0"
        style={{ backgroundColor: 'rgba(59,130,246,0.08)', animation: 'blob-drift 25s infinite ease-in-out' }}
      />

      <iframe 
        src="/navegador.html" 
        className="w-full h-full border-none relative z-1"
        title="OAR 3D Navigator"
      />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[90] hidden md:flex animate-bounce text-white/50 flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[9px] uppercase tracking-widest font-black text-glow">Descubrir Portal</span>
        <ChevronRight className="rotate-90 h-5 w-5" />
      </motion.div>
    </div>
  );
};
