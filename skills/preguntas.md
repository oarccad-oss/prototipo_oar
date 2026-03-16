# Skill: Preguntas Estratégicas

## Propósito
Responder a las interrogantes críticas de los tomadores de decisiones mediante evidencia científica y visualizaciones de datos simplificadas.

## Componentes UI Estándar
1. **Hero de Pregunta:** Título en `font-serif`, tamaño `5xl` o `6xl`, color `slate-900`.
2. **Contexto Regional:** Breve descripción narrativa del problema.
3. **Indicador Destacado:** Una tarjeta `Card` con el dato más relevante (ej. % de avance o Ha totales).
4. **Visor Integrado:** Un mapa o gráfico simplificado que soporte la respuesta.
5. **Fuentes:** Sección de `DataSourceModal` para garantizar transparencia.

## Directrices de Diseño
- **Iconografía:** Usar `HelpCircle` para la sección general y `CheckCircle2` para respuestas validadas.
- **Colores:** Usar el color del eje ERAM correspondiente (ej. Emerald para bosques, Blue para agua).
- **Animaciones:** `animate-in fade-in slide-in-from-bottom-4` para la entrada de la respuesta.

## Estructura de Datos (src/data/questions.js)
```javascript
{
  id: "meta-30x30",
  question: "¿Cómo vamos con la meta 30x30?",
  axis: "Biodiversidad",
  path: "/preguntas/meta-30x30",
  icon: HelpCircle
}
```
