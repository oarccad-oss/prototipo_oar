# Skill: Preguntas Estratégicas

> **Versión:** 2.0 | **Última actualización:** Marzo 2026  
> **Módulo en producción:** `/preguntas/*` y `/strategic-questions`

---

## 1. Propósito y Contexto

Las **Preguntas Estratégicas** son el núcleo narrativo del OAR. Cada pregunta encapsula una problemática ambiental de alto nivel que los tomadores de decisiones regionales necesitan responder con urgencia. No son dashboards técnicos: son **relatos basados en datos**, diseñados para comunicar hallazgos científicos de forma accesible.

El módulo opera bajo el principio de **"Respuesta Directa, Evidencia Sólida"**: el usuario llega con una duda y sale con una respuesta clara, contextualizada y accionable.

---

## 2. Arquitectura del Módulo

```
/preguntas                  → QuestionsIndex.jsx   (Índice general)
/preguntas/:slug            → AnswerXxx.jsx         (Respuesta específica)
```

### Páginas de respuesta existentes:
| Ruta | Componente | Eje |
|---|---|---|
| `/preguntas/estado-bosques` | `AnswerForestState` | Bosques |
| `/preguntas/perdida-bosque` | `AnswerForestLoss` | Bosques |
| `/preguntas/meta-30x30` | `AnswerConservation30x30` | Biodiversidad |
| `/preguntas/incendios-activos` | `AnswerActiveFires` | Bosques/Clima |
| `/preguntas/registros-especies` | `AnswerSpeciesRecords` | Biodiversidad |
| `/preguntas/riesgo-sequia` | `AnswerDroughtRisk` | Clima/Agua |
| `/preguntas/seguridad-hidrica` | `AnswerWaterSecurity` | Agua |
| `/preguntas/salud-oceanos` | `AnswerOceanHealth` | Mares |
| `/preguntas/areas-protegidas` | `AnswerProtectedAreas` | Biodiversidad |

---

## 3. Estructura de Datos

### Fuente principal: `src/data/questions.js`

```javascript
// Estructura de una pregunta en el índice
{
  id: "meta-30x30",
  question: "¿Cómo vamos con la meta 30x30?",
  shortAnswer: "La región SICA ha protegido el 20.4% de su territorio terrestre.",
  axis: "Biodiversidad",           // Debe coincidir con claves de eram.js
  path: "/preguntas/meta-30x30",
  icon: Target,                    // Importado desde lucide-react
  complexity: "medium",            // "low" | "medium" | "high"
  lastUpdated: "2024-Q4"
}
```

### Estructura de una respuesta (AnswerXxx.jsx):

```javascript
// Datos internos opcionales cuando no hay un archivo específico
const ANSWER_DATA = {
  headline: "20.4%",                   // El dato más impactante
  headlineUnit: "del territorio protegido",
  context: "Según Protected Planet...",
  sources: [
    {
      name: "WDPA / Protected Planet",
      url: "https://www.protectedplanet.net",
      year: 2024,
      coverage: "Regional"
    }
  ],
  keyFindings: [
    "El 20.4% del territorio terrestre está bajo algún esquema de protección.",
    "Solo Belice supera la meta 30x30 con un 37% protegido.",
    "Los ecosistemas marinos siguen siendo los menos representados."
  ]
}
```

---

## 4. Layout Estándar de una Respuesta

Toda página de respuesta (`AnswerXxx.jsx`) debe seguir esta secuencia de secciones:

### 4.1 Breadcrumb de Navegación
```jsx
<nav aria-label="breadcrumb">
  <ol className="flex items-center gap-2 text-sm text-slate-400">
    <li><Link to="/">Inicio</Link></li>
    <ChevronRight />
    <li><Link to="/preguntas">Preguntas</Link></li>
    <ChevronRight />
    <li className="text-slate-700 font-semibold">{pregunta corta}</li>
  </ol>
</nav>
```

### 4.2 Hero de Pregunta
- Fondo con gradiente suave del color del eje (ver sección 6).
- `h1` en `font-serif`, `text-4xl md:text-6xl`, `font-black`.
- Subtítulo: 1-2 oraciones de contexto en `text-slate-500`.
- Badge del eje ERAM con el color correspondiente.

### 4.3 Dato Ancla ("El Número que lo dice Todo")
```jsx
<Card className="text-center p-12 border-0 shadow-2xl">
  <p className="text-7xl font-black text-emerald-600">{headline}</p>
  <p className="text-xl text-slate-500 mt-2">{headlineUnit}</p>
</Card>
```

### 4.4 Contexto Narrativo (2-3 párrafos)
Utilizando clases `prose prose-slate max-w-3xl` para legibilidad editorial.

### 4.5 Visualización de Soporte
Un gráfico de `recharts` (BarChart, AreaChart o PieChart) con los datos desagregados por país del SICA.

### 4.6 Hallazgos Clave (Key Findings)
Lista de 3-5 bullets con el ícono `CheckCircle2` colour `emerald-500`.

### 4.7 Panel de Fuentes
Componente `DataSourceModal` o lista de fuentes desplegable.

---

## 5. Componentes UI Estándar

| Componente | Uso | Importación |
|---|---|---|
| `Card` | Contenedor de secciones | `../../components/ui/Shared` |
| `Badge` | Etiqueta de eje ERAM | `../../components/ui/Shared` |
| `Button` | Acciones (descargar, compartir) | `../../components/ui/Shared` |
| `BarChart` / `AreaChart` | Visualizaciones | `recharts` |
| `HelpCircle` | Ícono de pregunta abierta | `lucide-react` |
| `CheckCircle2` | Hallazgo confirmado | `lucide-react` |
| `AlertTriangle` | Hallazgo preocupante | `lucide-react` |
| `TrendingDown` | Dato en declive | `lucide-react` |

---

## 6. Sistema de Colores por Eje ERAM

| Eje | Color Tailwind | Hex base |
|---|---|---|
| Bosques (4) | `emerald` | `#059669` |
| Biodiversidad | `teal` | `#0d9488` |
| Agua (3) | `sky` | `#0284c7` |
| Calidad Ambiental (1) | `blue` | `#2563eb` |
| Mares (2) | `cyan` | `#0891b2` |
| Clima (5) | `purple` | `#7c3aed` |
| Incendios | `orange` | `#ea580c` |

---

## 7. Directrices de Animación

```jsx
// Entrada del hero
<div className="animate-in fade-in slide-in-from-bottom-4 duration-700">

// Entrada del dato ancla (con retraso)
<div className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">

// Entrada de hallazgos (con mayor retraso)
<div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500">
```

---

## 8. Responsividad

- **Mobile:** Layout de 1 columna. Gráficos en modo horizontal scroll con `overflow-x-auto`.
- **Tablet (md):** 2 columnas: dato ancla + narrativa.
- **Desktop (lg):** 3 columnas: navegación lateral fija + contenido + índice de secciones.

---

## 9. Accesibilidad

- Todo gráfico debe tener `aria-label` descriptivo.
- Los badges de estado deben incluir texto alternativo, no solo color.
- Los breadcrumbs deben usar `nav aria-label="breadcrumb"`.
- Contraste mínimo WCAG AA en todos los textos sobre fondos de color.

---

## 10. Próximas Iteraciones (Backlog)

- [ ] **Compartir pregunta:** Botón de share que genera URL directa.
- [ ] **Modo Comparación:** Ver la misma pregunta para dos países distintos.
- [ ] **Preguntas relacionadas:** Recomendación de 2-3 preguntas del mismo eje al final.
- [ ] **Fecha de actualización dinámica:** Conectar a API backend para mostrar la última ingesta.
