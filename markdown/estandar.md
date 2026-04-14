# Estándares Obligatorios para Productos de Datos — OAR SICA

> **Documento normativo.** Todo producto de datos creado para el OAR SICA **debe** cumplir estas especificaciones sin excepción. No se aceptan variaciones, formatos alternativos ni desviaciones del estándar. Este documento es la fuente de verdad.
>
> **Referencia base:** `INSUMO/Pruebas de Concepto.pdf`
> **Referencia técnica:** `markdown/stack.md`

---

## 1. Preguntas Estratégicas

Las preguntas estratégicas son el punto de entrada del usuario al sistema de información del OAR. Se almacenan en `src/data/questions.js` como un array de objetos JavaScript.

### 1.1 Formato

- **Tipo de archivo:** Módulo JavaScript ES6 (`.js`)
- **Estructura:** Array de objetos exportado como constante nombrada
- **Ubicación obligatoria:** `src/data/questions.js`

### 1.2 Campos Obligatorios

Cada pregunta **debe** contener **todos** los siguientes campos. No se permite omitir ninguno.

| Campo | Tipo | Descripción | Restricciones |
|---|---|---|---|
| `id` | `string` | Identificador único | Formato `kebab-case`. No se repite jamás. Ejemplo: `drought-risk` |
| `icon` | `Component` | Componente de icono Lucide React | Importado desde `lucide-react`. No se usa otra librería de iconos. Ejemplo: `CloudRain` |
| `question` | `string` | Pregunta completa orientada al usuario | Inicia con `¿` y termina con `?`. Máximo 120 caracteres |
| `shortQuestion` | `string` | Versión resumida de la pregunta | Máximo 50 caracteres. Inicia con `¿` y termina con `?` |
| `description` | `string` | Contexto o propósito de la pregunta | Máximo 200 caracteres. Una oración |
| `highlight` | `string` | Respuesta destacada en formato HTML | Debe ser un `<p>` con clase `text-sm text-slate-600`. Valores clave envueltos en `<span>` con `font-bold` y color del eje |
| `path` | `string` | Ruta canónica de la respuesta | Formato: `/preguntas/{id}`. Debe coincidir con una ruta registrada en `App.jsx` |
| `color` | `string` | Color hexadecimal del eje temático | Formato `#RRGGBB`. Debe corresponder a un color de eje definido en `axes.json` |
| `categories` | `string[]` | Categorías temáticas asociadas | Array con mínimo 1 y máximo 3 strings. Valores permitidos: `bosques`, `biodiversidad`, `clima`, `agua`, `mares`, `calidad` |

### 1.3 Ejemplo Canónico

```javascript
import { CloudRain } from 'lucide-react';

{
    id: 'drought-risk',
    icon: CloudRain,
    question: "¿Cuál es el riesgo de sequía en el Corredor Seco?",
    shortQuestion: "¿Riesgo de sequía en Corredor Seco?",
    description: "Indicadores climáticos y proyecciones de estrés hídrico.",
    highlight: '<p class="text-sm text-slate-600">Riesgo <span class="font-bold text-[#8B5CF6]">Moderado a Severo</span> debido a un déficit pluviométrico detectado en los últimos 90 días.</p>',
    path: "/preguntas/riesgo-sequia",
    color: "#9333ea",
    categories: ["clima", "agua"]
}
```

### 1.4 Reglas de Implementación de Respuestas

Cada pregunta **debe** tener un componente de respuesta asociado:

- **Ubicación:** `src/pages/questions/answers/Answer{NombrePascalCase}.jsx`
- **Patrón de nombre:** `Answer` + nombre descriptivo en PascalCase. Ejemplo: `AnswerDroughtRisk.jsx`
- **Ruta en `App.jsx`:** Se registra la ruta canónica (`/preguntas/{id}`) **y** la ruta legacy (`/technical/reports/{alias}`) como alias de compatibilidad
- **Librería de gráficos:** Recharts. No se usa otra librería
- **Librería de iconos:** Lucide React. No se usa otra librería
- **Estilos:** Tailwind CSS con los tokens definidos en `tailwind.config.js`. No se usan estilos inline ni CSS modules

---

## 2. Cifras e Indicadores

Las cifras son indicadores estadísticos que se presentan en tarjetas de resumen y tableros. Se almacenan en `src/data/cifras.json`.

### 2.1 Formato

- **Tipo de archivo:** JSON (`.json`)
- **Estructura:** Array de objetos en la raíz del archivo
- **Codificación:** UTF-8 sin BOM
- **Ubicación obligatoria:** `src/data/cifras.json`

### 2.2 Campos Obligatorios

Cada indicador **debe** contener **todos** los siguientes campos. No se permite omitir ninguno.

| Campo | Tipo | Descripción | Restricciones |
|---|---|---|---|
| `titulo` | `string` | Nombre del indicador | En MAYÚSCULAS. Máximo 60 caracteres. Ejemplo: `"EXTRACCIÓN DE AGUA"` |
| `valor` | `string` | Valor cuantitativo central | Siempre como `string`, incluso si es numérico. Punto decimal (`.`), sin separador de miles. Ejemplo: `"10.2"` |
| `unidad_medida` | `string` | Unidad del valor | Abreviatura estándar con unidad temporal si aplica. Ejemplo: `"km³/año"`, `"ha"`, `"tCO2e"` |
| `bajada` | `string` | Texto explicativo del indicador | Una oración completa. Máximo 200 caracteres. Termina en punto |
| `fuente` | `string` | Origen de los datos | Nombre de la organización o sistema. Ejemplo: `"Aqueduct / WRI"`, `"NASA FIRMS"` |
| `eje_tematico` | `string` | Eje ERAM al que pertenece | Valores permitidos exactos: `"Calidad Ambiental"`, `"Mares y Biodiversidad"`, `"Gestión Hídrica"`, `"Bosques y Paisajes"`, `"Cambio Climático"` |
| `pais` | `string` | Ámbito geográfico | Valores permitidos: `"Guatemala"`, `"El Salvador"`, `"Honduras"`, `"Nicaragua"`, `"Costa Rica"`, `"Panamá"`, `"Belize"`, `"Rep. Dominicana"`, `"Regional"` |

### 2.3 Ejemplo Canónico

```json
{
    "titulo": "EXTRACCIÓN DE AGUA",
    "valor": "10.2",
    "unidad_medida": "km³/año",
    "bajada": "Volumen anual de agua dulce extraída para uso antropogénico.",
    "fuente": "Aqueduct / WRI",
    "eje_tematico": "Gestión Hídrica",
    "pais": "Regional"
}
```

### 2.4 Validaciones Estrictas

- El campo `valor` **es siempre un string**. No se acepta tipo `number` en JSON.
- El campo `eje_tematico` **debe coincidir exactamente** con el campo `text` de uno de los 5 ejes definidos en `src/data/axes.json`. No se aceptan variaciones.
- El campo `pais` **debe coincidir exactamente** con un valor del objeto `SICA_COORDINATES` en `src/data/constants.js`, o ser `"Regional"`.
- No se permiten campos vacíos (`""`) ni valores `null`.

---

## 3. Tablas para Análisis Cruzados

Las matrices de datos alimentan los gráficos multidimensionales del módulo `AnalysisSandbox.jsx` y se configuran en `src/data/datasets.config.js`.

### 3.1 Formato del Archivo de Datos

- **Tipo de archivo:** CSV (`.csv`)
- **Separador de campos:** Coma (`,`)
- **Codificación:** UTF-8 sin BOM
- **Fin de línea:** LF (`\n`) o CRLF (`\r\n`)
- **Ubicación obligatoria:** `public/data_csv/`

### 3.2 Reglas Estrictas del CSV

| Regla | Detalle |
|---|---|
| **Fila 1** | Siempre es el encabezado. Nombres de columna descriptivos, sin espacios al inicio/final |
| **Comillas** | Los campos que contienen comas, saltos de línea o comillas **deben** estar encerrados en comillas dobles (`"`) |
| **Valores numéricos** | Punto decimal (`.`), sin separador de miles, sin símbolo de moneda |
| **Valores vacíos** | Se representan como campo vacío (dos comas consecutivas `,,`). No se escribe `null`, `NA` ni `N/A` |
| **Campos de texto** | Sin saltos de línea dentro del campo. Sin caracteres de control |

### 3.3 Configuración del Dataset

Cada CSV **debe** tener una entrada correspondiente en `src/data/datasets.config.js` con esta estructura:

```javascript
{
    id: 'inventarios_forestales',       // Identificador único (snake_case)
    name: 'Inventarios Forestales',     // Nombre para la UI
    file: '/data_csv/inventarios_forestales.csv',  // Ruta relativa al directorio public/
    dimensions: ['Pais', 'Tipo Bosque', 'Zona de Vida'],  // Columnas categóricas para filtros
    metrics: ['DAP (cm)', 'ALTURA (m)', 'Vol (m3/ha)', 'CO2 (ton/ha)']  // Columnas numéricas para cálculos
}
```

### 3.4 Ejemplo de CSV Válido

```csv
Pais,Tipo Bosque,Zona de Vida,DAP (cm),ALTURA (m),Densidad (arb/ha),Vol (m3/ha),CO2 (ton/ha)
Costa Rica,Latifoliados,Bosque Húmedo Tropical,25.43,17.49,450.0,454.22,730.99
El Salvador,Coníferas,Bosque Muy Humedo Subtropical,18.77,12.52,1210.0,320.24,236.48
```

---

## 4. Reportes Temáticos

Los reportes son componentes React que implementan dashboards analíticos para cada pregunta estratégica.

### 4.1 Formato

- **Tipo de archivo:** Componente React JSX (`.jsx`)
- **Ubicación obligatoria:** `src/pages/questions/answers/`
- **Convención de nombre:** `Answer{NombreDescriptivo}.jsx` en PascalCase

### 4.2 Stack Obligatorio del Reporte

Cada reporte **debe** usar exclusivamente estas tecnologías. No se permite sustituir ni agregar alternativas.

| Tecnología | Uso | Import |
|---|---|---|
| **React** | Framework de componentes | `import React from 'react'` |
| **Recharts** | Gráficos (barras, líneas, áreas, pie) | `import { BarChart, LineChart, ... } from 'recharts'` |
| **Lucide React** | Iconos | `import { TreePine, Flame, ... } from 'lucide-react'` |
| **Tailwind CSS** | Estilos | Clases directas en `className` |
| **Shared Components** | Button, Card, Badge | `import { Button, Card, Badge } from '../../components/ui/Shared'` |
| **cn()** | Composición de clases | `import { cn } from '../../lib/utils'` |
| **Framer Motion** | Animaciones de entrada | `import { motion } from 'framer-motion'` |

### 4.3 Estructura Obligatoria del Componente

```jsx
import React from 'react';
import { IconName } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, Badge } from '../../components/ui/Shared';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export const AnswerNombreDescriptivo = () => {
    // 1. Estado local con useState
    // 2. Datos hardcodeados o fetch a API externa
    // 3. Renderizado con secciones:
    //    - Header con badge, título y descripción
    //    - KPIs en tarjetas
    //    - Gráficos Recharts
    //    - Tabla de datos (si aplica)
    //    - Fuentes y metodología
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            {/* Header */}
            {/* KPIs */}
            {/* Charts */}
            {/* Sources */}
        </div>
    );
};
```

### 4.4 Registro de Ruta

Cada reporte **debe** registrarse en `src/App.jsx` con:
1. **Ruta canónica:** `/preguntas/{id}` dentro del `<StrategicConsultantLayout>`
2. **Ruta legacy:** `/technical/reports/{alias}` como alias de compatibilidad
3. **Wrapper:** `<ProtectedRoute user={user}>`

Ejemplo:
```jsx
<Route path="/preguntas/estado-bosques" element={<ProtectedRoute user={user}><AnswerForestState /></ProtectedRoute>} />
<Route path="/technical/reports/fra-2024" element={<ProtectedRoute user={user}><AnswerForestState /></ProtectedRoute>} />
```

---

## 5. Capas Geoespaciales

La información geoespacial se integra al visor cartográfico del OAR mediante capas vectoriales estandarizadas.

### 5.1 Formato

- **Tipo de archivo:** GeoJSON (`.geojson`). No se acepta Shapefile, GML, KML ni ningún otro formato para la integración directa al visor web
- **Especificación:** RFC 7946
- **Codificación:** UTF-8 sin BOM

### 5.2 Sistema de Referencia de Coordenadas (CRS)

- **CRS obligatorio:** `EPSG:4326` (WGS 84)
- **No se acepta** ningún otro sistema de referencia. Si los datos originales están en otro CRS, **deben** reproyectarse a EPSG:4326 antes de ingresar al sistema
- **Orden de coordenadas:** `[longitud, latitud]` (estándar GeoJSON)

### 5.3 Estructura Obligatoria del GeoJSON

```json
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-90.23, 15.78], [-90.22, 15.79], [-90.23, 15.78]]]
            },
            "properties": {
                "id": "area_001",
                "nombre": "Reserva de Biosfera Maya",
                "categoria": "Parque Nacional",
                "area_ha": 21602.0,
                "fuente": "CONAP Guatemala"
            }
        }
    ]
}
```

### 5.4 Reglas Estrictas de Atributos (`properties`)

| Regla | Detalle |
|---|---|
| **Mínimo de atributos** | Cada feature **debe** tener al menos 2 propiedades en `properties`: un identificador (`id` o `nombre`) y un valor temático |
| **Nombres de campos** | En `snake_case`, sin tildes, sin espacios. Ejemplo: `area_ha`, `tipo_bosque` |
| **Valores numéricos** | Tipo `number` en JSON (no string). Punto decimal, sin unidades en el valor |
| **Valores de texto** | Tipo `string`. Sin HTML. Sin saltos de línea |
| **Sin `null` en geometría** | Todo feature **debe** tener una geometría válida. No se aceptan features con `"geometry": null` |
| **Topología** | Los polígonos **deben** estar cerrados (primer y último punto idénticos). Sin auto-intersecciones |

### 5.5 Registro de Capa en el Sistema

Cada capa **debe** registrarse en `src/data/mockData.js` dentro del array `MAP_LAYERS` con esta estructura:

```javascript
{
    id: "protected",                    // Identificador único (snake_case)
    name: "Áreas Protegidas",           // Nombre para la UI
    category: "Ambiental",              // Categoría: "Ambiental", "Productiva", "Climática"
    type: "GeoJSON",                    // Tipo de servicio
    status: "active",                   // Estado: "active" o "inactive"
    color: "#1E3A8A",                   // Color hexadecimal para simbología
    description: "Sistema Regional de Áreas Protegidas (SICAP)."  // Descripción corta
}
```

---

## 6. Ejes Temáticos ERAM

Los ejes temáticos están definidos en `src/data/axes.json` y son la columna vertebral de clasificación del OAR.

### 6.1 Los 5 Ejes (Valores Permitidos)

| ID | Línea | Nombre Oficial | Color | Icono |
|---|---|---|---|---|
| `calidad` | 1 | Calidad Ambiental | `#2563eb` | `Wind` |
| `mares` | 2 | Mares y Biodiversidad | `#0891b2` | `Waves` |
| `agua` | 3 | Gestión Hídrica | `#3b82f6` | `Droplet` |
| `bosques` | 4 | Bosques y Paisajes | `#059669` | `Trees` |
| `clima` | 5 | Cambio Climático | `#9333ea` | `CloudRain` |

### 6.2 Regla de Consistencia

Cuando un producto de datos referencia un eje temático:
- En `cifras.json` → el campo `eje_tematico` **debe** usar el **nombre oficial** exacto de la columna "Nombre Oficial"
- En `questions.js` → el campo `categories` **debe** usar el **ID** exacto de la columna "ID"
- En `axes.json` → el campo `icon` **debe** coincidir con un nombre de componente exportado por `lucide-react`

No se aceptan sinónimos, abreviaciones ni variaciones.

---

## 7. Países SICA (Valores Permitidos)

Los 8 países miembros y la región completa están definidos en `src/data/constants.js`.

| Código | Nombre Oficial (para `cifras.json`) | Coordenadas |
|---|---|---|
| `GT` | Guatemala | 15.78, -90.23 |
| `SV` | El Salvador | 13.79, -88.90 |
| `HN` | Honduras | 15.20, -86.24 |
| `NI` | Nicaragua | 12.87, -85.21 |
| `CR` | Costa Rica | 9.75, -83.75 |
| `PA` | Panamá | 8.54, -80.78 |
| `BZ` | Belize | 17.19, -88.50 |
| `DO` | Rep. Dominicana | 18.74, -70.16 |
| — | Regional | 13.50, -85.00 |

El campo `pais` en cualquier producto **debe** usar exactamente el valor de la columna "Nombre Oficial". No se aceptan variaciones como `"Costa rica"`, `"costa_rica"`, `"CR"` ni `"Centroamérica"`.

---

## 8. Reglas Transversales

Estas reglas aplican a **todos** los productos sin excepción.

| Regla | Detalle |
|---|---|
| **Codificación** | UTF-8 sin BOM. No se acepta Latin-1, Windows-1252 ni ninguna otra codificación |
| **Idioma** | Español. Tildes y eñes obligatorios donde corresponda |
| **Separador decimal** | Punto (`.`). No se acepta coma como separador decimal |
| **Separador de miles** | No se usa. `1000000`, no `1,000,000` ni `1.000.000` |
| **Fechas** | Formato ISO 8601: `YYYY-MM-DD`. Ejemplo: `2024-03-15` |
| **Colores** | Hexadecimal con 6 dígitos: `#RRGGBB`. No se acepta `rgb()`, `hsl()` ni nombres de color |
| **IDs** | `kebab-case` para preguntas y rutas. `snake_case` para capas geoespaciales y CSV |
| **Nombres de archivo** | `snake_case` para datos y assets. `PascalCase` para componentes React |
| **Campos nulos** | No se permiten en producción. Todo campo definido en el esquema **debe** tener un valor válido |
| **Framework CSS** | Tailwind CSS exclusivamente. No se usan CSS Modules, styled-components ni estilos inline |
| **Iconos** | Lucide React exclusivamente. No se usa Font Awesome, Material Icons ni Heroicons |
| **Gráficos** | Recharts exclusivamente. No se usa Chart.js, D3 directo, Nivo ni Victory |

---

> **Última actualización:** Abril 2026
> **Autoridad:** Equipo Técnico OAR SICA
