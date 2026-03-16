# Skill: Visor Geoespacial Regional

## Propósito
Explorar la cartografía oficial del SICA de forma interactiva y multiparamétrica.

## Interfaz de Usuario
1. **Lienzo de Mapa:** Pantalla completa con controles mínimos.
2. **Control de Capas (Sidebar):** Listado categorizado (Ambiental, Productiva, Riesgo).
3. **Leyenda Dinámica:** Se actualiza según las capas encendidas.
4. **Inspector de Atributos:** Panel lateral que se abre al hacer clic en un objeto del mapa.

## Estándares Técnicos
- **Mapa Base:** `Leaflet` o `MapLibre`.
- **Formatos soportados:** WMS (servicios oficiales), GeoJSON (capas dinámicas), Raster (imágenes térmicas/carbono).
- **Metadatos:** Cada capa debe tener un botón de información que abra el `DataSourceModal`.

## UX / Interacciones
- **Opacidad:** Slider para cada capa.
- **Zoom Regional:** Botones de acceso rápido a cada país del SICA.
- **Icono:** `MapIcon`.
