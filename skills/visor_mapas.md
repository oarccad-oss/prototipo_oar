# Skill: Visor Geoespacial Regional

> **Versión:** 2.0 | **Última actualización:** Marzo 2026  
> **Módulo en producción:** `/technical/map` → `MapExplorer.jsx` | `/technical/maps` → `MapHub.jsx`

---

## 1. Propósito y Contexto

El **Visor Geoespacial Regional** es el explorador cartográfico del OAR. A diferencia del Laboratorio de Análisis (que ejecuta algoritmos), el Visor está diseñado para la **exploración visual** del territorio: ver capas, identificar patrones geográficos y obtener atributos de objetos específicos con un clic.

Audiencia principal: funcionarios técnicos de ministerios, periodistas de datos, investigadores, y ciudadanos con interés en el territorio regional.

---

## 2. Arquitectura del Módulo

```
/technical/maps            → MapHub.jsx          (Catálogo de visores temáticos)
/technical/map             → MapExplorer.jsx      (Visor principal multicapa)
/technical/map-comparator  → MapComparator.jsx    (Dos mapas lado a lado)
```

### Wrappers de layout en App.jsx:

Estos tres componentes están envueltos por `MapConsultantLayout`, que elimina el footer y extiende el mapa a pantalla completa (`h-[calc(100vh-64px)] overflow-hidden`).

---

## 3. Catálogo de Capas

Las capas están categorizadas en `src/data/mockData.js` → `MAP_LAYERS`:

```javascript
const MAP_LAYERS = [
  {
    id: "forest_cover_2023",
    name: "Cobertura Forestal 2023",
    category: "Bosques",            // Agrupa en sidebar
    type: "wms",                    // "wms" | "geojson" | "raster" | "xyz"
    url: "https://...",
    attribution: "Global Forest Watch / UMD",
    year: 2023,
    axis: "Bosques",
    visible: false,
    opacity: 0.85,
    description: "Cobertura de dosel arbóreo con densidad >30% estimada por Landsat.",
    legend: [
      { color: "#1a7a2e", label: "Bosque denso (>70%)" },
      { color: "#5ab56a", label: "Bosque moderado (30-70%)" }
    ]
  }
];
```

### Categorías estándar de capas:

| Categoría | Color de categoría | Contenido |
|---|---|---|
| Bosques | `emerald` | Cobertura, pérdida, biomasa |
| Biodiversidad | `teal` | KBA, áreas protegidas, corredores |
| Agua | `sky` | Cuencas, acuíferos, calidad |
| Clima | `purple` | Temperatura, precipitación, sequías |
| Mares | `cyan` | Arrecifes, manglar, ZEE, pesca |
| Calidad Ambiental | `blue` | Calidad del aire, suelos degradados |
| Riesgo | `orange` | Incendios, deslizamientos, inundaciones |
| Proyectos | `indigo` | Cooperación técnica, inversión |
| Base | `slate` | Límites político-admin, vías, poblados |

---

## 4. Layout del Visor Principal

```
┌─────────────────────────────────────────────────────────────────┐
│  NAVBAR (64px)                                                   │
├──────────────┬──────────────────────────────────────────────────┤
│  SIDEBAR     │  MAPA PRINCIPAL (Leaflet / MapLibre)             │
│  (320px)     │                                                  │
│              │  ┌─────────────────┐  ┌──────────────────────┐  │
│  [⚙ Capas]  │  │ ZOOM CONTROLS   │  │   ESCALA / COORDENADAS│  │
│  [≡ Leyenda] │  └─────────────────┘  └──────────────────────┘  │
│  [ℹ Info]    │                                                  │
│              │  ┌─────────────────────────────────────────────┐ │
│  CATEGORÍAS  │  │  PANEL INSPECTOR (aparece al hacer clic)    │ │
│  ├─ Bosques  │  │  Nombre del objeto · Área: 45,000 ha        │ │
│  │  ☑ Cob.  │  │  Categoría IUCN: II                         │ │
│  │  ☐ Pérd. │  │  País: Costa Rica                           │ │
│  ├─ Agua     │  │  [Ver ficha completa ↗]                     │ │
│  │  ☐ Cuenc.│  └─────────────────────────────────────────────┘ │
│              │                                                  │
│  [🔍 Países] │  ┌──────────────────────────────────────-─────┐  │
│              │  │  LEYENDA (capas activas)                    │  │
└──────────────┴──────────────────────────────────────────────────┘
```

---

## 5. Componentes UI Estándar

### Control de Capas (Sidebar)

```jsx
const LayerToggle = ({ layer, onToggle, onOpacityChange }) => (
  <div className="flex items-start gap-3 py-3 border-b border-slate-100">
    {/* Checkbox de visibilidad */}
    <input
      type="checkbox"
      checked={layer.visible}
      onChange={() => onToggle(layer.id)}
      className="mt-0.5 accent-emerald-600"
    />
    
    <div className="flex-1">
      {/* Nombre + badge del año */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-slate-800">{layer.name}</span>
        <Badge variant="secondary" className="text-[9px]">{layer.year}</Badge>
      </div>
      <p className="text-xs text-slate-400 mt-0.5">{layer.attribution}</p>
      
      {/* Slider de opacidad (visible solo si la capa está activa) */}
      {layer.visible && (
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[10px] text-slate-400">Opacidad</span>
          <input
            type="range" min="0" max="1" step="0.05"
            value={layer.opacity}
            onChange={(e) => onOpacityChange(layer.id, parseFloat(e.target.value))}
            className="flex-1 h-1 accent-emerald-600"
          />
          <span className="text-[10px] text-slate-400 w-8">{Math.round(layer.opacity * 100)}%</span>
        </div>
      )}
    </div>

    {/* Botón de info */}
    <button onClick={() => openDataSourceModal(layer)} className="text-slate-300 hover:text-slate-600">
      <Info className="h-3.5 w-3.5" />
    </button>
  </div>
);
```

### Inspector de Atributos

```jsx
const AttributeInspector = ({ feature, onClose }) => (
  <div className="absolute bottom-4 right-4 w-80 bg-white rounded-2xl shadow-2xl p-4 border border-slate-200 animate-in slide-in-from-right-4">
    <div className="flex items-start justify-between mb-3">
      <h3 className="font-bold text-slate-900 text-sm">{feature.properties.name}</h3>
      <button onClick={onClose}><X className="h-4 w-4 text-slate-400" /></button>
    </div>
    <dl className="space-y-1.5">
      {Object.entries(feature.properties).map(([key, val]) => (
        <div key={key} className="grid grid-cols-2 text-xs">
          <dt className="text-slate-400 font-medium capitalize">{key.replace(/_/g, ' ')}</dt>
          <dd className="text-slate-700 font-semibold">{val}</dd>
        </div>
      ))}
    </dl>
  </div>
);
```

---

## 6. Estándares Técnicos

### Librería de mapas: `Leaflet` (actual)

```javascript
// Configuración base
const map = L.map('map', {
  center: [12.0, -84.0],   // Centro de la región SICA
  zoom: 6,
  minZoom: 4,
  maxZoom: 16,
  zoomControl: false        // Control personalizado propio
});
```

### Mapa base recomendado por contexto:

| Contexto | Tile URL | Uso |
|---|---|---|
| Vista general (light) | `CartoDB.Positron` | Exploración institucional |
| Análisis técnico (dark) | `CartoDB.DarkMatter` | Capas de datos complejas |
| Referencia satelital | `Google Satellite (XYZ)` | Verificación en terreno |
| Sin conexión | Tiles descargados (futuro) | Modo offline |

### Formatos de capa soportados:

| Formato | Tipo de datos | Interactividad |
|---|---|---|
| `WMS` | Servicios GeoServer / ArcGIS | Solo visual |
| `GeoJSON` | Datos vectoriales dinámicos | Click + atributos |
| `GeoTIFF / XYZ` | Rasters / imágenes | Solo visual |
| `FlatGeobuf` | Vectorial binario eficiente (futuro) | Click + atributos |

---

## 7. Accesos Rápidos por País (Zoom Regional)

```javascript
const SICA_VIEWS = {
  'Guatemala':          { center: [15.78, -90.23], zoom: 7 },
  'El Salvador':        { center: [13.79, -88.90], zoom: 8 },
  'Honduras':           { center: [15.20, -86.24], zoom: 7 },
  'Nicaragua':          { center: [12.87, -85.21], zoom: 7 },
  'Costa Rica':         { center: [9.75, -83.75],  zoom: 7 },
  'Panamá':             { center: [8.54, -80.78],  zoom: 7 },
  'Belice':             { center: [17.19, -88.50], zoom: 8 },
  'República Dominicana': { center: [18.74, -70.16], zoom: 7 },
  'Regional':           { center: [12.0, -84.0],   zoom: 6 }
};
```

---

## 8. Visor Comparador (`MapComparator.jsx`)

Dos instancias del visor sincronizadas en zoom y posición, separadas por un slider draggable. Cada panel puede tener un set independiente de capas activas. Ideal para comparar:
- Cobertura forestal 2015 vs. 2024.
- Escenario climático actual vs. proyección 2050.
- Antes/después de un evento (incendio, huracán).

---

## 9. Próximas Iteraciones (Backlog)

- [ ] **Modo offline:** Tiles descargables por país para uso en campo sin internet.
- [ ] **URL con estado:** Persistir en URL las capas activas, zoom y centro del mapa.
- [ ] **Exportar mapa:** Captura de pantalla del visor con leyenda y metadatos (PNG / PDF).
- [ ] **Medición de áreas:** Herramienta de dibujo para medir distancias y áreas.
- [ ] **Integración con Análisis Geo:** Enviar geometría trazada en el Visor al Laboratorio de Análisis.
- [ ] **WMS dinámico:** Conectar con GeoServer del backend para capas propias del OAR.
