# Skill: Análisis Geoespacial Avanzado (Laboratorio)

## Propósito
Ejecutar algoritmos espaciales complejos (intersecciones, buffers, detección de cambios) sobre el territorio regional.

## Flujo Operativo (Workflow)
1. **Paso 1: Definición de Área:** Usuario dibuja un polígono o carga un archivo `GeoJSON`.
2. **Paso 2: Selección de Algoritmo:** Elegir entre "Restricciones de Conservación", "Historia de Deforestación", etc.
3. **Paso 3: Ejecución (Backend Sim):** Loader con mensaje "Procesando en Motor Geográfico Python...".
4. **Paso 4: Reporte Especializado:** Resultados tabulares y mapa de calor de las áreas afectadas.

## Estética del Simulador
- **Mapa Base:** Oscuro (`CartoDB DarkMatter`) para resaltar los resultados de análisis.
- **Toolbars:** Flotantes con bordes redondeados y desenfoque (backdrop-blur).
- **Icono:** `ShieldAlert` (para restricciones) o `Zap` (para procesamiento rápido).

## Capas de Referencia
- WDPA (Protected Areas).
- GFW (Tree Cover Loss).
- Corredores Biológicos SICA.
