# Skill: Cifras Regionales

## Propósito
Proporcionar una vista rápida y comparativa de los indicadores estadísticos clave de la región SICA.

## Componentes UI Estándar
1. **Filtro de País:** Selector de banderas y nombres oficiales del SICA.
2. **Tablero de Tarjetas (Grid):** Uso de `Card` con hover effect `hover:shadow-xl`.
3. **Tendencias:** Íconos `ArrowUp` (rojo si es malo, verde si es bueno) o `ArrowDown`.
4. **Mini-Gráficos:** Sparklines o barras simples integradas en la tarjeta.

## Estética "Decidelo tu" (Estilo OAR)
- **Glassmorphism:** Fondo de tarjetas `bg-white/80 backdrop-blur-md`.
- **Bordes:** `rounded-[2rem]` o `rounded-[2.5rem]` para un aspecto orgánico y premium.
- **Tipografía:** Valores numéricos en `font-mono` para facilitar la lectura de cifras largas.

## Estructura de Datos (src/data/cifras.json)
```json
{
  "forestCover": { "value": 18450000, "unit": "Ha", "trend": "down" }
}
```
