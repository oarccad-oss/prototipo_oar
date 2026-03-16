# Skill: Análisis Geoespacial Avanzado (Laboratorio)

> **Versión:** 2.0 | **Última actualización:** Marzo 2026  
> **Módulo en producción:** `/technical/geo-analysis/*` → `GeoAnalysisGeneric.jsx`

---

## 1. Propósito y Contexto

El **Laboratorio de Análisis Geoespacial** es la herramienta más avanzada del OAR. Permite a especialistas técnicos (planificadores territoriales, consultores de conservación, analistas SIG) ejecutar algoritmos espaciales complejos sobre el territorio centroamericano y del Caribe.

A diferencia del Visor de Mapas (exploración visual), este módulo tiene un **flujo de trabajo estructurado**: el usuario define un área, selecciona un algoritmo, y recibe un reporte especializado. Es un simulador de lo que debería ser una API de geoprocesamiento Python en backend.

---

## 2. Arquitectura del Módulo

```
/technical/geo-analysis            → GeoAnalysisHome.jsx    (Hub de herramientas)
/technical/geo-analysis/restrictions → GeoAnalysisGeneric  (algoritmo específico)
/technical/geo-analysis/deforestation → GeoAnalysisGeneric
/technical/geo-analysis/ecosystems    → GeoAnalysisGeneric
/technical/geo-analysis/projects      → GeoAnalysisGeneric
```

### Props de `GeoAnalysisGeneric`:

```javascript
<GeoAnalysisGeneric
  title="Restricciones de Conservación"
  icon={ShieldAlert}
  description="Identificación de polígonos con restricciones legales..."
  pythonFunction="check_conservation_restrictions"   // Nombre de función futura en backend
  layers={["WDPA Protected Areas", "Corredores Biológicos SICA"]}
  uses={[
    "Evaluación de viabilidad para proyectos de infraestructura.",
    "Monitoreo de cumplimiento en zonas de amortiguamiento."
  ]}
/>
```

---

## 3. Catálogo de Herramientas

| Herramienta | Ruta | `pythonFunction` | Íconos |
|---|---|---|---|
| Restricciones de Conservación | `/restrictions` | `check_conservation_restrictions` | `ShieldAlert` |
| Detección de Deforestación | `/deforestation` | `detect_deforestation_history` | `Activity` |
| Análisis de Ecosistemas | `/ecosystems` | `get_ecosystem_inventory` | `Layers` |
| Cruce de Proyectos | `/projects` | `query_active_projects` | `Briefcase` |

---

## 4. Flujo de Trabajo Estándar (4 pasos)

### Paso 1: Definición de Área de Interés

El usuario delimita el territorio de análisis mediante:

| Método | UX | Formato |
|---|---|---|
| Dibujar en mapa | `Leaflet.Draw` — polígono o rectángulo libre | GeoJSON en memoria |
| Carga de archivo | Drag & drop de `.geojson` o `.kml` | Parseo cliente-side |
| Selección por país | Botones de países SICA con límites pre-cargados | GeoJSON del repositorio |
| Coordenadas manuales | Input de lat/lon con radio de buffer | Punto + buffer en km |

### Paso 2: Selección de Capas de Análisis

Las capas disponibles varían según la herramienta seleccionada. Se muestran como checkboxes con descripción y año de la fuente:

```jsx
<CheckboxGroup label="Capas de análisis">
  {layers.map(layer => (
    <label key={layer.id} className="flex items-start gap-3 p-3 rounded-xl border cursor-pointer hover:bg-slate-50">
      <input type="checkbox" defaultChecked />
      <div>
        <p className="font-semibold text-sm">{layer.name}</p>
        <p className="text-xs text-slate-400">{layer.source} · {layer.year}</p>
      </div>
    </label>
  ))}
</CheckboxGroup>
```

### Paso 3: Ejecución del Algoritmo (Simulada)

```jsx
// Estados de procesamiento
const stages = [
  "Validando geometría de entrada...",
  "Proyectando coordenadas (EPSG:4326 → 32616)...",
  `Consultando: ${pythonFunction}()...`,
  "Intersectando con capas de referencia...",
  "Generando reporte final..."
];

// Simula progreso progresivo con setTimeout/interval
// Para producción: reemplazar por llamada real a /api/geo-analysis
```

Loader visual: barra de progreso animada + mensaje del paso actual + nombre de la función Python ejecutada (para transparencia técnica).

### Paso 4: Reporte de Resultados

```
┌─────────────────────────────────────────────────────┐
│  📊 REPORTE: Restricciones de Conservación          │
│  Área analizada: 12,450 ha  ·  3 capas consultadas  │
├─────────────────────────────────────────────────────┤
│  HALLAZGOS PRINCIPALES                               │
│  ✓ 68% del área está bajo WDPA Categoría II         │
│  ⚠ 12% corresponde a zona de amortiguamiento       │
│  ✗ 20% sin restricción legal identificada           │
├─────────────────────────────────────────────────────┤
│  MAPA DE RESULTADOS (Leaflet con capa de calor)      │
├─────────────────────────────────────────────────────┤
│  [↓ Descargar GeoJSON]  [↓ Descargar PDF]  [Nuevo] │
└─────────────────────────────────────────────────────┘
```

---

## 5. Capas de Referencia del Sistema

| Capa | Proveedor | Formato | Actualización |
|---|---|---|---|
| Áreas Protegidas | WDPA / Protected Planet | GeoJSON / WMS | Mensual |
| Pérdida de Bosque | Global Forest Watch (UMD) | GeoTIFF | Anual |
| Corredores Biológicos | SICA / CCAD | GeoJSON local | Manual |
| Cuencas Hidrográficas | HYDROSHEDS | GeoJSON | Estático |
| Proyectos de Cooperación | Base DIPE / CCAD | GeoJSON | Semestral |
| Alertas GLAD | Global Forest Watch | API REST | Diario |
| Variables Bioclimáticas | WorldClim 2.1 | GeoTIFF | Estático |

---

## 6. Estética del Simulador

### Paleta de Colores del Mapa

```javascript
// Mapa base oscuro para resaltar resultados
const MAP_BASE = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

// Colores de resultados por categoría
const RESULT_COLORS = {
  'protected':      '#059669',  // Posee restricción: verde
  'buffer_zone':    '#f59e0b',  // Zona de amortiguamiento: ámbar
  'unrestricted':   '#ef4444',  // Sin restricción: rojo
  'no_data':        '#94a3b8',  // Sin datos: slate
};
```

### Componentes de Interfaz

- **Mapa:** Pantalla completa o 60% del viewport, con toolbar de dibujo flotante.
- **Toolbar de dibujo:** `backdrop-blur-md bg-white/80`, bordes redondeados, sombra suave.
- **Panel de resultados:** Slide-in desde la derecha, `border-l border-slate-200 bg-white`.
- **Loader:** Spinner central con lista de pasos actuales y barra de progreso.

---

## 7. Integración con Backend Python (Futura)

```python
# FastAPI - Estructura esperada del endpoint
@router.post("/geo-analysis/{function_name}")
async def run_analysis(
    function_name: str,
    geometry: dict,         # GeoJSON Feature
    layers: list[str],      # IDs de capas a consultar
    options: dict = {}
) -> dict:
    """Ejecuta el análisis geoespacial y retorna GeoJSON + estadísticas."""
    pass
```

El frontend simulará esta llamada con `setTimeout` hasta que el backend esté disponible. La lógica de UI (loading states, error handling) debe estar lista desde el prototipo.

---

## 8. Casos de Uso Documentados

1. **Evaluación ambiental de proyectos de infraestructura** (carreteras, represas).
2. **Verificación de legalidad en cadenas de suministro agroforestales** (cumplimiento EUDR).
3. **Identificación de corredores de restauración** ecológica transfronteriza.
4. **Análisis de vulnerabilidad costera** ante ascenso del nivel del mar.
5. **Coordinación de proyectos de cooperación** en zonas de superposición geográfica.

---

## 9. Próximas Iteraciones (Backlog)

- [ ] **Backend real:** Conectar con FastAPI + GeoPandas para análisis reales sobre FlatGeobuf.
- [ ] **Guardar análisis:** Exportar URL reproducible con geometría + parámetros codificados en Base64.
- [ ] **Historial de análisis:** Panel de sesión con los últimos 5 análisis del usuario.
- [ ] **Modo comparativo:** Ejecutar el mismo análisis para dos períodos distintos (2015 vs. 2024).
- [ ] **Integración con Visor:** Enviar resultados del análisis directamente al Visor Geoespacial como capa adicional.
