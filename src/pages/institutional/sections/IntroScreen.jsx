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
          className="text-2xl md:text-5xl font-black text-white tracking-[0.2em] uppercase leading-tight drop-shadow-2xl text-glow"
        >
          Observatorio Ambiental Regional (OAR)
        </motion.h1>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
          }}
          className="text-lg md:text-2xl font-bold text-emerald-400/90 tracking-[0.2em] md:tracking-[0.3em] uppercase"
        >
          Centroamérica y República Dominicana
        </motion.div>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
          }}
          className="text-white/80 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto border-l-2 border-emerald-500/30 pl-6 md:pl-8 text-left"
        >
          Nuestra región está viva y su latido se siente en cada bosque, río y océano. La Comisión Centroamericana de Ambiente y Desarrollo (CCAD) te da la bienvenida al OAR, tu espacio interactivo para explorar, comprender y tomar el pulso de los ecosistemas que compartimos.
        </motion.p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mt-8">
          <motion.button
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartConnection}
            className="px-8 py-4 md:px-14 md:py-5 bg-transparent hover:bg-emerald-500 text-white hover:text-[#021226] border-2 border-emerald-500 rounded-full font-black text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.4em] transition-all duration-500 hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] shadow-emerald-500/20"
            style={{ animation: 'glow-pulse 3s infinite' }}
          >
            Prototipo
          </motion.button>
          <motion.button
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = "https://web-production-9d135.up.railway.app/viewer/"}
            className="px-8 py-4 md:px-14 md:py-5 bg-transparent hover:bg-emerald-500 text-white hover:text-[#021226] border-2 border-emerald-500 rounded-full font-black text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.4em] transition-all duration-500 hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] shadow-emerald-500/20"
            style={{ animation: 'glow-pulse 3s infinite' }}
          >
            Prueba de concepto
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
