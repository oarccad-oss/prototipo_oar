# Skill: Mapa del Sitio Esquemático

> **Versión:** 2.0 | **Última actualización:** Marzo 2026  
> **Módulo en producción:** `/mapa_sitio_independiente` → `SitemapIndependent.jsx`

---

## 1. Propósito y Contexto

El **Mapa del Sitio Esquemático** es una herramienta de arquitectura de información que visualiza la estructura completa del OAR de forma interactiva. Sirve a dos audiencias:

1. **Usuarios nuevos:** Entender qué ofrece el portal y a dónde navegar.
2. **Desarrolladores y arquitectos:** Documentar y comunicar la jerarquía de rutas y secciones.

No es un sitemap XML para buscadores: es una **herramienta de orientación visual** con interactividad, previsualizaciones tipo hover y navegación directa por clic.

---

## 2. Arquitectura del Módulo

```
/mapa_sitio_independiente    → SitemapIndependent.jsx
```

Este módulo es una ruta **independiente** (no usa el `Layout` principal ni el `Footer`). Es una experiencia autónoma de pantalla completa.

### Modo de acceso:
- Desde el símbolo `/` en la navbar → `GlobalSearch` o acceso directo a `/mapa_sitio_independiente`.
- Referenciado en el Mapa del Sitio de footer.

---

## 3. Estructura de Datos del Sitio

La jerarquía del OAR está representada como un árbol de nodos:

```javascript
const SITE_STRUCTURE = [
  {
    id: "home",
    label: "Inicio",
    path: "/",
    icon: "Home",
    level: 0,
    badge: null,
    description: "Portal principal del Observatorio Ambiental Regional.",
    children: [
      {
        id: "strategic-questions",
        label: "Preguntas Estratégicas",
        path: "/preguntas",
        icon: "HelpCircle",
        level: 1,
        badge: "9 preguntas",
        description: "Respuestas basadas en evidencia a interrogantes clave.",
        children: [
          { id: "q-bosques", label: "Estado de Bosques", path: "/preguntas/estado-bosques", icon: "TreePine", level: 2 },
          { id: "q-30x30",   label: "Meta 30x30",        path: "/preguntas/meta-30x30",    icon: "Target",   level: 2 },
          // ... resto de preguntas
        ]
      },
      {
        id: "eram-axes",
        label: "Ejes ERAM",
        path: "/strategic-axis",
        icon: "Layers",
        level: 1,
        badge: "5 ejes",
        children: [
          { id: "eje-calidad",  label: "Calidad Ambiental",  path: "/strategic-axis/calidad",  level: 2, color: "blue" },
          { id: "eje-mares",    label: "Mares",               path: "/strategic-axis/mares",    level: 2, color: "cyan" },
          { id: "eje-agua",     label: "Agua",                path: "/strategic-axis/agua",     level: 2, color: "sky" },
          { id: "eje-bosques",  label: "Bosques",             path: "/strategic-axis/bosques",  level: 2, color: "emerald" },
          { id: "eje-clima",    label: "Cambio Climático",    path: "/strategic-axis/clima",    level: 2, color: "purple" }
        ]
      },
      {
        id: "data",
        label: "Datos",
        path: "/data/cifras",
        icon: "Database",
        level: 1,
        children: [
          { id: "cifras",    label: "Cifras Regionales",    path: "/data/cifras",   level: 2, icon: "BarChart3" },
          { id: "dashboard", label: "Tablero General",      path: "/technical/dashboard", level: 2, icon: "LayoutDashboard" }
        ]
      },
      {
        id: "maps",
        label: "Mapas",
        path: "/technical/maps",
        icon: "MapPin",
        level: 1,
        children: [
          { id: "map-explorer",   label: "Visor Regional",     path: "/technical/map",             level: 2 },
          { id: "map-comparator", label: "Comparador de Mapas",path: "/technical/map-comparator",  level: 2 },
          { id: "geo-analysis",   label: "Análisis Geoespacial",path: "/technical/geo-analysis",   level: 2 }
        ]
      },
      {
        id: "analysis",
        label: "Análisis",
        path: "/analisis-multidimensional",
        icon: "BarChart2",
        level: 1
      },
      {
        id: "monitoring",
        label: "Monitoreo",
        path: "/monitoring",
        icon: "Activity",
        level: 1,
        children: [
          { id: "mon-strategic",  label: "Monitoreo Estratégico", path: "/monitoring/strategic",   level: 2 },
          { id: "mon-operational",label: "Monitoreo Operativo",   path: "/monitoring/operational", level: 2 }
        ]
      },
      {
        id: "docs",
        label: "Documentos",
        path: "/technical/docs",
        icon: "Library",
        level: 1
      }
    ]
  }
];
```

---

## 4. Modos de Visualización

### 4.1 Vista en Árbol Horizontal (`HorizontalTree`)

Renderiza el sitemap como un árbol que se expande de izquierda a derecha. Cada nivel ocupa una columna. Las ramas se conectan mediante líneas SVG.

```
[Inicio]
  ├── [Preguntas] ──── [Estado Bosques]
  │                 ├── [Meta 30x30]
  │                 └── [Incendios]
  ├── [Ejes ERAM] ──── [Calidad]
  │                 ├── [Mares]
  │                 └── [Agua]
  └── [Datos] ──── [Cifras]
               └── [Dashboard]
```

### 4.2 Vista por Niveles (`LevelColumns`)

Columnas verticales agrupadas por profundidad. Ideal para entender de un vistazo cuántos módulos hay en cada nivel de jerarquía.

```
NIVEL 0      NIVEL 1         NIVEL 2            NIVEL 3
─────────    ─────────────   ────────────────   ─────────
[Inicio]  ── [Preguntas]  ── [Estado Bosques]
             [Ejes ERAM]  ── [Calidad Amb.]
             [Datos]      ── [Cifras]        ── [Exportar]
             [Mapas]      ── [Visor]
             [Análisis]
             [Monitoreo]  ── [Estratégico]
             [Documentos]
```

### Selector de vista:

```jsx
<div className="flex gap-2">
  <Button
    variant={viewMode === 'tree' ? 'default' : 'outline'}
    size="sm"
    onClick={() => setViewMode('tree')}
  >
    <GitBranch className="h-4 w-4 mr-1" /> Árbol
  </Button>
  <Button
    variant={viewMode === 'levels' ? 'default' : 'outline'}
    size="sm"
    onClick={() => setViewMode('levels')}
  >
    <Columns className="h-4 w-4 mr-1" /> Niveles
  </Button>
</div>
```

---

## 5. Componentes UI Estándar

### NodeCard — Nodo del Sitemap

```jsx
const NodeCard = ({ node, isActive, onHover, onClick }) => (
  <div
    className={cn(
      "group relative flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-200",
      "hover:shadow-xl hover:scale-105 hover:border-brand-primary",
      isActive ? "bg-brand-primary text-white border-brand-primary shadow-lg" : "bg-white border-slate-200 text-slate-700"
    )}
    onMouseEnter={() => onHover(node)}
    onMouseLeave={() => onHover(null)}
    onClick={() => onClick(node)}
  >
    {/* Ícono */}
    <div className={cn("p-2 rounded-lg", isActive ? "bg-white/20" : "bg-slate-50")}>
      <NodeIcon className={cn("h-4 w-4", isActive ? "text-white" : "text-slate-500")} />
    </div>

    {/* Label */}
    <div className="flex-1 min-w-0">
      <p className="font-semibold text-sm truncate">{node.label}</p>
      {node.badge && (
        <p className={cn("text-[10px] font-bold", isActive ? "text-white/70" : "text-slate-400")}>
          {node.badge}
        </p>
      )}
    </div>

    {/* Indicador de hijos */}
    {node.children?.length > 0 && (
      <ChevronRight className={cn("h-3.5 w-3.5 shrink-0", isActive ? "text-white/70" : "text-slate-400")} />
    )}
  </div>
);
```

### QuickPeek — Tooltip de Vista Previa

Panel flotante que aparece al hacer hover sobre un nodo. Muestra:
- Ícono grande del módulo.
- Ruta URL del nodo.
- Descripción breve.
- Badge de nivel de profundidad.
- Botón "Ir a esta sección →".

```jsx
const QuickPeek = ({ node, position }) => (
  <div
    className="absolute z-50 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 animate-in fade-in zoom-in-95 duration-150"
    style={{ top: position.y, left: position.x }}
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="p-3 bg-slate-50 rounded-xl">
        <NodeIcon className="h-6 w-6 text-slate-600" />
      </div>
      <div>
        <p className="font-bold text-slate-900">{node.label}</p>
        <p className="text-[10px] text-slate-400 font-mono">{node.path}</p>
      </div>
    </div>
    {node.description && (
      <p className="text-xs text-slate-500 mb-4">{node.description}</p>
    )}
    <div className="flex items-center justify-between">
      <span className="text-[10px] text-slate-400">Nivel {node.level}</span>
      <Link to={node.path} className="text-xs font-bold text-brand-primary hover:underline">
        Ir a esta sección →
      </Link>
    </div>
  </div>
);
```

---

## 6. Tour Guiado (Onboarding)

El Mapa del Sitio incluye un tour de introducción activable con el botón `"Tour guiado"`:

| Paso | Elemento destacado | Mensaje |
|---|---|---|
| 1 | Bloque "Inicio" | "Este es el nodo raíz del OAR." |
| 2 | Bloque "Preguntas" | "Las preguntas estratégicas son nuestro punto de entrada más visitado." |
| 3 | Bloque "Ejes ERAM" | "Los 5 ejes estructuran todo el conocimiento ambiental." |
| 4 | Toggle de vista | "Puedes cambiar entre vista de árbol y vista por niveles." |
| 5 | Node + QuickPeek | "Haz hover sobre cualquier nodo para ver una Vista Rápida." |

---

## 7. Directrices de Estilo

- **Nodos:** `rounded-xl border`, hover `scale-105 shadow-xl` con transición de 200ms.
- **Conexiones SVG:** Líneas con `stroke-slate-200` y `stroke-width="1.5"`. Curvas Bezier entre nodos.
- **Fondo:** `bg-slate-50` global para que los nodos blancos resalten.
- **Tipografía de ruta (path):** `font-mono text-[10px] text-slate-400`.
- **Icono principal:** `Layers` para la página del sitemap en la navbar.

---

## 8. Próximas Iteraciones (Backlog)

- [ ] **Generación automática:** Parsear `App.jsx` en tiempo de build para generar el sitemap automáticamente.
- [ ] **Estado de implementación:** Indicar visualmente qué nodos están en producción, en desarrollo o planificados.
- [ ] **Exportar como PNG:** Captura de pantalla del árbol completo para documentación.
- [ ] **Modo "Dónde estoy":** Al embeber el sitemap dentro del layout, resaltar automáticamente el nodo de la ruta activa.
- [ ] **Filtro por rol:** Mostrar solo los nodos accesibles según el rol del usuario (público, técnico, admin).
