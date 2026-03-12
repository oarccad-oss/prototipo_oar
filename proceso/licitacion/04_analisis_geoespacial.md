# TÉRMINOS DE REFERENCIA (TDR)
## MÓDULO: ANÁLISIS GEOESPACIAL TRANSVERSAL
### Observatorio Ambiental Regional (OAR)

---

**Código del Proceso:** OAR-TDR-2025-MOD-04
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

El prototipo cuenta con el módulo de Análisis Geoespacial de mayor madurez arquitectónica del sistema, compuesto por `GeoAnalysisHome.jsx` (hub de entrada), `GeoAnalysisLayout.jsx` (layout) y `GeoAnalysisGeneric.jsx` (motor parametrizable). Actualmente el motor simula el procesamiento mediante `setTimeout`, sin conexión real al backend Python. La presente licitación busca completar la integración End-to-End del módulo y ampliar el catálogo de análisis disponibles.

---

## 2. OBJETO DE LA CONTRATACIÓN

Contratar los servicios de una empresa o consorcio especializado para el **desarrollo, integración y documentación del Módulo de Análisis Geoespacial Transversal** del Observatorio Ambiental Regional (OAR), conectando el motor de análisis frontend con el backend de Python/GDAL del Datalake OAR, implementando herramientas de dibujo interactivo sobre el mapa y ampliando el catálogo de análisis para cubrir todos los ejes temáticos de la ERAM.

---

## 3. ALCANCE TÉCNICO DEL PROYECTO

El alcance comprende, sin carácter limitativo, las siguientes actividades:

- **3.1** Integración del componente **`GeoAnalysisGeneric.jsx`** con los endpoints FastAPI del Datalake OAR. Actualmente el componente simula el procesamiento con `setTimeout`. La integración real requiere:

  | Prop actual/nueva | Tipo | Descripción |
  | :--- | :--- | :--- |
  | `title` | `string` | Nombre visible del tipo de análisis en la interfaz. |
  | `description` | `string` | Descripción metodológica breve del análisis para el panel de información. |
  | `layers` | `string[]` | Nombres de capas PostGIS/WFS requeridas para el algoritmo. UsadAspor el backend; visibles en el panel de información. |
  | `uses` | `string[]` | Casos de uso del análisis (mostrados como chips en la UI). |
  | `pythonFunction` | `string` | Nombre de la función Python en el Datalake que ejecuta el algoritmo (ej. `"run_restriction_analysis"`). Enviado en el body del POST. |
  | `apiEndpoint` | `string` | URL del endpoint FastAPI. Actualmente ausente; hardcoded como `setTimeout`. Valor estipulado: `"/api/geo-analysis/execute"`. |
  | `onResultsReady` | `(result: GeoAnalysisResult) => void` | Callback invocado cuando el backend retorna el resultado, para renderizar en el mapa padre. |

  El body del `POST /api/geo-analysis/execute` tendrá la siguiente estructura:
  ```json
  {
    "analysis_type": "restriction_check",
    "python_function": "run_restriction_analysis",
    "geometry": { "type": "Polygon", "coordinates": [...] },
    "parameters": { "buffer_distance_m": 500, "crs": "EPSG:4326" }
  }
  ```

- **3.2** Implementación de **herramientas de dibujo interactivo** mediante `Leaflet.Draw`, incluyendo los 4 tipos de geometría requeridos:
  - **Polígono libre:** Trazado vertex a vertex con cierre automático al hacer click en el primer vértice.
  - **Rectángulo:** Click y arrastre diagónal.
  - **Círculo:** Click y arrastre radial. El radio debe ser visible en metros durante el dibujo.
  - **Importación de archivo:** Dropzone que acepta GeoJSON (`.geojson`, `.json`) y Shapefile comprimido (`.zip` con `.shp`, `.dbf`, `.prj`, `.shx`). La geometría se parsea y renderiza sobre el mapa.

- **3.3** Implementación de los **8 tipos de análisis** en el endpoint `POST /api/geo-analysis/execute`:

  | ID | Nombre | Eje | Algoritmo Espacial |
  | :--- | :--- | :--- | :--- |
  | `restriction_check` | Verificación de Restricciones Legales | Todos | Intersección con capa WDPA + ASPs nacionales (PostGIS) |
  | `deforestation_impact` | Impacto de Deforestación | Bosques | Álgebra de mapas: cobertura boscosa GFW 2000 vs. 2024 |
  | `ecosystem_classification` | Clasificación de Ecosistemas | Biodiversidad | Intersección con capa de ecosistemas TEOW (WWF) |
  | `hydrological_stress` | Estrés Hídrico | Agua | Índice de Aridez + Demanda/Disponibilidad hídrica (AQUASTAT) |
  | `climate_vulnerability` | Vulnerabilidad Climática | Clima | Índice compuesto: exposición + sensibilidad + capacidad de adaptación |
  | `coral_thermal_stress` | Estrés Térmico de Coral | Océanos | DHW (Degree Heating Weeks) sobre capa NOAA CRW |
  | `anthropic_pressure` | Presión Antrópica | Todos | Índice de Presión Humana: densidad poblacional + cambio de suelo |
  | `sica_projects` | Proyectos SICA Activos | Todos | Intersección con capa de proyectos georeferenciados del Datalake |

- **3.4** Implementación del **historial de los últimos 5 análisis** de la sesión activa, almacenado en `sessionStorage` bajo la clave `oar_geo_history`. Cada entrada del historial incluye: tipo de análisis, geometría de entrada (GeoJSON), timestamp y resultado resumido.

- **3.5** Habilitación de la **exportación de resultados** en 3 formatos: GeoJSON (geometría de resultado), CSV (tabla de atributos) y PDF (captura del mapa + tabla de hallazgos). El PDF incluye la geometría analizada, los hallazgos principales y la metodología científica resumida del `METHODOLOGY.md`.

- **3.6** Implementación del modo **Background Job** para análisis de larga duración: el backend retorna `{ task_id, status: "pending" }` y el frontend realiza polling a `GET /api/geo-analysis/status/{task_id}` cada 5 segundos hasta `status: "completed"`. El indicador de progreso es visible en la UI durante el periodo de espera.

- **3.7** Documentación `METHODOLOGY.md` para cada tipo de análisis implementado, con estructura: Descripción del algoritmo / Capas utilizadas (con versiones) / Procedimiento de cálculo / Limitaciones conocidas / Ejemplo de resultado.

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
| **Competencias Técnicas** | Dominio de SIG (QGIS/ArcGIS), análisis multitemporal satelital, intersección espacial y metodologías de clasificación de ecosistemas. |
| **Competencias Blandas** | Liderazgo científico, comunicación interdisciplinaria, orientación a resultados medibles. |
| **Rol en el Módulo** | Definición de la lógica científica de cada análisis; revisión de capas y atributos a utilizar; validación del QA Espacial; firma de acta de conformidad por tipo de análisis implementado. |

---

### 4.2. Ingeniero Senior de Datos y Frontend (Senior Fullstack Data Engineer)

| Atributo | Especificación |
| :--- | :--- |
| **Formación** | Título universitario en Ingeniería en Sistemas, Ciencias de la Computación, Ingeniería de Software o afín. |
| **Experiencia** | Mínimo 5 años en desarrollo de aplicaciones de datos geoespaciales y visualización web. |
| **Tecnologías Mandatorias** | Python 3.10+, FastAPI, GDAL/OGR, SQLAlchemy 2.0 async, asyncpg, PostgreSQL/PostGIS, MinIO (boto3/S3 API), React 18+, Vite, Leaflet.js, Leaflet.Draw. |
| **Tecnologías Deseables** | Celery (Background Jobs), GeoServer (administración), QGIS, Cloud Optimized GeoTIFF (COG), Tippecanoe (Vector Tile Generation). |
| **Estándares OGC** | Conocimiento operativo de WMS, WFS, WCS, OGC API Features. |
| **Competencias Blandas** | Documentación técnica exhaustiva, gestión del tiempo en entregas cortas (sprints), comunicación clara con perfiles no técnicos. |
| **Rol en el Módulo** | Desarrollo de endpoints FastAPI; integración frontend-backend; implementación de herramientas de dibujo; documentación metodológica; gestión del repositorio Git. |

---

### 4.3. Coordinador Técnico del Proyecto (Opcional — para contratos de más de 6 meses)

| Atributo | Especificación |
| :--- | :--- |
| **Formación** | Ingeniería, Ciencias o Administración con especialidad en gestión de proyectos tecnológicos. |
| **Certificación** | PMP, PRINCE2 o certificación en metodologías ágiles (Scrum Master). |
| **Rol en el Módulo** | Punto de contacto único con la entidad contratante; coordinación SME–Desarrollador; emisión de informes de avance semanales. |

---

## 5. PROTOCOLO OPERATIVO: CICLO DE INGENIERÍA DE ANÁLISIS ESPACIAL

El proceso de implementación de cada tipo de análisis geoespacial sigue un ciclo de **ingeniería de algoritmos espaciales**, radicalmente distinto al de otros módulos. Aquí la complejidad reside en la precisión matemática de las operaciones geométricas sobre el backend Python/GDAL/PostGIS, en el manejo de sistemas de referencia de coordenadas (CRS) y en la correcta selección e indexación de las capas espaciales de la base de datos. El SME define la lógica científica; el Desarrollador es responsable de su implementación fidedigna y verificable contra un resultado de referencia conocido.

---

### Fase I — Especificación del Algoritmo (Responsable: SME)

El SME define con precisión la lógica del análisis antes de iniciar ninguna implementación técnica. Esta especificación es la piedra angular de todo el ciclo:

- **Tipo de Operación Espacial:** Intersección / Buffer / Clip / Álgebra de mapas / Detección de cambio temporal.
- **Capas de Input:** Denominación oficial de cada capa en el Diccionario del Datalake, su CRS nativo y el atributo clave a consultar.
- **Lógica de Procesamiento en Pseudocódigo:** El SME describe el proceso en lenguaje no técnico: *"Para cada polígono dibujado por el usuario, determinar qué porcentaje de su área cae dentro de una zona de amortiguamiento de área protegida"*.
- **Outputs Esperados:** Descripción exacta del resultado: listado de texto / tabla de atributos / GeoJSON de geometrías resultantes / mapa de diferencias.
- **Caso de Prueba de Referencia:** El SME debe proveer UN caso de uso verificado: una geometría de entrada con coordenadas exactas y el resultado correcto esperado (valor de referencia). Este caso se usará como único criterio de verdad durante el QA.

**Resultado de la Fase:** Documento `ALGORITHM_SPEC.md` firmado por el SME. Sin este documento, no puede iniciarse la Fase II.

---

### Fase II — Preparación y Optimización de Capas Espaciales (Responsable: Desarrollador)

Antes de escribir el algoritmo, el Desarrollador prepara la infraestructura de datos:

- **Adquisición de Capas:** Descarga o actualización de las capas especificadas en el `ALGORITHM_SPEC.md` desde sus fuentes primarias. Registro en `DATA_PROVENANCE.md`.
- **Reproyección:** Transformación de todas las capas al CRS común del sistema (EPSG:4326). Verificación de que no haya pérdida de precisión.
- **Carga en PostGIS:** Importación de las capas a la base de datos PostgreSQL/PostGIS con índices GIST sobre las geometrías para optimizar las consultas de intersección.
- **Prueba de Integridad Geométrica:** Verificación con `ST_IsValid()` de que no existan geometrías rotas o autointereseccionadas. Reparación con `ST_MakeValid()` si aplica.

**Resultado de la Fase:** Capas cargadas, indexadas y validadas en PostGIS. Informe de preparación de datos en el repositorio.

---

### Fase III — Desarrollo del Algoritmo en Backend (Responsable: Desarrollador)

Con la infraestructura de datos lista, el Desarrollador implementa el algoritmo Python:

- Codificación del endpoint `POST /api/geo-analysis/execute` en FastAPI, con la lógica de intersección en SQL/PostGIS o GDAL.
- Para operaciones simples (< 4h): procesamiento síncrono con respuesta directa en el HTTP Response.
- Para operaciones complejas (> 4h): generación de un `task_id` y procesamiento en Background Job con polling de estado.
- **Prueba contra el Caso de Referencia:** El Desarrollador ejecuta el algoritmo sobre el caso definido por el SME en la Fase I y verifica que el output coincida con el resultado esperado. Esta prueba es **bloqueante**: si el resultado es erróneo, no puede avanzarse a la siguiente fase.
- Documentación del algoritmo en `METHODOLOGY.md` con lenguaje comprensible para el SME.

---

### Fase IV — Integración Frontend–Backend y Experiencia de Usuario (Responsable: Desarrollador)

Validado el algoritmo en el backend, se conecta con la interfaz de usuario:

- Configuración del componente `GeoAnalysisGeneric.jsx` con las props del nuevo tipo de análisis (`title`, `description`, `layers`, `uses`, `pythonFunction`).
- Implementación del fetch real a `POST /api/geo-analysis/execute`, sustituyendo el `setTimeout` del prototipo.
- Renderizado de los resultados sobre el mapa como capa diferenciada (GeoJSON overlay) y en el panel de hallazgos lateral.
- Implementación del historial de los últimos 5 análisis de la sesión activa.
- Habilitación de la exportación de resultados en GeoJSON, CSV y PDF.

---

### Fase V — Pruebas de Exactitud Espacial (Responsable: Desarrollador + SME)

Esta fase es la más exigente del ciclo y no puede omitirse:

- El SME provee **5 casos adicionales de prueba** (geométricas de entrada con resultados verificados de forma independiente usando QGIS u otra herramienta de referencia).
- El Desarrollador ejecuta el sistema contra los 5 casos y documenta los resultados en la **Tabla de Control de Exactitud Espacial**: input GeoJSON / resultado del sistema / resultado esperado de referencia / diferencia porcentual.
- El margen de error aceptable para resultados de área se define en el SLA (Sección 11).
- **Prueba de Límite (Edge Case):** Se prueban geometrías especiales: polígono que cruza el área sin intersección (resultado esperado: 0 hallazgos), polígono completamente contenido en una restricción (resultado esperado: 100% afectado), polígono con límite exacto sobre el borde de una capa.
- El SME firma el **Acta de Exactitud Espacial** confirmando que el algoritmo es científicamente confiable.

---

### Fase VI — Publicación y Documentación Metodológica Abierta (Responsable: Desarrollador)

Un análisis geoespacial tiene valor documental más allá de su interfaz:

- El tipo de análisis queda disponible en el catálogo de `GeoAnalysisHome.jsx` con su tarjeta descriptiva.
- El archivo `METHODOLOGY.md` queda público en el repositorio Git, explicando el algoritmo en lenguaje comprensible para técnicos de otros países que deseen replicarlo o adaptarlo.
- Las capas espaciales utilizadas quedan versionadas en el Diccionario del Datalake con su fecha de actualización.
- Se define el protocolo de **actualización de capas:** cuando una capa fuente publica una nueva versión (ej. WDPA actualiza cada mes), el Desarrollador la procesa y reemplaza en PostGIS, manteniendo la versión anterior archivada.
- El sistema actualiza el catálogo interno de análisis disponibles.




---

## 6. GESTIÓN DE PROCESAMIENTO DE DATOS COMPLEJOS

Cuando un análisis requiera cómputo de clasificación de imágenes satelitales o intersección de capas masivas con tiempos superiores a 4 horas, el adjudicatario aplicará el siguiente protocolo:

### 6.1. Arquitectura de Procesamiento Diferido

| Componente | Especificación |
| :--- | :--- |
| **Trigger** | Invocación por solicitud del usuario desde el frontend. |
| **Entorno de Ejecución** | Railway Worker independiente para no saturar la API principal. |
| **Checkpoints** | El script guardará estados intermedios en MinIO cada 30 minutos. En caso de fallo, reanudará sin reinicio desde cero. |
| **Repositorio de Resultados** | Producto final en MinIO bajo la ruta: `/data/processed/[ID_ANALISIS]/resultado_v[N].geojson`. |
| **Registro** | Cada etapa del proceso se registra en los logs del servidor. |

### 6.2. Notificaciones y Alertas

El sistema enviará notificaciones automáticas en los siguientes eventos:
- ✅ Inicio del proceso de análisis pesado.
- ⚠️ Error crítico o interrupción inesperada.
- 📊 Hito de avance significativo (ej. 50% completado).
- ✅ Finalización exitosa, resultado disponible para visualización.

### 6.3. Estimación de Costos de Infraestructura

Antes de ejecutar análisis de larga duración, el Desarrollador presentará una estimación de consumo en Railway créditos.

### 6.4. Optimización para Servicio Web

Los resultados masivos se transformarán en:
- Datos vectoriales: **Vector Tiles (.pbf)** para renderizado eficiente en Leaflet.
- **Requisito de Rendimiento:** Respuesta síncrona del backend (análisis simples) < **5 segundos**.

---

## 7. REQUERIMIENTOS TÉCNICOS NO FUNCIONALES

### 7.1. Seguridad
- Toda comunicación sobre **HTTPS** con certificado TLS vigente.
- Autenticación mediante **JWT** para los endpoints de análisis.

### 7.2. Interoperabilidad
- El módulo debe operar sobre todos los ejes sin dependencias de código específico por eje.
- Soporte de importación de polígonos en formato GeoJSON y Shapefile desde el sistema de archivos local del usuario.

### 7.3. Escalabilidad
- Nuevos tipos de análisis se añaden creando un archivo de configuración en `/scripts/tasks/` sin modificar el componente React base.

### 7.4. Accesibilidad
- Cumplimiento de **WCAG 2.1 Nivel AA** para los controles interactivos del mapa.

### 7.5. Compatibilidad de CoordenadasSistema de Referencia
- El sistema deberá operar en **EPSG:4326 (WGS84)** como CRS estándar para la entrada y salida de geometrías.

---

## 8. ESTÁNDARES DE DOCUMENTACIÓN Y TRAZABILIDAD

### 8.1. Estructura de Repositorio

```
/scripts/
  └── /tasks/
      └── [ID_ANALISIS]/
          ├── main.py                  # Algoritmo de análisis geoespacial
          ├── environment.yml          # Dependencias exactas (GDAL, shapely, etc.)
          ├── METHODOLOGY.md           # Metodología comprensible para el SME
          ├── DATA_PROVENANCE.md       # Linaje del dato: fuente, sensor, fecha, URL
          └── QA_REPORT.md            # Informe de integridad y validación
```

### 8.2. Linaje del Dato (Data Provenance)

- **URL exacta** o nombre de la capa PostGIS/WFS utilizada.
- **Versión** del producto geoespacial de referencia.
- **Sistema de referencia de coordenadas (CRS)** de la capa fuente.
- **Hash de verificación (MD5/SHA256)** del archivo de capa descargado.

### 8.3. Versionamiento de Resultados

Los resultados de análisis se almacenan en MinIO con versiones históricas y changelog en PostgreSQL.

---

## 9. HERRAMIENTAS DE GESTIÓN DE PROYECTO

El adjudicatario utilizará obligatoriamente las siguientes herramientas:

| Herramienta | Uso | Justificación |
| :--- | :--- | :--- |
| **GitHub Projects** | Gestión de tareas, sprints e Issues vinculados al código. | Trazabilidad tarea-commit. |
| **GitHub Issues** | Registro de la "Ficha de Requerimiento de Análisis" como Issue etiquetado por tipo. | Vinculación del análisis con el Pull Request de implementación. |
| **GitHub Wiki** | Documentación del catálogo de análisis y metodologías geoespaciales. | Disponibilidad permanente junto al código. |

El equipo se organizará en **sprints de 2 semanas** con reuniones de sincronización semanales entre el SME y el Desarrollador.

---

## 10. PRODUCTOS ENTREGABLES Y CRITERIOS DE ACEPTACIÓN

| # | Entregable | Descripción | Criterio de Aceptación |
| :--- | :--- | :--- | :--- |
| **E1** | Integración frontend-backend | `GeoAnalysisGeneric.jsx` conectado a FastAPI real. | Respuesta real en < 5s para análisis simples. |
| **E2** | Herramientas de dibujo (Leaflet.Draw) | Polígono, rectángulo, círculo e importación de archivo. | Funcionales en Chrome, Firefox y Edge actuales. |
| **E3** | Endpoints FastAPI | `POST /api/geo-analysis/execute` para 8 tipos de análisis. | Documentados con OpenAPI/Swagger. |
| **E4** | 4 análisis nuevos implementados | Estrés Hídrico, Vulnerabilidad Climática, Estrés Térmico, Presión Antrópica. | End-to-End funcionales con datos reales; aprobados por el SME. |
| **E5** | Exportación de resultados | GeoJSON, CSV y PDF generados por análisis. | Archivos descargables sin errores para los 8 tipos. |
| **E6** | `METHODOLOGY.md` por análisis | Documentación metodológica de cada tipo de análisis. | Comprensible y aprobado por el SME para cada tipo. |
| **E7** | Informe de QA Espacial | Tabla de integridad por análisis. | Margen de error < 0.05% frente a referencia del SME. |

---

## 11. ACUERDOS DE NIVEL DE SERVICIO (SLA)

| Métrica | Indicador | Umbral Mínimo Aceptable |
| :--- | :--- | :--- |
| Disponibilidad del Módulo | Uptime mensual | 99.5% en horario laboral (08:00–20:00 UTC-6) |
| Tiempo de Respuesta (análisis simple) | Latencia síncrona del backend | < 5,000 ms |
| Recuperación de Background Job | RTO ante fallo de infraestructura | < 30 minutos desde último checkpoint |
| Integridad Espacial | Margen de error vs. referencia del SME | < 0.05% |
| Tiempo de Respuesta a Incidentes | Bugs críticos en producción | Resolución en < 4 horas hábiles |

---

## 12. PROPIEDAD INTELECTUAL Y CONFIDENCIALIDAD

- **12.1.** Todo el código fuente, algoritmos y documentación desarrollados serán propiedad exclusiva de la OAR.
- **12.2.** El adjudicatario cede todos los derechos patrimoniales de autor sobre los productos desarrollados.
- **12.3.** Los resultados de análisis geoespacial son información institucional confidencial de la OAR.
- **12.4.** El adjudicatario deberá suscribir un **Acuerdo de No Divulgación (NDA)** previo al inicio del contrato.

---

## 13. PENALIZACIONES Y GESTIÓN DE RIESGOS

| Evento | Penalización |
| :--- | :--- |
| Entrega de Fase fuera del plazo acordado (por día hábil) | 0.5% del valor total del contrato |
| Entregable rechazado por incumplimiento de criterios de aceptación | Corrección sin costo adicional en un plazo de 5 días hábiles |
| Falla de seguridad atribuible al código entregado | Corrección inmediata y análisis post-mortem obligatorio |
| Documentación incompleta o ausente al momento de la entrega | Retención del 10% del pago del hito hasta subsanar |
| Pérdida de datos o corrupción de repositorio por negligencia | Restauración a último estado estable + informe de causa raíz |

---

## 14. CRITERIOS DE EVALUACIÓN DE OFERTAS

| Criterio | Peso |
| :--- | :--- |
| Experiencia demostrable en SIG, GDAL y análisis geoespacial Python | 30% |
| Calidad técnica de la propuesta de integración End-to-End | 25% |
| Oferta económica | 20% |
| Experiencia en APIs OGC y procesamiento de datos satelitales | 15% |
| Propuesta de gestión del proyecto (cronograma, sprints, herramientas) | 10% |

---

## 15. GLOSARIO DE TÉRMINOS TÉCNICOS

| Término | Definición |
| :--- | :--- |
| **GDAL/OGR** | Geospatial Data Abstraction Library. Librería de código abierto para lectura, escritura y transformación de datos geoespaciales ráster y vectoriales. |
| **Intersección Espacial** | Operación geoespacial que identifica la zona común entre dos geometrías (ej. un polígono dibujado y una capa de áreas protegidas). |
| **Background Job** | Proceso de cómputo ejecutado de forma asíncrona, sin bloquear la disponibilidad de la interfaz de usuario. |
| **Checkpoint** | Punto de guardado intermedio que permite reanudar un proceso largo ante un fallo de infraestructura. |
| **EPSG:4326** | Sistema de Referencia de Coordenadas (CRS) estándar WGS84, utilizado para coordenadas en grados decimales de latitud/longitud. |
| **Leaflet.Draw** | Plugin de Leaflet.js que habilita herramientas interactivas de dibujo de geometrías (puntos, líneas, polígonos) sobre el mapa. |
| **Linaje del Dato** | Registro completo del origen, transformación y entrega de un dato desde su fuente primaria. |

---

## 16. REFERENCIAS NORMATIVAS Y BIBLIOGRÁFICAS

- **Marco de Kunming-Montreal (COP15, 2022):** Meta 30x30.
- **Agenda 2030 para el Desarrollo Sostenible (ONU, 2015):** ODS 15 y ODS 14.
- **OGC Standards — Open Geospatial Consortium:** WMS 1.3.0, WFS 2.0.0.
- **WCAG 2.1 — Web Content Accessibility Guidelines** — W3C Recommendation, 2018.
- **ISO 19115-1:2014** — Geographic Information: Metadata.
- **ISO/IEC 27001:2022** — Information Security Management Systems.
- **GDAL Documentation:** https://gdal.org/
- **Leaflet.Draw Documentation:** https://leaflet.github.io/Leaflet.draw/
- **GFW — Global Forest Watch API:** https://www.globalforestwatch.org/
- **NASA FIRMS VIIRS Documentation:** https://firms.modaps.eosdis.nasa.gov/

---

*Este documento de Términos de Referencia es de carácter vinculante para el adjudicatario y constituye el marco técnico y operativo bajo el cual se evaluará el cumplimiento del contrato. Toda modificación al alcance deberá ser aprobada mediante adenda escrita y firmada por ambas partes.*

**Versión:** 1.0 | **Fecha:** Marzo 2025 | **Clasificación:** Licitación Pública Internacional


