# Skill: Indicadores de Monitoreo (ERAM)

> **Versión:** 2.0 | **Última actualización:** Marzo 2026  
> **Módulo en producción:** `/monitoring/*`

---

## 1. Propósito y Contexto

El módulo de **Indicadores** es el panel de monitoreo estratégico y operativo del OAR. Mide el avance de la región SICA frente a compromisos formales: las metas de la **Estrategia Regional Ambiental Marco (ERAM 2015–2020)**, los **Objetivos de Desarrollo Sostenible (ODS)**, el **Marco Global de Biodiversidad de Kunming-Montreal** y los **Acuerdos de Paris**.

Es un módulo de **audiencia técnica** (coordinadores nacionales, técnicos de ministerios, agencias de cooperación). La interfaz debe proyectar rigor metodológico y claridad analítica.

---

## 2. Arquitectura del Módulo

```
/monitoring                   → MonitoringPortal.jsx   (Hub de entrada)
/monitoring/strategic         → StrategicMonitoring.jsx (Metas ERAM + ODS)
/monitoring/operational       → OperationalMonitoring.jsx (KPIs operativos)
```

---

## 3. Estructura de Datos

### Fuente principal: `src/data/indicators.js`

```javascript
// Objetivo de alto nivel
{
  id: "OBJ-CBD-01",
  framework: "Kunming-Montreal",     // "ERAM" | "ODS" | "Kunming-Montreal" | "Paris"
  objective: "Área 30",
  shortName: "Meta 30x30 Terrestre",
  description: "Proteger al menos el 30% del territorio terrestre para 2030.",
  axis: "Biodiversidad",
  
  // Metas desagregadas
  targets: [
    {
      id: "TARGET-CBD-01-A",
      description: "Porcentaje de territorio terrestre protegido.",
      unit: "%",
      baseline: { value: 17.2, year: 2020 },
      target: { value: 30, year: 2030 },
      current: { value: 20.4, year: 2024 },
      status: "on-track",            // "on-track" | "at-risk" | "off-track" | "achieved" | "no-data"
      countries: {
        "Guatemala": 30.8,
        "El Salvador": 2.1,
        "Honduras": 25.6,
        "Nicaragua": 36.5,
        "Costa Rica": 27.3,
        "Panamá": 38.7,
        "Belice": 37.1,
        "República Dominicana": 21.8
      },
      source: "WDPA / Protected Planet",
      lastUpdated: "2024-Q3"
    }
  ]
}
```

### Estados de cumplimiento:

| Estado | Badge | Color | Significado |
|---|---|---|---|
| `on-track` | En camino | `emerald` | Progreso >= 80% del avance esperado |
| `at-risk` | En riesgo | `amber` | Progreso entre 50%-79% |
| `off-track` | Rezagado | `orange` | Progreso < 50% |
| `achieved` | Cumplida | `blue` | Ya superó la meta |
| `no-data` | Sin datos | `slate` | Información insuficiente |

---

## 4. Layout Estándar

### 4.1 Portal de Monitoreo (`MonitoringPortal.jsx`)

Hub de entrada con:
- Resumen ejecutivo: 3-4 KPIs del estado general de la región.
- Cards de acceso a `StrategicMonitoring` y `OperationalMonitoring`.
- Badge de última actualización del sistema.

### 4.2 Monitoreo Estratégico (`StrategicMonitoring.jsx`)

```
┌─────────────────────────────────────────────────────────────┐
│  FILTROS: Framework / Eje temático / País                    │
├────────────────┬────────────────────────────────────────────┤
│  OBJETIVO      │  PROGRESO                                    │
│  CBD-01        │  ████████░░ 20.4% → Meta: 30%              │
│  "Meta 30x30"  │  Estado: [En camino]                        │
│                │  ▸ Por países (accordion)                   │
│                │    GT: 30.8% ✓  SV: 2.1% ✗                 │
└────────────────┴────────────────────────────────────────────┘
```

### 4.3 Monitoreo Operativo (`OperationalMonitoring.jsx`)

- Dashboard estilo "sala de control": KPIs en grid compacto.
- Indicadores con `trend` (▲ vs ▼ respecto al período anterior).
- Alertas automáticas para indicadores en estado `off-track`.

---

## 5. Componentes UI Estándar

### Barra de Progreso con Meta

```jsx
const ProgressBar = ({ current, target, status }) => {
  const pct = Math.min((current / target) * 100, 100);
  const colors = {
    'on-track': 'bg-emerald-500',
    'at-risk': 'bg-amber-500',
    'off-track': 'bg-orange-500',
    'achieved': 'bg-blue-500',
    'no-data': 'bg-slate-300'
  };
  return (
    <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-1000 ${colors[status]}`}
        style={{ width: `${pct}%` }}
      />
      {/* Marcador de meta */}
      <div className="absolute top-0 right-0 h-full w-0.5 bg-slate-400" />
    </div>
  );
};
```

### Semáforo de Estado

```jsx
const StatusBadge = ({ status }) => {
  const config = {
    'on-track':  { label: 'En camino', class: 'bg-emerald-100 text-emerald-700' },
    'at-risk':   { label: 'En riesgo', class: 'bg-amber-100 text-amber-700' },
    'off-track': { label: 'Rezagado',  class: 'bg-orange-100 text-orange-700' },
    'achieved':  { label: 'Cumplida',  class: 'bg-blue-100 text-blue-700' },
    'no-data':   { label: 'Sin datos', class: 'bg-slate-100 text-slate-500' }
  };
  const { label, class: cls } = config[status];
  return <span className={`px-2 py-0.5 rounded text-xs font-bold ${cls}`}>{label}</span>;
};
```

### Drill-Down por País

Panel accordion que se expande debajo de cada indicador para mostrar el valor de cada uno de los 8 países del SICA con mini-barra de progreso individual.

---

## 6. Iconografía

| Acción / Concepto | Ícono |
|---|---|
| Objetivos estratégicos | `Target` |
| Monitoreo operativo en tiempo real | `Activity` |
| Alerta o meta en riesgo | `AlertTriangle` |
| Meta cumplida | `CheckCircle2` |
| Sin datos disponibles | `HelpCircle` |
| Tendencia positiva | `TrendingUp` |
| Tendencia negativa | `TrendingDown` |
| Filtros activos | `SlidersHorizontal` |

---

## 7. Lógica de Color del Framework

| Framework | Color Principal | Color Secundario |
|---|---|---|
| ERAM | `indigo-600` | `indigo-100` |
| ODS / SDG | `sky-600` | `sky-100` |
| Kunming-Montreal | `teal-600` | `teal-100` |
| Acuerdo de París | `purple-600` | `purple-100` |

---

## 8. Visualizaciones de Soporte

- **Gráfico de araña (Radar Chart):** Comparación del desempeño de un país en todos los ejes ERAM de forma simultánea.
- **Mapa de calor por país:** Matriz países x indicadores con color semafórico.
- **Serie temporal (AreaChart):** Evolución del indicador desde la línea base hasta la proyección 2030.

Librería: `recharts`. Todos los gráficos deben tener `Tooltip` personalizado con fuente y año.

---

## 9. Próximas Iteraciones (Backlog)

- [ ] **Reporte de Brechas:** PDF automático que lista los indicadores más rezagados por país.
- [ ] **Alertas por correo:** Suscripción a indicadores específicos con notificaciones de cambio.
- [ ] **Comparador de países:** Ver el mismo indicador para múltiples países en paralelo.
- [ ] **API Backend:** Endpoint `/api/indicators?framework=&axis=&country=` con datos en tiempo real.
- [ ] **Línea de tiempo histórica:** Visualizar hitos de compromisos y cumplimientos desde 2015.
