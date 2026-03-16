# Skill: Centro de Documentación (Biblioteca Digital)

> **Versión:** 2.0 | **Última actualización:** Marzo 2026  
> **Módulo en producción:** `/technical/docs` → `DocCenter.jsx` + `DocSearch.jsx`

---

## 1. Propósito y Contexto

El **Centro de Documentación** es la biblioteca institucional del OAR. Centraliza el conocimiento técnico, legal y metodológico producido por las instituciones del SICA (CCAD, OSPESCA, SE-SICA y sus entidades nacionales asociadas), haciéndolo accesible, buscable y contextualizable dentro del ecosistema del Observatorio.

El módulo no es un simple repositorio de links: cada documento está enriquecido con metadatos que lo conectan con los Ejes ERAM, permite búsqueda en tiempo real, y ofrece un historial de versiones.

---

## 2. Arquitectura del Módulo

```
/technical/docs
  └── DocCenter.jsx            (página wrapper: breadcrumbs + layout)
        └── DocSearch.jsx      (motor: filtros + resultados)
              └── DocCard      (tarjeta individual de documento, inline)
```

### Flujo de datos:

```
documentation.js ──▶ DocSearch.jsx
constants.js     ──▶ DocSearch.jsx (lista de países SICA)
URL param ?q=    ──▶ useState(initialQuery) en DocSearch
```

---

## 3. Estructura de Datos

### Fuente principal: `src/data/documentation.js`

```javascript
export const DOCUMENTATION_DATA = [
  {
    id: "DOC-001",
    name: "Informe Regional del Estado de los Bosques 2023",
    description: "Análisis exhaustivo de la cobertura forestal en la región SICA, incluyendo tasas de deforestación y esfuerzos de restauración.",
    source: "CCAD / FAO",
    author: "Comisión Centroamericana de Ambiente y Desarrollo",
    type: "PDF",                    // "PDF" | "XLS" | "MAP" | "Manual" | "Normativa"
    date: "2023-11",                // "YYYY-MM"
    country: "Regional",            // "Regional" | nombre del país SICA
    ejes: ["Bosques"],              // Array — múltiples ejes permitidos
    downloadUrl: "#",               // URL al archivo (GitHub Pages, Drive público)
    thumbnail: "https://images.unsplash.com/photo-...",
    versions: [
      { year: 2023, url: "#" },
      { year: 2022, url: "#" }
    ],
    tags: ["FRA", "deforestación", "carbono"]  // Búsqueda secundaria
  }
];
```

### Campos obligatorios vs. opcionales:

| Campo | Obligatorio | Observaciones |
|---|---|---|
| `id` | ✅ | Formato `DOC-NNN` |
| `name` | ✅ | Título completo oficial |
| `description` | ✅ | 1-3 oraciones |
| `source` | ✅ | Institución emisora |
| `type` | ✅ | Ver tipos válidos |
| `date` | ✅ | `YYYY-MM` |
| `country` | ✅ | `"Regional"` o nombre del SICA |
| `ejes` | ✅ | Al menos uno |
| `downloadUrl` | ✅ | `"#"` si no disponible aún |
| `author` | ⬜ | Persona o institución |
| `thumbnail` | ⬜ | Recomendado; usar Unsplash si no hay portada oficial |
| `versions` | ⬜ | Si existe historial multi-año |
| `tags` | ⬜ | Para búsqueda ampliada |

---

## 4. Comportamiento del Buscador

### Estado de filtros en `DocSearch.jsx`:

```javascript
const [searchTerm, setSearchTerm] = useState(initialQuery);  // Desde URL ?q=
const [selectedCountry, setSelectedCountry] = useState('Todos');
const [selectedAxis, setSelectedAxis] = useState('Todos');
```

### Lógica de filtrado (en `useMemo`):

```javascript
const filteredDocs = useMemo(() => {
  return DOCUMENTATION_DATA.filter(doc => {
    const matchesSearch = searchTerm === '' ||
      [doc.name, doc.description, doc.author, ...(doc.tags || [])]
        .some(field => field?.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCountry = selectedCountry === 'Todos' || doc.country === selectedCountry;
    const matchesAxis = selectedAxis === 'Todos' || doc.ejes.includes(selectedAxis);

    return matchesSearch && matchesCountry && matchesAxis;
  });
}, [searchTerm, selectedCountry, selectedAxis]);
```

### Valores válidos de `selectedCountry`:

`'Todos'` (base) + `'Regional'` + nombres exactos de los 8 países SICA.

Generados dinámicamente desde `constants.js`:
```javascript
const countries = ['Todos', 'Regional', ...SICA_COUNTRIES.map(c => c.name)];
```

### Valores válidos de `selectedAxis`:

`'Todos'` (base) + todos los valores únicos de `doc.ejes` en `DOCUMENTATION_DATA`.

---

## 5. Layout y Componentes UI

### 5.1 DocCenter.jsx — Encabezado con Breadcrumbs

```jsx
// Breadcrumbs
<nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
  <Link to="/"><Home className="h-4 w-4" /></Link>
  <ChevronRight className="h-3 w-3" />
  <span className="text-slate-700 font-semibold">Biblioteca Digital</span>
</nav>

// Header
<Badge variant="info" className="uppercase tracking-[0.2em] font-black">
  Centro de Documentación
</Badge>
<h1 className="text-5xl font-serif font-black text-slate-900 mt-3">
  Biblioteca <span className="text-brand-primary">Institucional</span>
</h1>
<p className="text-slate-500 text-lg mt-3 max-w-2xl">
  Biblioteca institucional de recursos, reportes y normativas regionales.
</p>
```

### 5.2 DocSearch.jsx — Barra de Filtros

```jsx
<div className="flex items-center gap-3 mb-6">
  <Filter className="h-4 w-4 text-slate-400" />
  <span className="text-xs font-black uppercase text-slate-400">Filtros Avanzados</span>

  {/* Select País */}
  <div className="relative">
    <select value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)}
      className="appearance-none bg-slate-50 border-none rounded-xl px-4 py-2 pr-10 text-xs font-bold text-slate-600">
      {countries.map(c => (
        <option key={c} value={c}>
          {c === 'Todos' ? 'Todos los Países' : c}
        </option>
      ))}
    </select>
    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
  </div>

  {/* Select Eje */}
  <div className="relative">
    <select value={selectedAxis} onChange={e => setSelectedAxis(e.target.value)}
      className="appearance-none bg-slate-50 border-none rounded-xl px-4 py-2 pr-10 text-xs font-bold text-slate-600">
      {axes.map(a => (
        <option key={a} value={a}>
          {a === 'Todos' ? 'Todos los Ejes' : a}
        </option>
      ))}
    </select>
    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
  </div>

  <span className="ml-auto text-xs text-slate-400 font-bold">
    {filteredDocs.length} documentos encontrados
  </span>
</div>
```

### 5.3 DocCard — Anatomía Visual

```jsx
const DocCard = ({ doc }) => {
  const typeColors = {
    'PDF': 'text-red-600 bg-red-50',
    'XLS': 'text-emerald-600 bg-emerald-50',
    'MAP': 'text-blue-600 bg-blue-50',
    'Manual': 'text-indigo-600 bg-indigo-50',
    'Normativa': 'text-amber-600 bg-amber-50'
  };

  return (
    <Card className="group overflow-hidden flex flex-col">
      {/* Thumbnail con efecto grayscale → color */}
      <div className="h-40 overflow-hidden relative">
        <img
          src={doc.thumbnail}
          alt={doc.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-110 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className={`px-2 py-0.5 rounded text-[10px] font-black ${typeColors[doc.type]}`}>
            {doc.type}
          </span>
          <span className="bg-white/90 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold">
            {doc.country}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-slate-900 text-sm leading-snug mb-2 line-clamp-2">
          {doc.name}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 flex-1">
          {doc.description}
        </p>
        <p className="text-[10px] text-slate-400 mt-2 font-semibold">
          {doc.author} · {doc.date}
        </p>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
          <div className="flex flex-wrap gap-1">
            {doc.ejes.map(e => <Badge key={e} className="text-[9px] px-2">{e}</Badge>)}
          </div>
          <a href={doc.downloadUrl} className="text-brand-primary hover:underline text-xs font-bold flex items-center gap-1">
            <Download className="h-3.5 w-3.5" /> Descargar
          </a>
        </div>

        {doc.versions?.length > 1 && (
          <details className="mt-3">
            <summary className="text-[10px] text-slate-400 font-semibold cursor-pointer">
              {doc.versions.length} versiones anteriores
            </summary>
            <ul className="mt-1.5 space-y-1 pl-3 border-l border-slate-200">
              {doc.versions.map(v => (
                <li key={v.year}>
                  <a href={v.url} className="text-[10px] text-slate-400 hover:text-brand-primary">
                    {v.year} →
                  </a>
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </Card>
  );
};
```

---

## 6. Integración con Home.jsx

La sección **"Biblioteca Digital"** del Home muestra los primeros 3 documentos de `documentation.js` filtrados por `country === "Regional"`.

El campo de búsqueda del Home navega al DocCenter con el query pre-llenado:

```javascript
// Home.jsx
const handleDocSearch = (e) => {
  e.preventDefault();
  navigate(`/technical/docs?q=${encodeURIComponent(searchTerm)}`);
};

// DocCenter.jsx / DocSearch.jsx
const [searchParams] = useSearchParams();
const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
```

---

## 7. Estado Vacío (Empty State)

```jsx
{filteredDocs.length === 0 && (
  <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
    <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
      <Search className="h-10 w-10 text-slate-200" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-2">Sin resultados</h3>
    <p className="text-slate-500 mb-8">Prueba con otras palabras clave o limpia los filtros.</p>
    <Button onClick={resetFilters} variant="outline" className="rounded-full px-8">
      Limpiar todos los filtros
    </Button>
  </div>
)}
```

---

## 8. Próximas Iteraciones (Backlog)

- [ ] **Carga de documentos:** Panel de administración en `/admin/docs` para subir nuevos recursos.
- [ ] **Vista previa inline:** Modal con visor de PDF embebido (iframe o `react-pdf`).
- [ ] **Colecciones temáticas:** Listas curadas de documentos para temas clave.
- [ ] **Estadísticas de uso:** Contador de descargas por documento.
- [ ] **Búsqueda full-text:** Indexar el contenido de los PDFs con Typesense o Elasticsearch.
- [ ] **Notificaciones:** Alerta cuando se publica una nueva versión de un documento favorito.
