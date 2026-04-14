# OAR SICA — Stack Técnico Completo

> **Documento complementario a:** `INSUMO/OAR_Gobernanza_Arquitectura_Stack.docx`
>
> Este documento detalla, desde el código fuente, la arquitectura técnica real del prototipo del Observatorio Ambiental Regional (OAR) del SICA. Cada sección está respaldada por archivos verificables en el repositorio.

---

## 1. Resumen Ejecutivo del Stack

| Capa | Tecnología | Versión | Archivo de Referencia |
|---|---|---|---|
| **Runtime** | Node.js | 20 (Alpine) | `Dockerfile` |
| **Framework UI** | React | 19.2.0 | `package.json` |
| **Bundler** | Vite | 7.2.4 | `vite.config.js` |
| **Estilos** | Tailwind CSS | 4.1.18 | `tailwind.config.js` |
| **Enrutamiento** | React Router DOM | 7.13.0 | `src/App.jsx` |
| **Mapas** | Leaflet + React-Leaflet | 1.9.4 / 5.0.0 | `src/components/map/` |
| **Gráficos** | Recharts | 3.7.0 | `src/components/dashboard/Charts.jsx` |
| **Animaciones** | Framer Motion | 12.38.0 | Uso global en páginas |
| **3D** | Three.js + React Three Fiber | 0.183.2 / 9.5.0 | `src/components/home/Hero3D.jsx` |
| **Iconos** | Lucide React | 0.563.0 | Uso global en componentes |
| **Servidor Prod** | Nginx (Alpine) | stable | `Dockerfile` |
| **PaaS** | Railway | — | `Dockerfile` (CMD dinámico `$PORT`) |
| **Linter** | ESLint | 9.39.1 | `eslint.config.js` |

---

## 2. Dependencias Completas

### 2.1 Dependencias de Producción

```json
{
  "@phosphor-icons/react": "^2.1.10",
  "@react-three/drei": "^10.7.7",
  "@react-three/fiber": "^9.5.0",
  "@tsparticles/react": "^3.0.0",
  "@tsparticles/slim": "^3.9.1",
  "clsx": "^2.1.1",
  "framer-motion": "^12.38.0",
  "leaflet": "^1.9.4",
  "lucide-react": "^0.563.0",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-leaflet": "^5.0.0",
  "react-markdown": "^10.1.0",
  "react-router-dom": "^7.13.0",
  "recharts": "^3.7.0",
  "tailwind-merge": "^3.4.0",
  "three": "^0.183.2"
}
```

**Propósito de cada dependencia:**

| Paquete | Rol en el OAR |
|---|---|
| `@phosphor-icons/react` | Iconografía alternativa a Lucide en secciones específicas |
| `@react-three/drei` + `fiber` | Escena 3D del Hero de la página principal (globo terráqueo interactivo) |
| `@tsparticles/react` + `slim` | Efectos de partículas en backgrounds de secciones institucionales |
| `clsx` + `tailwind-merge` | Composición condicional de clases CSS vía la función utilitaria `cn()` |
| `framer-motion` | Animaciones de entrada/salida, transiciones de página, micro-interacciones |
| `leaflet` + `react-leaflet` | Visor geoespacial interactivo, mini-mapas, comparador split |
| `lucide-react` | Sistema de iconos principal (>50 iconos usados en toda la plataforma) |
| `react-markdown` | Renderizado de contenido markdown en reportes y documentación |
| `recharts` | Gráficos de barras, líneas, áreas y pie charts en dashboards y reportes |
| `three` | Motor 3D subyacente para WebGL (Hero3D, visualizaciones avanzadas) |

### 2.2 Dependencias de Desarrollo

| Paquete | Rol |
|---|---|
| `@tailwindcss/postcss` | Plugin PostCSS para compilación de Tailwind v4 |
| `@vitejs/plugin-react` | Soporte JSX/Fast Refresh en Vite |
| `autoprefixer` | Prefijos CSS automáticos para compatibilidad cross-browser |
| `eslint` + plugins | Linting de código con reglas para React Hooks y Fast Refresh |
| `postcss` | Pipeline de transformación CSS |
| `tailwindcss` | Framework CSS utility-first |
| `vite` | Bundler y dev server con HMR |

---

## 3. Arquitectura de Archivos

```
prototipo_oar/
├── Dockerfile                          # Build multi-stage (deps → build → nginx)
├── package.json                        # Manifiesto del proyecto
├── vite.config.js                      # Configuración de Vite
├── tailwind.config.js                  # Design tokens (colores, tipografías)
├── postcss.config.js                   # Pipeline CSS (Tailwind + Autoprefixer)
├── eslint.config.js                    # Reglas de linting
├── index.html                          # Entry point HTML (SPA)
│
├── INSUMO/                             # Documentos fuente y referencias
│   ├── OAR_Gobernanza_Arquitectura_Stack.docx
│   ├── Pruebas de Concepto.pdf
│   ├── ERAM 2021-2025 version español FINAL WEB-44-55.pdf
│   ├── Matriz de Indicadores Estrategicos.pdf
│   ├── indicadores_fixed.csv           # Matriz de indicadores en formato tabular
│   ├── Documentacions_APIs.md
│   └── ...
│
├── markdown/                           # Documentación técnica generada
│   ├── estandar.md                     # Estándares de productos de datos
│   └── stack.md                        # ← ESTE DOCUMENTO
│
├── proceso/                            # Documentación de proceso y licitación
│   ├── fases.md
│   └── licitacion/
│       ├── 04_analisis_geoespacial.md
│       └── 05_visores_mapas.md
│
├── public/                             # Assets estáticos (servidos por Nginx)
│   ├── forests/                        # Imágenes de países y puentes ecológicos
│   │   ├── guatemala.png ... panama.png
│   │   └── bridge_selva_maya.png ...
│   ├── data_csv/                       # Datasets CSV públicos
│   │   └── inventarios_forestales.csv  # 2,133 registros de inventarios regionales
│   ├── assets/                         # Assets adicionales
│   ├── navegador.html                  # Navegador 3D independiente (CesiumJS)
│   ├── ca_dr_silhouette.png            # Silueta cartográfica CA+RD
│   └── ca_dr_hologram.png              # Efecto holograma del mapa regional
│
├── skills/                             # Skills de IA para desarrollo asistido
│   └── analisis_geo.md
│
└── src/                                # CÓDIGO FUENTE PRINCIPAL
    ├── main.jsx                        # Entry point React (ReactDOM.createRoot)
    ├── App.jsx                         # Router principal + Layout
    ├── App.css                         # Estilos mínimos de App
    ├── index.css                       # Estilos globales + animaciones + Tailwind
    │
    ├── api/                            # Capa de abstracción de APIs (vacía, preparada)
    │
    ├── lib/                            # Utilidades compartidas
    │   ├── utils.js                    # Función cn() → clsx + tailwind-merge
    │   └── eram.js                     # Helpers ERAM: getEramAxes(), getAxisColor()
    │
    ├── data/                           # Capa de datos (fuente de verdad del frontend)
    │   ├── axes.json                   # 5 ejes ERAM con colores, iconos y rutas
    │   ├── cifras.json                 # ~240KB de indicadores estadísticos regionales
    │   ├── questions.js                # 9 preguntas estratégicas con metadata
    │   ├── constants.js                # Coordenadas geográficas de los 8 países SICA
    │   ├── datasets.config.js          # Configuración de datasets para análisis cruzado
    │   ├── mockData.js                 # KPIs, capas de mapa, catálogo API, documentos
    │   ├── indicators.js               # Indicadores detallados con fuentes y métodos
    │   ├── eramForest.js               # Datos específicos del eje Bosques (ERAM Línea 4)
    │   ├── sicaDataProcessed.js        # Datos procesados GFW/SICA por país
    │   ├── documentation.js            # Catálogo de documentos técnicos
    │   ├── viewGuides.json             # Guías contextuales de navegación
    │   └── ai_context.json             # ~924KB contexto completo para IA
    │
    ├── assets/                         # Assets importados por Vite (con hash)
    │
    ├── components/                     # Componentes reutilizables
    │   ├── ui/                         # Sistema de diseño base
    │   │   ├── Shared.jsx              # Button, Card, Badge, Input, Select, etc.
    │   │   ├── GlobalSearch.jsx         # Buscador global con fuzzy matching
    │   │   └── ViewGuideModal.jsx       # Modal de guía contextual
    │   ├── layout/                     # Estructura de página
    │   │   ├── Navbar.jsx              # Barra de navegación principal
    │   │   ├── Sidebar.jsx             # Panel lateral técnico (collapsible)
    │   │   ├── Footer.jsx              # Pie de página institucional
    │   │   └── SitemapModal.jsx         # Mapa de sitio interactivo (modal)
    │   ├── map/                        # Módulo geoespacial
    │   │   ├── MapViewer.jsx           # Visor principal Leaflet
    │   │   ├── LayerControl.jsx         # Control de capas (toggle, leyenda)
    │   │   ├── MiniMap.jsx              # Mini-mapa de contexto
    │   │   ├── SplitMap.jsx             # Comparador lado a lado
    │   │   └── TimeSlider.jsx           # Slider temporal para series
    │   ├── dashboard/                  # Componentes de dashboard
    │   │   ├── KpiCards.jsx             # Tarjetas de indicadores clave
    │   │   ├── Charts.jsx               # Gráficos Recharts configurados
    │   │   └── FilterBar.jsx            # Barra de filtros (país, año, eje)
    │   ├── home/
    │   │   └── Hero3D.jsx               # Escena Three.js (globo interactivo)
    │   ├── monitoring/
    │   │   └── RegionalChart.jsx        # Gráfico regional para monitoreo
    │   ├── ai/
    │   │   └── Chatbot.jsx              # Asistente IA contextual (~30KB)
    │   └── docs/
    │       └── DocSearch.jsx            # Buscador de documentación técnica
    │
    └── pages/                          # Páginas (vistas de ruta)
        ├── auth/
        │   └── Login.jsx                # Autenticación (actualmente bypass público)
        ├── institutional/              # Módulo institucional / público
        │   ├── Home.jsx                 # Página principal con IntroScreen
        │   ├── QuienesSomos.jsx         # Página "Quiénes Somos"
        │   ├── GrandesBosques.jsx       # Narrativa "Grandes Bosques"
        │   ├── ForestStoryDetail.jsx    # Detalle de historia por país
        │   ├── StrategicAxisHome.jsx     # Hub principal de ejes ERAM
        │   ├── StrategicAxisGeneric.jsx  # Página genérica por eje temático
        │   ├── StrategicConsultantLayout.jsx  # Layout consultor estratégico
        │   └── sections/               # 12 secciones modulares del Home
        │       ├── IntroScreen.jsx
        │       ├── PreguntasSection.jsx
        │       ├── CifrasSection.jsx
        │       ├── EjesSection.jsx
        │       ├── ReportesSection.jsx
        │       ├── AnaliticaSection.jsx
        │       ├── GeoSection.jsx
        │       ├── VisorSection.jsx
        │       ├── MonitoreoSection.jsx
        │       ├── DocsSection.jsx
        │       ├── AudienceSection.jsx
        │       └── NavigatorSection.jsx
        ├── questions/                  # Módulo de preguntas estratégicas
        │   ├── QuestionsIndex.jsx       # Índice de las 9 preguntas
        │   └── answers/                # 9 reportes temáticos (componentes React)
        │       ├── AnswerForestState.jsx       # FRA 2024 - Estado de Bosques
        │       ├── AnswerForestLoss.jsx        # GFW - Pérdida de Cobertura
        │       ├── AnswerConservation30x30.jsx # Meta 30x30
        │       ├── AnswerSpeciesRecords.jsx    # GBIF - Registros de Especies
        │       ├── AnswerProtectedAreas.jsx    # Protected Planet
        │       ├── AnswerActiveFires.jsx       # NASA FIRMS - Incendios
        │       ├── AnswerDroughtRisk.jsx       # Open-Meteo - Sequía
        │       ├── AnswerWaterSecurity.jsx     # Seguridad Hídrica
        │       └── AnswerOceanHealth.jsx       # NOAA - Salud Oceánica
        ├── data/
        │   └── CifrasCenter.jsx         # Centro de cifras e indicadores
        ├── cifras/                     # (Módulo de cifras adicional)
        ├── monitoring/                 # Módulo de monitoreo
        │   ├── MonitoringPortal.jsx     # Portal principal de monitoreo
        │   ├── StrategicMonitoring.jsx  # Monitoreo estratégico (~38KB)
        │   └── OperationalMonitoring.jsx # Monitoreo operacional (~49KB)
        └── technical/                  # Módulo técnico / avanzado
            ├── Dashboard.jsx            # Dashboard ejecutivo
            ├── MapHub.jsx               # Hub de mapas
            ├── MapExplorer.jsx          # Visor principal
            ├── MapComparator.jsx        # Comparador de mapas
            ├── MapConsultantLayout.jsx   # Layout consultor de mapas
            ├── DocCenter.jsx            # Centro de documentación
            ├── Developers.jsx           # Portal de desarrolladores (APIs)
            ├── SitemapIndependent.jsx    # Mapa de sitio completo (~36KB)
            ├── GeoAnalysisHome.jsx       # Home de análisis geoespacial
            ├── GeoAnalysisLayout.jsx     # Layout de análisis geo
            ├── GeoAnalysisGeneric.jsx    # Motor genérico de análisis cruzado
            └── analisis_multidimensional/
                └── AnalysisSandbox.jsx   # Sandbox de análisis multidimensional
```

---

## 4. Arquitectura de la Aplicación

### 4.1 Patrón Arquitectónico

La aplicación sigue un patrón **SPA (Single Page Application)** con:

- **Component-Based Architecture**: Componentes React funcionales con Hooks.
- **Layout Composition**: Layouts anidados via `<Outlet />` de React Router.
- **Data-Driven UI**: La interfaz se genera dinámicamente desde archivos JSON/JS en `src/data/`.

```
┌─────────────────────────────────────────────────────────┐
│                     BrowserRouter                        │
│  ┌───────────────────────────────────────────────────┐  │
│  │                    Layout                          │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │  Navbar (siempre visible)                    │  │  │
│  │  ├─────────────────────────────────────────────┤  │  │
│  │  │  ┌──────────┐  ┌──────────────────────────┐ │  │  │
│  │  │  │ Sidebar  │  │       <Outlet />          │ │  │  │
│  │  │  │(técnico) │  │  ┌──────────────────────┐ │ │  │  │
│  │  │  │          │  │  │  ConsultantLayout    │ │ │  │  │
│  │  │  │          │  │  │  ┌────────────────┐  │ │ │  │  │
│  │  │  │          │  │  │  │   Page View    │  │ │ │  │  │
│  │  │  │          │  │  │  └────────────────┘  │ │ │  │  │
│  │  │  │          │  │  └──────────────────────┘ │ │  │  │
│  │  │  └──────────┘  └──────────────────────────┘ │  │  │
│  │  ├─────────────────────────────────────────────┤  │  │
│  │  │  Footer (solo rutas institucionales)         │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │  Chatbot (floating, siempre disponible)      │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 4.2 Gestión de Estado

- **No se utiliza Redux ni Zustand.** El estado se maneja con `useState` y `useEffect` nativos de React.
- **Persistencia de sesión:** `localStorage` con clave `oar_user`.
- **Estado del usuario por defecto:** `{ name: "Invitado", role: "public" }` — las rutas protegidas están actualmente deshabilitadas (`ProtectedRoute` es un passthrough).
- **Estado del sidebar:** Controlado en `App.jsx` y propagado via props a `Layout`.

---

## 5. Sistema de Enrutamiento

### 5.1 Mapa de Rutas Completo

El enrutamiento está definido en `src/App.jsx` usando React Router DOM v7.

#### Rutas Públicas

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `Home` | Página principal con IntroScreen y 12 secciones |
| `/quienes-somos` | `QuienesSomos` | Información institucional |
| `/grandes-bosques` | `GrandesBosques` | Narrativa "Grandes Bosques" |
| `/grandes-bosques/historias/:slug` | `ForestStoryDetail` | Detalle de historia por país |
| `/auth/login` | `Login` | Formulario de autenticación |
| `/analisis-multidimensional` | `AnalysisSandbox` | Sandbox de análisis cruzado |
| `/data/cifras` | `CifrasCenter` | Centro de indicadores estadísticos |
| `/monitoring` | `MonitoringPortal` | Portal de monitoreo |
| `/monitoring/strategic` | `StrategicMonitoring` | Monitoreo estratégico |
| `/monitoring/operational` | `OperationalMonitoring` | Monitoreo operacional |
| `/mapa_sitio_independiente` | `SitemapIndependent` | Mapa de sitio completo |

#### Rutas Técnicas (Protegidas)

| Ruta | Componente | Layout |
|---|---|---|
| `/technical/dashboard` | `Dashboard` | Layout base |
| `/technical/maps` | `MapHub` | `MapConsultantLayout` |
| `/technical/map` | `MapExplorer` | `MapConsultantLayout` |
| `/technical/map-comparator` | `MapComparator` | `MapConsultantLayout` |
| `/technical/docs` | `DocCenter` | Layout base |
| `/technical/developers` | `Developers` | Layout base |

#### Rutas de Ejes Estratégicos (ERAM)

| Ruta | Componente | Layout |
|---|---|---|
| `/strategic-axis/calidad` | `StrategicAxisGeneric` | `StrategicConsultantLayout` |
| `/strategic-axis/mares` | `StrategicAxisGeneric` | `StrategicConsultantLayout` |
| `/strategic-axis/agua` | `StrategicAxisGeneric` | `StrategicConsultantLayout` |
| `/strategic-axis/bosques` | `StrategicAxisHome` | `StrategicConsultantLayout` |
| `/strategic-axis/clima` | `StrategicAxisGeneric` | `StrategicConsultantLayout` |

#### Rutas de Preguntas Estratégicas

| Ruta (canónica) | Ruta (legacy) | Componente |
|---|---|---|
| `/preguntas/estado-bosques` | `/technical/reports/fra-2024` | `AnswerForestState` |
| `/preguntas/perdida-bosque` | `/technical/reports/gfw` | `AnswerForestLoss` |
| `/preguntas/meta-30x30` | `/technical/reports/biodiversity` | `AnswerConservation30x30` |
| `/preguntas/incendios-activos` | `/technical/reports/fires` | `AnswerActiveFires` |
| `/preguntas/registros-especies` | `/technical/reports/gbif` | `AnswerSpeciesRecords` |
| `/preguntas/riesgo-sequia` | `/technical/reports/climate` | `AnswerDroughtRisk` |
| `/preguntas/seguridad-hidrica` | `/technical/reports/water` | `AnswerWaterSecurity` |
| `/preguntas/salud-oceanos` | `/technical/reports/ocean` | `AnswerOceanHealth` |
| `/preguntas/areas-protegidas` | `/technical/reports/protected-planet` | `AnswerProtectedAreas` |

#### Rutas de Análisis Geoespacial

| Ruta | Componente | Función Python Backend |
|---|---|---|
| `/technical/geo-analysis` | `GeoAnalysisHome` | — |
| `/technical/geo-analysis/restrictions` | `GeoAnalysisGeneric` | `check_conservation_restrictions` |
| `/technical/geo-analysis/deforestation` | `GeoAnalysisGeneric` | `detect_deforestation_history` |
| `/technical/geo-analysis/ecosystems` | `GeoAnalysisGeneric` | `get_ecosystem_inventory` |
| `/technical/geo-analysis/projects` | `GeoAnalysisGeneric` | `query_active_projects` |

---

## 6. Capa de Datos

### 6.1 Fuentes de Datos Internas

| Archivo | Tamaño | Contenido | Registros aprox. |
|---|---|---|---|
| `cifras.json` | 240 KB | Indicadores estadísticos por país y eje temático | ~500+ indicadores |
| `questions.js` | 5.5 KB | 9 preguntas estratégicas con metadata completa | 9 |
| `axes.json` | 1.5 KB | 5 ejes ERAM con colores, iconos y rutas | 5 |
| `constants.js` | 858 B | Coordenadas geográficas de los 8 países SICA + región | 9 |
| `datasets.config.js` | 2.1 KB | Configuración de datasets para análisis cruzado | — |
| `mockData.js` | 6.8 KB | KPIs, capas de mapa, catálogo API, documentos | ~30 items |
| `indicators.js` | 18 KB | Indicadores detallados con fuentes y métodos | ~100+ |
| `eramForest.js` | 10 KB | Datos específicos del eje Bosques (Línea 4) | — |
| `sicaDataProcessed.js` | 23 KB | Datos procesados GFW/SICA por país y año | 8 países |
| `documentation.js` | 4.3 KB | Catálogo de documentos técnicos y reportes | ~20 |
| `viewGuides.json` | 14.7 KB | Guías contextuales para cada vista | — |
| `ai_context.json` | 924 KB | Contexto completo del sitio para el asistente IA | Completo |

### 6.2 Datasets Públicos (CSV)

| Archivo | Ubicación | Registros | Columnas |
|---|---|---|---|
| `inventarios_forestales.csv` | `public/data_csv/` | 2,133 | Pais, Inventario Hom, Clave Inv Parcela, Tipo Bosque, Zona de Vida, Suelo IPCC, Area Protegida, Categoría AP, Suelo FAO, Zona Climática, Posición Topográfica, División Administrativa, DAP (cm), ALTURA (m), Densidad (arb/ha), Vol (m3/ha), CO2 (ton/ha) |

### 6.3 Esquemas de Datos Canónicos

#### Pregunta Estratégica (`questions.js`)

```javascript
{
    id: 'forest-state',          // Identificador único (kebab-case)
    icon: Trees,                 // Componente Lucide React (importado)
    question: "¿Cuál es el estado actual de los bosques?",  // Texto completo
    shortQuestion: "¿Estado de los bosques?",               // Versión corta
    description: "Información detallada...",                 // Descripción larga
    highlight: '<p class="...">HTML de resaltado</p>',      // Highlight (HTML string)
    path: "/preguntas/estado-bosques",                      // Ruta canónica
    color: "#059669",                                        // Color hexadecimal
    categories: ["bosques", "biodiversidad"]                 // Array de categorías
}
```

#### Indicador / Cifra (`cifras.json`)

```json
{
    "titulo": "EXTRACCIÓN DE AGUA",
    "valor": "10.2",
    "unidad_medida": "km³/año",
    "bajada": "Volumen anual de agua dulce extraída para uso antropogénico.",
    "fuente": "Aqueduct / WRI",
    "eje_tematico": "Gestión Hídrica",
    "pais": "Regional"
}
```

#### Eje ERAM (`axes.json`)

```json
{
    "id": "bosques",
    "linea": "4",
    "text": "Bosques y Paisajes",
    "color": "#059669",
    "color_secundario": "#ecfdf5",
    "icon": "Trees",
    "ruta": "/strategic-axis/bosques",
    "description": "Conservación de la cobertura forestal..."
}
```

#### País SICA (`constants.js`)

```javascript
{
    "GT": { name: "Guatemala", lat: 15.7835, lon: -90.2308, zoom: 7 },
    // ... 8 países + "regional"
}
```

---

## 7. APIs y Servicios Externos Integrados

Los servicios están documentados en el componente `Developers.jsx` y consumidos directamente en los reportes temáticos (`Answer*.jsx`).

### 7.1 Geoservicios (OGC/SICA)

| Servicio | Proveedor | URL Base | Formato |
|---|---|---|---|
| WMS Regional SICA | CCAD-SICA | `https://mapas.sica.int/geoserver/wms` | image/png, PDF |
| WFS Capas de Bosques | OAR | `https://mapas.sica.int/geoserver/wfs` | GeoJSON, GML, Shapefile |

### 7.2 Biodiversidad y Conservación

| Servicio | Proveedor | URL Base | Formato |
|---|---|---|---|
| WDPA Protected Sites | UNEP-WCMC / IUCN | `https://tiles.unep-wcmc.org/arcgis/.../tile/{z}/{y}/{x}` | Raster Tiles |
| GBIF Occurrence API | GBIF.org | `https://api.gbif.org/v1/occurrence/search` | JSON, Darwin Core |

### 7.3 Clima, Incendios y Océanos

| Servicio | Proveedor | URL Base | Formato |
|---|---|---|---|
| Open-Meteo Forecast | Open-Meteo | `https://api.open-meteo.com/v1/forecast` | JSON |
| NASA FIRMS (Incendios) | NASA/Earthdata | `https://firms.modaps.eosdis.nasa.gov/api/` | CSV, JSON |
| NOAA Coral Bleaching | NOAA / GFW | `https://tiles.globalforestwatch.org/coral_bleaching/{z}/{x}/{y}.png` | Raster Tiles |

### 7.4 Monitoreo Forestal

| Servicio | Proveedor | URL Base | Formato |
|---|---|---|---|
| GFW Tree Cover Loss Tiles | Global Forest Watch | `https://tiles.globalforestwatch.org/umd_tree_cover_loss/latest/dynamic/{z}/{x}/{y}.png` | PNG Tiles |
| Hansen Global Forest Change | UMD / GFW | `https://api.globalforestwatch.org/v2/query` | GeoJSON, JSON |
| FRA 2020/2024 Data | FAO | `https://fra-data.fao.org/api/` | JSON, CSV |

### 7.5 Servicio Externo Integrado

| Servicio | URL | Uso |
|---|---|---|
| Geoportal OAR (Visor) | `https://web-production-9d135.up.railway.app/viewer/` | Enlace desde Análisis de Ecosistemas |

---

## 8. Sistema de Diseño

### 8.1 Paleta de Colores (Design Tokens)

Definida en `tailwind.config.js`:

```javascript
colors: {
    brand: {
        primary: '#1E3A8A',    // Blue 900 — Color institucional principal
        secondary: '#15803D',  // Green 700 — Acento ambiental
    },
    technical: {
        bg: '#F8FAFC',         // Slate 50 — Fondo de módulos técnicos
    },
    alert: {
        fire: '#DC2626',       // Red 600 — Alertas de incendios
    },
}
```

#### Colores por Eje ERAM

| Eje | Color Primario | Color Secundario |
|---|---|---|
| Calidad Ambiental | `#2563eb` (Blue 600) | `#eff6ff` |
| Mares y Biodiversidad | `#0891b2` (Cyan 600) | `#ecfeff` |
| Gestión Hídrica | `#3b82f6` (Blue 500) | `#eff6ff` |
| Bosques y Paisajes | `#059669` (Emerald 600) | `#ecfdf5` |
| Cambio Climático | `#9333ea` (Purple 600) | `#faf5ff` |

### 8.2 Tipografía

```javascript
fontFamily: {
    sans: ['Inter', 'Roboto', 'sans-serif'],       // Cuerpo de texto
    serif: ['Merriweather', 'Playfair Display', 'serif'],  // Títulos editoriales
}
```

### 8.3 Animaciones CSS Globales

Definidas en `src/index.css`:

| Clase | Efecto | Duración |
|---|---|---|
| `.animate-float` | Flotación vertical suave | 6s infinite |
| `.animate-pulse-soft` | Pulso de opacidad y escala | 4s infinite |
| `.animate-reveal` | Entrada desde abajo con fade | 0.8s forwards |
| `.hover-lift` | Elevación al hover (-8px + sombra) | 0.4s ease |
| `.hover-glow` | Brillo verde al hover | 0.3s ease |
| `.glass-card` | Efecto glassmorphism | 0.3s ease |
| `.parallax-container` | Zoom suave al hover (1.1x) | 0.6s ease |
| `.transition-slow` | Transición genérica lenta | 0.6s |
| `.transition-medium` | Transición genérica media | 0.4s |
| `.transition-fast` | Transición genérica rápida | 0.2s |

### 8.4 Componentes UI Base (`Shared.jsx`)

Los componentes reutilizables están centralizados en `src/components/ui/Shared.jsx`:

- `Button` — Variantes: primary, outline, white, ghost. Tamaños: xs, sm, md, lg.
- `Card` — Contenedor con borde, sombra y border-radius configurable.
- `Badge` — Etiquetas: green, warning, danger, blue, purple.
- `Input` — Campo de entrada estilizado.
- `Select` — Selector desplegable.

### 8.5 Función Utilitaria `cn()`

```javascript
// src/lib/utils.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
```

Se usa en todos los componentes para composición condicional de clases Tailwind sin conflictos.

---

## 9. Módulo Geoespacial

### 9.1 Componentes del Visor

| Componente | Responsabilidad |
|---|---|
| `MapViewer.jsx` | Instancia principal de Leaflet (`<MapContainer>`) |
| `LayerControl.jsx` | Panel de capas con toggle on/off y leyenda de colores |
| `MiniMap.jsx` | Mapa miniatura de referencia (inset) |
| `SplitMap.jsx` | Comparador lado a lado de dos capas temporales |
| `TimeSlider.jsx` | Slider para seleccionar año en series temporales |

### 9.2 Capas Configuradas

```javascript
// Definidas en mockData.js → MAP_LAYERS
[
    { id: "fires",     type: "GeoJSON", color: "#DC2626" },  // Puntos de Calor VIIRS
    { id: "cover",     type: "WMS",     color: "#15803D" },  // Cobertura Forestal
    { id: "protected", type: "GeoJSON", color: "#1E3A8A" },  // Áreas Protegidas
    { id: "corridors", type: "GeoJSON", color: "#10B981" },  // Corredores Biológicos
    { id: "crops",     type: "WMS",     color: "#F59E0B" },  // Mapa de Cultivos
    { id: "cattle",    type: "WMS",     color: "#B45309" },  // Ganadería
    { id: "carbon",    type: "Raster",  color: "#7C3AED" },  // Stock de Carbono
    { id: "risk",      type: "Raster",  color: "#EF4444" },  // Riesgo Climático
]
```

### 9.3 Sistema de Referencia

- **CRS Obligatorio:** `EPSG:4326` (WGS 84)
- Referido explícitamente en: `GeoAnalysisGeneric.jsx`, `proceso/licitacion/04_analisis_geoespacial.md`, `proceso/licitacion/05_visores_mapas.md`

---

## 10. Motor de Análisis Geoespacial

El componente `GeoAnalysisGeneric.jsx` implementa un motor conceptual de análisis cruzado con la siguiente arquitectura:

```
Usuario dibuja polígono → Envío a API Python → Intersección SQL → Generación de Reporte
     (Frontend)           (Petición HTTP)     (SpatiaLite)        (JSON/PDF)
```

### Análisis Disponibles

| Análisis | Capas Cruzadas | Backend Function |
|---|---|---|
| Restricciones de Conservación | WDPA, Corredores SICA, Zonificación Legal | `check_conservation_restrictions` |
| Detección de Deforestación | GFW Loss, CNIG, Alertas GLAD | `detect_deforestation_history` |
| Análisis de Ecosistemas | Mapa Regional, GBIF, Bioclimáticas | `get_ecosystem_inventory` |
| Cruce de Proyectos | DIPE, Cooperación SICA, Actores | `query_active_projects` |

---

## 11. Infraestructura y Despliegue

### 11.1 Docker Multi-Stage Build

```dockerfile
# Etapa 1: Instalación de dependencias (capa de caché)
FROM node:20-alpine AS deps
RUN npm ci

# Etapa 2: Compilación del bundle de producción
FROM node:20-alpine AS builder
RUN npm run build

# Etapa 3: Servidor Nginx ultra-ligero (~15MB)
FROM nginx:stable-alpine AS runner
# - SPA fallback: try_files $uri $uri/ /index.html
# - Cache inmutable para /assets/ (1 año, hash de Vite)
# - Puerto dinámico: $PORT (inyectado por Railway)
```

### 11.2 Estrategia de Caché en Producción

| Ruta | Caché | Razón |
|---|---|---|
| `/assets/*` | `1y, public, immutable` | Archivos con hash de Vite (cambian cada build) |
| `/index.html` | Sin caché (default) | Entry point del SPA, siempre fresco |
| `/data_csv/*` | Sin caché (default) | Datasets que pueden actualizarse |

### 11.3 Railway

- **Puerto:** Asignado dinámicamente via `$PORT` (default: 80).
- **Proceso de inject:** `sed -i "s/[PORT_REPLACE]/${PORT:-80}/g"` al iniciar el contenedor.
- **Health check:** Nginx responde en `/` con `index.html`.

---

## 12. Herramientas de Desarrollo

### 12.1 Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo con HMR (Vite)
npm run build    # Build de producción → /dist
npm run preview  # Preview del build de producción
npm run lint     # ESLint sobre todo el código
```

### 12.2 Configuración ESLint

- **Parser:** ECMAScript 2020 con JSX
- **Plugins activos:** `react-hooks`, `react-refresh`
- **Regla personalizada:** `no-unused-vars` ignora variables que empiezan con mayúscula o guión bajo (`^[A-Z_]`)

### 12.3 Pipeline CSS

```
index.css → @import "tailwindcss" → @tailwindcss/postcss → autoprefixer → CSS final
                ↑
         tailwind.config.js (design tokens)
```

---

## 13. Convenciones del Código

### 13.1 Nomenclatura de Archivos

| Tipo | Convención | Ejemplo |
|---|---|---|
| Componentes React | PascalCase `.jsx` | `MapViewer.jsx`, `KpiCards.jsx` |
| Datos JSON | camelCase `.json` | `cifras.json`, `axes.json` |
| Datos JS | camelCase `.js` | `mockData.js`, `questions.js` |
| Utilidades | camelCase `.js` | `utils.js`, `eram.js` |
| Imágenes de países | snake_case `.png` | `costa_rica.png`, `el_salvador.png` |
| Datasets CSV | snake_case `.csv` | `inventarios_forestales.csv` |

### 13.2 Estructura de Componentes

```jsx
// Patrón estándar en el OAR
import React from 'react';
import { IconName } from 'lucide-react';
import { Button, Card, Badge } from '../../components/ui/Shared';
import { cn } from '../../lib/utils';

export const ComponentName = ({ prop1, prop2 }) => {
    const [state, setState] = React.useState(initialValue);
    
    return (
        <div className={cn("base-classes", conditionalClass && "active")}>
            {/* Contenido */}
        </div>
    );
};
```

### 13.3 Patrones de Diseño Recurrentes

1. **Iconos desde JSON:** Los iconos se referencian como strings en JSON (`"icon": "Trees"`) y se resuelven dinámicamente contra `lucide-react` en `src/lib/eram.js`.
2. **Layouts anidados:** React Router `<Outlet />` para componer Sidebar + Consultant panels.
3. **Auto-hide Sidebar:** En rutas de ejes estratégicos y geo-analysis, el sidebar se muestra 1.5s y se cierra automáticamente.
4. **Rutas legacy:** Se mantienen rutas `/technical/reports/*` como alias de las canónicas `/preguntas/*`.
5. **HTML en highlights:** Los highlights de preguntas usan HTML strings renderizados con `dangerouslySetInnerHTML`.

---

## 14. Cobertura Regional

### 14.1 Países SICA Cubiertos

| Código | País | Coordenadas Centro | Zoom |
|---|---|---|---|
| GT | Guatemala | 15.78, -90.23 | 7 |
| SV | El Salvador | 13.79, -88.90 | 8 |
| HN | Honduras | 15.20, -86.24 | 7 |
| NI | Nicaragua | 12.87, -85.21 | 7 |
| CR | Costa Rica | 9.75, -83.75 | 7 |
| PA | Panamá | 8.54, -80.78 | 7 |
| BZ | Belize | 17.19, -88.50 | 8 |
| DO | Rep. Dominicana | 18.74, -70.16 | 7 |
| — | **Región SICA** | **13.50, -85.00** | **5** |

### 14.2 Ejes Temáticos ERAM

1. **Calidad Ambiental** — Aire, suelo, agua, residuos
2. **Mares y Biodiversidad** — Ecosistemas marinos, biodiversidad terrestre
3. **Gestión Hídrica** — Recursos hídricos, cuencas transfronterizas
4. **Bosques y Paisajes** — Cobertura forestal, restauración, incendios
5. **Cambio Climático** — Mitigación, adaptación, gestión de riesgo

---

## 15. Métricas del Código Fuente

| Métrica | Valor |
|---|---|
| Archivos `.jsx` en `src/` | ~55 componentes |
| Archivos de datos en `src/data/` | 12 archivos |
| Peso total `src/data/` | ~1.25 MB |
| Peso total `cifras.json` | 240 KB (~500+ indicadores) |
| Peso total `ai_context.json` | 924 KB |
| Registros en inventarios CSV | 2,133 parcelas forestales |
| Rutas definidas en `App.jsx` | ~35 rutas |
| APIs externas integradas | 8 servicios |
| Imágenes en `public/forests/` | 11 assets (~8.9 MB) |
| Tamaño imagen Docker final | ~15 MB (nginx:alpine) |

---

> **Última actualización:** Abril 2026
> **Generado desde:** Análisis completo del repositorio `prototipo_oar`
