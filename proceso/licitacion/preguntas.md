# TÉRMINOS DE REFERENCIA (TDR)
## MÓDULO DE CONSULTAS ESTRATÉGICAS Y FORTALECIMIENTO DEL DATALAKE
### Observatorio Ambiental Regional (OAR)

---

**Código del Proceso:** OAR-TDR-2025-INT-001
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

La presente licitación busca fortalecer este ecosistema mediante la implementación de un **Módulo de Consultas Estratégicas** que, a través de un protocolo estandarizado y auditable, transforme preguntas de política pública ambiental en respuestas visuales, cartográficas y narrativas generadas automáticamente.

---

## 2. OBJETO DE LA CONTRATACIÓN

Contratar los servicios de una empresa o consorcio especializado para el **diseño, desarrollo, implementación y documentación del Módulo de Consultas Estratégicas** del Observatorio Ambiental Regional (OAR), garantizando la interoperabilidad con la infraestructura técnica existente, la calidad científica de los análisis producidos y la sostenibilidad del sistema como activo de conocimiento institucional.

---

## 3. ALCANCE TÉCNICO DEL PROYECTO

El alcance comprende, sin carácter limitativo, las siguientes actividades:

- **3.1** Diseño e implementación de la interfaz de usuario (UI) del módulo de consultas en React/Vite.
- **3.2** Desarrollo del motor de narrativa automatizada mediante integración con LLM (Large Language Models).
- **3.3** Integración con geoservicios OGC: WMS, WFS y Vector Tiles (PRIAS/CENAT, GBIF, GFW, WDPA).
- **3.4** Construcción y documentación de pipelines ETL para las preguntas estratégicas que requieran procesamiento pesado de datos satelitales o multitemporales.
- **3.5** Actualización del Datalake OAR con un Catálogo de Metadatos (Diccionario de Datos) consultable por los expertos thematically.
- **3.6** Configuración de una Librería de Componentes Atómicos reutilizables para la visualización de datos (Recharts + Leaflet).
- **3.7** Implementación del sistema de Background Jobs para procesos de larga duración con checkpoints y notificaciones.

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
| **Rol en el Proyecto** | Definición de preguntas estratégicas; establecimiento de reglas de negocio (umbrales de alerta); validación conceptual de maquetas; aprobación de criterios de QA Espacial; firma de acta de aceptación de cada entregable analítico. |

---

### 4.2. Ingeniero Senior de Datos y Frontend (Senior Fullstack Data Engineer)

| Atributo | Especificación |
| :--- | :--- |
| **Formación** | Título universitario en Ingeniería en Sistemas, Ciencias de la Computación, Ingeniería de Software o afín. |
| **Experiencia** | Mínimo 5 años en desarrollo de aplicaciones de datos geoespaciales y visualización web. |
| **Tecnologías Mandatorias** | Python 3.10+, FastAPI, GDAL/OGR, SQLAlchemy 2.0 async, asyncpg, PostgreSQL/PostGIS, MinIO (boto3/S3 API), React 18+, Vite, Recharts, Leaflet.js. |
| **Tecnologías Deseables** | Celery (Background Jobs), GeoServer (administración), QGIS (análisis y exportación), Cloud Optimized GeoTIFF (COG), Tippecanoe (Vector Tile Generation). |
| **Estándares OGC** | Conocimiento operativo de WMS, WFS, WCS, OGC API Features. |
| **Competencias Blandas** | Documentación técnica exhaustiva, gestión del tiempo en entregas cortas (sprints), comunicación clara con perfiles no técnicos. |
| **Rol en el Proyecto** | Desarrollo de todas las capas técnicas; implementación de pipelines ETL; elaboración de documentación metodológica; responsable del QA Espacial técnico; gestión del repositorio Git. |

---

### 4.3. Coordinador Técnico del Proyecto (Opcional — para contratos de más de 6 meses)

| Atributo | Especificación |
| :--- | :--- |
| **Formación** | Ingeniería, Ciencias o Administración con especialidad en gestión de proyectos tecnológicos. |
| **Certificación** | PMP, PRINCE2 o certificación en metodologías ágiles (Scrum Master). |
| **Rol en el Proyecto** | Punto de contacto único con la entidad contratante; gestión de herramientas de seguimiento; coordinación entre el SME y el Desarrollador; emisión de informes de avance semanales. |

---

## 5. PROTOCOLO OPERATIVO: OAR INTELLIGENCE ENGINE

El adjudicatario deberá aplicar obligatoriamente el ciclo de trabajo denominado **"OAR Intelligence Engine"**, compuesto por las siguientes fases secuenciales e iterativas:

---

### Fase I — Conceptualización y Fichaje (Responsable: SME)

El Experto en la Materia emitirá una **"Ficha de Requerimiento de Pregunta Estratégica"** con la siguiente estructura mínima:
- **ID de Pregunta:** Código único (ej. `PREG-BIO-001`).
- **Eje Estratégico:** Bosques / Biodiversidad / Agua / Clima / Océanos.
- **Pregunta Principal:** Redactada tal como la visualizará el usuario final.
- **Objetivo de Política Pública:** Decisión o recomendación que debe permitir tomar.
- **Fuentes de Datos:** Capas en el Diccionario del Datalake (ID de capa, URL de WFS/API, atributos requeridos).
- **Umbrales de Interpretación:** Definición de niveles Normal / Precaución / Crítico con valores exactos.
- **Frecuencia de Actualización:** Tiempo Real / Semanal / Mensual / Histórica.

**Plazo máximo de emisión de la Ficha:** 5 días hábiles tras la aprobación de cada sprint.

---

### Fase II — Prototipado Asíncrono Fast-Track (Responsable: Desarrollador)

Para desacoplar el diseño visual del procesamiento de datos:

- **48 horas** tras recibir la Ficha, el Desarrollador entregará una maqueta funcional con **Mock Data** (datos simulados en formato JSON).
- La maqueta incluirá: Gráfico configurado (tipo correcto), Mapa con capa base cargada y zona de enfoque correcta, y Texto de narrativa de muestra.
- El SME validará el diseño conceptual antes de autorizar el inicio del procesamiento real.
- **Acta de Validación de Maqueta:** Documento firmado por el SME que autoriza la Fase III.

---

### Fase III — Procesamiento y Conexión de Datos Reales (Responsable: Desarrollador)

- Consulta al Geoservicio (WFS) para obtener la tabla de atributos completa.
- Fetch a la API externa correspondiente (GBIF, NASA FIRMS, GFW, etc.).
- Transformación y limpieza del dato crudo según los atributos definidos en la Ficha.
- Sustitución del Mock Data por el endpoint de datos reales en el componente React.

---

### Fase IV — QA Espacial y Validación de Integridad (Responsable: Desarrollador + SME)

- El Desarrollador presentará una **Tabla de Control de Integridad** (máximo 1 página) comparando:
  - Valor obtenido por el sistema vs. valor publicado por la fuente oficial.
  - Ejemplo: "El sistema reporta 22.3% de áreas protegidas en Honduras; el reporte oficial de WDPA indica 22.4%".
- El margen de error aceptable se define en el SLA (Sección 11).
- El SME firmará el **Acta de Conformidad Técnica** para aprobar el paso a producción.

---

### Fase V — Configuración del Motor de Narrativa IA (Responsable: Desarrollador + SME)

- El SME dicta en lenguaje natural las reglas de interpretación para cada umbral.
- El Desarrollador traduce estas reglas en un **Prompt Estructurado** que se almacenará en el repositorio.
- El Prompt debe generar un objeto JSON estandarizado con la estructura:

```json
{
  "id_pregunta": "PREG-BIO-001",
  "nivel_alerta": "Crítico",
  "texto_analisis": "El estado actual de la cobertura forestal en...",
  "config_grafico": { "tipo": "barras", "datos": [...] },
  "config_mapa": { "capa": "nombre_capa_geoserver", "centro": [lat, lon], "zoom": 7 }
}
```

---

---

### Fase VI — Despliegue y Publicación (Responsable: Desarrollador)

- La pregunta se publica en el catálogo oficial del Prototipo OAR.
- Se actualiza la documentación técnica del módulo con la nueva pregunta y sus dependencias de datos.

---

## 6. GESTIÓN DE PROCESAMIENTO DE DATOS COMPLEJOS

Cuando una pregunta estratégica requiera procesos de análisis multitemporal satelital, clasificación de imágenes o cruce de capas masivas con tiempos de cómputo superiores a 4 horas, el adjudicatario aplicará el siguiente protocolo:

### 6.1. Arquitectura de Procesamiento Diferido

| Componente | Especificación |
| :--- | :--- |
| **Trigger** | Invocación manual por el SME o automática por calendario (Cron Job). |
| **Entorno de Ejecución** | Railway Worker independiente o máquina local de alta potencia para evitar saturar la API principal. |
| **Checkpoints** | El script guardará estados intermedios en MinIO cada 30 minutos de procesamiento. Em caso de fallo, el proceso se reanudará desde el último checkpoint sin reiniciar desde cero. |
| **Repositorio de Resultados** | Producto final depositado en MinIO bajo la ruta: `/data/processed/[ID_PREGUNTA]/resultado_v[N].json`. |
| **Registro** | Cada etapa del proceso queda registrada en los logs del servidor para trazabilidad técnica. |

### 6.2. Notificaciones y Alertas

El sistema enviará notificaciones automáticas (la modalidad —Email/Webhook— será definida por el contratante) en los siguientes eventos:
- ✅ Inicio del proceso.
- ⚠️ Error crítico o interrupción inesperada.
- 📊 Hito de avance significativo (ej. 50% completado).
- ✅ Finalización exitosa con resumen de métricas.

### 6.3. Estimación de Costos de Infraestructura

Antes de ejecutar cualquier proceso de larga duración, el Desarrollador deberá presentar al Coordinador una **estimación de consumo de recursos** en Railway créditos (CPU-hora, RAM-hora, GB de almacenamiento), pudiendo recomendar el procesamiento local con transferencia del resultado final al Datalake si esto resulta más eficiente.

### 6.4. Optimización para Servicio Web

Los productos finales masivos (> 50 MB) deberán ser transformados antes de su publicación en la interfaz web:
- Datos Vectoriales: Conversión a **Vector Tiles (.pbf)** mediante herramientas como Tippecanoe.
- Datos Ráster: Conversión a **Cloud Optimized GeoTIFF (COG)** para streaming progresivo.
- **Requisito de Rendimiento:** La latencia de carga en el navegador del usuario final no deberá superar los **2 segundos** para cualquier capa publicada.

---

## 7. REQUERIMIENTOS TÉCNICOS NO FUNCIONALES

### 7.1. Seguridad
- Toda comunicación entre el Frontend y el Backend deberá realizarse sobre **HTTPS** con certificado TLS vigente.
- Los endpoints de la API deberán implementar autenticación mediante **JWT (JSON Web Tokens)** con expiración configurable.
- Los datos sensibles en PostgreSQL deberán almacenarse con cifrado mediante la extensión **pgcrypto**.
- Las **Presigned URLs** de descarga desde MinIO tendrán un tiempo de expiración máximo de 1 hora.

### 7.2. Interoperabilidad
- El sistema deberá ser compatible con los estándares **OGC (WMS 1.3.0, WFS 2.0)** para la integración con geoservicios institucionales.
- Los datos exportables deberán estar disponibles en formatos abiertos: GeoJSON, CSV y Shapefile.

### 7.3. Escalabilidad
- La arquitectura del Módulo deberá permitir la incorporación de nuevas preguntas estratégicas sin modificar el código base, únicamente mediante la adición de registros en un archivo de configuración o en la base de datos.

### 7.4. Accesibilidad
- La interfaz de usuario deberá cumplir con las pautas **WCAG 2.1 Nivel AA** para garantizar el acceso a personas con discapacidad visual.

---

## 8. ESTÁNDARES DE DOCUMENTACIÓN Y TRAZABILIDAD

Todo proceso técnico desarrollado en el marco de este contrato deberá documentarse bajo los siguientes estándares obligatorios:

### 8.1. Estructura de Repositorio

```
/scripts/
  └── /tasks/
      └── [ID_PREGUNTA]/
          ├── main.py                  # Algoritmo principal
          ├── environment.yml          # Dependencias exactas
          ├── METHODOLOGY.md           # Metodología en lenguaje comprensible para el SME
          ├── DATA_PROVENANCE.md       # Linaje del dato: fuente, sensor, fecha, URL
          └── QA_REPORT.md            # Informe de integridad y validación
```

### 8.2. Linaje del Dato (Data Provenance)

Para cada fuente de datos utilizada, se documentará:
- **URL exacta** de descarga o endpoint consultado.
- **Versión del producto satelital** (ej. Landsat 8 Collection 2, Sentinel-2 L2A).
- **Fecha de toma** de la imagen o corte del dataset.
- **Fecha de procesamiento** por el Observatorio Ambiental Regional (OAR).
- **Hash de verificación (MD5/SHA256)** del archivo descargado.

### 8.3. Versionamiento de Resultados

Cada vez que un proceso genere una nueva versión de un resultado (por mejora metodológica o actualización de datos), el sistema mantendrá las versiones anteriores en MinIO y registrará en PostgreSQL un changelog con la justificación del cambio.

---

## 9. HERRAMIENTAS DE GESTIÓN DE PROYECTO

El adjudicatario utilizará obligatoriamente las siguientes herramientas:

| Herramienta | Uso | Justificación |
| :--- | :--- | :--- |
| **GitHub Projects** | Gestión de tareas, sprints e Issues vinculados al código. | Integración directa con el repositorio; trazabilidad tarea-commit. |
| **GitHub Issues** | Registro de la "Ficha de Requerimiento" de cada pregunta como Issue etiquetado. | Permite vincular la pregunta estratégica con el Pull Request de implementación. |
| **GitHub Wiki** | Documentación del Diccionario de Datos y metodologías. | Disponibilidad permanente junto al código. |

El equipo se organizará en **sprints de 2 semanas** con reuniones de sincronización semanales entre el SME y el Desarrollador.

---

## 10. PRODUCTOS ENTREGABLES Y CRITERIOS DE ACEPTACIÓN

| # | Entregable | Descripción | Criterio de Aceptación |
| :--- | :--- | :--- | :--- |
| **E1** | Módulo de Consultas Estratégicas (Frontend) | Interfaz React funcional con al menos 5 preguntas estratégicas implementadas. | Carga en < 2s; sin errores de consola en producción. |
| **E2** | Librería de Componentes Atómicos | Biblioteca documentada con mínimo 6 tipos de visualización estándar. | Los componentes deben ser reutilizables sin modificación de código. |
| **E3** | Motor de Narrativa IA | Integración con LLM que genere análisis basados en reglas del SME. | Respuesta narrativa coherente para el 100% de las preguntas implementadas. |
| **E4** | Diccionario de Datos (Catálogo) | Inventario de todas las fuentes y capas disponibles en el Datalake. | Consultable desde la interfaz de administración. |
| **E5** | Pipelines ETL Documentados | Scripts de procesamiento para preguntas de alta complejidad. | Código en repositorio + `METHODOLOGY.md` aprobado por el SME. |
| **E6** | Sistema de Background Jobs | Módulo de procesamiento diferido con checkpoints y notificaciones. | Recuperación exitosa demostrada ante fallo simulado en prueba de aceptación. |
| **E7** | Informe Final de QA Espacial | Documento comparativo de integridad por cada pregunta implementada. | Margen de error < 0.05% frente a fuente oficial. |
| **E8** | Manual de Usuario (SME) | Guía de uso del sistema para perfiles no técnicos. | Aprobado por el SME en una sesión de prueba de usabilidad. |

---

## 11. ACUERDOS DE NIVEL DE SERVICIO (SLA)

| Métrica | Indicador | Umbral Mínimo Aceptable |
| :--- | :--- | :--- |
| Disponibilidad del Sistema | Uptime mensual | 99.5% en horario laboral (08:00–20:00 UTC-6) |
| Tiempo de Respuesta API | Latencia para datos pre-calculados | < 500 ms (percentil 95) |
| Tiempo de Carga del Mapa | Render de capa geoespacial en navegador | < 2,000 ms |
| Integridad de Datos | Margen de error frente a fuente oficial | < 0.05% |
| Recuperación ante Fallos | RTO (Recovery Time Objective) del Background Job | < 30 minutos desde última actividad |
| Tiempo de Respuesta a Incidentes | Bugs críticos en producción | Resolución en < 4 horas hábiles |

---

## 12. PROPIEDAD INTELECTUAL Y CONFIDENCIALIDAD

- **12.1.** Todo el código fuente, algoritmos, documentación, datasets procesados y componentes visuales desarrollados en el marco de este contrato serán propiedad exclusiva de la OAR desde el momento de su entrega.
- **12.2.** El adjudicatario cede todos los derechos patrimoniales de autor sobre los productos desarrollados.
- **12.3.** La información procesada por el sistema, en especial los datos geoespaciales de fuentes gubernamentales, deberá ser tratada con estricta confidencialidad y no podrá ser compartida con terceros sin autorización expresa de la OAR.
- **12.4.** El adjudicatario deberá suscribir un **Acuerdo de No Divulgación (NDA)** previo al inicio del contrato.
- **12.5.** El código desarrollado podrá ser publicado bajo licencia de software libre determinada por la OAR (ej. MIT, Apache 2.0), sujeto a aprobación institucional.

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

Las propuestas serán evaluadas con base en los siguientes criterios ponderados:

| Criterio | Peso |
| :--- | :--- |
| Experiencia demostrable en sistemas GIS y datos ambientales | 30% |
| Calidad técnica de la propuesta metodológica | 25% |
| Oferta económica | 20% |
| Experiencia en integraciones con APIs OGC (WMS/WFS) | 15% |
| Propuesta de gestión del proyecto (cronograma, sprints, herramientas) | 10% |

---

## 15. GLOSARIO DE TÉRMINOS TÉCNICOS

| Término | Definición |
| :--- | :--- |
| **Datalake OAR** | Plataforma centralizada de almacenamiento de datos (CSV, GeoJSON, PDF, Shapefile) basada en FastAPI y MinIO. |
| **Mock Data** | Datos simulados de estructura idéntica a los datos reales, utilizados para el prototipado visual previo a la conexión con las APIs. |
| **Background Job** | Proceso de cómputo ejecutado de forma asíncrona, sin bloquear la disponibilidad de la interfaz de usuario. |
| **Checkpoint** | Punto de guardado intermedio de un proceso largo que permite su reanudación ante un fallo de infraestructura. |
| **QA Espacial** | Proceso de validación de la integridad de datos geoespaciales mediante comparación con fuentes oficiales de referencia. |
| **Linaje del Dato** | Registro completo del origen, transformación y entrega de un dato, desde su fuente primaria hasta su publicación en la interfaz. |
| **Prompt Engine** | Sistema de plantillas de instrucciones estructuradas para guiar la generación de narrativas por parte de un LLM. |
| **Vector Tiles** | Formato optimizado para la transmisión web de datos geoespaciales vectoriales, que permite renderizado eficiente en el navegador. |
| **Presigned URL** | URL temporal y autenticada para acceso directo a un archivo en MinIO/S3, sin exponer credenciales del servidor. |
| **WMS/WFS** | Estándares OGC para servicios de mapas por imagen (WMS) y datos vectoriales con atributos (WFS). |
| **LLM** | Large Language Model. Modelo de lenguaje a gran escala utilizado para la generación de narrativas analíticas automatizadas. |
| **SLA** | Service Level Agreement. Acuerdo formal que define los niveles mínimos aceptables de disponibilidad y rendimiento del sistema. |

---

## 16. REFERENCIAS NORMATIVAS Y BIBLIOGRÁFICAS

- **Marco de Kunming-Montreal (COP15, 2022):** Meta 30x30 para la conservación del 30% de ecosistemas terrestres y marinos.
- **Agenda 2030 para el Desarrollo Sostenible (ONU, 2015):** ODS 15 (Vida de Ecosistemas Terrestres) y ODS 14 (Vida Submarina).
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

---

### 1. OBJETO DE LA CONTRATACIÓN
El presente pliego tiene por objeto establecer los términos y condiciones para el diseño, desarrollo e implementación del **Módulo de Consultas Estratégicas** y el fortalecimiento del **Datalake OAR**. El sistema debe permitir la interpretación técnica de datos geoespaciales y alfanuméricos para la toma de decisiones críticas en el sector ambiental y ferroviario.

---

### 2. PERFILES PROFESIONALES REQUERIDOS

#### 2.1. Experto en la Materia (Subject Matter Expert - SME)
Profesional senior en Ciencias Forestales, Ambientales, GIS o Geografía, responsable de la validez científica del sistema.
*   **Responsabilidades:** Definición de preguntas estratégicas, establecimiento de umbrales Críticos/Normales y validación de la metodología analítica.
*   **Competencias:** Manejo avanzado de cartografía temática, conocimiento de normativas internacionales de biodiversidad (Meta 30x30) y capacidad de síntesis ejecutiva.

#### 2.2. Desarrollador de Ingeniería de Datos y Frontend (Senior Fullstack Data Engineer)
Ingeniero con especialidad en procesamiento de datos masivos y visualización web.
*   **Responsabilidades:** Extracción, Transformación y Carga (ETL), optimización de geoservicios (WMS/WFS/Tiles), y desarrollo de interfaces reactivas en React+Vite.
*   **Tecnologías Mandatorias:** Python (FastAPI, GDAL, SQLAlchemy), PostgreSQL/PostGIS, MinIO y librerías de visualización (Recharts, Leaflet).

---

### 3. PROTOCOLO OPERATIVO: EL CICLO DE CONSULTA ESTRATÉGICA

El adjudicatario deberá seguir estrictamente el flujo de trabajo denominado **"OAR Intelligence Engine"**, estructurado en las siguientes fases:

#### Fase I: Conceptualización y Fichaje
El **Experto** emitirá una "Ficha de Requerimiento" que contenga la terna técnica: `[Pregunta Estratégica] + [Metadatos de Referencia] + [Umbrales de Interpretación]`.

#### Fase II: Prototipado Asíncrono (Fast-Track)
Para maximizar la agilidad, el **Desarrollador** implementará una interfaz con **Mock Data** (datos simulados) en un plazo no mayor a 48 horas tras recibir la ficha. Esto permitirá la validación estética y de UX por parte del experto antes del procesamiento real de datos.

#### Fase III: Procesamiento de Datos (Pipeline Alfanumérico-Espacial)
En caso de requerir procesamientos complejos (Big Data o Análisis Multitemporal Satelital):
*   **Ejecución Diferida:** Los procesos que superen las 4 horas de cómputo deben tratarse como **Tareas de Fondo (Background Jobs)**.
*   **Permanencia:** Todo script desarrollado deberá almacenarse en el repositorio oficial bajo una estructura jerárquica `/scripts/tasks/[ID_PREGUNTA]`.

#### Fase IV: Control de Calidad y Linaje (Data Provenance)
Se requiere un proceso de **QA Espacial**. El desarrollador debe presentar un informe de correlación donde los totales de la capa geográfica coincidan con los reportes oficiales de origen. Se debe documentar el **Linaje del Dato**: sensor satelital, fecha de toma y URL de origen.

---

### 4. REQUERIMIENTOS TÉCNICOS NO FUNCIONALES

#### 4.1. Narrativa Automatizada (AI-Engine Integration)
El sistema deberá integrar un motor de narrativa basado en Large Language Models (LLM). El desarrollador configurará un "Prompt Engine" que traduzca datos numéricos en resümenes ejecutivos, basándose exclusivamente en las **Reglas de Negocio** dictadas por el experto.

#### 4.2. Persistencia y Resiliencia de Procesos Pesados
Para procesos de larga duración (1 a 7 días):
*   **Checkpoints:** El algoritmo deberá guardar estados intermedios para permitir la recuperación ante fallos de infraestructura.
*   **Notificaciones:** El sistema enviará alertas automáticas (vía Webhook/Email) sobre el estado del procesamiento (Inicio, Avance, Error o Finalización).

#### 4.3. Almacenamiento y Optimización
*   **Resultados:** Los productos finales se depositarán en el Object Storage (MinIO) con versionamiento (v1, v2).
*   **Servicio Web:** Los archivos masivos (>50MB) deberán ser servidos mediante protocolos optimizados (**Vector Tiles** o **Cloud Optimized GeoTIFF**) para asegurar una latencia en el navegador menor a 2 segundos.

---

### 5. PRODUCTOS ENTREGABLES
1.  **Código Fuente:** Repositorio en GitHub con documentación técnica (`README.md`).
2.  **Catálogo de Metadatos:** Diccionario de datos actualizado con todas las fuentes consultadas.
3.  **Manual de Metodología:** Archivo `METHODOLOGY.md` detallando la lógica científica de cada respuesta estratégica.
4.  **Informe de QA y Linaje:** Documentación que certifique la integridad de los datos procesados y su origen.

---

### 6. ACUERDOS DE NIVEL DE SERVICIO (SLA)
*   **Disponibilidad de la Interfaz:** 99.9% en horario laboral.
*   **Tiempo de Respuesta de la API:** < 500ms para datos pre-calculados.
*   **Integridad de Datos:** Margen de error menor al 0.05% en cálculos alfanuméricos frente a la fuente cruda.

---

> **Nota Final:** La licitación internacional priorizará aquellas ofertas que demuestren un manejo experto del flujo entre el rigor científico (Experto) y la eficiencia del procesamiento (Desarrollador), asegurando que el sistema sea un activo de conocimiento persistente para la organización.


