# TÉRMINOS DE REFERENCIA (TDR)
## MÓDULO: REPORTE TÉCNICO POR EJE TEMÁTICO
### Observatorio Ambiental Regional (OAR)

---

**Código del Proceso:** OAR-TDR-2025-MOD-03
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

El prototipo cuenta con tres reportes técnicos implementados de forma independiente: `ForestReport.jsx` (Bosques/FRA-2024), `GFWReport.jsx` (Bosques/GFW) y `BioReport.jsx` (Biodiversidad). Cada uno demuestra el nivel de detalle, rigor analítico e interactividad esperado. La presente licitación busca generalizar este patrón hacia un **componente de Informe Científico Parametrizable** que soporte todos los ejes de la ERAM.

---

## 2. OBJETO DE LA CONTRATACIÓN

Contratar los servicios de una empresa o consorcio especializado para el **diseño, desarrollo, implementación y documentación del Módulo de Reporte Técnico por Eje Temático** del Observatorio Ambiental Regional (OAR), generalizando las implementaciones existentes hacia un componente genérico `TechnicalReport`, implementando los reportes faltantes para los ejes de Agua, Clima y Océanos, e integrando el motor de narrativa automatizada en todos los reportes.

---

## 3. ALCANCE TÉCNICO DEL PROYECTO

El alcance comprende, sin carácter limitativo, las siguientes actividades:

- **3.1** Refactorización de los componentes `ForestReport.jsx`, `GFWReport.jsx` y `BioReport.jsx` hacia el componente genérico **`TechnicalReport`**. El componente eliminará todo valor hardcoded proveniente del eje Bosques. Su interfaz de props obligatoria incluye:

  **Grupo A — Identificación y Metadatos del Reporte**

  | Prop | Tipo | Descripción |
  | :--- | :--- | :--- |
  | `reportId` | `string` | Código único del reporte. Ej: `"REP-BOS-FRA-2024"`. Usado para rutas de cache en `sessionStorage`. |
  | `reportTitle` | `string` | Título oficial del reporte. Ej: `"Evaluación de Recursos Forestales Mundiales 2024"`. Actualmente hardcoded en `ForestReport.jsx`. |
  | `reportSource` | `string` | Organismo emisor. Ej: `"FAO"`, `"NOAA"`, `"GBIF"`. |
  | `reportYear` | `number` | Año de referencia de los datos. |
  | `reportPeriod` | `string` | Período analizado. Ej: `"1990–2024"`. |
  | `axisId` | `string` | Identificador del eje. Determina colores, rutas y etiquetas. |
  | `axisColor` | `object` | Paleta de colores: `{ primary, light, dark }`. Actualmente hardcoded como `green-*` en `ForestReport.jsx`. |

  **Grupo B — Sección 1: KPIs**

  | Prop | Tipo | Descripción |
  | :--- | :--- | :--- |
  | `kpis` | `ReportKpi[]` | Array de 2 a 4 tarjetas de indicador clave. Cada `ReportKpi`: `{ id, label, value, unit, trend: "up" \| "down" \| "stable", trendDescription, source }`. Actualmente hardcoded con valores FRA-2024 de bosques. |

  **Grupo C — Sección 2: Visualización Principal**

  | Prop | Tipo | Descripción |
  | :--- | :--- | :--- |
  | `mainVizType` | `"gauge" \| "area_chart"` | Tipo de visualización principal. `gauge` para metas cuantificables (ej. Meta 30x30); `area_chart` para tendencias temporales. |
  | `mainVizData` | `GaugeConfig \| AreaChartConfig` | Datos y configuración para la visualización principal. Tipo varía según `mainVizType`. |

  **Grupo D — Sección 3: Análisis Secundario**

  | Prop | Tipo | Descripción |
  | :--- | :--- | :--- |
  | `secondaryChartData` | `BarChartConfig` | Datos para el BarChart de ranking por país. Incluye: `{ countries: CountryBar[], metricLabel, unit, year }`. |
  | `domainSpecificChartData` | `ChartConfig` | Datos para el gráfico específico del dominio (ej. tipos de bosque por cobertura para el eje Bosques; especies IUCN para Biodiversidad). |

  **Grupo E — Sección 4: Tabla de Datos**

  | Prop | Tipo | Descripción |
  | :--- | :--- | :--- |
  | `tableData` | `TableRow[]` | Datos tabulares por país SICA. Cada `TableRow`: `{ isoCode, countryName, value, unit, year, trend, source }`. Incluye botón de exportación CSV. |
  | `tableTitle` | `string` | Título de la columna de valor en la tabla. |

  **Grupo F — Sección 5: Mapa Sintético**

  | Prop | Tipo | Descripción |
  | :--- | :--- | :--- |
  | `mapConfig` | `MapConfig` | Configuración del mini-mapa con selector de año histórico: `{ wmsUrl, wmsLayer, center, zoom, yearRange: [minYear, maxYear] }`. Actualmente el mapa es un placeholder estático. |

  **Grupo G — Sección 6: Narrativa IA**

  | Prop | Tipo | Descripción |
  | :--- | :--- | :--- |
  | `narrativePromptKey` | `string` | Clave del prompt LLM en `/src/config/prompts/`. La narrativa se genera dinámicamente; no se hardcodea texto de interpretación. |
  | `apiEndpoint` | `string` | URL del endpoint del Datalake OAR desde donde se obtienen los datos para generar la narrativa. |

  **Restricciones de implementación:**
  - Todo acceso a propiedades de datos remotos debe implementar **optional chaining (`?.`)** para prevenir `TypeError` durante la carga asíncrona (ej. `data?.countries?.map(...)`).
  - Cada sección debe tener su propio estado de carga (skeleton) independiente; una sección fallida no bloquea las demás.
  - El `reportId` se usa como clave de `sessionStorage` para cachear los datos y evitar re-descargas en la misma sesión.

- **3.2** Implementación de 3 reportes nuevos tomando el componente `TechnicalReport` como base, uno por eje faltante: Agua (`REP-AGU`), Clima (`REP-CLI`) y Océanos (`REP-OCE`). Cada reporte requiere su propio archivo de configuración en `/src/config/reports/[axisId]_report_config.js`.

- **3.3** Integración del motor de narrativa IA (Sección 6) en todos los reportes. El Prompt LLM por reporte se almacena en `/src/config/prompts/[reportId]_narrativa.txt`. La nota de transparencia es parte del componente y no puede omitirse.

- **3.4** Implementación global de `optional chaining` (`?.`) en todos los accesos a datos remotos, verificable mediante ausencia de errores en la consola de producción.

- **3.5** Exportación a PDF de todos los reportes mediante librería del lado del cliente (ej. `html2canvas` + `jsPDF`). El PDF debe incluir todas las secciones, la nota de transparencia de la narrativa IA y el logo de la OAR.

- **3.6** Cache local en `sessionStorage` con clave `oar_report_[reportId]`, que expira al cerrar la pestaña. Si el dato existe en cache, no se hace fetch a la API.

- **3.7** Mini-mapa sintético (`mapConfig`) con selector de año histórico. El año seleccionado actualiza el parámetro `TIME` del servicio WMS para mostrar la capa correspondiente al período elegido.

---

## 4. PERFILES PROFESIONALES REQUERIDOS

El adjudicatario deberá garantizar la participación activa de los siguientes perfiles durante toda la ejecución del contrato:

---

### 4.1. Experto en la Materia (Subject Matter Expert — SME)

| Atributo | Especificación |
| :--- | :--- |
| **Formación** | Título universitario (mínimo Licenciatura, preferible Posgrado) en Ciencias Forestales, Biología, Geografía, Ciencias Ambientales o disciplina afín. |
| **Experiencia** | Mínimo 8 años de experiencia en proyectos de análisis geoespacial, monitoreo ambiental o gestión de recursos naturales. |
| **Idiomas** | Español (indispensable). Inglés técnico (deseable para lectura de documentación de APIs y reportes FAO/IPBES). |
| **Competencias Técnicas** | Dominio de metodologías de inventario forestal (FRA), sistemas de reporting ambiental (IPBES, NOAA) y cartografía temática. |
| **Competencias Blandas** | Liderazgo científico, comunicación interdisciplinaria, orientación a resultados medibles. |
| **Rol en el Módulo** | Definición de secciones, métricas e indicadores por reporte; redacción de reglas para narrativa IA; validación de precisión de datos; firma de acta de conformidad por cada reporte a producción. |

---

### 4.2. Ingeniero Senior de Datos y Frontend (Senior Fullstack Data Engineer)

| Atributo | Especificación |
| :--- | :--- |
| **Formación** | Título universitario en Ingeniería en Sistemas, Ciencias de la Computación, Ingeniería de Software o afín. |
| **Experiencia** | Mínimo 5 años en desarrollo de aplicaciones de datos geoespaciales y visualización web. |
| **Tecnologías Mandatorias** | Python 3.10+, FastAPI, GDAL/OGR, SQLAlchemy 2.0 async, asyncpg, PostgreSQL/PostGIS, MinIO (boto3/S3 API), React 18+, Vite, Recharts, Leaflet.js. |
| **Tecnologías Deseables** | Celery (Background Jobs), QGIS (análisis), Cloud Optimized GeoTIFF (COG), Tippecanoe. |
| **Estándares OGC** | Conocimiento operativo de WMS, WFS, WCS, OGC API Features. |
| **Competencias Blandas** | Documentación técnica exhaustiva, gestión del tiempo en entregas cortas (sprints), comunicación clara con perfiles no técnicos. |
| **Rol en el Módulo** | Refactorización del componente genérico; implementación de reportes nuevos; responsable del QA Espacial técnico; gestión del repositorio Git. |

---

### 4.3. Coordinador Técnico del Proyecto (Opcional — para contratos de más de 6 meses)

| Atributo | Especificación |
| :--- | :--- |
| **Formación** | Ingeniería, Ciencias o Administración con especialidad en gestión de proyectos tecnológicos. |
| **Certificación** | PMP, PRINCE2 o certificación en metodologías ágiles (Scrum Master). |
| **Rol en el Módulo** | Punto de contacto único con la entidad contratante; coordinación entre SME y Desarrollador; informes de avance semanales. |

---

## 5. PROTOCOLO OPERATIVO: CICLO DE PUBLICACIÓN CIENTÍFICA

El proceso de producción de cada Reporte Técnico sigue un ciclo de **publicación científica estructurada**, equiparable al proceso editorial de un informe institucional de organismos como FAO o IPBES. A diferencia de los tableros (datos en tiempo real) o los visores (capas cartográficas), el Reporte Técnico es un **producto documental de referencia** con periodicidad anual o biennial, que sintetiza el estado de un eje ambiental con rigor metodológico, visualizaciones de alta calidad e interpretación experta. Su complejidad reside en la validación de la precisión de los datos contra fuentes primarias antes de su publicación oficial.

---

### Fase I — Scoping Científico y Definición del Alcance (Responsable: SME)

El SME define el marco general del reporte antes de que el Desarrollador comience cualquier trabajo:

- **Tínculo oficial del informe** con su marco de referencia (ej. FAO-FRA-2025, IPBES 2024 Assessment).
- **Período de referencia:** Años cubiertos por el análisis (ej. 1990–2024).
- **Unidad de análisis:** Regional SICA / Por país / Ambos niveles de granularidad.
- **Indicadores principales:** Definición metodológica precisa de cada KPI (fórmula de cálculo, fuente y límites de validez).
- **Secciones del Informe:** Listado de los 7 bloques obligatorios con descripción del contenido de cada uno.
- **Hallazgos Esperados:** El SME redacta una hipótesis de los 3 principales hallazgos que el reporte debe demostrar o refutar con los datos. Esto sirve como guía científica para el Desarrollador durante el procesamiento.

**Resultado de la Fase:** Documento de Scoping firmado por el SME que establece el marco científico definitivo. Cualquier cambio posterior al Scoping requiere una adenda aprobada.

---

### Fase II — Recopilación, Procesamiento y Normalización de Datos (Responsable: Desarrollador)

Esta fase puede ser la más larga del ciclo si los datos requieren procesamiento multitemporal:

- Descarga de los datasets correspondientes al período definido en el Scoping, desde las fuentes primarias (FAO, WDPA, GBIF, GFW, NOAA, etc.).
- Normalización y limpieza: estandarización de unidades, manejo de valores nulos, reconciliación de datos entre países con distintas metodologías de reporte.
- Si el procesamiento supera 4 horas de cómputo, se activa el protocolo de Background Job definido en la Sección 6.
- El Desarrollador documenta el linaje completo del dato en `DATA_PROVENANCE.md`, incluyendo el hash MD5/SHA256 de cada archivo fuente descargado.

**Requisito crítico:** El SME debe revisar y aprobar los datos procesados antes de iniciar las visualizaciones. Si los datos difieren significativamente de las hipótesis del Scoping, se convoca una reunión de alineación para revisar el marco científico.

---

### Fase III — Construcción de Visualizaciones (Responsable: Desarrollador)

Con los datos validados por el SME, el Desarrollador implementa cada bloque del reporte:

- **Sección 1 (KPIs):** Tarjetas de indicador con valores reales y color de estado.
- **Sección 2 (Visualización Principal):** Gauge SVG para metas cuantificables o AreaChart temporal para tendencias.
- **Sección 3 (Análisis Secundario):** BarChart de ranking por país y gráfico específico del dominio.
- **Sección 4 (Tabla de Datos):** Grid scrollable con exportación CSV integrada.
- **Sección 5 (Mapa Sintético):** Mini-mapa con selector de año histórico y leyenda.

Cada visualización se entrega al SME de forma individual para su aprobación antes de ensamblar el reporte completo. Esto permite iterar rápidamente sobre diseños sin rehacerlos todos.

---

### Fase IV — Revisión Científica y Editorial (Responsable: SME)

Con el reporte ensamblado en entorno de staging, el SME realiza la revisión integral:

- **Verificación de Hallazgos:** Contrasta los hallazgos del reporte con las hipótesis del Scoping. Documenta las coincidencias y divergencias.
- **Revisión de Datos Tabulares:** Verifica que los valores de la Tabla de Datos por País sean coherentes con los reportes oficiales de cada gobierno SICA. Produce la **Tabla de Control de Integridad** (valor OAR vs. fuente oficial por país).
- **Aprobación de Leyendas:** Verifica que cada visualización esté correctamente titulada, que las unidades sean visibles y que la leyenda sea interpretable.
- **Redacción de Limitaciones Metodológicas:** El SME redacta la nota de limitaciones del reporte (ej. años sin dato para Países X e Y; metodologías heterogéneas entre países).

El reporte no puede publicarse sin la firma del **Acta de Conformidad Científica** por parte del SME. Esta firma certifica la veracidad del documento a nivel institucional.

---

### Fase V — Integración de Narrativa IA y Nota de Transparencia (Responsable: Desarrollador + SME)

Con el reporte validado científicamente, se añade la capa de interpretación automatizada:

- El SME redacta las **reglas de interpretación** por indicador: qué significa cada valor en términos de política pública.
- El Desarrollador configura el Prompt LLM para que genere el texto de la Sección 6 del reporte, tomando como inputs los valores de los KPIs y las reglas del SME.
- **Restricción crítica:** La narrativa IA opera exclusivamente sobre la interpretación; no puede modificar, redondear ni inferir valores numéricos no presentes en los datos fuente.
- Se incluye obligatoriamente la **Nota de Transparencia:** `"El análisis interpretativo de la Sección 6 fue generado por un motor de IA a partir de datos verificados y fue revisado por el equipo técnico de la OAR."` Esta nota no puede suprimirse.

---

### Fase VI — Publicación Oficial y Ciclo de Actualización Anual (Responsable: Desarrollador)

El Reporte Técnico tiene una gestión de versiones formal:

- Se publica bajo la ruta `/[eje]/reportes/[id]` con la versión y año de referencia visible en la portada.
- El PDF exportable se archiva en MinIO bajo la ruta `/reports/[ID_REPORTE]/v[N]/reporte.pdf` con su hash de integridad.
- Se registra la **fecha de publicación oficial** y la **fecha de próxima actualización prevista** en los metadatos del reporte.
- Cuando se publique la siguiente edición (ej. FRA-2026), la versión anterior queda archivada pero accesible mediante un selector de ediciones.
- El changelog de cada nueva versión queda documentado en PostgreSQL con el usuario que aprobó la publicación.



---

## 6. GESTIÓN DE PROCESAMIENTO DE DATOS COMPLEJOS

Cuando un reporte requiera el cómputo de series históricas (ej. análisis multitemporal 1990–2024) con tiempos de procesamiento superiores a 4 horas, el adjudicatario aplicará el siguiente protocolo:

### 6.1. Arquitectura de Procesamiento Diferido

| Componente | Especificación |
| :--- | :--- |
| **Trigger** | Invocación manual por el SME o automática por calendario (publicación anual del reporte). |
| **Entorno de Ejecución** | Railway Worker independiente o máquina local de alta potencia para evitar saturar la API principal. |
| **Checkpoints** | El script guardará estados intermedios en MinIO cada 30 minutos. En caso de fallo, el proceso se reanudará sin reiniciar desde cero. |
| **Repositorio de Resultados** | Producto final depositado en MinIO bajo la ruta: `/data/processed/[ID_REPORTE]/resultado_v[N].json`. |
| **Registro** | Cada etapa del proceso se registra en los logs del servidor. |

### 6.2. Notificaciones y Alertas

El sistema enviará notificaciones automáticas en los siguientes eventos:
- ✅ Inicio del proceso de generación del reporte.
- ⚠️ Error crítico o interrupción inesperada.
- 📊 Hito de avance significativo.
- ✅ Finalización exitosa, nueva versión del reporte disponible para revisión del SME.

### 6.3. Estimación de Costos de Infraestructura

Antes de ejecutar procesos de larga duración, el Desarrollador presentará una estimación de consumo de recursos en Railway créditos.

### 6.4. Optimización para Servicio Web

Los datasets superiores a 50 MB se transformarán en:
- Datos vectoriales: **Vector Tiles (.pbf)**.
- Datos ráster: **Cloud Optimized GeoTIFF (COG)**.
- **Requisito de Rendimiento:** Carga completa del reporte (todos los gráficos) < **4 segundos**.

---

## 7. REQUERIMIENTOS TÉCNICOS NO FUNCIONALES

### 7.1. Seguridad
- Toda comunicación sobre **HTTPS** con certificado TLS vigente.
- Las **Presigned URLs** de MinIO con expiración máxima de 1 hora.

### 7.2. Interoperabilidad
- El componente `TechnicalReport` debe soportar cualquier eje mediante props sin modificar el código base.

### 7.3. Escalabilidad
- Nuevos reportes deben poder añadirse mediante archivo de configuración JSON sin modificar el componente.

### 7.4. Accesibilidad
- Cumplimiento de **WCAG 2.1 Nivel AA**.

### 7.5. Robustez de Datos
- Todo acceso a propiedades de datos remotos debe implementar **optional chaining (`?.`)** para prevenir errores de runtime durante la carga asíncrona.
- Cache local en `sessionStorage` para evitar re-descargas en la misma sesión.

---

## 8. ESTÁNDARES DE DOCUMENTACIÓN Y TRAZABILIDAD

### 8.1. Estructura de Repositorio

```
/scripts/
  └── /tasks/
      └── [ID_REPORTE]/
          ├── main.py                  # Algoritmo de procesamiento de datos del reporte
          ├── environment.yml          # Dependencias exactas
          ├── METHODOLOGY.md           # Metodología comprensible para el SME
          ├── DATA_PROVENANCE.md       # Linaje del dato: fuente, sensor, fecha, URL
          └── QA_REPORT.md            # Informe de integridad y validación
```

### 8.2. Linaje del Dato (Data Provenance)

- **URL exacta** de descarga o endpoint consultado.
- **Versión del producto** (ej. FAO-FRA-2024, WDPA v3).
- **Fecha de corte** del dataset.
- **Hash de verificación (MD5/SHA256)** del archivo.

### 8.3. Versionamiento de Resultados

Nuevas versiones del reporte mantienen anteriores en MinIO con changelog justificado en PostgreSQL.

---

## 9. HERRAMIENTAS DE GESTIÓN DE PROYECTO

El adjudicatario utilizará obligatoriamente las siguientes herramientas:

| Herramienta | Uso | Justificación |
| :--- | :--- | :--- |
| **GitHub Projects** | Gestión de tareas, sprints e Issues vinculados al código. | Trazabilidad tarea-commit. |
| **GitHub Issues** | Registro de la "Ficha de Requerimiento de Reporte" como Issue etiquetado por eje. | Vinculación del reporte con el Pull Request de implementación. |
| **GitHub Wiki** | Documentación del catálogo de reportes y metodologías científicas. | Disponibilidad permanente junto al código. |

El equipo se organizará en **sprints de 2 semanas** con reuniones de sincronización semanales entre el SME y el Desarrollador.

---

## 10. PRODUCTOS ENTREGABLES Y CRITERIOS DE ACEPTACIÓN

| # | Entregable | Descripción | Criterio de Aceptación |
| :--- | :--- | :--- | :--- |
| **E1** | Componente `TechnicalReport` genérico | Componente React con todas las secciones parametrizadas. | Funcional para todos los ejes sin errores de consola. |
| **E2** | Migración de reportes existentes | `ForestReport`, `GFWReport` y `BioReport` al nuevo componente. | Sin pérdida de funcionalidad; aprobados por el SME. |
| **E3** | Reportes nuevos (Agua, Clima, Océanos) | Tres reportes nuevos con datos reales. | Datos validados por el SME con Acta de Conformidad. |
| **E4** | Narrativa IA integrada | Sección 6 de análisis generado por LLM en todos los reportes. | Coherente con los datos; nota de transparencia visible. |
| **E5** | Exportación PDF | Botón funcional en todos los reportes. | PDF generado en < 5 segundos, incluye todas las secciones. |
| **E6** | Informe de QA Espacial | Tabla de integridad para cada reporte implementado. | Margen de error < 0.05% frente a fuente oficial. |

---

## 11. ACUERDOS DE NIVEL DE SERVICIO (SLA)

| Métrica | Indicador | Umbral Mínimo Aceptable |
| :--- | :--- | :--- |
| Disponibilidad del Módulo | Uptime mensual | 99.5% en horario laboral (08:00–20:00 UTC-6) |
| Tiempo de Carga del Reporte | Todos los gráficos renderizados | < 4,000 ms |
| Integridad de Datos | Margen de error frente a fuente oficial | < 0.05% |
| Errores de Runtime | Ocurrencia de TypeError o ReferenceError | 0 en consola de producción |
| Recuperación ante Fallos | RTO del Background Job | < 30 minutos desde última actividad |
| Tiempo de Respuesta a Incidentes | Bugs críticos en producción | Resolución en < 4 horas hábiles |

---

## 12. PROPIEDAD INTELECTUAL Y CONFIDENCIALIDAD

- **12.1.** Todo el código fuente, componentes y documentación desarrollados serán propiedad exclusiva de la OAR desde el momento de su entrega.
- **12.2.** El adjudicatario cede todos los derechos patrimoniales de autor sobre los productos desarrollados.
- **12.3.** La información procesada deberá ser tratada con estricta confidencialidad.
- **12.4.** El adjudicatario deberá suscribir un **Acuerdo de No Divulgación (NDA)** previo al inicio del contrato.

---

## 13. PENALIZACIONES Y GESTIÓN DE RIESGOS

| Evento | Penalización |
| :--- | :--- |
| Entrega de Fase fuera del plazo acordado (por día hábil) | 0.5% del valor total del contrato |
| Entregable rechazado por incumplimiento de criterios de aceptación | Corrección sin costo adicional en un plazo de 5 días hábiles |
| Presencia de TypeError o ReferenceError en producción | Corrección inmediata como incidente crítico |
| Documentación incompleta o ausente al momento de la entrega | Retención del 10% del pago del hito hasta subsanar |
| Pérdida de datos o corrupción de repositorio por negligencia | Restauración a último estado estable + informe de causa raíz |

---

## 14. CRITERIOS DE EVALUACIÓN DE OFERTAS

| Criterio | Peso |
| :--- | :--- |
| Experiencia demostrable en sistemas GIS y reportería ambiental | 30% |
| Calidad técnica de la propuesta metodológica | 25% |
| Oferta económica | 20% |
| Experiencia en integración con APIs OGC y sistemas de IA narrativa | 15% |
| Propuesta de gestión del proyecto (cronograma, sprints, herramientas) | 10% |

---

## 15. GLOSARIO DE TÉRMINOS TÉCNICOS

| Término | Definición |
| :--- | :--- |
| **Optional Chaining (`?.`)** | Operador de JavaScript que permite acceder a propiedades anidadas de un objeto sin generar error si algún nivel es nulo o indefinido. |
| **Skeleton Loader** | Estado visual de carga que muestra la estructura del componente antes de que los datos reales estén disponibles. |
| **SessionStorage** | Mecanismo de almacenamiento web que persiste datos durante la sesión del navegador, eliminándolos al cerrar la pestaña. |
| **Mock Data** | Datos simulados de estructura idéntica a los reales, usados para prototipado visual previo a la conexión con APIs. |
| **WMS/WFS** | Estándares OGC para servicios de mapas por imagen (WMS) y datos vectoriales con atributos (WFS). |
| **LLM** | Large Language Model. Modelo de lenguaje para generación de narrativas analíticas automatizadas. |
| **Linaje del Dato** | Registro completo del origen, transformación y entrega de un dato desde su fuente primaria. |

---

## 16. REFERENCIAS NORMATIVAS Y BIBLIOGRÁFICAS

- **FAO Global Forest Resources Assessment (FRA-2025):** https://www.fao.org/forest-resources-assessment/
- **Marco de Kunming-Montreal (COP15, 2022):** Meta 30x30.
- **Agenda 2030 para el Desarrollo Sostenible (ONU, 2015):** ODS 15 y ODS 14.
- **IPBES Global Assessment Report on Biodiversity and Ecosystem Services (2019).**
- **OGC Standards — Open Geospatial Consortium:** WMS 1.3.0, WFS 2.0.0.
- **WCAG 2.1 — Web Content Accessibility Guidelines** — W3C Recommendation, 2018.
- **ISO 19115-1:2014** — Geographic Information: Metadata.
- **GBIF API Reference:** https://www.gbif.org/developer/summary
- **GFW — Global Forest Watch API:** https://www.globalforestwatch.org/
- **NOAA Coral Reef Watch:** https://coralreefwatch.noaa.gov/

---

*Este documento de Términos de Referencia es de carácter vinculante para el adjudicatario y constituye el marco técnico y operativo bajo el cual se evaluará el cumplimiento del contrato. Toda modificación al alcance deberá ser aprobada mediante adenda escrita y firmada por ambas partes.*

**Versión:** 1.0 | **Fecha:** Marzo 2025 | **Clasificación:** Licitación Pública Internacional


