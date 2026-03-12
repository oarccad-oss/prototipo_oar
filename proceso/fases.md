# Preguntas


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





# Historia

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

# Tableto de control

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

# Reporte

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

# Analisis geoespacial

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

# Visor mapas

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


# Centro documental

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

