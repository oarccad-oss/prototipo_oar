# Skill: Mapa del Sitio Esquemático (Architect)

## Propósito
Visualizar la jerarquía del OAR y facilitar la navegación estructural del sistema.

## Modos de Visualización
1. **Flujo Horizontal:** Conecta el portal principal con los visores finales mediante líneas de relación.
2. **Vista por Niveles:** Columnas que agrupan componentes por profundidad de clic (Nivel 1 a Nivel 5).

## Componentes UI
- **NodeCard:** Miniatura de la sección con icono, ruta y badge de profundidad.
- **QuickPeek:** Tooltip gigante que muestra una vista previa del contenido estratégico al pasar el mouse.
- **Breadcrumbs Flotantes:** Indican la posición "lógica" en la arquitectura.

## Directrices de Desarrollo
- **Icono:** `Layers`.
- **Interactividad:** El mapa debe ser interactivo, permitiendo navegar directamente a la ruta al hacer clic.
- **Estilo:** Líneas con flechas y nodos con sombras suaves (`shadow-sm` a `shadow-2xl` en hover).
