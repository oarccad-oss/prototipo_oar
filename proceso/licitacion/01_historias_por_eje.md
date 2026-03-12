# TÉRMINOS DE REFERENCIA (TDR)
## MÓDULO: HISTORIAS POR EJE TEMÁTICO
### Observatorio Ambiental Regional (OAR)

---

**Código del Proceso:** OAR-TDR-2025-MOD-01
**Versión del Documento:** 1.0
**Clasificación:** Licitación Pública Internacional
**Fecha de Emisión:** Marzo 2025
**Entidad Contratante:** Organización Ambiental Regional (OAR)
**Idioma Oficial de la Licitación:** Español

---

## ÍNDICE DE CONTENIDOS

1. Antecedentes y Contexto Institucional
2. Objeto de la Contratación
3. Alcance Técnico del Proyecto
4. Perfiles Profesionales Requeridos
5. Protocolo Operativo: OAR Intelligence Engine
6. Gestión de Procesamiento de Datos Complejos
7. Requerimientos Técnicos No Funcionales
8. Estándares de Documentación y Trazabilidad
9. Herramientas de Gestión de Proyecto (Tooling)
10. Productos Entregables y Criterios de Aceptación
11. Acuerdos de Nivel de Servicio (SLA)
12. Propiedad Intelectual y Confidencialidad
13. Penalizaciones y Gestión de Riesgos
14. Criterios de Evaluación de Ofertas
15. Glosario de Términos Técnicos
16. Referencias Normativas y Bibliográficas

---

## 1. ANTECEDENTES Y CONTEXTO INSTITUCIONAL

La Organización Ambiental Regional (OAR) gestiona, en el marco de sus mandatos institucionales, un ecosistema tecnológico compuesto por dos plataformas complementarias desplegadas en infraestructura en la nube (Railway.app):

1. **Prototipo OAR:** Sistema de visualización geoespacial e inteligencia ambiental desarrollado con React/Vite, que consume datos de APIs abiertas internacionales (GBIF, NASA FIRMS, NOAA Coral Reef Watch, Global Forest Watch, Open-Meteo) y de un repositorio propio de datos procesados.

2. **Datalake OAR:** Plataforma de gestión centralizada de datos técnicos (CSV, GeoJSON, PDF, Shapefile) construida sobre FastAPI (Python 3.12), con almacenamiento de objetos en MinIO (S3-compatible) y metadatos en PostgreSQL con extensiones PostGIS.

El prototipo cuenta con una implementación de referencia del módulo de Historias restringida al eje de **Bosques y Paisajes Sostenibles** (`ForestStoryDetail.jsx`, `GrandesBosques.jsx`). La presente licitación busca generalizar este patrón para la totalidad de los ejes temáticos de la ERAM, constituyendo la implementación existente como línea base arquitectónica.

---

## 2. OBJETO DE LA CONTRATACIÓN

Contratar los servicios de una empresa o consorcio especializado para el **diseño, desarrollo, implementación y documentación del Módulo de Historias por Eje Temático** del Observatorio Ambiental Regional (OAR), generalizando la implementación existente del eje de Bosques hacia una arquitectura parametrizable que soporte todos los dominios ambientales de la ERAM, garantizando la interoperabilidad con la infraestructura técnica existente y la calidad narrativa y científica de los contenidos producidos.

---

## 3. ALCANCE TÉCNICO DEL PROYECTO

El alcance comprende, sin carácter limitativo, las siguientes actividades:

- **3.1** Refactorización del componente `ForestStoryDetail.jsx` hacia el componente genérico **`StoryDetailPage`** con la siguientes interfaz de props completamente especificada. Todo valor actualmente hardcoded en el prototipo debe migrar a una prop obligatoria u opcional según la tabla que sigue:

  **Grupo A — Configuración del Eje (Props de Identidad)**

  | Prop | Tipo | Obligatoria | Descripción y Origen en el Prototipo |
  | :--- | :--- | :---: | :--- |
  | `axisId` | `string` | ✅ | Identificador único del eje. Ej: `"bosques"`, `"agua"`. Actualmente hardcoded como `"grandes-bosques"` en la ruta de navegación (línea 79). |
  | `axisLabel` | `string` | ✅ | Etiqueta visible del eje para el usuario. Ej: `"Bosques"`. Actualmente hardcoded como `"Bosques"` en el badge (línea 131). |
  | `axisColor` | `object` | ✅ | Paleta de colores CSS del eje. Objeto con claves: `primary` (color base), `light` (fondo claro), `dark` (fondo oscuro para la tarjeta de resumen). Actualmente hardcoded como `emerald-*` en todo el componente. |
  | `axisIcon` | `ReactNode` | ✅ | Ícono Lucide representativo del eje. Se usa en el sidebar y en el badge del encabezado. Actualmente siempre `MapIcon` o `Share2` (líneas 91). |
  | `backLink` | `string` | ✅ | Ruta de retorno al índiice de historias del eje. Actualmente hardcoded como `"/stories"` (línea 113). |
  | `backLabel` | `string` | ✅ | Etiqueta del enlace de retorno. Ej: `"Volver a Historias de Bosques"`. Actualmente hardcoded como `"Volver a Historias"` (línea 114). |
  | `eramTheme` | `string` | ✅ | Nombre del tema ERAM visible en el metadato de la historia. Actualmente hardcoded como `"Bosques"` (línea 131). |

  **Grupo B — Catálogo de Historias (Props de Contenido)**

  | Prop | Tipo | Obligatoria | Descripción y Origen en el Prototipo |
  | :--- | :--- | :---: | :--- |
  | `stories` | `StoryItem[]` | ✅ | Array de todas las historias del eje. Actualmente hardcoded como el array interno de 14 elementos del eje Bosques (líneas 27–45). Cada `StoryItem` debe tener: `name: string`, `country?: string`, `type: "country" \| "bridge"`, `slug: string` (generado automáticamente por normalización Unicode). |
  | `sidebarTitle` | `string` | ✅ | Título del sidebar de navegación. Actualmente hardcoded como `"Historias de los Grandes Bosques"` (línea 75). |
  | `storySubtitleTemplate` | `(story: StoryItem) => string` | ✅ | Función que genera el subtítulo de la historia activa. Actualmente hardcoded con lógica de `"bridge" ? 'Conectividad sin Fronteras' : 'El Corazón de ' + country` (línea 120). Cada eje tiene su propia lógica narrativa. |
  | `storyIntroText` | `(story: StoryItem) => string` | ✅ | Función que genera el párrafo de introducción bajo el título. Actualmente hardcoded como texto único sobre `cobertura vegetal y estrategias de conservación` (línea 123). |

  **Grupo C — Tarjeta "Lo Esencial en 30 Segundos" (Props de Narrativa)**

  | Prop | Tipo | Obligatoria | Descripción y Origen en el Prototipo |
  | :--- | :--- | :---: | :--- |
  | `summaryPoints` | `SummaryPoint[]` | ✅ | Array de exactamente 3 objetos con los puntos clave de la historia. Actualmente hardcoded con los textos de Hallazgo / Tendencia / Impacto de la Reserva Maya (líneas 168–181). Cada `SummaryPoint`: `{ text: string }`. |

  **Grupo D — Sección de Datos (`¿Qué dicen los datos?`) (Props de KPIs)**

  | Prop | Tipo | Obligatoria | Descripción y Origen en el Prototipo |
  | :--- | :--- | :---: | :--- |
  | `kpis` | `KpiItem[]` | ✅ | Array de 2 KPIs principales de la historia. Actualmente hardcoded como `845,230 ha / Extensión Total` y `-1.2% / Tasa de Cambio` (líneas 232–247). Cada `KpiItem`: `{ value: string, label: string, description: string, colorClass: string }`. |
  | `trendChartData` | `TrendPoint[]` | ✅ | Datos para el mini-gráfico de tendencia. Actualmente simulado con barras de altura fija (líneas 252–275). Cada `TrendPoint`: `{ year: number, value: number }`. Mínimo 4 puntos temporales. |
  | `trendChartTitle` | `string` | ✅ | Título del gráfico de tendencia. Actualmente hardcoded como `"Tendencia de pérdida de bosque (2018-2024)"` (línea 251). |

  **Grupo E — Mapa y Leyenda (Props Cartográficas)**

  | Prop | Tipo | Obligatoria | Descripción y Origen en el Prototipo |
  | :--- | :--- | :---: | :--- |
  | `mapConfig` | `MapConfig` | ✅ | Configura el mini-mapa Leaflet. `{ wmsUrl: string, wmsLayer: string, center: [lat, lon], zoom: number, minYear: number, maxYear: number }`. Actualmente el mapa es un placeholder estático con imagen Unsplash (líneas 196–216). |
  | `mapLegend` | `LegendItem[]` | ✅ | Items de la leyenda visible en el mapa. Actualmente hardcoded como `["Cobertura Densa" / verde, "Bosque Secundario" / amarillo]` (líneas 207–215). Cada `LegendItem`: `{ label: string, color: string }`. |

  **Grupo F — Glosario (Props de Conocimiento)**

  | Prop | Tipo | Obligatoria | Descripción y Origen en el Prototipo |
  | :--- | :--- | :---: | :--- |
  | `glossary` | `GlossaryTerm[]` | ✅ | Términos del glosario rápido. Actualmente hardcoded con 3 términos del eje Bosques (líneas 288–300). Cada `GlossaryTerm`: `{ term: string, definition: string }`. Mínimo 3, máximo 5. |

  **Grupo G — Preguntas Vinculadas y Fuentes (Props de Navegación)**

  | Prop | Tipo | Obligatoria | Descripción y Origen en el Prototipo |
  | :--- | :--- | :---: | :--- |
  | `linkedQuestions` | `LinkedQuestion[]` | Opcional | Preguntas estratégicas relacionadas que el usuario puede explorar. Actualmente hardcoded como `["¿Dónde hay incendios activos?", "¿Cuánta biomasa se almacena?"]` (líneas 309–316). Cada `LinkedQuestion`: `{ text: string, route: string }`. |
  | `sources` | `SourceItem[]` | ✅ | Fuentes citábles del contenido de la historia. Actualmente hardcoded con GFW 2024 y CCAD (líneas 333–345). Cada `SourceItem`: `{ title: string, description: string, url: string }`. |
  | `dashboardLink` | `string` | ✅ | Ruta del tablero de control del eje al que enlaza el botón "Acceder al Dashboard Científico". Actualmente no funcional (línea 350). |

  **Restricciones de Implementación:**
  - El código del componente `StoryDetailPage` no debe contener ningún valor literal hardcoded (texto, color, ruta, coordenada) para ningún eje. Todo valor debe provenir de las props.
  - La generación de slugs debe implementarse como función utilitaria pura `generateSlug(name: string): string` en `src/lib/utils.ts`.
  - El componente debe ser compatible con PropTypes (JavaScript) o TypeScript Interface, según el stack del adjudicatario, y estar completamente documentado en JSDoc/TSDoc.

- **3.2** Implementación del módulo de Historias para los 5 ejes temáticos: Bosques, Biodiversidad, Agua, Clima y Océanos.
- **3.3** Integración de mini-visor de mapa embebido (Leaflet) con carga de capa WMS/WFS por eje.
- **3.4** Integración del motor de narrativa automatizada (LLM) para generación de resúmenes ejecutivos por historia.
- **3.5** Implementación de funcionalidad de exportación a PDF por historia.
- **3.6** Configuración del catálogo de historias por eje en formato JSON, gestionado desde el Datalake OAR.
- **3.7** Implementación de metaetiquetas SEO dinámicas y funcionalidad de compartir por redes sociales (OpenGraph).

---

## 4. PERFILES PROFESIONALES REQUERIDOS

El adjudicatario deberá garantizar la participación activa de los siguientes perfiles durante toda la ejecución del contrato:

---

### 4.1. Experto en la Materia (Subject Matter Expert — SME)

| Atributo | Especificación |
| :--- | :--- |
| **Formación** | Título universitario (mínimo Licenciatura, preferible Posgrado) en Ciencias Forestales, Biología, Geografía, Ciencias Ambientales o disciplina afín. |
| **Experiencia** | Mínimo 8 años de experiencia en proyectos de análisis geoespacial, monitoreo ambiental o gestión de recursos naturales. |
| **Idiomas** | Español (indispensable). Inglés técnico (deseable para lectura de documentación de APIs). |
| **Competencias Técnicas** | Dominio de cartografía temática; conocimiento del Marco Kunming-Montreal (Meta 30x30), la Agenda 2030 y los protocolos de reporting del IPBES; capacidad de síntesis narrativa orientada a política pública. |
| **Competencias Blandas** | Liderazgo científico, comunicación interdisciplinaria, orientación a resultados medibles. |
| **Rol en el Módulo** | Definición del catálogo de historias por eje; redacción de los resúmenes ejecutivos y glosarios; establecimiento de umbrales de alerta; validación conceptual de maquetas; firma de acta de aceptación de cada historia implementada. |

---

### 4.2. Ingeniero Senior de Datos y Frontend (Senior Fullstack Data Engineer)

| Atributo | Especificación |
| :--- | :--- |
| **Formación** | Título universitario en Ingeniería en Sistemas, Ciencias de la Computación, Ingeniería de Software o afín. |
| **Experiencia** | Mínimo 5 años en desarrollo de aplicaciones de datos geoespaciales y visualización web. |
| **Tecnologías Mandatorias** | Python 3.10+, FastAPI, GDAL/OGR, SQLAlchemy 2.0 async, asyncpg, PostgreSQL/PostGIS, MinIO (boto3/S3 API), React 18+, Vite, Recharts, Leaflet.js. |
| **Tecnologías Deseables** | Leaflet.Draw, QGIS (análisis y exportación), Cloud Optimized GeoTIFF (COG), Tippecanoe (Vector Tile Generation). |
| **Estándares OGC** | Conocimiento operativo de WMS, WFS, WCS, OGC API Features. |
| **Competencias Blandas** | Documentación técnica exhaustiva, gestión del tiempo en entregas cortas (sprints), comunicación clara con perfiles no técnicos. |
| **Rol en el Módulo** | Refactorización del componente genérico; implementación de los 5 módulos de historias; elaboración de documentación metodológica; responsable del QA Espacial técnico; gestión del repositorio Git. |

---

### 4.3. Coordinador Técnico del Proyecto (Opcional — para contratos de más de 6 meses)

| Atributo | Especificación |
| :--- | :--- |
| **Formación** | Ingeniería, Ciencias o Administración con especialidad en gestión de proyectos tecnológicos. |
| **Certificación** | PMP, PRINCE2 o certificación en metodologías ágiles (Scrum Master). |
| **Rol en el Módulo** | Punto de contacto único con la entidad contratante; gestión de herramientas de seguimiento; coordinación entre el SME y el Desarrollador; emisión de informes de avance semanales. |

---

## 5. PROTOCOLO OPERATIVO: CICLO EDITORIAL DE HISTORIAS

El proceso de construcción de cada Historia sigue un ciclo **editorial-narrativo con integración de datos geoespaciales**, que combina la autoría experta del SME con la implementación técnica del Desarrollador en seis fases. Este ciclo reconoce que una Historia es, ante todo, una pieza de comunicación científica que debe ser rigurosamente veraz y visualmente accesible para una audiencia no especializada.

---

### Fase I — Catalogación y Definición Editorial (Responsable: SME)

Antes de iniciar cualquier desarrollo, el SME construirá el **Catálogo de Historias del Eje** definiendo para cada Historia:

- **ID y Slug:** Código único (ej. `HIST-AGU-001`) y su versión de URL normalizada.
- **Tipo de Entidad:** Nacional (un solo país SICA) o Transfronteriza (dos o más países / corredor regional).
- **Narrativa de Encuadre:** Un párrafo editorial que responde: ¿por qué esta entidad importa para la política ambiental regional?
- **Resumen de 30 Segundos:** Tres puntos concisos en formato Hallazgo / Tendencia / Impacto Regional.
- **KPIs Esenciales:** Mínimo 2 indicadores cuantitativos con valor de referencia, unidad y fuente oficial.
- **Glosario Temático:** 3 a 5 términos científicos que el lector promedio podría desconocer, con su definición en lenguaje accesible.
- **Fuentes Citables:** Lista de fuentes que aparecerán en la sección "Fuentes y Metodología" de la historia.

**Resultado de la Fase:** Catálogo Editorial validado internamente por el SME, en formato Markdown o JSON, que constituye el contrato de contenido para el Desarrollador.

---

### Fase II — Arquitectura del Componente Genérico (Responsable: Desarrollador)

El Desarrollador refactorizará el componente `ForestStoryDetail.jsx` hacia un componente `StoryDetailPage` totalmente parametrizable:

- Análisis de las props necesarias para soportar los 5 ejes sin hardcoding de colores, etiquetas ni rutas.
- Implementación del sistema de generación de slugs (normalización Unicode → minúsculas → guiones).
- Configuración del sistema de enrutamiento dinámico para `/[eje]/historias/[slug]`.
- Implementación de las metaetiquetas SEO dinámicas y el protocolo OpenGraph para compartibilidad.

**Hito de control:** El SME revisará la arquitectura del componente con datos de prueba de al menos 2 ejes distintos antes de proceder a la integración de capas reales.

---

### Fase III — Integración de Datos Geoespaciales por Eje (Responsable: Desarrollador)

Para cada eje, el Desarrollador vinculará los componentes de datos de la historia:

- **Mini-Visor de Mapa:** Integración de la capa WMS/WFS prioritaria del eje usando `MiniMap.jsx`. La capa debe cargarse en < 2 segundos con controles mínimos (Zoom, Tooltip al hover, Selector de año).
- **Gráfico de Tendencia:** AreaChart o LineChart de Recharts conectado al endpoint de datos del Datalake OAR o GitHub Raw JSON.
- **KPI Cards Dinámicos:** Fetch a la API correspondiente para obtener los valores reales definidos en el Catálogo Editorial.

Esta fase se ejecuta **eje por eje**, no de forma global, permitiendo la entrega incremental y la validación independiente de cada dominio.

---

### Fase IV — Revisión Editorial y Verificación de Datos (Responsable: SME + Desarrollador)

Esta fase es la más crítica del ciclo. El SME revisará cada Historia implementada en un entorno de staging verificando:

- **Exactitud Factual:** Los KPIs mostrados corresponden a los valores de referencia documentados en el Catálogo Editorial. Se producirá una **Tabla de Control de Exactitud** comparando el valor del sistema con la fuente oficial (ej. inventario CCAD, WDPA, FRA-2024).
- **Coherencia Narrativa:** Los textos del resumen de 30 segundos y del glosario son científicamente precisos y communicativamente efectivos para una audiencia no especializada.
- **Integridad Visual:** El mapa muestra el territorio correcto al zoom adecuado; la leyenda corresponde a la capa activa.

El margen de error de KPIs aceptable se define en el SLA (Sección 11). La Historia no podrá avanzar a producción sin la firma del **Acta de Conformidad Editorial** por parte del SME.

---

### Fase V — Enriquecimiento Narrativo con Motor IA (Responsable: Desarrollador + SME)

Una vez aprobado el contenido base, se activa el motor de narrativa automatizada:

- El SME provee los textos del Resumen de 30 Segundos como **contenido semilla** validado.
- El Desarrollador configura el Prompt LLM para que, ante una actualización de los datos de KPIs, el motor regenere los textos adaptativamente, manteniendo el tono y la estructura editorial definida por el SME.
- El sistema producirá el siguiente objeto versionado en el Datalake:

```json
{
  "id_historia": "HIST-AGU-001",
  "version": "2025-03",
  "resumen": {
    "hallazgo": "La cuenca del Río Lempa muestra una reducción del 12% en caudal...",
    "tendencia": "La tendencia de los últimos 5 años indica agravamiento en periodo seco...",
    "impacto": "Afecta el suministro de agua potable de 2.3 millones de habitantes..."
  },
  "generado_por": "LLM-v2",
  "revisado_sme": true
}
```

- **Restricción:** El motor IA no puede alterar valores numéricos de KPIs. Solo opera sobre el texto interpretativo.

---

### Fase VI — Publicación y Ciclo de Mantenimiento Editorial (Responsable: Desarrollador + SME)

Una Historia publicada no es un producto estático. Se establece el siguiente ciclo de mantenimiento:

- La historia se publica bajo la ruta `/[eje]/historias/[slug]` y se incorpora al catálogo de navegación del eje.
- Se define la **Frecuencia de Actualización de Datos** por historia: Mensual / Trimestral / Anual / Estática.
- Para historias con datos dinámicos, el Desarrollador configura el Cron Job de actualización automática de KPIs y regeneración narrativa.
- El SME revisa y revalida los textos narrativos ante cambios de datos superiores al 5% en cualquier KPI.

---

## 6. GESTIÓN DE PROCESAMIENTO DE DATOS COMPLEJOS

Cuando una historia requiera el procesamiento de series multitemporales satelitales o la descarga y normalización de datasets masivos (ej. imágenes históricas de cobertura 1990–2024), el adjudicatario aplicará el siguiente protocolo:

### 6.1. Arquitectura de Procesamiento Diferido

| Componente | Especificación |
| :--- | :--- |
| **Trigger** | Invocación manual por el SME o automática por calendario (Cron Job). |
| **Entorno de Ejecución** | Railway Worker independiente o máquina local de alta potencia para evitar saturar la API principal. |
| **Checkpoints** | El script guardará estados intermedios en MinIO cada 30 minutos. En caso de fallo, el proceso se reanudará desde el último checkpoint sin reiniciar desde cero. |
| **Repositorio de Resultados** | Producto final depositado en MinIO bajo la ruta: `/data/processed/[ID_HISTORIA]/resultado_v[N].json`. |
| **Registro** | Cada etapa del proceso se registra en los logs del sistema. |

### 6.2. Notificaciones y Alertas

El sistema enviará notificaciones automáticas en los siguientes eventos:
- ✅ Inicio del proceso de ingesta de datos históricos.
- ⚠️ Error crítico o interrupción inesperada.
- 📊 Hito de avance significativo (ej. 50% completado).
- ✅ Finalización exitosa, historia disponible para revisión del SME.

### 6.3. Estimación de Costos de Infraestructura

Antes de ejecutar procesos de larga duración, el Desarrollador presentará una estimación de consumo de recursos en Railway créditos (CPU-hora, RAM-hora, GB de almacenamiento).

### 6.4. Optimización para Servicio Web

Los productos finales masivos (> 50 MB) deberán ser transformados antes de su publicación:
- Datos vectoriales: Conversión a **Vector Tiles (.pbf)**.
- Datos ráster: Conversión a **Cloud Optimized GeoTIFF (COG)**.
- **Requisito de Rendimiento:** Latencia de carga de la historia (incluyendo capa de mapa) < **3 segundos**.

---

## 7. REQUERIMIENTOS TÉCNICOS NO FUNCIONALES

### 7.1. Seguridad
- Toda comunicación entre el Frontend y el Backend deberá realizarse sobre **HTTPS** con certificado TLS vigente.
- Las **Presigned URLs** de descarga desde MinIO tendrán un tiempo de expiración máximo de 1 hora.

### 7.2. Interoperabilidad
- El componente genérico debe soportar cambio de eje mediante props sin modificación del código base.
- Los datos exportables (PDF) deben generarse sin dependencia de servicios externos de terceros.

### 7.3. Escalabilidad
- El catálogo de historias debe permitir añadir nuevas entidades mediante JSON de configuración, sin modificar el código del componente.

### 7.4. Accesibilidad
- La interfaz de usuario deberá cumplir con las pautas **WCAG 2.1 Nivel AA**.
- El sidebar de navegación debe colapsar en dispositivos móviles, reemplazado por un selector dropdown.

### 7.5. SEO y Compartibilidad
- Cada historia debe emitir metaetiquetas dinámicas (`<title>`, `<meta description>`, OpenGraph) para su correcta representación al compartir en redes sociales.
- Los slugs de URL deben generarse automáticamente desde el nombre normalizado (sin tildes, minúsculas, separado por guiones).

---

## 8. ESTÁNDARES DE DOCUMENTACIÓN Y TRAZABILIDAD

Todo proceso técnico desarrollado en el marco de este módulo deberá documentarse bajo los siguientes estándares:

### 8.1. Estructura de Repositorio

```
/scripts/
  └── /tasks/
      └── [ID_HISTORIA]/
          ├── main.py                  # Algoritmo de ingesta/procesamiento
          ├── environment.yml          # Dependencias exactas
          ├── METHODOLOGY.md           # Metodología comprensible para el SME
          ├── DATA_PROVENANCE.md       # Linaje del dato: fuente, sensor, fecha, URL
          └── QA_REPORT.md            # Informe de integridad y validación
```

### 8.2. Linaje del Dato (Data Provenance)

Para cada fuente de datos utilizada en una historia, se documentará:
- **URL exacta** de descarga o endpoint consultado.
- **Versión del producto satelital** (ej. Landsat 8 Collection 2).
- **Fecha de toma** del dato o corte del dataset.
- **Hash de verificación (MD5/SHA256)** del archivo descargado.

### 8.3. Versionamiento de Resultados

Cada actualización de datos de una historia mantendrá versiones anteriores en MinIO con registro del changelog en PostgreSQL.

---

## 9. HERRAMIENTAS DE GESTIÓN DE PROYECTO

El adjudicatario utilizará obligatoriamente las siguientes herramientas:

| Herramienta | Uso | Justificación |
| :--- | :--- | :--- |
| **GitHub Projects** | Gestión de tareas, sprints e Issues vinculados al código. | Integración directa con el repositorio; trazabilidad tarea-commit. |
| **GitHub Issues** | Registro de la "Ficha de Requerimiento de Historia" como Issue etiquetado por eje. | Vinculación de la historia con el Pull Request de implementación. |
| **GitHub Wiki** | Documentación del catálogo de historias y metodologías. | Disponibilidad permanente junto al código. |

El equipo se organizará en **sprints de 2 semanas** con reuniones de sincronización semanales entre el SME y el Desarrollador.

---

## 10. PRODUCTOS ENTREGABLES Y CRITERIOS DE ACEPTACIÓN

| # | Entregable | Descripción | Criterio de Aceptación |
| :--- | :--- | :--- | :--- |
| **E1** | Componente `StoryDetailPage` genérico | Componente React documentado con PropTypes/TypeScript. | Funcional para los 5 ejes sin errores de consola. |
| **E2** | Catálogo de historias por eje | JSON de configuración con mínimo 5 historias por eje (25 total). | Validado por el SME por exactitud de nombres y territorios. |
| **E3** | Integración WMS/WFS por eje | Al menos 1 capa de mapa real por eje visible en el mini-visor. | Carga de capa < 2 segundos. |
| **E4** | Motor de Narrativa IA | Resúmenes ejecutivos generados dinámicamente. | Coherente para el 100% de las historias implementadas. |
| **E5** | Exportación PDF | Botón funcional de exportación por historia. | PDF generado en < 5 segundos, incluye todos los contenidos. |
| **E6** | Informe de QA Espacial | Tabla de control de integridad para 2 historias por eje. | Margen de error < 0.05% frente a fuente oficial. |

---

## 11. ACUERDOS DE NIVEL DE SERVICIO (SLA)

| Métrica | Indicador | Umbral Mínimo Aceptable |
| :--- | :--- | :--- |
| Disponibilidad del Módulo | Uptime mensual | 99.5% en horario laboral (08:00–20:00 UTC-6) |
| Tiempo de Carga de Historia | Latencia incluyendo capa de mapa | < 3,000 ms |
| Integridad de KPIs | Margen de error frente a fuente oficial | < 0.05% |
| Recuperación ante Fallos | RTO del Background Job de ingesta | < 30 minutos desde última actividad |
| Tiempo de Respuesta a Incidentes | Bugs críticos en producción | Resolución en < 4 horas hábiles |

---

## 12. PROPIEDAD INTELECTUAL Y CONFIDENCIALIDAD

- **12.1.** Todo el código fuente, componentes, documentación y contenidos narrativos desarrollados en el marco de este módulo serán propiedad exclusiva de la OAR desde el momento de su entrega.
- **12.2.** El adjudicatario cede todos los derechos patrimoniales de autor sobre los productos desarrollados.
- **12.3.** Los datos geoespaciales y narrativos procesados deberán ser tratados con estricta confidencialidad y no podrán compartirse con terceros sin autorización expresa de la OAR.
- **12.4.** El adjudicatario deberá suscribir un **Acuerdo de No Divulgación (NDA)** previo al inicio del contrato.

---

## 13. PENALIZACIONES Y GESTIÓN DE RIESGOS

| Evento | Penalización |
| :--- | :--- |
| Entrega de Fase fuera del plazo acordado (por día hábil) | 0.5% del valor total del contrato |
| Entregable rechazado por incumplimiento de criterios de aceptación | Corrección sin costo adicional en un plazo de 5 días hábiles |
| Documentación incompleta o ausente al momento de la entrega | Retención del 10% del pago del hito hasta subsanar |
| Pérdida de datos o corrupción de repositorio por negligencia | Restauración a último estado estable + informe de causa raíz |

---

## 14. CRITERIOS DE EVALUACIÓN DE OFERTAS

| Criterio | Peso |
| :--- | :--- |
| Experiencia demostrable en sistemas GIS y datos ambientales | 30% |
| Calidad técnica de la propuesta metodológica | 25% |
| Oferta económica | 20% |
| Experiencia en integración con APIs OGC (WMS/WFS) y narrativa IA | 15% |
| Propuesta de gestión del proyecto (cronograma, sprints, herramientas) | 10% |

---

## 15. GLOSARIO DE TÉRMINOS TÉCNICOS

| Término | Definición |
| :--- | :--- |
| **Slug** | Identificador textual único en la URL, generado normalizando el nombre de la historia (sin tildes, minúsculas, separado por guiones). |
| **Mock Data** | Datos simulados de estructura idéntica a los reales, usados para prototipado visual previo a la conexión con APIs. |
| **Mini-visor** | Componente de mapa embebido de tamaño reducido, con controles mínimos: Zoom, Tooltip y Selector de año. |
| **WMS/WFS** | Estándares OGC para servicios de mapas por imagen (WMS) y datos vectoriales con atributos (WFS). |
| **LLM** | Large Language Model. Modelo de lenguaje a gran escala para generación de narrativas analíticas automatizadas. |
| **OpenGraph** | Protocolo de metaetiquetas HTML para enriquecer la presentación de URLs al compartir en redes sociales. |
| **Linaje del Dato** | Registro completo del origen, transformación y entrega de un dato desde su fuente primaria hasta su publicación. |

---

## 16. REFERENCIAS NORMATIVAS Y BIBLIOGRÁFICAS

- **Marco de Kunming-Montreal (COP15, 2022):** Meta 30x30 para la conservación del 30% de ecosistemas.
- **Agenda 2030 para el Desarrollo Sostenible (ONU, 2015):** ODS 15 y ODS 14.
- **IPBES Global Assessment Report on Biodiversity and Ecosystem Services (2019).**
- **OGC Standards — Open Geospatial Consortium:** WMS 1.3.0, WFS 2.0.0.
- **WCAG 2.1 — Web Content Accessibility Guidelines** — W3C Recommendation, 2018.
- **ISO 19115-1:2014** — Geographic Information: Metadata.
- **GFW — Global Forest Watch API:** https://www.globalforestwatch.org/
- **GBIF API Reference:** https://www.gbif.org/developer/summary
- **NOAA Coral Reef Watch:** https://coralreefwatch.noaa.gov/
- **NASA FIRMS VIIRS Documentation:** https://firms.modaps.eosdis.nasa.gov/

---

*Este documento de Términos de Referencia es de carácter vinculante para el adjudicatario y constituye el marco técnico y operativo bajo el cual se evaluará el cumplimiento del contrato. Toda modificación al alcance deberá ser aprobada mediante adenda escrita y firmada por ambas partes.*

**Versión:** 1.0 | **Fecha:** Marzo 2025 | **Clasificación:** Licitación Pública Internacional


