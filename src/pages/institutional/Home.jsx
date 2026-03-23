import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const axes = getEramAxes();

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
    <div className="flex flex-col min-h-screen bg-white">
      <IntroScreen showIntro={showIntro} handleStartConnection={handleStartConnection} />
      
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
