# Skill: Centro de Documentación (Biblioteca)

## Propósito
Centralizar el conocimiento técnico, legal y metodológico del OAR para consulta pública.

## Componentes UI Estándar
1. **Buscador Inteligente:** Input con icono `Search` que filtra en tiempo real.
2. **Filtros por Eje y País:** Tags de selección rápida.
3. **Card de Documento:** 
   - Miniatura del reporte.
   - Badge de tipo de archivo (PDF, XLS, MAP).
   - Historial de versiones (acordeón o lista).
4. **Botón de Descarga:** Acción clara y metadatos de tamaño/fecha.

## Lógica de Estilo
- **Thumbnails:** Imágenes temáticas de `Unsplash` con filtro `grayscale` que se activa a color en `hover`.
- **Iconografía por Tipo:**
  - PDF: Rojo
  - Excel: Esmeralda
  - Mapa: Azul
  - Manual: Indigo

## Estructura de Datos (src/data/documentation.js)
```javascript
{
  id: "DOC-001",
  name: "Informe Regional...",
  type: "PDF",
  versions: [{ year: 2023, url: "#" }]
}
```
