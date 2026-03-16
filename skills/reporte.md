# Skill: Reportes Temáticos

> **Versión:** 2.0 | **Última actualización:** Marzo 2026  
> **Módulo relacionado:** `/technical/docs` → `DocCenter.jsx` + `DocSearch.jsx`

---

## 1. Propósito y Contexto

Los **Reportes Temáticos** son el punto de convergencia entre el análisis científico y la comunicación pública. Son documentos (PDF, Excel, mapas interactivos) producidos por instituciones regionales (CCAD, OSPESCA, SE-SICA) que el OAR cataloga y distribuye.

El módulo cumple dos funciones:
1. **Repositorio:** Organizar y hacer accesible el conocimiento institucional acumulado.
2. **Storytelling:** Presentar el reporte no como un link de descarga sino como una **experiencia de descubrimiento** (tarjeta rica con contexto, autoría y vínculo con ejes estratégicos).

---

## 2. Arquitectura del Módulo

```
/technical/docs              → DocCenter.jsx
  └── DocSearch.jsx          → Motor de búsqueda y filtrado
        └── DocCard          → (inline) Tarjeta de documento
```

---

## 3. Estructura de Datos

### Fuente principal: `src/data/documentation.js`

```javascript
{
  id: "DOC-001",
  name: "Informe Regional del Estado de los Bosques 2023",
  description: "Análisis exhaustivo de la cobertura forestal en la región SICA, incluyendo tasas de deforestación y esfuerzos de restauración.",
  source: "CCAD / FAO",
  author: "Comisión Centroamericana de Ambiente y Desarrollo",
  type: "PDF",                   // "PDF" | "XLS" | "MAP" | "Manual" | "Normativa"
  date: "2023-11",               // Año-Mes de publicación
  country: "Regional",           // "Regional" | nombre del país SICA
  ejes: ["Bosques"],             // Array, puede tener múltiples ejes
  downloadUrl: "#",              // URL directa al archivo (GitHub, Drive)
  thumbnail: "https://...",      // Imagen de portada (Unsplash o similar)
  versions: [
    { year: 2023, url: "#" },
    { year: 2022, url: "#" },
    { year: 2021, url: "#" }
  ],
  tags: ["deforestación", "FRA", "carbono"]  // Para búsqueda ampliada
}
```

### Tipos de documento y colores semánticos:

| Tipo | Color primario | Ícono |
|---|---|---|
| `PDF` | `red-600` | `FileText` |
| `XLS` / `CSV` | `emerald-600` | `Table2` |
| `MAP` | `blue-600` | `Map` |
| `Manual` | `indigo-600` | `BookOpen` |
| `Normativa` | `amber-600` | `Scale` |

---

## 4. Comportamiento del Buscador (`DocSearch.jsx`)

### Filtros disponibles:

| Filtro | Tipo | Componente UI |
|---|---|---|
| Texto libre | Input | Filtra en `name`, `description`, `author`, `tags` |
| País | Select único | Opciones: `Todos` (default) + países SICA |
| Eje Temático | Select único | Opciones: `Todos` (default) + ejes ERAM |

### Lógica de filtrado:

```javascript
const filteredDocs = useMemo(() => {
  return DOCUMENTATION_DATA.filter(doc => {
    const matchesSearch = searchTerm === '' ||
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCountry = selectedCountry === 'Todos' || doc.country === selectedCountry;
    const matchesAxis = selectedAxis === 'Todos' || doc.ejes.includes(selectedAxis);

    return matchesSearch && matchesCountry && matchesAxis;
  });
}, [searchTerm, selectedCountry, selectedAxis]);
```

**Nota importante:** Los selectores usan el valor `'Todos'` (en español) como estado base, nunca `'All'`.

---

## 5. Layout y Componentes UI

### 5.1 DocCard — Anatomía

```
┌─────────────────────────────────────────────────────┐
│ [THUMBNAIL - imagen a color en hover, gris en rest] │
│ [PDF] [REGIONAL]                                     │
├─────────────────────────────────────────────────────┤
│ Informe Regional del Estado de los Bosques 2023      │
│                                                      │
│ Análisis exhaustivo de la cobertura forestal...      │
│                                                      │
│ CCAD / FAO  ·  Nov 2023                              │
├─────────────────────────────────────────────────────┤
│ [Bosques]  [Biodiversidad]          [↓ Descargar]   │
└─────────────────────────────────────────────────────┘
```

```jsx
const DocCard = ({ doc }) => (
  <Card className="group overflow-hidden flex flex-col">
    {/* Thumbnail */}
    <div className="relative h-40 overflow-hidden">
      <img
        src={doc.thumbnail}
        alt={doc.name}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-110"
      />
      {/* Badges sobre la imagen */}
      <div className="absolute top-3 left-3 flex gap-2">
        <Badge style={typeColor[doc.type]}>{doc.type}</Badge>
        <Badge variant="secondary">{doc.country}</Badge>
      </div>
    </div>

    {/* Contenido */}
    <div className="p-5 flex flex-col flex-1">
      <h3 className="font-bold text-slate-900 mb-2 line-clamp-2">{doc.name}</h3>
      <p className="text-sm text-slate-500 line-clamp-3 flex-1">{doc.description}</p>

      {/* Metadatos */}
      <p className="text-xs text-slate-400 mt-3">{doc.author} · {doc.date}</p>

      {/* Ejes y descarga */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
        <div className="flex flex-wrap gap-1">
          {doc.ejes.map(e => <Badge key={e} axis={e} />)}
        </div>
        <Button href={doc.downloadUrl} size="sm" variant="outline">
          <Download className="h-3.5 w-3.5 mr-1" /> Descargar
        </Button>
      </div>

      {/* Versiones (si aplica) */}
      {doc.versions?.length > 1 && (
        <details className="mt-3 text-xs text-slate-400">
          <summary className="cursor-pointer font-semibold">
            {doc.versions.length} versiones disponibles
          </summary>
          <ul className="mt-2 space-y-1 pl-2">
            {doc.versions.map(v => (
              <li key={v.year}>
                <a href={v.url} className="hover:text-brand-primary">{v.year} →</a>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  </Card>
);
```

---

## 6. Breadcrumb y Encabezado

```jsx
// DocCenter.jsx - Header
<nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
  <Link to="/"><Home className="h-4 w-4" /></Link>
  <ChevronRight className="h-3 w-3" />
  <span className="text-slate-700 font-semibold">Biblioteca Digital</span>
</nav>

<Badge variant="info" className="uppercase tracking-[0.2em]">Centro de Documentación</Badge>
<h1 className="text-5xl font-serif font-black text-slate-900 mt-4">
  Biblioteca <span className="text-brand-primary">Institucional</span>
</h1>
```

---

## 7. Estilo y Directrices Visuales

- **Thumbnails:** Escala de grises por defecto (`grayscale`), a color total en `group-hover` con transición de 500ms.
- **Thumbnails source:** Imágenes de Unsplash relacionadas al eje del documento. Sin placeholders.
- **Hover de tarjeta:** `hover:shadow-xl transition-shadow duration-300`.
- **Versiones:** Acordeón `<details>` nativo para minimizar dependencias JS.
- **Responsive grid:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`.

---

## 8. Integración con Home.jsx

En el Home, la sección "Biblioteca Digital" muestra los primeros 3 documentos de `documentation.js` (filtrados por `country === "Regional"`) con un enlace "Ver todos" que redirige a `/technical/docs`.

El campo de búsqueda del Home pre-llena el buscador del DocCenter mediante `useNavigate`:

```javascript
navigate(`/technical/docs?q=${encodeURIComponent(searchTerm)}`);
```

Y en DocCenter, se lee el param al montar:

```javascript
const [searchParams] = useSearchParams();
const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
```

---

## 9. Próximas Iteraciones (Backlog)

- [ ] **Vista previa inline:** Botón "Vista rápida" que abre el PDF dentro del modal sin salir de la página.
- [ ] **Búsqueda full-text en PDFs:** Integración con un índice de Elasticsearch o Typesense.
- [ ] **Carga de documentos por usuarios administradores:** Panel de upload en `/admin/docs`.
- [ ] **Estadísticas de uso:** Contador de descargas por documento.
- [ ] **Colecciones temáticas:** Listas curadas de documentos para temas específicos (ej. "Todo sobre manglares").
