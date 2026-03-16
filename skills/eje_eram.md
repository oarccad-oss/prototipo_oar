# Skill: Eje Estratégico ERAM

> **Versión:** 2.0 | **Última actualización:** Marzo 2026  
> **Módulos en producción:** `/strategic-axis/*` → `StrategicAxisGeneric.jsx`

---

## 1. Propósito y Contexto

Los **Ejes Estratégicos ERAM** son los cinco pilares temáticos de la Estrategia Regional Ambiental Marco (ERAM). Cada eje funciona como una "landing page" temática que agrega y contextualiza todo el conocimiento ambiental disponible en el OAR bajo un área específica: Calidad Ambiental, Mares y Biodiversidad, Agua, Bosques, y Cambio Climático.

Un eje es la **puerta de entrada** del tomador de decisiones: llega por tema y desde ahí accede a preguntas, cifras, indicadores, mapas y documentos relacionados.

---

## 2. Arquitectura del Módulo

```
/strategic-axis/calidad    → StrategicAxisGeneric (axisLine=1, color=blue)
/strategic-axis/mares      → StrategicAxisGeneric (axisLine=2, color=cyan)
/strategic-axis/agua       → StrategicAxisGeneric (axisLine=3, color=blue/sky)
/strategic-axis/bosques    → StrategicAxisHome    (personalizado, axisLine=4)
/strategic-axis/clima      → StrategicAxisGeneric (axisLine=5, color=purple)
```

> **Nota:** El eje de Bosques (`axisLine=4`) usa `StrategicAxisHome`, que es una versión más rica con historias narrativas adicionales (`ForestStoryDetail`). Los demás ejes usan el componente genérico.

---

## 3. Props de `StrategicAxisGeneric`

```javascript
// App.jsx - Ejemplo de ruta con props
<Route path="/strategic-axis/agua" element={
  <StrategicAxisGeneric
    axisTitle="Gestión Integral del Recurso Hídrico"
    axisLine="3"
    axisColor="blue"       // Clave del mapeo de colores (ver sección 4)
    axisIcon={Droplets}    // Componente de lucide-react
    description="Cuencas, disponibilidad hídrica, presión y riesgos asociados al agua."
  />
} />
```

---

## 4. Sistema de Colores por Eje (COLOR_MAPS)

Los colores **NUNCA** se generan dinámicamente con template strings (ej. \`bg-${color}-100\`). Tailwind purga las clases dinámicas. Se usa un objeto de mapeo estático:

```javascript
// En StrategicAxisGeneric.jsx
const COLOR_MAPS = {
  blue: {
    gradient: 'from-blue-50 via-white to-white',
    badge: 'bg-blue-100 text-blue-800',
    border: 'border-blue-200',
    accent: 'text-blue-600',
    button: 'bg-blue-600 hover:bg-blue-700 text-white',
    icon: 'text-blue-500'
  },
  cyan: {
    gradient: 'from-cyan-50 via-white to-white',
    badge: 'bg-cyan-100 text-cyan-800',
    border: 'border-cyan-200',
    accent: 'text-cyan-600',
    button: 'bg-cyan-600 hover:bg-cyan-700 text-white',
    icon: 'text-cyan-500'
  },
  emerald: {
    gradient: 'from-emerald-50 via-white to-white',
    badge: 'bg-emerald-100 text-emerald-800',
    border: 'border-emerald-200',
    accent: 'text-emerald-600',
    button: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    icon: 'text-emerald-500'
  },
  purple: {
    gradient: 'from-purple-50 via-white to-white',
    badge: 'bg-purple-100 text-purple-800',
    border: 'border-purple-200',
    accent: 'text-purple-600',
    button: 'bg-purple-600 hover:bg-purple-700 text-white',
    icon: 'text-purple-500'
  }
};
```

### Tabla de asignación:

| Eje | `axisColor` | Paleta visual |
|---|---|---|
| Eje 1 - Calidad Ambiental | `"blue"` | Azul institucional |
| Eje 2 - Mares y Biodiversidad | `"cyan"` | Cian oceánico |
| Eje 3 - Agua | `"blue"` | Azul agua (misma paleta que Calidad) |
| Eje 4 - Bosques | `"emerald"` | Verde esmeralda forestal |
| Eje 5 - Cambio Climático | `"purple"` | Púrpura climático |

---

## 5. Layout Estándar de la Página

### 5.1 Hero Section

```jsx
<div className={`bg-gradient-to-br ${colors.gradient} border-b ${colors.border}`}>
  <div className="container mx-auto px-4 py-16">
    {/* Número del eje + badge */}
    <div className="flex items-center gap-4 mb-6">
      <span className="text-8xl font-black text-slate-100/80">{axisLine}</span>
      <Badge className={colors.badge}>Eje ERAM {axisLine}</Badge>
    </div>
    
    {/* Título + ícono */}
    <div className="flex items-start gap-4">
      <axisIcon className={`h-12 w-12 ${colors.icon} mt-1`} />
      <h1 className="text-5xl font-serif font-black text-slate-900">{axisTitle}</h1>
    </div>
    
    {/* Descripción */}
    <p className="text-xl text-slate-500 mt-4 max-w-2xl">{description}</p>
  </div>
</div>
```

### 5.2 Módulos de Consulta (Grid 2x2 o 3x2)

Cada tarjeta lleva al módulo relacionado con el eje. Tarjetas estándar:

| Módulo | Ícono | Ruta destino |
|---|---|---|
| Preguntas | `HelpCircle` | `/preguntas?eje={axis}` |
| Cifras | `BarChart3` | `/data/cifras?eje={axis}` |
| Indicadores | `Target` | `/monitoring?eje={axis}` |
| Documentos | `Library` | `/technical/docs?eje={axis}` |
| Mapa | `MapPin` | `/technical/map?eje={axis}` |

### 5.3 "Dato del Día" (opcional)

Tarjeta rotativa con un hecho relevante del eje. Datos provenientes de `cifras.json` filtrados por `eje_tematico` y `pais: "Regional"`.

### 5.4 Guía de la Vista (Modal)

Botón `"¿Cómo usar esta vista?"` que abre un modal con:
- Imagen explicativa (URL en `src/data/viewGuides.json`).
- Texto de onboarding para el usuario nuevo.

```json
// src/data/viewGuides.json - Estructura por ruta
{
  "/strategic-axis/agua": {
    "title": "Eje de Gestión Hídrica",
    "image": "https://...",
    "steps": [
      "Explora las preguntas estratégicas sobre disponibilidad de agua.",
      "Revisa los indicadores de cumplimiento del Marco Global."
    ]
  }
}
```

---

## 6. Fuentes de Datos por Eje

| Eje | Fuentes principales |
|---|---|
| Calidad Ambiental | WHO Air Quality DB, EDGAR Database, GEMS/Water |
| Mares | Ocean Health Index, OSPESCA, Healthy Reefs Initiative |
| Agua | FAO AQUASTAT, SIASAR, JMP UNICEF/WHO |
| Bosques | Global Forest Watch, FRA/FAO, ITTO |
| Clima | IPCC AR6, Copernicus C3S, FEWS NET |

---

## 7. Layout Responsivo

- **Mobile:** Hero apilado, módulos en columna única.
- **Tablet (md):** Grid 2 columnas para módulos.
- **Desktop (lg):** Grid 3 columnas con sidebar de navegación entre ejes fijo a la izquierda.

---

## 8. Próximas Iteraciones (Backlog)

- [ ] **Navegación entre ejes:** Tabs horizontales o sidebar lateral para pasar de un eje a otro sin volver al inicio.
- [ ] **Widget de estado resumido:** Mini-semáforo del estado de los indicadores del eje directamente en el hero.
- [ ] **Filtro global por país:** Persistent URL param `?pais=CR` que filtre toda la experiencia del eje para un país específico.
- [ ] **Historias del eje:** Para todos los ejes (no solo Bosques), implementar `AxisStoryDetail`.
