# TÉRMINOS DE REFERENCIA (TDR)
## MÓDULO: VISORES DE MAPAS TRANSVERSAL
### Observatorio Ambiental Regional (OAR)

---

**Código del Proceso:** OAR-TDR-2025-MOD-05
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

El módulo de Visores de Mapas presenta la mayor deuda técnica del sistema. Si bien el Hub de acceso (`MapHub.jsx`) y los layouts (`MapConsultantLayout.jsx`) están implementados, los dos visores principales —`MapExplorer.jsx` (284 bytes) y `MapComparator.jsx` (257 bytes)— son archivos placeholder vacíos sin implementación alguna. La presente licitación constituye el desarrollo inicial completo de la infraestructura cartográfica del Observatorio Ambiental Regional (OAR).

---

## 2. OBJETO DE LA CONTRATACIÓN

Contratar los servicios de una empresa o consorcio especializado para el **diseño, desarrollo, implementación y documentación del Módulo de Visores de Mapas Transversal** del Observatorio Ambiental Regional (OAR), constituyendo la plataforma cartográfica interactiva de referencia para la región SICA que soporte exploración multitemática, comparación temporal y espacial de capas, y opere como herramienta autónoma y como componente `MiniMap` embebible en todos los demás módulos del sistema.

---

## 3. ALCANCE TÉCNICO DEL PROYECTO

El alcance comprende, sin carácter limitativo, las siguientes actividades:

- **3.1** Implementación completa de **`MapExplorer.jsx`** (actualmente 284 bytes, archivo placeholder). El visor debe incluir los siguientes 7 bloques funcionales:

  | Bloque | Descripción Técnica |
  | :--- | :--- |
  | **Mapa base** | Leaflet con 3 capas base seleccionables: OpenStreetMap (por defecto), Satélite Esri (`World_Imagery`) y Relieve Esri (`World_Shaded_Relief`). |
  | **Panel de capas** | Árbol colapsable organizado por eje temático. Toggle de visibilidad (checkbox) y deslizador de opacidad (0–100%) por capa. |
  | **Buscador de lugares** | Geocodificación mediante `Nominatim` (OpenStreetMap). Devuelve coordenadas y centra el mapa con zoom 10. |
  | **Selector de país SICA** | Dropdown con los 8 países SICA. Al seleccionar, el mapa vuela a la extensión del país (`flyToBounds`) y pre-filtra las capas activas pertinentes. |
  | **Panel de información de feature** | Se activa al hacer click en un elemento de capa vectorial. Muestra los atributos definidos en `tooltip` de la `LayerConfig`. Sustituible por hover en desktop. |
  | **Control de escala** | Escala cartográfica en km/m visible en la esquina inferior del mapa. |
  | **Exportación de captura** | Botón "Descargar PNG" que genera una imagen del área visible del mapa mediante `Leaflet-easyPrint` o `html2canvas`. |

- **3.2** Implementación completa de **`MapComparator.jsx`** (actualmente 257 bytes, archivo placeholder) con los 3 modos de comparación mediante `Leaflet.SideBySide`:
  - **Modo Temporal (Antes/Después):** Misma capa en dos años distintos. Requiere que el servicio WMS soporte el parámetro `TIME` (ISO 8601). Panel izquierdo: año base; panel derecho: año de comparación.
  - **Modo Multi-fuente:** Misma variable geográfica desde dos proveedores diferentes (ej. GFW vs. Hansen para cobertura forestal). Permite evaluar discrepancias entre fuentes.
  - **Modo Multi-eje:** Dos capas de ejes distintos sobre la misma área (ej. deforestación vs. focos de calor). Para identificar correlaciones espaciales.
  - **Requisito de sincronización:** Cambios de zoom y posición en cualquier panel se reflejan en el otro dentro de 50 ms (SLA de latencia definido en Sección 11).

- **3.3** Refactorización y documentación del componente compartido **`MiniMap.jsx`** que es consumido por Historias, Tableros y Reportes. El componente debe soportar sus **4 modos de presentación** mediante la prop `mode`:

  | Valor `mode` | Descripción | Controles activos |
  | :--- | :--- | :--- |
  | `"static"` | Vista estática, sin interacción. Solo renderiza la capa. | Ninguno |
  | `"interactive"` | Zoom y pan habilitados. Tooltip al hover. | Zoom +/-, tooltip |
  | `"timeslider"` | Incluye selector de año que actualiza el parámetro `TIME` del WMS. | Zoom, selector de año |
  | `"dashboard"` | Incluye marcadores de alerta cuando un KPI supera el umbral Crítico. | Zoom, marcadores dinámicos |

- **3.4** Configuración del catálogo de capas **`/src/config/layers_catalog.json`** como fuente única de verdad. Estructura de cada entrada `LayerConfig`:

  ```jsonc
  {
    "id": "LAYER-GFW-2024",
    "axis": "bosques",
    "name": "Cobertura Forestal GFW 2024",
    "type": "wms",              // "wms" | "pmtiles" | "geojson"
    "serviceUrl": "https://api.globalforestwatch.org/geoserver/wms",
    "layer": "gfw:tree_cover_loss",
    "crs": "EPSG:4326",
    "format": "image/png",
    "transparent": true,
    "opacity": 0.8,
    "minZoom": 4,
    "maxZoom": 18,
    "tooltip": ["cartodb_id", "umd_tree_cover_loss__year"],
    "legend": [
      { "color": "#d73027", "label": "Pérdida 2010-2024" },
      { "color": "#006837", "label": "Cobertura > 30% (2000)" }
    ],
    "updateFrequency": "Anual",
    "source": "Global Forest Watch",
    "lastUpdated": "2024-12",
    "provenance": "/provenance/LAYER-GFW-2024.md"
  }
  ```

- **3.5** Integración de las siguientes capas WMS 1.3.0 y WFS 2.0.0 de fuentes oficiales como parte del catálogo inicial mínimo (1 por eje):
  - Bosques: Global Forest Watch (Hansen/UMD) — Cobertura y Pérdida Forestal.
  - Biodiversidad: WDPA (Protected Planet) — Áreas Protegidas Marinas y Terrestres.
  - Agua: AQUASTAT FAO — Cuencas Hidrográficas del Caribe/América Central.
  - Clima: Open-Meteo — Índice de temperatura media (raster interpolado).
  - Océanos: NOAA Coral Reef Watch — SST (Sea Surface Temperature) y DHW.
  - Incendios: NASA FIRMS VIIRS — Focos de calor activos (actualización diaria).
  - Transversal: CCAD/SICA — Límites administrativos de la región.

- **3.6** Implementación de soporte de **Vector Tiles (PMTiles)** para mínimo 2 capas de alta resolución. Proceso: descarga de fuente → procesamiento con `tippecanoe` → almacenamiento en MinIO → consumo en el visor mediante `pmtiles-js`.

- **3.7** Integración del buscador de lugares mediante **Nominatim/OpenStreetMap** bajo la política de uso: máximo 1 req/segundo, `User-Agent` identificado como `OAR-System/1.0`. Resultados filtrados a la extensión geográfica de la región SICA (viewbox: `-92.0,7.5,-59.0,18.5`).

---

## 4. PERFILES PROFESIONALES REQUERIDOS

El adjudicatario deberá garantizar la participación activa de los siguientes perfiles durante toda la ejecución del contrato:

---

### 4.1. Experto en la Materia (Subject Matter Expert — SME)

| Atributo | Especificación |
| :--- | :--- |
| **Formación** | Título universitario (mínimo Licenciatura, preferible Posgrado) en Ciencias Forestales, Biología, Geografía, Ciencias Ambientales o disciplina afín. |
| **Experiencia** | Mínimo 8 años de experiencia en proyectos de análisis geoespacial, monitoreo ambiental o gestión de recursos naturales. |
| **Idiomas** | Español (indispensable). Inglés técnico (deseable para lectura de documentación de servicios OGC). |
| **Competencias Técnicas** | Dominio de SIG y cartografía temática; conocimiento de servicios WMS/WFS; capacidad de definir estilos, leyendas y simbología apropiada para datos ambientales. |
| **Competencias Blandas** | Liderazgo científico, comunicación interdisciplinaria, orientación a resultados medibles. |
| **Rol en el Módulo** | Definición del catálogo de capas prioritario por eje; validación de estilos visuales y leyendas; aprobación de la precisión de las capas renderizadas; firma de acta de conformidad por visor implementado. |

---

### 4.2. Ingeniero Senior de Datos y Frontend (Senior Fullstack Data Engineer)

| Atributo | Especificación |
| :--- | :--- |
| **Formación** | Título universitario en Ingeniería en Sistemas, Ciencias de la Computación, Ingeniería de Software o afín. |
| **Experiencia** | Mínimo 5 años en desarrollo de aplicaciones cartográficas web y visualización geoespacial. |
| **Tecnologías Mandatorias** | React 18+, Vite, Leaflet.js, React-Leaflet, Leaflet.Draw, MinIO (boto3/S3 API), PostgreSQL/PostGIS. |
| **Tecnologías Deseables** | PMTiles (Vector Tiles), Leaflet.SideBySide (plugin comparador), Mapbox GL JS, GeoServer, Tippecanoe. |
| **Estándares OGC** | Conocimiento operativo de WMS 1.3.0, WFS 2.0.0, WCS, OGC API Features. |
| **Competencias Blandas** | Documentación técnica exhaustiva, gestión del tiempo en entregas cortas (sprints), comunicación clara con perfiles no técnicos. |
| **Rol en el Módulo** | Implementación completa de ambos visores; configuración del catálogo de capas; refactorización del MiniMap; gestión del repositorio Git. |

---

### 4.3. Coordinador Técnico del Proyecto (Opcional — para contratos de más de 6 meses)

| Atributo | Especificación |
| :--- | :--- |
| **Formación** | Ingeniería, Ciencias o Administración con especialidad en gestión de proyectos tecnológicos. |
| **Certificación** | PMP, PRINCE2 o certificación en metodologías ágiles (Scrum Master). |
| **Rol en el Módulo** | Punto de contacto único con la entidad contratante; coordinación SME–Desarrollador; emisión de informes de avance semanales. |

---

## 5. PROTOCOLO OPERATIVO: CICLO DE CONSTRUCCIÓN DE INFRAESTRUCTURA CARTOGRÁFICA

El proceso de implementación de los visores de mapas sigue un ciclo de **infraestructura cartográfica y optimización de capas**, cuya complejidad es fundamentalmente distinta a la de los demás módulos del sistema. Mientras un tablero depende de APIs con datos alfanuméricos y un reporte de un pipeline de procesamiento, el visor depende de la **calidad, rendimiento y correcta simbolización** de las capas geoespaciales que sirve. El mayor riesgo de este módulo es la degradación de rendimiento por capas no optimizadas, por lo que la transformación y optimización de cada capa es un paso obligatorio antes de su integración en el visor.

---

### Fase I — Inventario y Priorización del Catálogo de Capas (Responsable: SME)

El SME construye el **Catálogo de Capas Prioritario** que definirá el contenido del visor. Este catálogo es el equivalente a la sellección de la colección de una biblioteca:

- Para cada capa candidata, el SME completa la **Ficha de Capa**:
  - **Nombre oficial** y organismo responsable de la capa.
  - **Eje temático** al que pertenece.
  - **Fuente primaria:** URL del servicio WMS/WFS externo o archivo a descargar.
  - **Frecuencia de actualización** de la fuente (diaria / mensual / anual / estática).
  - **Atributos del tooltip:** ¿qué información debe mostrarse cuando el usuario hace click en un elemento?
  - **Descricción de simbología:** graduación de color, clasificación por rangos, o simbología única.
- El SME prioriza las capas por utilidad para decisores de política, ordenando cuáles se implementan primero.
- **Número mínimo de capas del catálogo inicial:** 7 capas (1 por eje/tipo como mínimo).

**Resultado de la Fase:** Catálogo de Capas en formato JSON (`layers_catalog.json`) firmado por el SME.

---

### Fase II — Adquisición y Optimización de Capas (Responsable: Desarrollador)

Esta fase es técnicamente la más exigente del módulo y requiere juicio de ingeniería para cada capa:

- **Clasificación por estrategia de servicio:** Para cada capa, el Desarrollador determina el método óptimo de servicio:
  - **WMS externo:** Consumo directo del servicio remoto. Sin procesamiento local. Riesgo: dependencia de uptime externo.
  - **PMTiles local:** Descarga del GeoJSON/Shapefile fuente, generación de Vector Tiles con Tippecanoe, almacenamiento en MinIO. Máximo rendimiento, sin dependencia externa.
  - **Datos GeoJSON estático:** Para capas pequeñas (< 500 features). Servicio directo desde MinIO.
- **Proceso de Optimización para Capas PMTiles:**
  1. Descarga del archivo fuente y registro en `DATA_PROVENANCE.md` (URL, fecha, hash MD5).
  2. Reproyección a EPSG:4326 si es necesario.
  3. Simplificación de geometrías según nivel de zoom (Tippecanoe `--simplification`).
  4. Generación del archivo `.pmtiles`.
  5. Carga a MinIO y verificación de acceso mediante Presigned URL.
- **Prueba de Rendimiento básica:** Cada capa debe renderizarse en < 2 segundos en una conexión de red estándar antes de ser aprobada para integración.

---

### Fase III — Construcción del Visor Base y Panel de Capas (Responsable: Desarrollador)

Con las primeras capas optimizadas, el Desarrollador construye la infraestructura del visor:

- Implementación del mapa Leaflet con los mapas base disponibles (OpenStreetMap, Satélite Esri, Terreno).
- Implementación del panel lateral de capas con árbol organizado por eje temático y controles de visibilidad y opacidad.
- Implementación del buscador de lugares (Nominatim) y el selector de país SICA (centra el mapa y pre-filtra capas visibles).
- Implementación del panel de información de feature (se activa al hacer click en un elemento del mapa).
- En esta fase, el visor muestra 3 capas representativas de 3 ejes distintos para validar la arquitectura.

**Hito de control:** El SME aprueba la arquitectura general del visor (organización del panel, estética, usabilidad) antes de integrar el catálogo completo.

---

### Fase IV — Integración Completa del Catálogo y Simbología Cartográfica (Responsable: Desarrollador + SME)

Con la arquitectura aprobada, se integra el catálogo completo de capas:

- Integración de todas las capas del catálogo aprobado, según la estrategia definida en la Fase II.
- El SME revisa y aprueba la **simbología de cada capa**: gradiente de colores, clases, leyenda y título de la capa. Una representación cartográfica incorrecta puede llevar a interpretaciones erróneas de la realidad ambiental.
- Implementación del tooltip personalizado por capa con los atributos definidos en la Ficha de Capa.
- Ajuste de rangos de zoom mínimo y máximo por capa (ej. la capa de focos de calor VIIRS individual sólo es útil desde zoom 8).
- Producción de la **Tabla de Control de Integridad Cartográfica**: version de la capa en el visor vs. versión publicada por la fuente oficial.

---

### Fase V — Implementación del Visor Comparativo y Pruebas de Rendimiento (Responsable: Desarrollador)

Esta fase implementa el segundo visor (`MapComparator`) y realiza el perfilado de rendimiento del sistema:

- Implementación de los 3 modos de comparación: Temporal (Antes/Después), Multi-fuente y Multi-eje, usando el plugin `Leaflet.SideBySide`.
- Sincronización de zoom y posición entre los paneles (cambio en un panel debe reflejarse instantáneamente en el otro).
- **Pruebas de Rendimiento (Performance Profiling):**
  - Tiempo de carga inicial del visor (objetivo: < 3 segundos).
  - Tiempo de activación de cada capa (objetivo: < 2 segundos).
  - Consumo de memoria del navegador con 5 capas simultáneas activas (umbral: < 300 MB RAM).
  - Comportamiento bajo conexión lenta (simulación de red 3G en DevTools).
- Las capas que no cumplan el estándar de rendimiento deben optimizarse mediante mayor simplificación de Tippecanoe o cambio de estrategia de servicio.
- El SME firma el **Acta de Conformidad Cartográfica** confirmando que el visor es apto para uso institucional.

---

### Fase VI — Publicación y Protocolo de Actualización del Catálogo (Responsable: Desarrollador)

Los visores en producción requieren un protocolo de mantenimiento del catálogo de capas:

- Los visores se publican en `/technical/map` y `/technical/map-comparator`.
- El `layers_catalog.json` es administrado desde el Datalake OAR. Un administrador puede añadir, actualizar o desactivar capas del catálogo sin modificar el código de los visores.
- Para capas con actualizaciones periódicas (ej. WDPA cada mes, NASA FIRMS cada día), el Desarrollador configura el Cron Job de re-procesamiento y actualización en MinIO automáticamente.
- Se establece un **Calendario de Mantenimiento de Capas** que define la frecuencia de revisión de cada capa y el responsable de su actualización.

---

## 6. GESTIÓN DE PROCESAMIENTO DE DATOS COMPLEJOS

Cuando una capa requiera preprocesamiento de imágenes satelitales o generación de Vector Tiles a partir de datasets masivos, el adjudicatario aplicará el siguiente protocolo:

### 6.1. Arquitectura de Procesamiento Diferido

| Componente | Especificación |
| :--- | :--- |
| **Trigger** | Invocación manual por el administrador del sistema o automatizada por actualización de la fuente. |
| **Entorno de Ejecución** | Railway Worker independiente o máquina local de alta potencia para no saturar la API principal. |
| **Checkpoints** | El script guardará estados intermedios en MinIO cada 30 minutos. En caso de fallo, reanudará sin reinicio desde cero. |
| **Repositorio de Resultados** | Capa procesada almacenada en MinIO bajo la ruta: `/layers/[ID_CAPA]/v[N]/datos.pmtiles`. |
| **Registro** | Cada etapa se registra en los logs del servidor. |

### 6.2. Notificaciones y Alertas

El sistema enviará notificaciones automáticas en los siguientes eventos:
- ✅ Inicio del proceso de generación de Vector Tiles.
- ⚠️ Error crítico o interrupción inesperada.
- 📊 Hito de avance significativo.
- ✅ Finalización exitosa, nueva versión de la capa disponible en el visor.

### 6.3. Estimación de Costos de Infraestructura

Antes de ejecutar procesos de generación de tiles, el Desarrollador presentará una estimación de consumo en Railway créditos.

### 6.4. Optimización para Servicio Web

Todas las capas de alta resolución deberán ser transformadas antes de su publicación:
- **Vector Tiles (PMTiles):** Para datos vectoriales grandes (> 10,000 features).
- **Cloud Optimized GeoTIFF (COG):** Para datos ráster históricos o de cobertura.
- **Requisito de Rendimiento:** Renderizado de capa en el visor < **2 segundos** desde su activación.

---

## 7. REQUERIMIENTOS TÉCNICOS NO FUNCIONALES

### 7.1. Seguridad
- Toda comunicación sobre **HTTPS** con certificado TLS vigente.
- Las **Presigned URLs** de MinIO para descarga de tiles con expiración máxima de 1 hora.

### 7.2. Interoperabilidad
- El visor debe soportar capas WMS 1.3.0, WFS 2.0.0 y PMTiles.
- Los polígonos de resultado del módulo de Análisis Geoespacial deben poder visualizarse en el visor mediante un enlace directo.

### 7.3. Escalabilidad
- Nuevas capas se añaden actualizando el catálogo JSON sin modificar el código del componente.

### 7.4. Accesibilidad
- Cumplimiento de **WCAG 2.1 Nivel AA** para todos los controles del panel de capas.

### 7.5. Compatibilidad de Navegadores
- Funcional en Chrome, Firefox y Edge (versiones actuales) sin requerir plugins adicionales.

---

## 8. ESTÁNDARES DE DOCUMENTACIÓN Y TRAZABILIDAD

### 8.1. Estructura de Repositorio

```
/layers/
  └── [ID_CAPA]/
      ├── v[N]/
      │   └── datos.pmtiles        # Capa en formato Vector Tiles
      └── metadata.json            # Ficha técnica de la capa
/src/
  └── /config/
      └── layers_catalog.json      # Catálogo consultable desde la interfaz
```

### 8.2. Linaje del Dato (Data Provenance)

Para cada capa del catálogo se documentará:
- **URL exacta** del servicio WMS/WFS de origen o archivo descargado.
- **Versión del producto** geoespacial.
- **Fecha de toma** del dato o periodo de validez.
- **Hash de verificación (MD5/SHA256)** del archivo fuente.

### 8.3. Versionamiento del Catálogo de Capas

Cada actualización del catálogo JSON se versionará con changelog justificado y registrado en PostgreSQL.

---

## 9. HERRAMIENTAS DE GESTIÓN DE PROYECTO

El adjudicatario utilizará obligatoriamente las siguientes herramientas:

| Herramienta | Uso | Justificación |
| :--- | :--- | :--- |
| **GitHub Projects** | Gestión de tareas, sprints e Issues vinculados al código. | Trazabilidad tarea-commit. |
| **GitHub Issues** | Registro de cada "Ficha de Configuración de Capa" como Issue etiquetado por eje. | Vinculación de la capa con el Pull Request de integración. |
| **GitHub Wiki** | Documentación del catálogo de capas disponibles y metodologías de procesamiento. | Disponibilidad permanente junto al código. |

El equipo se organizará en **sprints de 2 semanas** con reuniones de sincronización semanales entre el SME y el Desarrollador.

---

## 10. PRODUCTOS ENTREGABLES Y CRITERIOS DE ACEPTACIÓN

| # | Entregable | Descripción | Criterio de Aceptación |
| :--- | :--- | :--- | :--- |
| **E1** | `MapExplorer.jsx` implementado | Visor completo con catálogo de capas y panel de información. | Carga inicial < 3s; capas WMS activan en < 2s. |
| **E2** | `MapComparator.jsx` implementado | Visor comparativo con 3 modos funcionales. | Sincronización de zoom sin latencia perceptible. |
| **E3** | `MiniMap.jsx` refactorizado | Componente compartido documentado con 4 modos. | Funcional en todos los módulos que lo consumen. |
| **E4** | Catálogo de capas JSON | Mínimo 7 capas catalogadas (1 por eje/tipo mínimo). | Aprobado por el SME; consultable desde la interfaz. |
| **E5** | Integración de Vector Tiles (PMTiles) | Al menos 2 capas sirviendo desde MinIO en formato PMTiles. | Renderizado en < 2 segundos en red estándar. |
| **E6** | Exportación de captura | Imagen PNG descargable del visor con ambos paneles. | Generada en < 3 segundos. |
| **E7** | Informe de QA Espacial | Tabla de integridad por capa integrada. | Coincidencia con versión publicada por la fuente oficial. |

---

## 11. ACUERDOS DE NIVEL DE SERVICIO (SLA)

| Métrica | Indicador | Umbral Mínimo Aceptable |
| :--- | :--- | :--- |
| Disponibilidad del Módulo | Uptime mensual | 99.5% en horario laboral (08:00–20:00 UTC-6) |
| Tiempo de Carga Inicial del Visor | Mapa base visible | < 3,000 ms |
| Tiempo de Activación de Capa WMS | Desde toggle hasta render | < 2,000 ms |
| Sincronización del Comparador | Latencia entre paneles | Imperceptible (< 50 ms) |
| Recuperación ante Fallos | RTO del proceso de generación de tiles | < 30 minutos desde último checkpoint |
| Tiempo de Respuesta a Incidentes | Bugs críticos en producción | Resolución en < 4 horas hábiles |

---

## 12. PROPIEDAD INTELECTUAL Y CONFIDENCIALIDAD

- **12.1.** Todo el código fuente, configuraciones de capas y documentación desarrollados serán propiedad exclusiva de la OAR.
- **12.2.** El adjudicatario cede todos los derechos patrimoniales de autor sobre los productos desarrollados.
- **12.3.** Las configuraciones del catálogo de capas y los tiles almacenados en MinIO son activos institucionales de la OAR.
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
| Experiencia demostrable en cartografía web y Leaflet.js/Mapbox GL | 30% |
| Calidad técnica de la propuesta de arquitectura del visor | 25% |
| Oferta económica | 20% |
| Experiencia en integración con APIs OGC (WMS/WFS) y Vector Tiles | 15% |
| Propuesta de gestión del proyecto (cronograma, sprints, herramientas) | 10% |

---

## 15. GLOSARIO DE TÉRMINOS TÉCNICOS

| Término | Definición |
| :--- | :--- |
| **PMTiles** | Formato de archivo de un solo volumen para Vector Tiles, optimizado para servicio desde almacenamiento de objetos (S3/MinIO). |
| **WMS/WFS** | Estándares OGC para servicios de mapas por imagen (WMS) y datos vectoriales con atributos (WFS). |
| **Vector Tiles** | Representación de datos geoespaciales vectoriales comprimidos en teselas, optimizados para renderizado eficiente en el cliente. |
| **Leaflet.SideBySide** | Plugin de Leaflet.js que implementa el efecto de pantalla dividida para comparar dos capas sobre el mismo mapa. |
| **COG (Cloud Optimized GeoTIFF)** | Formato de imagen ráster optimizado para acceso parcial desde almacenamiento en la nube sin descarga completa. |
| **Nominatim** | Servicio de geocodificación de OpenStreetMap que convierte nombres de lugar en coordenadas geográficas. |
| **Linaje del Dato** | Registro completo del origen, transformación y entrega de un dato desde su fuente primaria. |

---

## 16. REFERENCIAS NORMATIVAS Y BIBLIOGRÁFICAS

- **OGC Standards — Open Geospatial Consortium:** WMS 1.3.0, WFS 2.0.0, OGC API Features.
- **WCAG 2.1 — Web Content Accessibility Guidelines** — W3C Recommendation, 2018.
- **ISO 19115-1:2014** — Geographic Information: Metadata.
- **ISO/IEC 27001:2022** — Information Security Management Systems.
- **Leaflet.js Documentation:** https://leafletjs.com/
- **PMTiles Specification:** https://github.com/protomaps/PMTiles
- **WDPA — World Database on Protected Areas:** https://www.protectedplanet.net/
- **NASA FIRMS VIIRS Documentation:** https://firms.modaps.eosdis.nasa.gov/
- **NOAA Coral Reef Watch:** https://coralreefwatch.noaa.gov/
- **GFW — Global Forest Watch API:** https://www.globalforestwatch.org/

---

*Este documento de Términos de Referencia es de carácter vinculante para el adjudicatario y constituye el marco técnico y operativo bajo el cual se evaluará el cumplimiento del contrato. Toda modificación al alcance deberá ser aprobada mediante adenda escrita y firmada por ambas partes.*

**Versión:** 1.0 | **Fecha:** Marzo 2025 | **Clasificación:** Licitación Pública Internacional


