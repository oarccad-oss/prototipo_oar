# Análisis de Vistas Técnicas del Observatorio

A continuación se detalla la disección técnica y de contenido para cada uno de los tres reportes estratégicos consultados, identificando sus fuentes, geoprocesos y tipos de salidas (visuales y textuales).

---

## 1. Reporte FRA 2024 (`/technical/reports/fra-2024`)

*   **Pregunta a responder:** ¿Cuál es el estado integral de los bosques en la Región SICA en términos de extensión histórica, designación de uso y almacenamiento de carbono?
*   **Documento / Fuente de datos:** Datos estáticos quemados en el componente (`ForestReport.jsx`), modelados a partir de los estándares del reporte Evaluación de los Recursos Forestales Mundiales (FRA 2020/2024) de la FAO.
*   **API / Geoservicio:** Ninguna. No consume red externa.
*   **Salida_Figura:** 
    *   Gráfico de Área (*AreaChart*): Tendencia Histórica (Millones de Ha).
    *   Gráfico de Pastel (*PieChart*): Objetivo Primario de Gestión (designación del suelo).
    *   Gráfico de Barras Horizontales (*BarChart*): Existencias de Carbono (Biomasa, suelo, etc).
*   **Salida_Mapa:** Ninguno.
*   **Salida_Texto:** 
    *   Tarjetas KPI (Superficie total 18.1 Mha, pérdida neta, porcentaje de áreas protegidas).
    *   Párrafos analíticos sobre la estabilización de pérdida gracias a forestería comunitaria y datos clave sobre las 3.2 Gigatoneladas de stock de carbono almacenado.

---

## 2. Reporte Global Forest Watch (`/technical/reports/gfw`)

*   **Pregunta a responder:** ¿Cuál es la magnitud de la pérdida de cobertura arbórea y las emisiones de CO₂ asociadas a nivel regional o nacional desde 2010?
*   **Documento / Fuente de datos:** Objeto global `SICA_GFW_DATA` proveniente de la ruta estática `sicaDataProcessed.js`. Atribuido a metodologías de GFW (UMD, NASA).
*   **API / Geoservicio:** Consume una API de rasterización de mapas (*Maptiles*) en tiempo real desde los servidores de WRI/GFW: `https://tiles.globalforestwatch.org/umd_tree_cover_loss/latest/dynamic/{z}/{x}/{y}.png`.
*   **Salida_Figura:**
    *   Gráfico de Barras (*BarChart*): Pérdida anual en hectáreas.
    *   Gráfico de Líneas (*LineChart*): Tendencia de emisiones de CO₂ a la atmósfera.
    *   Listado de Ranking con mini-barras de progreso: Top de las regiones geográficas más afectadas.
*   **Salida_Mapa:** Mapa espacializado de la región seleccionada renderizando la retícula (tiles) en color rosa/rojo sobre las áreas precisas donde hubo pérdida de dosel arbóreo.
*   **Salida_Texto:** 
    *   KPI cards (Pérdida Total, Bosque Primario, Emisiones).
    *   Resumen ejecutivo dinámico que inyecta en lenguaje natural el área perdida de cada país, equivalente en porcentaje y volumen de emisiones (*Data Storytelling*).

---

## 3. Reporte de Incendios (`/technical/reports/fires`)

*   **Pregunta a responder:** ¿Cuál es el volumen de focos de calor/alertas de incendio activas (últimas 24h) y su tendencia de 7 días?
*   **Documento / Fuente de datos:** Constantes estáticas `FIRE_DATA` y `FIRE_POINTS` incrustadas en el código origen (`FiresDashboard.jsx`), diseñadas para simular las bases de datos de NASA FIRMS (VIIRS/MODIS) y GWIS.
*   **API / Geoservicio:** Ninguna para la ingesta de datos. El minimapa usa el motor estándar del observatorio pero sin conectarse a *WMS/WFS* térmicos externos.
*   **Salida_Figura:**
    *   Gráfico de Área suavizado (*AreaChart*): Tendencia de Actividad de focos y alertas durante los últimos 7 días.
*   **Salida_Mapa:** Mapa renderizando un arreglo de chinchetas/marcadores circulares rojos `(<CircleMarker>)` con coordenadas estáticas asignadas preestablecidamente sobre reservas naturales claves de Centroamérica (ej. Petén, Darién).
*   **Salida_Texto:**
    *   Narrativa indicando la cantidad puntual de alertas activas y destacando semánticamente aquellas denominadas "de Alta Confianza" (>80% de probabilidad de ser fuego forestal).
    *   Bloque informativo que explica la procedencia tecnológica (VIIRS S-NPP con resolución de 375m).
