# Skill: Eje Estratégico (ERAM)

## Propósito
Centralizar toda la inteligencia ambiental de una línea temática específica (Bosques, Agua, Clima, etc.).

## Estructura de la Página
1. **Hero Temático:** Fondo con imagen de alta calidad, gradiente al color del eje y título principal.
2. **Dato del Día:** Tarjeta animada con curiosidades o estadísticas rotativas.
3. **Módulos de Consulta:** Grid de 4-5 tarjetas (`Historias`, `Preguntas`, `Tableros`, `Mapas`, `Docs`).
4. **Buscador Específico:** Input de búsqueda filtrado automáticamente por el eje actual.

## Mapeo de Colores (Estándar OAR)
- **Eje 1 (Calidad):** `Blue`
- **Eje 2 (Mares):** `Cyan`
- **Eje 3 (Agua):** `Sky`
- **Eje 4 (Bosques):** `Emerald`
- **Eje 5 (Clima):** `Purple`

## Lógica de Navegación
Cada eje debe heredar el `StrategicAxisGeneric` pero permitir personalización mediante `props` de íconos y descripciones.
