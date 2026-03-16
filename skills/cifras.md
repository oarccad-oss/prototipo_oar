# Skill: Cifras Regionales

> **Versión:** 2.0 | **Última actualización:** Marzo 2026  
> **Módulo en producción:** `/data/cifras` → `CifrasCenter.jsx`

---

## 1. Propósito y Contexto

El módulo de **Cifras Regionales** es el repositorio de estadísticas ambientales del SICA. Su objetivo principal es ofrecer una interfaz de consulta ágil donde técnicos, periodistas y funcionarios puedan encontrar el dato exacto que necesitan, con su fuente oficial y un breve contexto.

Principio de diseño: **"El dato primero"** — el número es el protagonista, el texto es el soporte.

---

## 2. Arquitectura del Módulo

```
/data/cifras           → CifrasCenter.jsx
  ├── FilterSidebar    → (inline, componente sin archivo propio)
  └── CifraCard        → (inline, renderizado en grid)
```

---

## 3. Estructura de Datos

### Fuente principal: `src/data/cifras.json`

Cada entrada del JSON representa una cifra única para un país o para la región en su conjunto:

```json
{
  "titulo": "PÉRDIDA TOTAL (2010-2023)",
  "valor": "7,000,468",
  "unidad_medida": "ha",
  "bajada": "Pérdida bruta total de dosel arbóreo (>30% densidad de cobertura).",
  "fuente": "Global Forest Watch",
  "eje_tematico": "Bosques",
  "pais": "Regional"
}
```

### Reglas de datos:
1. **Cada cifra existe para la entidad `"Regional"`** (vista por defecto).
2. **Cada cifra existe para los 8 países del SICA:** Guatemala, El Salvador, Honduras, Nicaragua, Costa Rica, Panamá, Belice, República Dominicana.
3. **Total de países/entidades:** 9 (8 países + 1 Regional).
4. **`titulo`:** Siempre en MAYÚSCULAS para consistencia visual.
5. **`valor`:** Cadena de texto, no número, para soportar formato con coma (ej. `"7,000,468"`) y valores especiales (ej. `"-15"`, `"+2.4"`).
6. **`eje_tematico`:** Debe coincidir exactamente con las claves de `getAxisColor()` en `src/lib/eram.js`.

### Ejes temáticos válidos:
`Bosques` | `Biodiversidad` | `Agua` | `Clima` | `Mares` | `Calidad Ambiental` | `Incendios`

---

## 4. Comportamiento de Filtros

### Regla de oro:
> Si no hay ningún país seleccionado → mostrar **únicamente** registros `pais: "Regional"`.  
> Si hay un país seleccionado → mostrar **únicamente** registros de ese país.

```javascript
const matchesCountry = !selectedCountry
  ? item.pais === 'Regional'
  : item.pais === selectedCountry;
```

### Filtros disponibles:
| Filtro | Tipo | Comportamiento |
|---|---|---|
| Búsqueda de texto | Input libre | Filtra en `titulo` y `bajada` |
| País | Selección única | Un solo país activo; deseleccionar vuelve a "Regional" |
| Eje Estratégico | Selección única | Un solo eje activo; deseleccionar muestra todos |

**Nota:** `"Regional"` NO aparece en la lista de botones de país. Es el estado base, no una opción seleccionable.

---

## 5. Layout y Componentes UI

### Estructura de página:

```
┌─────────────────────────────────────────────────────┐
│  HEADER: Badge + H1 + Descripción                   │
├────────────────┬────────────────────────────────────┤
│  SIDEBAR       │  RESULTS AREA                       │
│  - Buscar      │  - Results Header (count + export) │
│  - País        │  - Grid de CifraCards               │
│  - Eje         │  - Paginación                       │
└────────────────┴────────────────────────────────────┘
```

### CifraCard — Anatomía:
```
┌─────────────────────────────────────────────────────┐
│ [TÍTULO EN MAYÚSCULAS]                      [🇬🇹]    │
│                                                      │
│ 7,000,468 ha                                         │
│                                                      │
│ Pérdida bruta total de dosel arbóreo (>30%...        │
├─────────────────────────────────────────────────────┤
│ Global Forest Watch               [Bosques]          │
└─────────────────────────────────────────────────────┘
```

```jsx
<Card 
  className="border-t-4"
  style={{ borderTopColor: getAxisColor(item.eje_tematico) }}
>
  {/* Título + Bandera */}
  <div className="flex justify-between">
    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
      {item.titulo}
    </span>
    <span>{getCountryEmoji(item.pais)}</span>
  </div>

  {/* Valor */}
  <div className="flex items-baseline gap-2 mt-4">
    <span className="text-4xl font-black text-slate-900">{item.valor}</span>
    <span className="text-lg font-bold text-slate-400">{item.unidad_medida}</span>
  </div>

  {/* Bajada */}
  <p className="text-sm text-slate-500 mt-3 flex-1">{item.bajada}</p>

  {/* Footer */}
  <div className="border-t border-slate-50 mt-4 pt-3 flex justify-between">
    <span className="text-[9px] text-slate-300 uppercase">{item.fuente}</span>
    <Badge style={color}>{item.eje_tematico}</Badge>
  </div>
</Card>
```

---

## 6. Sistema de Emojis de Banderas

```javascript
const getCountryEmoji = (country) => ({
  'Belice': '🇧🇿',
  'Guatemala': '🇬🇹',
  'El Salvador': '🇸🇻',
  'Honduras': '🇭🇳',
  'Nicaragua': '🇳🇮',
  'Costa Rica': '🇨🇷',
  'Panamá': '🇵🇦',
  'República Dominicana': '🇩🇴',
  'Regional': '🌎'
}[country] || '📍');
```

---

## 7. Paginación

- **20 ítems por página** (constante `ITEMS_PER_PAGE`).
- Controles: `ChevronLeft` / `ChevronRight` con estado `disabled` en extremos.
- Al cambiar de filtro, resetear a página 1.

---

## 8. Exportación de Datos

| Formato | Comportamiento |
|---|---|
| **CSV** | `data:text/csv` con headers: Titulo, Valor, Unidad, Pais, Eje, Fuente, Descripcion |
| **PDF** | `window.print()` con estilos de impresión que ocultan sidebar y botones |

---

## 9. Directrices de Estilo

- **Borde superior de tarjeta:** Color del eje (`borderTopColor: getAxisColor(eje)`)
- **Tipografía del valor:** `text-4xl font-black text-slate-900` — es el protagonista
- **Hover del card:** `hover:shadow-2xl transition-all` en 300ms
- **Hover del valor:** `group-hover:scale-105 transition-transform origin-left duration-500`
- **Sidebar sticky:** `sticky top-24` con `max-h-[calc(100vh-250px)] overflow-y-auto`

---

## 10. Próximas Iteraciones (Backlog)

- [ ] **Sparklines dentro de la card:** Mini-gráfico de tendencia histórica (3-5 años).
- [ ] **Indicador de cambio:** `▲ +2.1%` vs. año anterior con color semántico.
- [ ] **Modo comparación:** Ver el mismo indicador para todos los países en paralelo.
- [ ] **API Backend:** Reemplazar `cifras.json` por endpoint `/api/cifras?pais=&eje=`.
- [ ] **Favoritos:** Permitir al usuario marcar cifras y exportar su selección personalizada.
