# TÉRMINOS DE REFERENCIA (TDR)
## MÓDULO: TABLERO DE CONTROL POR EJE TEMÁTICO
### Observatorio Ambiental Regional (OAR)

---

**Código del Proceso:** OAR-TDR-2025-MOD-02
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

El prototipo cuenta con un Tablero de Control regional genérico (`Dashboard.jsx`) y cinco dashboards técnicos independientes: `FiresDashboard.jsx`, `OceanDashboard.jsx`, `WaterDashboard.jsx`, `ClimateDashboard.jsx` y `ProtectedPlanetDashboard.jsx`. La presente licitación exige la convergencia de estos componentes dispersos en un **sistema unificado y parametrizado de Tableros de Control por Eje**, accesible desde la pantalla de inicio de cada eje temático.

---

## 2. OBJETO DE LA CONTRATACIÓN

Contratar los servicios de una empresa o consorcio especializado para el **diseño, desarrollo, implementación y documentación del Módulo de Tablero de Control por Eje Temático** del Observatorio Ambiental Regional (OAR), unificando los dashboards existentes bajo una arquitectura escalable que visualice indicadores clave de desempeño (KPIs), tendencias temporales y alertas de estado para cada eje de la ERAM, con granularidad de país/regional y periodicidad configurable.

---

## 3. ALCANCE TÉCNICO DEL PROYECTO

El alcance comprende, sin carácter limitativo, las siguientes actividades:

- **3.1** Diseño e implementación del componente genérico **`AxisDashboard`**, que sustituye a los 5 dashboards independientes existentes (`FiresDashboard.jsx`, `OceanDashboard.jsx`, `WaterDashboard.jsx`, `ClimateDashboard.jsx`, `ProtectedPlanetDashboard.jsx`) y al dashboard genérico `Dashboard.jsx`. El componente debe soportar todos los ejes mediante props, sin valores hardcoded por eje. Su interfaz de props obligatoria incluye:

  | Prop | Tipo | Descripción |
  | :--- | :--- | :--- |
  | `axisId` | `string` | Identificador del eje (ej. `"bosques"`, `"clima"`). Usado para construir rutas de API y claves de cache. |
  | `axisLabel` | `string` | Etiqueta visible del eje para el usuario. |
  | `axisColor` | `object` | Paleta de colores del eje: `{ primary, light, dark, alert }`. Elimina los colores hardcoded en cada dashboard. |
  | `kpis` | `KpiConfig[]` | Array de objetos de configuración de KPI. Ver estructura en 3.2. |
  | `mapLayerId` | `string` | ID de capa del catálogo para el MiniMap del tablero. |
  | `pollingIntervalMs` | `number \| null` | Intervalo de polling en ms. `null` para ejes con datos estáticos. Ej: `900000` (15 min) para Incendios. |
  | `narrativePromptKey` | `string` | Clave del prompt LLM almacenado en repositorio para la narrativa de situación actual. |
  | `dashboardRoute` | `string` | Ruta base del tablero en el sistema de navegación. |

- **3.2** Creación del archivo de configuración **`/src/config/axis_config.js`** como fuente única de verdad de la configuración de todos los ejes. El archivo contendrá un objeto indexado por `axisId`, con la siguiente estructura para cada eje:

  ```javascript
  // Estructura de cada entrada en axis_config.js
  {
    axisId: 'bosques',
    axisLabel: 'Bosques',
    axisColor: { primary: '#16a34a', light: '#f0fdf4', dark: '#052e16', alert: '#dc2626' },
    mapLayerId: 'LAYER-GFW-2024',
    pollingIntervalMs: null,   // Datos estáticos
    narrativePromptKey: 'bosques_situacion_actual',
    kpis: [
      {
        id: 'cobertura_bosque',
        label: 'Cobertura de Bosque',
        unit: 'Mha',
        apiEndpoint: '/api/kpis/bosques/cobertura',
        fallbackKey: 'bosques_cobertura_ultimo', // Clave para recuperar de PostgreSQL
        thresholds: { normal: [17, 999], caution: [15, 17], critical: [0, 15] },
        updateFrequency: 'Anual'
      }
      // Mínimo 3, máximo 6 KPIs por eje
    ]
  }
  ```

- **3.3** Migración de los 5 dashboards existentes al componente `AxisDashboard`, garantizando paridad funcional. La validación de paridad se realizará mediante una **Tabla de Equivalencia Funcional** (por cada función presente en el dashboard original, verificación de que existe en el nuevo componente).

- **3.4** Implementación del bloque de **Narrativa de Situación Actual**: párrafo generado por LLM, renderizado bajo los KPIs, con esqueleto de carga (skeleton) y etiqueta de fecha de generación. El prompt LLM se almacena en `/src/config/prompts/[axisId]_situacion_actual.txt` y no se incluye en el componente React.

- **3.5** Integración del componente **`MiniMap.jsx`** como sub-componente del `AxisDashboard`, consumiendo la capa especificada en `mapLayerId`. El mapa debe renderizarse en `aspect-video` con controles mínimos: zoom, tooltip de feature y marcadores de alerta cuando un KPI esté en estado Crítico.

- **3.6** Implementación de **polling automático** mediante `setInterval` embebido en `useEffect`, activado únicamente cuando `pollingIntervalMs !== null`. El intervalo se limpia correctamente en el cleanup de `useEffect` para evitar memory leaks. El sistema debe mostrar una etiqueta `"Actualizado hace X min"` en el tablero.

- **3.7** Funcionalidad de **persistencia de estado en URL** (`?country=GT&period=2024`) para compartibilidad. Implementación de exportación a PDF mediante `html2canvas` + `jsPDF` o equivalente, incluyendo todos los KPIs, el MiniMap y la narrativa en el documento exportado.

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
| **Competencias Técnicas** | Dominio de cartografía temática; conocimiento del Marco Kunming-Montreal (Meta 30x30), la Agenda 2030 y los protocolos de reporting del IPBES; capacidad de síntesis ejecutiva orientada a política pública. |
| **Competencias Blandas** | Liderazgo científico, comunicación interdisciplinaria, orientación a resultados medibles. |
| **Rol en el Módulo** | Definición de KPIs por eje; establecimiento de umbrales Normal/Precaución/Crítico; validación conceptual de maquetas; aprobación del QA Espacial; firma de acta de aceptación de cada tablero implementado. |

---

### 4.2. Ingeniero Senior de Datos y Frontend (Senior Fullstack Data Engineer)

| Atributo | Especificación |
| :--- | :--- |
| **Formación** | Título universitario en Ingeniería en Sistemas, Ciencias de la Computación, Ingeniería de Software o afín. |
| **Experiencia** | Mínimo 5 años en desarrollo de aplicaciones de datos geoespaciales y visualización web. |
| **Tecnologías Mandatorias** | Python 3.10+, FastAPI, GDAL/OGR, SQLAlchemy 2.0 async, asyncpg, PostgreSQL/PostGIS, MinIO (boto3/S3 API), React 18+, Vite, Recharts, Leaflet.js. |
| **Tecnologías Deseables** | Celery (Background Jobs), GeoServer (administración), QGIS (análisis y exportación), Cloud Optimized GeoTIFF (COG). |
| **Estándares OGC** | Conocimiento operativo de WMS, WFS, WCS, OGC API Features. |
| **Competencias Blandas** | Documentación técnica exhaustiva, gestión del tiempo en entregas cortas (sprints), comunicación clara con perfiles no técnicos. |
| **Rol en el Módulo** | Desarrollo del componente genérico y migración de dashboards; implementación de pipelines de datos por eje; responsable del QA Espacial técnico; gestión del repositorio Git. |

---

### 4.3. Coordinador Técnico del Proyecto (Opcional — para contratos de más de 6 meses)

| Atributo | Especificación |
| :--- | :--- |
| **Formación** | Ingeniería, Ciencias o Administración con especialidad en gestión de proyectos tecnológicos. |
| **Certificación** | PMP, PRINCE2 o certificación en metodologías ágiles (Scrum Master). |
| **Rol en el Módulo** | Punto de contacto único con la entidad contratante; gestión de herramientas de seguimiento; coordinación entre el SME y el Desarrollador; emisión de informes de avance semanales. |

---

## 5. PROTOCOLO OPERATIVO: CICLO DE CONSTRUCCIÓN DE TABLEROS

El proceso de diseño e implementación de cada Tablero de Control sigue un ciclo **orientado al dato en tiempo real**, donde la definición precisa de indicadores y sus umbrales de alerta precede a cualquier línea de código. Este ciclo reconoce que la principal complejidad del módulo es la **heterogeneidad de las fuentes de datos** (APIs con distintas latencias, formatos y frecuencias de actualización) y la necesidad de mantener la información vigente sin interrumpir la disponibilidad del sistema.

---

### Fase I — Definición de Indicadores y Umbrales de Alerta (Responsable: SME)

Esta fase es exclusivamente científica y no involucra código. El SME producirá la **Ficha de Indicadores del Tablero**, que define con precisión cada KPI antes de que el Desarrollador inicie su implementación:

- **ID del Tablero y Eje Estratégico.**
- Por cada KPI (mínimo 3, máximo 6):
  - **Nombre oficial** del indicador y su unidad de medida.
  - **Definición metodológica:** ¿cómo se calcula o de dónde se extrae exactamente?
  - **Valores de umbral:** Normal / Precaución / Crítico con sus límites numéricos exactos.
  - **Fuente primaria:** API, endpoint del Datalake, o capa del Diccionario de Datos.
  - **Frecuencia de actualización:** Tiempo Real / Cada 15 min / Diaria / Semanal / Estática.
- **Capa Temática para el MiniMap:** ID de capa y atributo a usar para marcadores de alerta.

**Resultado de la Fase:** Ficha de Indicadores firmada por el SME, equivalente a un contrato técnico con el Desarrollador. Ningún KPI puede implementarse sin estar definido en esta Ficha.

---

### Fase II — Mapeo Técnico de Fuentes de Datos (Responsable: Desarrollador)

Antes de construir la interfaz, el Desarrollador realiza la auditoría técnica de cada fuente definida en la Ficha:

- **Prueba de Disponibilidad:** Verifica que cada API retorne datos en el formato esperado. Documenta los campos exactos a extraer.
- **Medición de Latencia:** Toma de tiempo de respuesta de cada endpoint en condiciones reales. Clasifica como: Rápida (< 500 ms), Media (500 ms – 3 s), Lenta (> 3 s).
- **Identificación de Límites de Uso (Rate Limits):** Determina si la API impone llamadas por hora/día. Define si se requiere cache o procesamiento en Background Job.
- **Definición de la Estrategia de Fallback:** Para cada fuente, establece el dato de respaldo cuando la API no está disponible (último valor de PostgreSQL + etiqueta de fecha).

**Resultado de la Fase:** Documento `data_map.md` en el repositorio que mapea cada KPI a su fuente, su estrategia de cache y su fallback.

---

### Fase III — Construcción del Tablero con Mock Data (Responsable: Desarrollador)

El Desarrollador construye la interfaz visual completa con datos simulados, validando el diseño antes de conectar las APIs reales:

- Implementación del componente `AxisDashboard` con los 6 bloques funcionales (Encabezado, KPIs, Narrativa, MiniMap, Gráficos, Alertas).
- Todos los valores son Mock Data en formato JSON local, con la misma estructura que retornará la API real.
- El selector de país y las transiciones (skeleton loader) deben ser funcionales con los datos simulados.
- El SME revisa esta versión y aprueba la disposición visual y la comprensibilidad de los KPIs. **No se conectan APIs reales hasta obtener esta aprobación.**

---

### Fase IV — Conexión de Datos Reales y Configuración de Actualización (Responsable: Desarrollador)

Aprobado el diseño, se conmutan las fuentes de datos:

- Implementación del `useEffect` con `selectedIso` como dependencia para regenerar datos al cambiar país.
- Activación del polling automático para ejes con datos en tiempo real (Incendios: cada 15 min; Océanos: cada 30 min).
- Activación del skeleton loader durante cada ciclo de carga.
- Vinculación de las tarjetas de KPI al sistema de coloreado dinámico según los umbrales definidos en la Ficha de Indicadores (Normal: verde / Precaución: amarillo / Crítico: rojo).
- Implementación de la persistencia de estado en URL (`?country=GT`) para compartibilidad.

---

### Fase V — Calibración de Alertas y Validación en Vivo (Responsable: SME + Desarrollador)

Esta fase ocurre con el tablero ya conectado a datos reales, durante un período de observación de mínimo **5 días hábiles**:

- El SME observa el comportamiento real del tablero y evalúa si los umbrales definidos en la Fase I son adecuados o requieren ajuste (los datos reales pueden revelar que un umbral era demasiado sensible o muy permisivo).
- El Desarrollador ajusta los umbrales en el archivo `axis_config.js` sin modificar el código del componente.
- Se verifica que la narrativa contextual generada por el motor LLM sea coherente con los valores en pantalla para todos los países SICA.
- **Prueba de Fallo de API:** Se simula la interrupción de cada fuente de datos y se verifica que el tablero muestre el fallback sin errores visibles para el usuario.

**Resultado de la Fase:** Tablero validado en condiciones reales. Acta de Conformidad firmada por el SME.

---

### Fase VI — Monitoreo Continuo y Gestión de Conexiones (Responsable: Desarrollador)

Un tablero en producción requiere mantenimiento activo de sus conexiones de datos:

- Configuración de alertas automáticas al equipo técnico cuando una API externa no responde en 3 intentos consecutivos.
- Revisión mensual del `data_map.md` para verificar que las APIs externas no hayan cambiado su estructura o endpoints.
- Actualización del archivo `axis_config.js` cuando el SME ajuste umbrales o incorpore nuevos KPIs.
- Registro de incidentes de fallo de API para análisis técnico de disponibilidad.



---

## 6. GESTIÓN DE PROCESAMIENTO DE DATOS COMPLEJOS

Cuando un KPI requiera el procesamiento de series temporales históricas o descarga y normalización de datasets masivos, el adjudicatario aplicará el siguiente protocolo:

### 6.1. Arquitectura de Procesamiento Diferido

| Componente | Especificación |
| :--- | :--- |
| **Trigger** | Invocación manual por el SME o automática por calendario (Cron Job). |
| **Entorno de Ejecución** | Railway Worker independiente o máquina local de alta potencia para evitar saturar la API principal. |
| **Checkpoints** | El script guardará estados intermedios en MinIO cada 30 minutos. En caso de fallo, el proceso se reanudará desde el último checkpoint sin reiniciar desde cero. |
| **Repositorio de Resultados** | Producto final depositado en MinIO bajo la ruta: `/data/processed/[ID_TABLERO]/resultado_v[N].json`. |
| **Registro** | Cada etapa del proceso se registra en los logs del servidor. |

### 6.2. Notificaciones y Alertas

El sistema enviará notificaciones automáticas en los siguientes eventos:
- ✅ Inicio del proceso de cómputo de datos históricos.
- ⚠️ Error crítico o interrupción inesperada.
- 📊 Hito de avance significativo (ej. 50% completado).
- ✅ Finalización exitosa, nuevos datos disponibles en el tablero.

### 6.3. Estimación de Costos de Infraestructura

Antes de ejecutar procesos de larga duración, el Desarrollador presentará una estimación de consumo de recursos en Railway créditos (CPU-hora, RAM-hora, GB de almacenamiento).

### 6.4. Optimización para Servicio Web

Los datasets procesados superiores a 50 MB deberán ser optimizados antes de su consumo en el tablero:
- Datos vectoriales: Conversión a **Vector Tiles (.pbf)**.
- **Requisito de Rendimiento:** Latencia de respuesta visual al cambiar país/filtro < **1 segundo**.

---

## 7. REQUERIMIENTOS TÉCNICOS NO FUNCIONALES

### 7.1. Seguridad
- Toda comunicación entre el Frontend y el Backend deberá realizarse sobre **HTTPS** con certificado TLS vigente.
- Los endpoints de la API deberán implementar autenticación mediante **JWT** con expiración configurable.

### 7.2. Interoperabilidad
- El componente `AxisDashboard` debe soportar cualquier eje mediante su archivo de configuración sin modificar el código base.

### 7.3. Escalabilidad
- La arquitectura debe permitir añadir nuevos KPIs o ejes mediante actualización del archivo de configuración `axis_config.js`.

### 7.4. Accesibilidad
- La interfaz de usuario deberá cumplir con las pautas **WCAG 2.1 Nivel AA**.

### 7.5. Resiliencia de Datos
- Si la API externa falla, el tablero debe mostrar el último dato disponible con una etiqueta "Dato de [fecha]" en lugar de un estado de error vacío.

---

## 8. ESTÁNDARES DE DOCUMENTACIÓN Y TRAZABILIDAD

### 8.1. Estructura de Repositorio

```
/scripts/
  └── /tasks/
      └── [ID_TABLERO]/
          ├── main.py                  # Algoritmo de ingesta/cómputo de KPIs
          ├── environment.yml          # Dependencias exactas
          ├── METHODOLOGY.md           # Metodología comprensible para el SME
          ├── DATA_PROVENANCE.md       # Linaje del dato: fuente, sensor, fecha, URL
          └── QA_REPORT.md            # Informe de integridad y validación
```

### 8.2. Linaje del Dato (Data Provenance)

Para cada fuente de datos utilizada, se documentará:
- **URL exacta** de descarga o endpoint consultado.
- **Frecuencia de actualización** de la fuente primaria.
- **Fecha de último procesamiento** por el Observatorio Ambiental Regional (OAR).
- **Hash de verificación (MD5/SHA256)** del archivo descargado.

### 8.3. Versionamiento de Resultados

Actualizaciones metodológicas en el cálculo de KPIs mantendrán versiones anteriores en MinIO con changelog justificado en PostgreSQL.

---

## 9. HERRAMIENTAS DE GESTIÓN DE PROYECTO

El adjudicatario utilizará obligatoriamente las siguientes herramientas:

| Herramienta | Uso | Justificación |
| :--- | :--- | :--- |
| **GitHub Projects** | Gestión de tareas, sprints e Issues vinculados al código. | Integración directa con el repositorio; trazabilidad tarea-commit. |
| **GitHub Issues** | Registro de la "Ficha de Configuración de Tablero" como Issue etiquetado por eje. | Vinculación del tablero con el Pull Request de implementación. |
| **GitHub Wiki** | Documentación del catálogo de KPIs y metodologías de cálculo. | Disponibilidad permanente junto al código. |

El equipo se organizará en **sprints de 2 semanas** con reuniones de sincronización semanales entre el SME y el Desarrollador.

---

## 10. PRODUCTOS ENTREGABLES Y CRITERIOS DE ACEPTACIÓN

| # | Entregable | Descripción | Criterio de Aceptación |
| :--- | :--- | :--- | :--- |
| **E1** | Componente `AxisDashboard` genérico | Componente React con sub-componentes documentados. | Funcional para los 6 ejes sin duplicación de código. |
| **E2** | Archivo `axis_config.js` | Configuración de KPIs, fuentes y paleta por eje. | Permite añadir nuevo eje sin modificar código. |
| **E3** | Migración de dashboards existentes | 5 dashboards migrados al sistema unificado. | Sin pérdida de funcionalidad; aprobados por el SME. |
| **E4** | Motor de narrativa IA integrado | Narrativa de situación actual generada por LLM. | Coherente con los valores de KPI en el 100% de los ejes. |
| **E5** | Polling en tiempo real | Actualización automática cada 15 min para Incendios y Océanos. | Verificable mediante test de temporización en QA. |
| **E6** | Informe de QA Espacial | Tabla de integridad de KPIs frente a fuente oficial. | Margen de error < 0.05% para todos los KPIs validados. |

---

## 11. ACUERDOS DE NIVEL DE SERVICIO (SLA)

| Métrica | Indicador | Umbral Mínimo Aceptable |
| :--- | :--- | :--- |
| Disponibilidad del Módulo | Uptime mensual | 99.5% en horario laboral (08:00–20:00 UTC-6) |
| Respuesta Visual al Cambiar Filtro | Latencia skeleton loader visible | < 1,000 ms |
| Tiempo de Carga del MiniMap | Render de capa geoespacial | < 2,000 ms |
| Integridad de KPIs | Margen de error frente a fuente oficial | < 0.05% |
| Recuperación ante Fallos | RTO del Background Job | < 30 minutos desde última actividad |
| Tiempo de Respuesta a Incidentes | Bugs críticos en producción | Resolución en < 4 horas hábiles |

---

## 12. PROPIEDAD INTELECTUAL Y CONFIDENCIALIDAD

- **12.1.** Todo el código fuente, componentes, configuraciones y documentación desarrollados en el marco de este módulo serán propiedad exclusiva de la OAR desde el momento de su entrega.
- **12.2.** El adjudicatario cede todos los derechos patrimoniales de autor sobre los productos desarrollados.
- **12.3.** Los datos procesados deberán ser tratados con estricta confidencialidad y no podrán compartirse con terceros sin autorización expresa de la OAR.
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
| Experiencia demostrable en sistemas GIS y datos ambientales | 30% |
| Calidad técnica de la propuesta de arquitectura unificada | 25% |
| Oferta económica | 20% |
| Experiencia en integración con APIs OGC y datos en tiempo real | 15% |
| Propuesta de gestión del proyecto (cronograma, sprints, herramientas) | 10% |

---

## 15. GLOSARIO DE TÉRMINOS TÉCNICOS

| Término | Definición |
| :--- | :--- |
| **KPI** | Key Performance Indicator. Indicador cuantificable que refleja el estado de un eje ambiental. |
| **Skeleton Loader** | Estado visual de carga que muestra la estructura del componente antes de que los datos reales estén disponibles. |
| **Polling** | Técnica de consulta periódica a una API para detectar nuevos datos, sin necesidad de recargar la página. |
| **Mock Data** | Datos simulados de estructura idéntica a los reales, usados para prototipado visual previo a la conexión con APIs. |
| **WMS/WFS** | Estándares OGC para servicios de mapas por imagen (WMS) y datos vectoriales con atributos (WFS). |
| **LLM** | Large Language Model. Modelo de lenguaje para generación de narrativas analíticas automatizadas. |
| **Linaje del Dato** | Registro completo del origen, transformación y entrega de un dato desde su fuente primaria. |

---

## 16. REFERENCIAS NORMATIVAS Y BIBLIOGRÁFICAS

- **Marco de Kunming-Montreal (COP15, 2022):** Meta 30x30 para la conservación del 30% de ecosistemas.
- **Agenda 2030 para el Desarrollo Sostenible (ONU, 2015):** ODS 15 y ODS 14.
- **IPBES Global Assessment Report on Biodiversity and Ecosystem Services (2019).**
- **OGC Standards — Open Geospatial Consortium:** WMS 1.3.0, WFS 2.0.0.
- **WCAG 2.1 — Web Content Accessibility Guidelines** — W3C Recommendation, 2018.
- **ISO 19115-1:2014** — Geographic Information: Metadata.
- **ISO/IEC 27001:2022** — Information Security Management Systems.
- **GBIF API Reference:** https://www.gbif.org/developer/summary
- **GFW — Global Forest Watch API:** https://www.globalforestwatch.org/
- **NASA FIRMS VIIRS Documentation:** https://firms.modaps.eosdis.nasa.gov/
- **NOAA Coral Reef Watch:** https://coralreefwatch.noaa.gov/

---

*Este documento de Términos de Referencia es de carácter vinculante para el adjudicatario y constituye el marco técnico y operativo bajo el cual se evaluará el cumplimiento del contrato. Toda modificación al alcance deberá ser aprobada mediante adenda escrita y firmada por ambas partes.*

**Versión:** 1.0 | **Fecha:** Marzo 2025 | **Clasificación:** Licitación Pública Internacional


