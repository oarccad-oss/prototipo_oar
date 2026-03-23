import React from 'react';
import { motion } from 'framer-motion';
import Particles from "@tsparticles/react";

export const IntroScreen = ({ showIntro, handleStartConnection, initParticles }) => {
  if (!showIntro) return null;

  return (
    <motion.div 
      id="intro-screen" 
      exit={{ opacity: 0, transition: { duration: 1 } }}
      className="fixed inset-0 z-[10000] flex flex-col justify-center items-center text-center bg-[#021226] overflow-hidden p-6 transition-opacity duration-1000 pointer-events-auto"
    >
      {initParticles && (
        <Particles
          id="tsparticles-intro"
          options={{
            fpsLimit: 60,
            particles: {
              color: { value: "#10B981" },
              links: {
                color: "#10B981",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
              },
              move: {
                enable: true,
                speed: 0.6,
                direction: "none",
                random: false,
                straight: false,
                outModes: { default: "out" },
              },
              number: {
                density: { enable: true, area: 800 },
                value: 40,
              },
              opacity: { value: 0.5 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 2 } },
            },
            detectRetina: true,
          }}
          className="absolute inset-0 z-0 pointer-events-none"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f2847]/40 via-[#0a221a]/40 to-[#021226] opacity-80" />
      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 }
          }
        }}
        className="relative z-10 space-y-8 max-w-4xl"
      >
        <motion.h1 
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
          }}
          className="text-3xl md:text-5xl font-black text-white tracking-[0.2em] uppercase leading-tight drop-shadow-2xl text-glow"
        >
          Observatorio Ambiental Regional
        </motion.h1>
        
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
          }}
          className="text-xl md:text-2xl font-bold text-emerald-400/90 tracking-[0.3em] uppercase"
        >
          Centroamérica y República Dominicana
        </motion.div>
        
        <motion.p 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
          }}
          className="text-white/80 text-lg font-light leading-relaxed max-w-2xl mx-auto border-l-2 border-emerald-500/30 pl-8 text-left"
        >
          Nuestra región está viva y su latido se siente en cada bosque, río y océano. La Comisión Centroamericana de Ambiente y Desarrollo (CCAD) te da la bienvenida al nuevo OAR, tu espacio interactivo para explorar, comprender y tomar el pulso de los ecosistemas que compartimos.
        </motion.p>
        
        <motion.button 
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStartConnection}
          className="mt-8 px-14 py-5 bg-transparent hover:bg-emerald-500 text-white hover:text-[#021226] border-2 border-emerald-500 rounded-full font-black text-sm uppercase tracking-[0.4em] transition-all duration-500 hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] shadow-emerald-500/20"
          style={{ animation: 'glow-pulse 3s infinite' }}
        >
          Iniciar Conexión
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
