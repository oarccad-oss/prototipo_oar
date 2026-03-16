# Skill: Análisis Multidimensional (BI)

## Propósito
Permitir el descubrimiento de correlaciones entre diferentes variables ambientales y socioeconómicas del Data Lake.

## Interfaz de Usuario (Sandbox)
1. **Panel de Selección:** Dos selectores (`Variable 1`, `Variable 2`) y un eje temporal.
2. **Generador de Gráficos:** Botón central de "Generar Análisis" con animación de procesamiento.
3. **Selector de Visualización:** Opción para cambiar entre Barras, Áreas, Dispersión o Tablas.
4. **Validación de Cruce:** Lógica que impide cruzar tablas que no comparten el código geográfico `ISO-Country`.

## Lógica Técnica
- **Datos:** Consumo de archivos `.csv` en `public/data_csv`.
- **Mapping:** Uso de `recharts` para la renderización dinámica según los datos seleccionados.
- **Premium Touch:** Tooltips personalizados que muestran el origen de cada punto de dato.

## Icono Sugerido
`BarChart3` o `PieChart`.
