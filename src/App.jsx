import React, { useState } from 'react';
import { Wind, Waves, Droplets, CloudRain } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/institutional/Home';
import { GrandesBosques } from './pages/institutional/GrandesBosques';
import { ForestStoryDetail } from './pages/institutional/ForestStoryDetail';
import { Login } from './pages/auth/Login';
import { Dashboard } from './pages/technical/Dashboard';
import { MapExplorer } from './pages/technical/MapExplorer';
import { MapComparator } from './pages/technical/MapComparator';
import { DocCenter } from './pages/technical/DocCenter';
import { Developers } from './pages/technical/Developers';
import { StrategicAxisHome } from './pages/institutional/StrategicAxisHome';
import { StrategicAxisGeneric } from './pages/institutional/StrategicAxisGeneric';
import { StrategicConsultantLayout } from './pages/institutional/StrategicConsultantLayout';
import { AnalysisSandbox } from './pages/technical/analisis_multidimensional/AnalysisSandbox';
import { QuestionsIndex } from './pages/questions/QuestionsIndex';
import { AnswerForestState } from './pages/questions/answers/AnswerForestState';
import { AnswerForestLoss } from './pages/questions/answers/AnswerForestLoss';
import { AnswerConservation30x30 } from './pages/questions/answers/AnswerConservation30x30';
import { AnswerSpeciesRecords } from './pages/questions/answers/AnswerSpeciesRecords';
import { AnswerProtectedAreas } from './pages/questions/answers/AnswerProtectedAreas';
import { AnswerActiveFires } from './pages/questions/answers/AnswerActiveFires';
import { AnswerDroughtRisk } from './pages/questions/answers/AnswerDroughtRisk';
import { AnswerWaterSecurity } from './pages/questions/answers/AnswerWaterSecurity';
import { AnswerOceanHealth } from './pages/questions/answers/AnswerOceanHealth';
import { MapHub } from './pages/technical/MapHub';
import { MapConsultantLayout } from './pages/technical/MapConsultantLayout';
import { Chatbot } from './components/ai/Chatbot';
import { GeoAnalysisLayout } from './pages/technical/GeoAnalysisLayout';
import { GeoAnalysisHome } from './pages/technical/GeoAnalysisHome';
import { GeoAnalysisGeneric } from './pages/technical/GeoAnalysisGeneric';
import { ShieldAlert, Activity, Layers, Briefcase } from 'lucide-react';

// Component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};


const Layout = ({ user, sidebarOpen, setSidebarOpen, onLogout }) => {
  const location = useLocation();
  const isTechnical = location.pathname.startsWith('/technical') || 
                     location.pathname === '/strategic-questions' || 
                     location.pathname.startsWith('/grandes-bosques') ||
                     location.pathname.startsWith('/strategic-axis') ||
                     location.pathname.startsWith('/technical/geo-analysis');
  
  // Auto-hide sidebar logic for Strategic Axes & Analysis
  React.useEffect(() => {
    if (location.pathname.startsWith('/strategic-axis') || location.pathname.startsWith('/technical/geo-analysis')) {
      setSidebarOpen(true);
      const timer = setTimeout(() => {
        setSidebarOpen(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, setSidebarOpen]);

  const isMap = (location.pathname === '/technical/map' || location.pathname === '/technical/map-comparator' || location.pathname === '/technical/maps') && user;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar user={user} onLogout={onLogout} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} isSidebarVisible={isTechnical} />

      <div className="flex flex-1 relative">
        {isTechnical && user && (
          <Sidebar isOpen={sidebarOpen} />
        )}

        <main className={`flex-1 transition-all duration-300 ${(isTechnical && user && sidebarOpen) ? 'lg:ml-64' : ''} ${isMap ? 'h-[calc(100vh-64px)] overflow-hidden' : ''}`}>
          <Outlet />
        </main>
      </div>

      {!isTechnical && <Footer />}

      {/* Global AI Chatbot */}
      <Chatbot />
    </div>
  );
};

// Protect Routes wrapper (Modificado temporalmente para acceso público)
const ProtectedRoute = ({ user, children }) => {
  // if (!user) {
  //   return <Navigate to="/auth/login" replace />;
  // }
  return children;
};

// Initialize from localStorage to persist session
function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('oar_user');
    // Si no hay usuario, retornamos un perfil público por defecto para habilitar interfaces
    return saved ? JSON.parse(saved) : { name: "Invitado", role: "public" };
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('oar_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    // Al cerrar sesión, retornar al usuario invitado en lugar de null para evitar bloqueo
    setUser({ name: "Invitado", role: "public" });
    localStorage.removeItem('oar_user');
  };

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout user={user} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} onLogout={handleLogout} />}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/grandes-bosques" element={<GrandesBosques />} />
          <Route path="/grandes-bosques/historias/:slug" element={<ForestStoryDetail />} />
          <Route path="/auth/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/analisis-multidimensional" element={<AnalysisSandbox />} />

          <Route path="/auth/login" element={<Login onLogin={handleLogin} />} />

          {/* Technical Routes (Protected) */}
          <Route path="/technical/dashboard" element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          } />
          {/* Map Viewers Module wrapped in Consultant Layout */}
          <Route element={<MapConsultantLayout />}>
            <Route path="/technical/maps" element={<MapHub />} />
            <Route path="/technical/map" element={
              <ProtectedRoute user={user}>
                <MapExplorer />
              </ProtectedRoute>
            } />
            <Route path="/technical/map-comparator" element={
              <ProtectedRoute user={user}>
                <MapComparator />
              </ProtectedRoute>
            } />
          </Route>

          <Route path="/technical/docs" element={
            <ProtectedRoute user={user}>
              <DocCenter />
            </ProtectedRoute>
          } />
          <Route path="/technical/developers" element={
            <ProtectedRoute user={user}>
              <Developers />
            </ProtectedRoute>
          } />

          {/* Strategic Questions Module wrapped in Consultant Layout */}
          <Route element={<StrategicConsultantLayout />}>
            {/* ERAM Strategic Axes Hubs */}
            <Route path="/strategic-axis/calidad" element={<StrategicAxisGeneric 
                axisTitle="Calidad Ambiental" 
                axisLine="1" 
                axisColor="blue" 
                axisIcon={Wind}
                description="Calidad de aire/agua, presión antrópica y variables de seguimiento ambiental."
            />} />
            <Route path="/strategic-axis/mares" element={<StrategicAxisGeneric 
                axisTitle="Mares y Biodiversidad" 
                axisLine="2" 
                axisColor="cyan" 
                axisIcon={Waves}
                description="Biodiversidad, ecosistemas marino-costeros y conectividad ecológica."
            />} />
            <Route path="/strategic-axis/agua" element={<StrategicAxisGeneric 
                axisTitle="Gestión Integral del Recurso Hídrico" 
                axisLine="3" 
                axisColor="blue" 
                axisIcon={Droplets}
                description="Cuencas, disponibilidad hídrica, presión y riesgos asociados al agua."
            />} />
            <Route path="/strategic-axis/bosques" element={<StrategicAxisHome axisLine="4" />} />
            <Route path="/strategic-axis/clima" element={<StrategicAxisGeneric 
                axisTitle="Cambio Climático y Gestión de Riesgo" 
                axisLine="5" 
                axisColor="purple" 
                axisIcon={CloudRain}
                description="Amenazas, vulnerabilidad, escenarios climáticos y alertas tempranas."
            />} />

            <Route path="/strategic-questions" element={<QuestionsIndex />} />
            <Route path="/preguntas" element={<QuestionsIndex />} />
            
            {/* New Clean Clean Paths for Questions */}
            <Route path="/preguntas/estado-bosques" element={<ProtectedRoute user={user}><AnswerForestState /></ProtectedRoute>} />
            <Route path="/preguntas/perdida-bosque" element={<ProtectedRoute user={user}><AnswerForestLoss /></ProtectedRoute>} />
            <Route path="/preguntas/meta-30x30" element={<ProtectedRoute user={user}><AnswerConservation30x30 /></ProtectedRoute>} />
            <Route path="/preguntas/incendios-activos" element={<ProtectedRoute user={user}><AnswerActiveFires /></ProtectedRoute>} />
            <Route path="/preguntas/registros-especies" element={<ProtectedRoute user={user}><AnswerSpeciesRecords /></ProtectedRoute>} />
            <Route path="/preguntas/riesgo-sequia" element={<ProtectedRoute user={user}><AnswerDroughtRisk /></ProtectedRoute>} />
            <Route path="/preguntas/seguridad-hidrica" element={<ProtectedRoute user={user}><AnswerWaterSecurity /></ProtectedRoute>} />
            <Route path="/preguntas/salud-oceanos" element={<ProtectedRoute user={user}><AnswerOceanHealth /></ProtectedRoute>} />
            <Route path="/preguntas/areas-protegidas" element={<ProtectedRoute user={user}><AnswerProtectedAreas /></ProtectedRoute>} />

            {/* Backwards Compatibility Routes */}
            <Route path="/technical/reports/fra-2024" element={<ProtectedRoute user={user}><AnswerForestState /></ProtectedRoute>} />
            <Route path="/technical/reports/gfw" element={<ProtectedRoute user={user}><AnswerForestLoss /></ProtectedRoute>} />
            <Route path="/technical/reports/biodiversity" element={<ProtectedRoute user={user}><AnswerConservation30x30 /></ProtectedRoute>} />
            <Route path="/technical/reports/gbif" element={<ProtectedRoute user={user}><AnswerSpeciesRecords /></ProtectedRoute>} />
            <Route path="/technical/reports/protected-planet" element={<ProtectedRoute user={user}><AnswerProtectedAreas /></ProtectedRoute>} />
            <Route path="/technical/reports/fires" element={<ProtectedRoute user={user}><AnswerActiveFires /></ProtectedRoute>} />
            <Route path="/technical/reports/climate" element={<ProtectedRoute user={user}><AnswerDroughtRisk /></ProtectedRoute>} />
            <Route path="/technical/reports/water" element={<ProtectedRoute user={user}><AnswerWaterSecurity /></ProtectedRoute>} />
            <Route path="/technical/reports/ocean" element={<ProtectedRoute user={user}><AnswerOceanHealth /></ProtectedRoute>} />
          </Route>

          {/* Geoespacial Analysis Module wrapped in its own layout */}
          <Route element={<ProtectedRoute user={user}><GeoAnalysisLayout /></ProtectedRoute>}>
            <Route path="/technical/geo-analysis" element={<GeoAnalysisHome />} />
            <Route path="/technical/geo-analysis/restrictions" element={
              <GeoAnalysisGeneric 
                title="Restricciones de Conservación"
                icon={ShieldAlert}
                description="Identificación de polígonos con restricciones legales por áreas protegidas, zonas de amortiguamiento y corredores biológicos regionales."
                pythonFunction="check_conservation_restrictions"
                layers={["WDPA Protected Areas", "Corredores Biológicos SICA", "Zonificación Legal"]}
                uses={[
                  "Evaluación de viabilidad para nuevos proyectos de infraestructura.",
                  "Monitoreo de cumplimiento en zonas de amortiguamiento.",
                  "Identificación de traslapes en áreas de importancia regional."
                ]}
              />
            } />
            <Route path="/technical/geo-analysis/deforestation" element={
              <GeoAnalysisGeneric 
                title="Detección de Deforestación"
                icon={Activity}
                description="Análisis de series temporales para verificar si el área seleccionada proviene de una zona con deforestación reciente (2020-2024)."
                pythonFunction="detect_deforestation_history"
                layers={["GFW Tree Cover Loss", "Mapa Cobertura Bosques (CNIG)", "Alertas GLAD"]}
                uses={[
                  "Verificación de legalidad en cadenas de suministro agroforestales.",
                  "Detección temprana de focos de tala ilegal transfronteriza.",
                  "Análisis de recuperación de cobertura post-incendios."
                ]}
              />
            } />
            <Route path="/technical/geo-analysis/ecosystems" element={
              <GeoAnalysisGeneric 
                title="Análisis de Ecosistemas"
                icon={Layers}
                description="Identificación de la composición de ecosistemas y unidades de vegetación presentes dentro del perímetro seleccionado."
                pythonFunction="get_ecosystem_inventory"
                layers={["Mapa Regional de Ecosistemas", "Densidad de Biodiversidad (GBIF)", "Variables Bioclimáticas"]}
                uses={[
                  "Diseño de planes de manejo basados en biodiversidad local.",
                  "Identificación de especies clave para restauración ecológica.",
                  "Evaluación de servicios ecosistémicos y resiliencia climática."
                ]}
              />
            } />
            <Route path="/technical/geo-analysis/projects" element={
              <GeoAnalysisGeneric 
                title="Cruce de Proyectos"
                icon={Briefcase}
                description="Visualización de proyectos de cooperación técnica y desarrollo sostenible que inciden en el área geográfica de interés."
                pythonFunction="query_active_projects"
                layers={["Base Datos DIPE", "Mapa Cooperación SICA", "Actores en Territorio"]}
                uses={[
                  "Coordinación de agencias de cooperación en zonas críticas.",
                  "Identificación de sinergias entre proyectos concurrentes.",
                  "Seguimiento geográfico de la inversión regional sostenible."
                ]}
              />
            } />
          </Route>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
