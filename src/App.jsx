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
import { ForestReport } from './pages/technical/ForestReport';
import { StrategicFAQ } from './pages/institutional/StrategicFAQ';
import { StrategicAxisHome } from './pages/institutional/StrategicAxisHome';
import { StrategicAxisGeneric } from './pages/institutional/StrategicAxisGeneric';
import { StrategicConsultantLayout } from './pages/institutional/StrategicConsultantLayout';
import { GFWReport } from './pages/technical/GFWReport';
import { BioReport } from './pages/technical/BioReport';
import { GBIFDashboard } from './pages/technical/GBIFDashboard';
import { ProtectedPlanetDashboard } from './pages/technical/ProtectedPlanetDashboard';
import { FiresDashboard } from './pages/technical/FiresDashboard';
import { ClimateDashboard } from './pages/technical/ClimateDashboard';
import { WaterDashboard } from './pages/technical/WaterDashboard';
import { OceanDashboard } from './pages/technical/OceanDashboard';
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

// Protect Routes wrapper
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};

// Initialize from localStorage to persist session
function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('oar_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('oar_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
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

            <Route path="/strategic-questions" element={<StrategicFAQ />} />
            <Route path="/technical/reports/fra-2024" element={
              <ProtectedRoute user={user}>
                <ForestReport />
              </ProtectedRoute>
            } />
            <Route path="/technical/reports/gfw" element={<ProtectedRoute user={user}><GFWReport /></ProtectedRoute>} />
            <Route path="/technical/reports/biodiversity" element={<ProtectedRoute user={user}><BioReport /></ProtectedRoute>} />
            <Route path="/technical/reports/gbif" element={<ProtectedRoute user={user}><GBIFDashboard /></ProtectedRoute>} />
            <Route path="/technical/reports/protected-planet" element={<ProtectedRoute user={user}><ProtectedPlanetDashboard /></ProtectedRoute>} />
            <Route path="/technical/reports/fires" element={<ProtectedRoute user={user}><FiresDashboard /></ProtectedRoute>} />
            <Route path="/technical/reports/climate" element={<ProtectedRoute user={user}><ClimateDashboard /></ProtectedRoute>} />
            <Route path="/technical/reports/water" element={<ProtectedRoute user={user}><WaterDashboard /></ProtectedRoute>} />
            <Route path="/technical/reports/ocean" element={<ProtectedRoute user={user}><OceanDashboard /></ProtectedRoute>} />
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
