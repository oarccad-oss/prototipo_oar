# TÉRMINOS DE REFERENCIA (TDR)
## MÓDULO: CENTRO DOCUMENTAL TRANSVERSAL
### Observatorio Ambiental Regional (OAR)

---

**Código del Proceso:** OAR-TDR-2025-MOD-06
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

El módulo de Centro Documental presenta la implementación más incipiente del sistema. El componente `DocCenter.jsx` (880 bytes) actúa como contenedor mínimo que delega toda la presentación a un componente `DocSearch`. No existe una interfaz de exploración por categoría, eje temático, tipo de documento ni país. La presente licitación constituye el desarrollo integral de la biblioteca institucional digital del Observatorio Ambiental Regional (OAR).

---

## 2. OBJETO DE LA CONTRATACIÓN

Contratar los servicios de una empresa o consorcio especializado para el **diseño, desarrollo, implementación y documentación del Módulo de Centro Documental Transversal** del Observatorio Ambiental Regional (OAR), constituyendo la plataforma de gestión, catalogación y acceso al acervo documental institucional de la OAR, que centralice reportes técnicos, datasets, metodologías científicas, normativas legales y documentos de política ambiental de la región SICA, con capacidad de búsqueda full-text, filtrado por eje temático y previsualización integrada.

---

## 3. ALCANCE TÉCNICO DEL PROYECTO

El alcance comprende, sin carácter limitativo, las siguientes actividades:

- **3.1** Diseño e implementación de la interfaz completa del Centro Documental con las siguientes 4 vistas:

  | Vista | Ruta | Descripción |
  | :--- | :--- | :--- |
  | **Home del documental** | `/technical/docs` | Buscador global con autocompletado, grid de categorías por eje (6 tarjetas: Bosques, Biodiversidad, Agua, Clima, Océanos, Normativos), carrusel de documentos destacados. |
  | **Vista de resultados** | `/technical/docs/search?q=...` | Listado de tarjetas de documento con filtros laterales: Tipo, Eje, Año, País, Organismo. Paginación de 20 resultados por página. Tiempo de respuesta < 1s. |
  | **Vista de detalle** | `/technical/docs/[id]` | Ficha técnica completa: título, organismo, tipo, eje, año, resumen, países, DOI/URL. Previzualización embebida: PDF (`<iframe>`), CSV (tabla interactiva scrollable), GeoJSON (MiniMap mode `static`). Botón Descargar + Compartir. |
  | **Panel de Administración** | `/technical/docs/admin` | Acceso por JWT con rol `doc_admin`. Formulario para añadir / editar documentos. Toggle "Destacado". Tabla de documentos con filtros y búsqueda. Dashboard de descargas por documento. |

- **3.2** Diseño e implementación del esquema de base de datos PostgreSQL. La tabla principal `catalog_documents` tendrá, como mínimo, los siguientes campos:

  ```sql
  CREATE TABLE catalog_documents (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code          VARCHAR(20) UNIQUE NOT NULL,   -- Ej: DOC-BOS-001
    title         TEXT NOT NULL,
    abstract      TEXT,
    doc_type      VARCHAR(50) NOT NULL,           -- Reporte | Dataset | Normativa | Capa | Metodología
    axis          VARCHAR(30) NOT NULL,           -- bosques | biodiversidad | agua | clima | oceanos
    country_codes TEXT[],                        -- Array de códigos ISO-3 (ej. {"GTM","HND"})
    organization  VARCHAR(200) NOT NULL,
    year          SMALLINT NOT NULL,
    doi           VARCHAR(200),
    source_url    TEXT,
    file_path     TEXT,                          -- Ruta en MinIO: /documents/[eje]/[id]/archivo.ext
    file_size_kb  INTEGER,
    status        VARCHAR(20) DEFAULT 'published', -- draft | pending_review | published | deprecated
    featured      BOOLEAN DEFAULT false,
    ai_summary    TEXT,
    ai_reviewed   BOOLEAN DEFAULT false,
    ingestion_method VARCHAR(20) DEFAULT 'manual', -- manual | fao_api | wdpa_api | gbif_api
    provenance_url TEXT,
    file_hash     VARCHAR(64),                   -- SHA256 del archivo en MinIO
    created_at    TIMESTAMPTZ DEFAULT NOW(),
    updated_at    TIMESTAMPTZ DEFAULT NOW()
  );

  CREATE INDEX idx_documents_trgm_title ON catalog_documents
    USING GIN (title gin_trgm_ops);
  CREATE INDEX idx_documents_trgm_abstract ON catalog_documents
    USING GIN (abstract gin_trgm_ops);
  CREATE INDEX idx_documents_axis ON catalog_documents (axis);
  CREATE INDEX idx_documents_status ON catalog_documents (status);
  ```

- **3.3** Implementación de los siguientes **endpoints FastAPI** en el Datalake OAR:

  | Método | Endpoint | Descripción |
  | :--- | :--- | :--- |
  | `GET` | `/api/documents/search?q=&axis=&type=&year=&country=&page=&size=` | Búsqueda full-text con filtros. Retorna página de resultados con metadata de paginación. |
  | `GET` | `/api/documents/{id}` | Detalle completo de un documento. |
  | `GET` | `/api/documents/featured` | Lista de documentos con `featured=true`, ordenados por última actualización. |
  | `GET` | `/api/documents/{id}/download` | Genera y retorna una Presigned URL de MinIO válida por 1 hora. |
  | `POST` | `/api/documents/` | Crear documento (requiere JWT rol `doc_admin`). |
  | `PUT` | `/api/documents/{id}` | Actualizar documento (requiere JWT rol `doc_admin`). |
  | `DELETE` | `/api/documents/{id}` | Cambiar `status` a `deprecated` (borrado lógico, no físico). |

- **3.4** Implementación del motor de búsqueda full-text mediante `pg_trgm`. La consulta de búsqueda combinará similitud trigramada en Tínulo y abstract con filtros exactos sobre los demás campos. Debe retornar resultados relevantes incluso con un error tipográfico de hasta 2 caracteres.

- **3.5** Implementación del **Panel de Administración** accesible en `/technical/docs/admin`, protegido por el middleware de autenticación JWT del Datalake OAR. Flujo de añadir documento: (1) completar formulario, (2) cargar archivo (upload a MinIO), (3) verificación de acceso mediante Presigned URL, (4) cálculo de SHA256 del archivo, (5) guardar en PostgreSQL con `status: draft`, (6) publicar.

- **3.6** Implementación de scripts de ingesta automática para 3 fuentes externas:
  - **`fao_importer.py`:** Consume `https://www.fao.org/faostat/api/v1/en/documents?q=[query]`. Convierte al modelo `catalog_documents`. Frecuencia: trimestral.
  - **`wdpa_importer.py`:** Consume la API de Protected Planet `https://api.protectedplanet.net/v3/protected_areas`. Frecuencia: mensual.
  - **`gbif_importer.py`:** Consume `https://api.gbif.org/v1/literature/search`. Frecuencia: mensual.
  - Todos los documentos ingestados automáticamente llegan con `status: pending_review` e inician el flujo de curaduría.

- **3.7** Catalogación manual de al menos 50 documentos validados por el SME, cubriendo los 5 ejes y mínimo 7 de los 8 países SICA (Belice, Costa Rica, El Salvador, Guatemala, Honduras, Nicaragua, Panamá, República Dominicana).

---

## 4. PERFILES PROFESIONALES REQUERIDOS

El adjudicatario deberá garantizar la participación activa de los siguientes perfiles durante toda la ejecución del contrato:

---

### 4.1. Experto en la Materia (Subject Matter Expert — SME)

| Atributo | Especificación |
| :--- | :--- |
| **Formación** | Título universitario (mínimo Licenciatura, preferible Posgrado) en Ciencias Forestales, Biología, Geografía, Ciencias Ambientales, Bibliotecología o disciplina afín. |
| **Experiencia** | Mínimo 8 años de experiencia en gestión de información ambiental, sistemas de documentación técnica o monitoreo ambiental. |
| **Idiomas** | Español (indispensable). Inglés técnico (deseable para catalogación de documentos internacionales). |
| **Competencias Técnicas** | Conocimiento de estándares de metadatos (ISO 19115, Dublin Core); capacidad de clasificación y categorización documental; experiencia en repositorios de datos ambientales. |
| **Competencias Blandas** | Liderazgo científico, comunicación interdisciplinaria, atención al detalle en catalogación. |
| **Rol en el Módulo** | Definición del esquema de metadatos; selección y validación del catálogo inicial (50 documentos mínimo); aprobación de la clasificación por eje; firma de acta de conformidad de cada funcionalidad implementada. |

---

### 4.2. Ingeniero Senior de Datos y Frontend (Senior Fullstack Data Engineer)

| Atributo | Especificación |
| :--- | :--- |
| **Formación** | Título universitario en Ingeniería en Sistemas, Ciencias de la Computación, Ingeniería de Software o afín. |
| **Experiencia** | Mínimo 5 años en desarrollo de aplicaciones de gestión documental, portales de datos o sistemas de búsqueda. |
| **Tecnologías Mandatorias** | Python 3.10+, FastAPI, SQLAlchemy 2.0 async, asyncpg, PostgreSQL (pg_trgm), MinIO (boto3/S3 API), React 18+, Vite. |
| **Tecnologías Deseables** | Meilisearch o Elasticsearch (para colecciones > 10,000 documentos), Celery (scraping/ingesta automática). |
| **Estándares de Metadatos** | ISO 19115-1:2014, Dublin Core, BibTeX/APA. |
| **Competencias Blandas** | Documentación técnica exhaustiva, gestión del tiempo en entregas cortas (sprints), comunicación clara con perfiles no técnicos. |
| **Rol en el Módulo** | Implementación de la interfaz, base de datos, API y script de ingesta; responsable del QA de datos; gestión del repositorio Git. |

---

### 4.3. Coordinador Técnico del Proyecto (Opcional — para contratos de más de 6 meses)

| Atributo | Especificación |
| :--- | :--- |
| **Formación** | Ingeniería, Ciencias o Administración con especialidad en gestión de proyectos tecnológicos. |
| **Certificación** | PMP, PRINCE2 o certificación en metodologías ágiles (Scrum Master). |
| **Rol en el Módulo** | Punto de contacto único con la entidad contratante; coordinación SME–Desarrollador; emisión de informes de avance semanales. |

---

## 5. PROTOCOLO OPERATIVO: CICLO DE GESTIÓN Y CURADURÍA DOCUMENTAL

El proceso de construcción del Centro Documental sigue un ciclo de **bibliotecología digital aplicada a la información ambiental**, cuya naturaleza es fundamentalmente diferente a la de cualquier otro módulo del sistema. No se trata de desarrollar visualizaciones ni algoritmos, sino de construir un **repositorio institucional confiable, descubrible y sostenible** que centralice el acervo documental de la OAR. La complejidad radica en tres ejes: (1) el diseño de un esquema de clasificación que sea fácil de mantener, (2) la calidad e integridad de los metadatos de cada documento, y (3) la automatización de la ingesta desde fuentes externas sin comprometer la curaduría humana del SME.

---

### Fase I — Diseño del Esquema de Clasificación y Taxonomía (Responsable: SME)

Antes de escribir una línea de código o de catalogar un solo documento, el SME diseña la **arquitectura de información** del Centro Documental:

- **Taxonomía de tipos de documento:** Define con precisión los tipos que el sistema debe soportar: Reporte Técnico / Dataset alfanumérico / Capa Geoespacial / Normativa legal / Metodología científica / Imagen satelital procesada / Otro.
- **Campos de metadatos obligatorios:** Define qué campos son de llenado obligatorio al crear un registro (ej. título, tipo, eje temático, año, organismo emisor) y cuáles son opcionales (ej. DOI, ISBN, idioma).
- **Ejes temáticos y etiquetas:** Establece el vocabulario controlado de etiquetas para evitar duplicaciones o inconsistencias (ej. "Bosques" no puede coexistir con "Forestal" como etiquetas distintas para el mismo concepto).
- **Reglas de acceso:** ¿Todos los documentos son públicos? ¿Algunos requieren registro de usuario? ¿Algunos son para uso interno solamente?
- **Criterios de calidad documental:** Define qué hace que un documento sea aceptable para el catálogo (ej. mínimo: título, organismo, año y URL o archivo disponible).

**Resultado de la Fase:** Documento `CLASSIFICATION_SCHEMA.md` validado por el SME, que servirá como manual de catalogación para todos los roles que agreguen documentos al sistema.

---

### Fase II — Diseño de la Arquitectura de Datos y Motor de Búsqueda (Responsable: Desarrollador)

Con la taxonomía aprobada, el Desarrollador diseña la infraestructura técnica:

- Implementación del schema PostgreSQL (`catalog_documents`, `catalog_tags`) derivado del esquema de clasificación del SME.
- Configuración de la extensión `pg_trgm` y creación de índices GIN sobre los campos `title` y `abstract` para búsqueda full-text tolerante a errores tipográficos.
- Diseño de la estructura de carpetas en MinIO: `/documents/[eje]/[tipo]/[id_doc]/archivo.[ext]`.
- Implementación de los endpoints FastAPI para gestión del catálogo (CRUD + búsqueda + documentos destacados).
- **Prueba de rendimiento del motor de búsqueda:** Con un conjunto de 500 documentos de prueba, verificar que las consultas retornen en < 1 segundo. Documentar plan de escalado para colecciones > 10,000 documentos (evaluación de Meilisearch).

**Resultado de la Fase:** Schema de base de datos funcional, endpoints documentados con OpenAPI/Swagger, y prueba de rendimiento registrada.

---

### Fase III — Construcción de la Interfaz de Usuario (Responsable: Desarrollador)

Con el backend funcional, el Desarrollador construye la interfaz de usuario del Centro Documental:

- **Pantalla de inicio:** Buscador global con autocomplete, grid de categorías por eje, carrusel de documentos destacados.
- **Vista de resultados:** Tarjetas de documento con ícono de tipo, título, organismo, año, resumen corto y botones de acción (Ver / Descargar / Agregar a Lista).
- **Vista de detalle:** Ficha técnica completa, previsualización embebida (PDF en iframe, CSV en tabla interactiva, GeoJSON en mini-mapa), documentos relacionados e historial de versiones.
- **Panel de Administración** (acceso protegido por JWT): Formulario para añadir / editar / eliminar documentos; función de marcar como "Destacado"; estadísticas de descarga por documento.

El SME revisa la usabilidad de la interfaz realizando las siguientes tareas sin asistencia técnica: (1) buscar un documento, (2) añadir uno nuevo desde el panel de administración, (3) actualizar su resumen. El tiempo máximo esperado para cada tarea es 5 minutos. Si se excede, la interfaz requiere mejora antes de avanzar.

---

### Fase IV — Ingesta del Catálogo Inicial y Curaduría (Responsable: Desarrollador + SME)

Esta fase combina el trabajo técnico del Desarrollador con la labor curatorial del SME:

- El SME provee la lista de los 50 documentos mínimos del catálogo inicial, con sus metadatos básicos derivados del `CLASSIFICATION_SCHEMA.md`.
- El Desarrollador ingesta los documentos en el sistema, sube los archivos a MinIO y verifica que cada uno sea accesible mediante Presigned URL.
- Para el 100% de los documentos ingresados, el SME verifica manualmente: título correcto / tipo correcto / eje correcto / URL o archivo accesible.
- Esta revisión genera la **Tabla de Control de Calidad Documental** (campos verificados por documento).
- Cualquier documento con metadatos incorrectos o archivo inaccesible queda marcado como `status: draft` y no se publica hasta su corrección.

---

### Fase V — Implementación de Ingesta Automática y Política de Actualización (Responsable: Desarrollador)

Un centro documental vivo requiere mecanismos de actualización automática:

- Implementación de los scripts de ingesta automática para las 3 fuentes externas: FAO Open Data, WDPA API y GBIF.
- Configuración del Cron Job con la frecuencia adecuada por fuente (ej. WDPA: 1 vez al mes; FAO: trimestral).
- **Protocolo de curaduría automática:** Los documentos ingresados automáticamente quedan en `status: pending_review` y no se publican sin aprobación del SME. El SME recibe una notificación por lote de nuevos documentos pendientes.
- Implementación del motor LLM para generar automáticamente resúmenes de nuevos documentos que no dispongan de abstract. Los resúmenes generados se etiquetan con su origen IA y quedan pendientes de revisión.
- **Prueba de extremo a extremo de la ingesta automática:** Se ejecuta cada script en modo simulado y se verifica que el documento resultante cumpla los criterios del `CLASSIFICATION_SCHEMA.md`.

---

### Fase VI — Apertura y Gobernanza del Catálogo (Responsable: SME + Desarrollador)

Un repositorio institucional requiere gobernanza para mantenerse útil y confiable a largo plazo:

- El Centro Documental se publica en `/technical/docs` y se vincula desde la pantalla de inicio de cada eje temático.
- El SME designa a los **Responsables de Colección por Eje**: personas dentro de la OAR que tienen acceso al Panel de Administración para añadir y actualizar documentos de su eje.
- Se publica la **Política de Actualización del Catálogo** en el repositorio Git, definiendo: frecuencia mínima de revisión, criterios para deprecar documentos desactualizados, y protocolo para versiones nuevas de un mismo documento.
- Actualización periódica de enlaces rotos detectados por el sistema.
- El Desarrollador entrega un **Manual Operativo del Centro Documental** comprensible para los responsables de colección, sin requerir conocimientos técnicos.

---


---

## 6. GESTIÓN DE PROCESAMIENTO DE DATOS COMPLEJOS

Cuando la ingesta automática desde fuentes externas implique el procesamiento de grandes volúmenes documentales (> 500 documentos por lote) o la extracción de texto completo de PDFs para indexación, el adjudicatario aplicará el siguiente protocolo:

### 6.1. Arquitectura de Procesamiento Diferido

| Componente | Especificación |
| :--- | :--- |
| **Trigger** | Cron Job programado (ej. primer día del mes) o invocación manual por el administrador. |
| **Entorno de Ejecución** | Railway Worker independiente o servicio de scraping para no saturar la API principal. |
| **Checkpoints** | El script guardará el progreso en PostgreSQL cada 50 documentos procesados. En caso de fallo, reanudará sin reinicio desde cero. |
| **Repositorio de Resultados** | Documentos en MinIO bajo la ruta: `/documents/[EJE]/[ID_DOC]/archivo.[ext]`. |
| **Registro** | Cada documento ingresado se registra en los logs del servidor. |

### 6.2. Notificaciones y Alertas

El sistema enviará notificaciones automáticas en los siguientes eventos:
- ✅ Inicio del proceso de ingesta automática.
- ⚠️ Error crítico o documento no accesible en la fuente (URL rota).
- 📊 Hito de avance (ej. 250 de 500 documentos procesados).
- ✅ Finalización exitosa con resumen: documentos añadidos / actualizados / fallidos.

### 6.3. Estimación de Costos de Infraestructura

Antes de ejecutar ingestas masivas, el Desarrollador presentará una estimación de consumo en Railway créditos y almacenamiento en MinIO (GB).

### 6.4. Optimización para Servicio Web

- El motor de búsqueda debe retornar resultados < **1 segundo** para colecciones de hasta 5,000 documentos.
- Para colecciones > 10,000 documentos, se evaluará la migración a **Meilisearch** o **Elasticsearch**.

---

## 7. REQUERIMIENTOS TÉCNICOS NO FUNCIONALES

### 7.1. Seguridad
- Toda comunicación sobre **HTTPS** con certificado TLS vigente.
- Las **Presigned URLs** de MinIO para descarga de documentos con expiración máxima de 1 hora.
- El Panel de Administración requerirá autenticación **JWT** con perfil de administrador.

### 7.2. Interoperabilidad
- Los metadatos deben poder exportarse en formato **ISO 19115** y **Dublin Core** para interoperabilidad con catálogos nacionales e internacionales.

### 7.3. Escalabilidad
- La arquitectura debe soportar el crecimiento del catálogo hasta 50,000 documentos sin degradación del rendimiento de búsqueda.

### 7.4. Accesibilidad
- Cumplimiento de **WCAG 2.1 Nivel AA**. Las búsquedas deben ser accesibles para usuarios sin cuenta registrada.

### 7.5. Multiidioma
- Los metadatos deben soportar documentos en español, inglés y portugués como mínimo.
- La interfaz de búsqueda debe operar correctamente con caracteres diacríticos (tildes, ñ, ç).

---

## 8. ESTÁNDARES DE DOCUMENTACIÓN Y TRAZABILIDAD

### 8.1. Estructura de Repositorio

```
/scripts/
  └── /ingesta/
      ├── fao_importer.py          # Script de ingesta desde FAO Open Data
      ├── wdpa_importer.py         # Script de ingesta desde WDPA API
      ├── gbif_importer.py         # Script de ingesta desde GBIF
      ├── environment.yml          # Dependencias exactas
      └── METHODOLOGY.md           # Metodología de catalogación y normalización
/documents/
  └── [EJE]/
      └── [ID_DOC]/
          └── archivo.[ext]        # Documento almacenado en MinIO
```

### 8.2. Linaje del Dato (Data Provenance)

Para cada documento catalogado se registrará:
- **URL exacta** de descarga o fuente de origen.
- **Fecha de incorporación** al catálogo OAR.
- **Método de ingesta:** Manual / Automático (fuente API).
- **Hash de verificación (MD5/SHA256)** del archivo almacenado en MinIO.

### 8.3. Versionamiento del Catálogo

Actualizaciones de metadatos (ej. nueva versión de un reporte FAO) mantienen versiones anteriores referenciadas en PostgreSQL con changelog justificado.

---

## 9. HERRAMIENTAS DE GESTIÓN DE PROYECTO

El adjudicatario utilizará obligatoriamente las siguientes herramientas:

| Herramienta | Uso | Justificación |
| :--- | :--- | :--- |
| **GitHub Projects** | Gestión de tareas, sprints e Issues vinculados al código. | Trazabilidad tarea-commit. |
| **GitHub Issues** | Registro de lotes de "Fichas de Metadatos" como Issues etiquetados por eje. | Vinculación de la catalogación con el Pull Request de ingesta. |
| **GitHub Wiki** | Documentación de la metodología de catalogación y el catálogo de fuentes de ingesta. | Disponibilidad permanente junto al código. |

El equipo se organizará en **sprints de 2 semanas** con reuniones de sincronización semanales entre el SME y el Desarrollador.

---

## 10. PRODUCTOS ENTREGABLES Y CRITERIOS DE ACEPTACIÓN

| # | Entregable | Descripción | Criterio de Aceptación |
| :--- | :--- | :--- | :--- |
| **E1** | Interfaz del Centro Documental | Buscador, filtros, tarjetas y vista de detalle completos. | Búsqueda retorna resultados en < 1s para hasta 5,000 documentos. |
| **E2** | Schema PostgreSQL y API | Tablas `catalog_documents` y `catalog_tags` + endpoints CRUD. | Documentados con OpenAPI/Swagger. |
| **E3** | Motor de búsqueda full-text | `pg_trgm` activo sobre título y abstract. | Funcionamiento verificado con 50+ documentos reales. |
| **E4** | Panel de Administración | Interfaz para añadir, editar y destacar documentos. | Operativo sin asistencia técnica; añadir documento en < 5 min. |
| **E5** | Scripts de ingesta automática | Importadores para FAO, WDPA y GBIF. | Ejecutables sin error; ≥ 90% de documentos objetivo ingresados. |
| **E6** | Catálogo inicial | Mínimo 50 documentos validados por el SME. | 100% de documentos con metadatos completos y archivo accesible. |
| **E7** | Narrativa IA integrada | Resúmenes generados por LLM para documentos sin abstract. | Coherente, nota de transparencia visible; aprobado por el SME. |

---

## 11. ACUERDOS DE NIVEL DE SERVICIO (SLA)

| Métrica | Indicador | Umbral Mínimo Aceptable |
| :--- | :--- | :--- |
| Disponibilidad del Módulo | Uptime mensual | 99.5% en horario laboral (08:00–20:00 UTC-6) |
| Tiempo de Respuesta del Buscador | Latencia para colecciones ≤ 5,000 docs | < 1,000 ms |
| Disponibilidad de Previsualización | PDF embebido accesible | 100% de documentos en MinIO |
| Indexación de Nuevos Documentos | Tiempo desde añadido hasta disponible en búsqueda | < 1 minuto |
| Recuperación ante Fallos | RTO del Cron Job de ingesta | < 30 minutos desde último checkpoint |
| Tiempo de Respuesta a Incidentes | Bugs críticos en producción | Resolución en < 4 horas hábiles |

---

## 12. PROPIEDAD INTELECTUAL Y CONFIDENCIALIDAD

- **12.1.** Todo el código fuente, esquemas de base de datos, scripts de ingesta y documentación desarrollados serán propiedad exclusiva de la OAR.
- **12.2.** El adjudicatario cede todos los derechos patrimoniales de autor sobre los productos desarrollados.
- **12.3.** Los documentos indexados y sus metadatos son activos institucionales de la OAR; su difusión no autorizada queda estrictamente prohibida.
- **12.4.** El adjudicatario deberá suscribir un **Acuerdo de No Divulgación (NDA)** previo al inicio del contrato.

---

## 13. PENALIZACIONES Y GESTIÓN DE RIESGOS

| Evento | Penalización |
| :--- | :--- |
| Entrega de Fase fuera del plazo acordado (por día hábil) | 0.5% del valor total del contrato |
| Entregable rechazado por incumplimiento de criterios de aceptación | Corrección sin costo adicional en un plazo de 5 días hábiles |
| Pérdida o corrupción de documentos en MinIO por negligencia | Restauración desde backup + informe de causa raíz |
| Documentación incompleta o ausente al momento de la entrega | Retención del 10% del pago del hito hasta subsanar |
| Exposición no autorizada de documentos confidenciales | Rescisión inmediata del contrato + acciones legales |

---

## 14. CRITERIOS DE EVALUACIÓN DE OFERTAS

| Criterio | Peso |
| :--- | :--- |
| Experiencia demostrable en portales de datos, gestión documental o repositorios digitales | 30% |
| Calidad técnica de la propuesta de arquitectura del catálogo y búsqueda | 25% |
| Oferta económica | 20% |
| Experiencia en integración con APIs externas (FAO, GBIF, WDPA) y estándares de metadatos | 15% |
| Propuesta de gestión del proyecto (cronograma, sprints, herramientas) | 10% |

---

## 15. GLOSARIO DE TÉRMINOS TÉCNICOS

| Término | Definición |
| :--- | :--- |
| **pg_trgm** | Extensión de PostgreSQL que habilita búsqueda full-text tolerante a errores tipográficos mediante índices de trigramas. |
| **Presigned URL** | URL temporal generada por MinIO que permite el acceso a un archivo sin exponer credenciales, válida durante un plazo definido. |
| **Dublin Core** | Estándar internacional de metadatos para recursos digitales, compuesto por 15 elementos básicos descriptivos. |
| **ISO 19115** | Norma internacional para la descripción de metadatos de información geográfica. |
| **BibTeX** | Formato de referencia bibliográfica utilizado en documentos científicos y académicos. |
| **Cron Job** | Tarea programada que se ejecuta automáticamente en intervalos de tiempo definidos en el servidor. |
| **Linaje del Dato** | Registro completo del origen, transformación y entrega de un dato desde su fuente primaria. |

---

## 16. REFERENCIAS NORMATIVAS Y BIBLIOGRÁFICAS

- **ISO 19115-1:2014** — Geographic Information: Metadata.
- **ISO/IEC 27001:2022** — Information Security Management Systems.
- **Dublin Core Metadata Initiative (DCMI):** https://www.dublincore.org/
- **WCAG 2.1 — Web Content Accessibility Guidelines** — W3C Recommendation, 2018.
- **Marco de Kunming-Montreal (COP15, 2022):** Meta 30x30.
- **FAO Open Data:** https://www.fao.org/faostat/
- **WDPA API Documentation:** https://www.protectedplanet.net/en/thematic-areas/protected-areas-api
- **GBIF API Reference:** https://www.gbif.org/developer/summary
- **PostgreSQL pg_trgm Documentation:** https://www.postgresql.org/docs/current/pgtrgm.html
- **MinIO S3 API Reference:** https://min.io/docs/

---

*Este documento de Términos de Referencia es de carácter vinculante para el adjudicatario y constituye el marco técnico y operativo bajo el cual se evaluará el cumplimiento del contrato. Toda modificación al alcance deberá ser aprobada mediante adenda escrita y firmada por ambas partes.*

**Versión:** 1.0 | **Fecha:** Marzo 2025 | **Clasificación:** Licitación Pública Internacional


