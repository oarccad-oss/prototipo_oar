# Skill: Análisis Multidimensional (BI Sandbox)

> **Versión:** 2.0 | **Última actualización:** Marzo 2026  
> **Módulo en producción:** `/analisis-multidimensional` → `AnalysisSandbox.jsx`

---

## 1. Propósito y Contexto

El módulo de **Análisis Multidimensional** es el laboratorio de datos del OAR. Permite a técnicos y analistas explorar correlaciones entre variables ambientales y socioeconómicas de la región SICA sin necesidad de exportar datos a software externo.

A diferencia de los dashboards predefinidos, este es un ambiente **exploratorio libre**: el usuario elige qué variables cruzar, qué tipo de visualización aplicar y para qué país o región hacerlo.

Principio clave: **"Sólo se puede cruzar lo que es comparable"** — la validación geográfica por código ISO impide comparaciones sin sentido estadístico.

---

## 2. Arquitectura del Módulo

```
/analisis-multidimensional
  └── AnalysisSandbox.jsx       (contenedor principal)
        ├── DatasetSelector     (panel izquierdo: selección de variables)
        ├── ChartRenderer       (panel derecho: visualización dinámica)
        └── ExportToolbar       (barra inferior: descarga de resultados)
```

---

## 3. Fuente de Datos

### Archivos CSV en `public/data_csv/`

```
public/data_csv/
  ├── cobertura_forestal.csv
  ├── emisiones_gei.csv
  ├── biodiversidad_spp.csv
  ├── calidad_agua.csv
  ├── indicadores_sociales.csv
  └── ... (extensible)
```

### Configuración en `src/data/datasets.config.js`

```javascript
export const DATASETS = [
  {
    id: "cobertura_forestal",
    label: "Cobertura Forestal",
    file: "/data_csv/cobertura_forestal.csv",
    axis: "Bosques",
    
    // Columnas disponibles como variables
    columns: [
      { key: "iso_country", label: "País (ISO)", type: "geo", isKey: true },
      { key: "year", label: "Año", type: "temporal" },
      { key: "forest_cover_ha", label: "Cobertura Forestal (ha)", type: "numeric" },
      { key: "forest_cover_pct", label: "Cobertura Forestal (%)", type: "numeric" },
      { key: "tree_cover_loss_ha", label: "Pérdida de Bosque (ha)", type: "numeric" }
    ]
  },
  {
    id: "emisiones_gei",
    label: "Emisiones GEI",
    file: "/data_csv/emisiones_gei.csv",
    axis: "Clima",
    columns: [
      { key: "iso_country", label: "País (ISO)", type: "geo", isKey: true },
      { key: "year", label: "Año", type: "temporal" },
      { key: "total_mtco2e", label: "Emisiones Totales (MtCO2e)", type: "numeric" },
      { key: "lulucf_mtco2e", label: "Emisiones LULUCF (MtCO2e)", type: "numeric" }
    ]
  }
];
```

---

## 4. Regla de Cruce de Variables

**Dos datasets sólo son cruzables si comparten una columna con `isKey: true` del mismo `type: "geo"`.**

```javascript
const canCross = (dataset1, dataset2) => {
  const keys1 = dataset1.columns.filter(c => c.isKey).map(c => c.key);
  const keys2 = dataset2.columns.filter(c => c.isKey).map(c => c.key);
  return keys1.some(k => keys2.includes(k));
};
```

Si los datasets no son compatibles, el sistema muestra un aviso:

```jsx
<Alert variant="warning">
  <AlertTriangle />
  Estos conjuntos de datos no comparten un código geográfico común. 
  Selecciona variables del mismo dataset o de datasets compatibles.
</Alert>
```

---

## 5. Tipos de Visualización Disponibles

| ID | Nombre | Librería | Mejor para |
|---|---|---|---|
| `bar` | Barras | recharts `BarChart` | Comparación entre países |
| `bar_stacked` | Barras apiladas | recharts `BarChart` | Composición porcentual |
| `area` | Áreas | recharts `AreaChart` | Tendencia temporal |
| `line` | Líneas | recharts `LineChart` | Series multicategoría |
| `scatter` | Dispersión | recharts `ScatterChart` | Correlación entre 2 variables |
| `pie` | Torta | recharts `PieChart` | Distribución proporcional |
| `radar` | Radar | recharts `RadarChart` | Perfil multidimensional por país |
| `treemap` | Árbol | recharts `Treemap` | Jerarquías de magnitud |
| `table` | Tabla | HTML nativo | Vista detallada de datos crudos |
| `heatmap` | Calor | custom SVG / D3 | Matriz países × variables |

---

## 6. Layout del Sandbox

```
┌──────────────────────────────────────────────────────────────────┐
│  BARRA SUPERIOR: Nombre del análisis + botón "Guardar" + "Limpiar"│
├──────────────────┬───────────────────────────────────────────────┤
│  PANEL IZQUIERDO │  PANEL DERECHO                                │
│  (w-80)          │  (flex-1)                                      │
│                  │                                                │
│  Dataset 1       │  ┌────────────────────────────────────────┐   │
│  [select]        │  │                                        │   │
│  Variable X      │  │      VISUALIZACIÓN ACTIVA              │   │
│  [select]        │  │      (recharts / tabla)                │   │
│                  │  │                                        │   │
│  Dataset 2       │  └────────────────────────────────────────┘   │
│  [select]        │                                                │
│  Variable Y      │  Tipo de gráfico:                             │
│  [select]        │  [Bar][Area][Line][Scatter][Pie]...           │
│                  │                                                │
│  Filtros:        │  Tooltip activo: muestra origen del dato      │
│  Año / País      │                                                │
│                  │                                                │
│  [Generar ▶]     │                                                │
└──────────────────┴───────────────────────────────────────────────┘
│  BARRA INFERIOR: [Exportar CSV] [Exportar PNG] [Compartir análisis]│
└──────────────────────────────────────────────────────────────────┘
```

---

## 7. Componentes UI Estándar

| Componente | Descripción |
|---|---|
| Selector de Dataset | `Select` con agrupación por eje ERAM |
| Selector de Variable | `Select` condicional, carga columnas del dataset elegido |
| Botón de Generación | `Button` con spinner `Loader2` mientras procesa |
| Selector de Visualización | Tabs con íconos de cada tipo de gráfico |
| Tooltip de dato | Custom `recharts` Tooltip con fuente y código ISO del país |
| Panel vacío | Empty state con `BarChart3`, mensaje orientativo |

---

## 8. Estados de la UI

| Estado | Descripción | Visualización |
|---|---|---|
| `idle` | Sin variables seleccionadas | Panel vacío con instrucciones |
| `incompatible` | Datasets no cruzables | Alert de advertencia + explicación |
| `loading` | Cargando y procesando CSV | Spinner centrado en el panel |
| `success` | Gráfico generado | Visualización + toolbar de export |
| `empty` | Cruce válido pero sin datos | Empty state con sugerencia alternativa |
| `error` | Error al leer el CSV | Alert rojo con opción de reintentar |

---

## 9. Estética y Paleta de Colores

```javascript
// Colores para series de datos en gráficos
const CHART_COLORS = [
  '#059669', // Emerald (Bosques)
  '#2563eb', // Blue (Agua/Calidad)
  '#7c3aed', // Purple (Clima)
  '#0891b2', // Cyan (Mares)
  '#ea580c', // Orange (Incendios)
  '#0d9488', // Teal (Biodiversidad)
  '#db2777', // Pink (Adicional)
  '#65a30d', // Lime (Adicional)
];
```

---

## 10. Próximas Iteraciones (Backlog)

- [ ] **Análisis guardados:** Persistir selecciones de variables en `localStorage` o en backend.
- [ ] **Compartir análisis:** Generar URL con los parámetros del análisis encoded.
- [ ] **Más datasets:** Agregar datos de calidad del aire, temperatura, precipitación.
- [ ] **Integración con backend:** Reemplazar lectura de CSV local por endpoint `/api/datasets/{id}`.
- [ ] **Regresión simple:** Calcular y mostrar la línea de tendencia en gráficos de dispersión.
- [ ] **Anotaciones:** Permitir al analista agregar notas textuales sobre puntos del gráfico.
