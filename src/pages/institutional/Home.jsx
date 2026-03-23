import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { ViewGuideModal } from '../../components/ui/Shared';
import { getEramAxes } from '../../lib/eram';

// Data imports
import { QUESTIONS_DATA } from '../../data/questions';
import CIFRAS_DATA from '../../data/cifras.json';
import { DOCUMENTATION_DATA } from '../../data/documentation';

// Section imports
import { IntroScreen } from './sections/IntroScreen';
import { NavigatorSection } from './sections/NavigatorSection';
import { PreguntasSection } from './sections/PreguntasSection';
import { CifrasSection } from './sections/CifrasSection';
import { MonitoreoSection } from './sections/MonitoreoSection';
import { EjesSection } from './sections/EjesSection';
import { ReportesSection } from './sections/ReportesSection';
import { AnaliticaSection } from './sections/AnaliticaSection';
import { GeoSection } from './sections/GeoSection';
import { VisorSection } from './sections/VisorSection';
import { DocsSection } from './sections/DocsSection';
import { AudienceSection } from './sections/AudienceSection';

export const Home = () => {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState('decision');
  const [isActiveMap, setIsActiveMap] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [initParticles, setInitParticles] = useState(false);
  const axes = getEramAxes();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInitParticles(true);
    });
  }, []);

  // Filter questions for the home page cards
  const homeQuestions = QUESTIONS_DATA.filter(q =>
    ['forest-loss', 'active-fires', 'drought-risk', 'conservation-30x30', 'water-security', 'ocean-health'].includes(q.id)
  );

  // Get 6 random figures from the data
  const randomCifras = React.useMemo(() => {
    return [...CIFRAS_DATA]
      // eslint-disable-next-line react-hooks/purity
      .sort(() => 0.5 - Math.random())
      .slice(0, 6);
  }, []);

  // Listen for messages from the Navigator Iframe
  React.useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === 'oar-open-guide') {
        setIsGuideOpen(true);
      } else if (event.data === 'oar-scroll-down') {
        const content = document.getElementById('preguntas');
        if (content) content.scrollIntoView({ behavior: 'smooth' });
      } else if (event.data === 'oar-scroll-up') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleStartConnection = () => {
    const introElem = document.getElementById('intro-screen');
    if (introElem) introElem.style.opacity = '0';
    setTimeout(() => setShowIntro(false), 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-emerald-500 selection:text-white">
      <style>{`
        @keyframes blob-drift {
          0%, 100% { transform: translate(0, 0) scale(1) }
          33% { transform: translate(30px, -50px) scale(1.1) }
          66% { transform: translate(-20px, 20px) scale(0.9) }
        }
        @keyframes mesh-drift {
          from { background-position: 0% 0% }
          to { background-position: 100% 100% }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 10px rgba(16,185,129,0.2) }
          50% { box-shadow: 0 0 40px rgba(16,185,129,0.6) }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) }
          50% { transform: translateY(-10px) }
        }
        @keyframes gradient-move {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        .text-glow {
          text-shadow: 0 0 20px rgba(16,185,129,0.3);
        }
      `}</style>
      <AnimatePresence>
        {showIntro && (
          <IntroScreen 
            key="intro" 
            showIntro={showIntro} 
            handleStartConnection={handleStartConnection} 
            initParticles={initParticles} 
          />
        )}
      </AnimatePresence>
      
      <NavigatorSection />

      <PreguntasSection questions={homeQuestions} navigate={navigate} />

      <CifrasSection cifras={randomCifras} navigate={navigate} />

      <MonitoreoSection navigate={navigate} />

      <EjesSection axes={axes} navigate={navigate} />

      <ReportesSection navigate={navigate} />

      <AnaliticaSection navigate={navigate} />

      <GeoSection navigate={navigate} />

      <VisorSection isActiveMap={isActiveMap} setIsActiveMap={setIsActiveMap} navigate={navigate} />

      <DocsSection documents={DOCUMENTATION_DATA.slice(0, 3)} navigate={navigate} />

      <AudienceSection activeRole={activeRole} setActiveRole={setActiveRole} navigate={navigate} />

      {/* Footer Divider / Context */}
      <div className="max-w-7xl mx-auto px-8 pb-4 mt-6 mb-4">
        <div className="border-t border-slate-200 py-4 text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
          Observatorio Ambiental Regional (OAR) • Estrategia Regional Ambiental de Centroamérica y República Dominicana
        </div>
      </div>

      <ViewGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </div>
  );
};
