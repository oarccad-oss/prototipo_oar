export const DATASETS_CONFIG = [
    {
        id: 'inventarios-forestales',
        name: 'Inventarios Forestales SICA',
        description: 'Datos detallados de parcelas forestales, biomasa y carbono en la región.',
        src: '/data_csv/inventarios_forestales.csv',
        adminLevel: 'Pais',
        dimensions: [
            { id: 'Pais', name: 'País' },
            { id: 'Tipo Bosque', name: 'Tipo de Bosque' },
            { id: 'Zona de Vida', name: 'Zona de Vida' },
            { id: 'Suelo IPCC', name: 'Suelo IPCC' },
            { id: 'Area Protegida', name: 'Área Protegida' },
            { id: 'Zona Climatica', name: 'Zona Climática' },
            { id: 'Division Administrativa', name: 'División Administrativa' }
        ],
        metrics: [
            { id: 'Vol (m3/ha)', name: 'Volumen (m³/ha)' },
            { id: 'CO2 (ton/ha)', name: 'Carbono (ton/ha)' },
            { id: 'Densidad (arb/ha)', name: 'Densidad (árboles/ha)' },
            { id: 'ALTURA (m)', name: 'Altura Promedio (m)' },
            { id: 'DAP (cm)', name: 'DAP Promedio (cm)' }
        ]
    },
    {
        id: 'sica-analisis-cruzado',
        name: 'Análisis Integrado SICA',
        description: 'Dataset multidimensional que cruza pérdida forestal, áreas protegidas y cobertura ecosistémica por país.',
        src: '/data_csv/sica_analisis_cruzado.csv',
        adminLevel: 'Pais',
        dimensions: [
            { id: 'pais', name: 'Nombre del País' },
            { id: 'iso3', name: 'Código ISO3' },
            { id: 'iso2', name: 'Código ISO2' }
        ],
        metrics: [
            { id: 'area_total_ha', name: 'Superficie Total (ha)' },
            { id: 'area_agropecuaria_ha', name: 'Superficie Agropecuaria (ha)' },
            { id: 'presion_agropecuaria_pct', name: 'Presión Agropecuaria (%)' },
            { id: 'area_urbana_ha', name: 'Superficie Urbana (ha)' },
            { id: 'area_acuacultura_ha', name: 'Superficie Acuacultura (ha)' },
            { id: 'cuerpos_agua_ha', name: 'Cuerpos de Agua (ha)' },
            { id: 'embalses_ha', name: 'Embalses (ha)' },
            { id: 'area_natural_ha', name: 'Superficie Natural (ha)' },
            { id: 'area_natural_pct', name: 'Cobertura Natural (%)' },
            { id: 'ecosistemas_totales', name: 'Ecosistemas Totales' },
            { id: 'ecosistemas_naturales', name: 'Ecosistemas Naturales' },
            { id: 'ecosistemas_exclusivos', name: 'Ecosistemas Exclusivos' },
            { id: 'manglares_area_ha', name: 'Superficie Manglares (ha)' },
            { id: 'manglares_perdida_ha', name: 'Pérdida de Manglares (ha)' },
            { id: 'perdida_2001_2005_ha', name: 'Pérdida 2001-2005 (ha)' },
            { id: 'perdida_2006_2010_ha', name: 'Pérdida 2006-2010 (ha)' },
            { id: 'perdida_2011_2015_ha', name: 'Pérdida 2011-2015 (ha)' },
            { id: 'perdida_2016_2020_ha', name: 'Pérdida 2016-2020 (ha)' },
            { id: 'perdida_acumulada_ha', name: 'Pérdida Acumulada Total (ha)' },
            { id: 'tasa_anual_ha', name: 'Tasa Anual de Pérdida (ha/año)' },
            { id: 'aceleracion_pct', name: 'Aceleración Histórica (%)' },
            { id: 'presion_natural_pct', name: 'Presión sobre Área Natural (%)' },
            { id: 'contribucion_regional_pct', name: 'Contribución Regional (%)' },
            { id: 'numero_areas_protegidas', name: 'Nº Áreas Protegidas' },
            { id: 'area_protegida_ha', name: 'Superficie Protegida (ha)' },
            { id: 'cobertura_protegida_pct', name: 'Cobertura Protegida (%)' },
            { id: 'brecha_proteccion_pct', name: 'Brecha de Protección (%)' },
            { id: 'perdida_en_ap_ha', name: 'Pérdida dentro de APs (ha)' },
            { id: 'perdida_en_ap_pct', name: 'Pérdida en APs (%)' },
            { id: 'densidad_perdida_ap', name: 'Densidad Pérdida AP (ha/1000ha)' },
            { id: 'bosque_intacto_ha', name: 'Superficie Bosque Intacto (ha)' },
            { id: 'bosque_intacto_tipos', name: 'Nº Tipos Bosque Intacto' },
            { id: 'ecosistemas_meta_30x30', name: 'Ecosistemas que cumplen 30x30' },
            { id: 'ecosistemas_sin_proteccion', name: 'Ecosistemas sin Protección' },
            { id: 'co2e_acumulado_mt', name: 'Emisiones CO2e Acumuladas (Mt)' },
            { id: 'co2e_anual_mt', name: 'Emisiones CO2e Anuales (Mt/año)' },
            { id: 'ecosistemas_acelerando', name: 'Nº Ecosistemas en Aceleración' },
            { id: 'municipios_total', name: 'Total Municipios' },
            { id: 'hotspot_municipios', name: 'Municipios Hotspot (50% pérdida)' }
        ]
    },
    {
        id: 'test',
        name: 'Datos de Test',
        description: 'Estos datos son de Testeo.',
        src: '/data_csv/test.csv',
        adminLevel: 'Pais',
        dimensions: [
            { id: 'Pais', name: 'País' },
            { id: 'Tipo Bosque', name: 'Tipo de Bosque' },
            { id: 'Zona de Vida', name: 'Zona de Vida' },
            { id: 'Suelo IPCC', name: 'Suelo IPCC' },
            { id: 'Area Protegida', name: 'Área Protegida' },
            { id: 'Zona Climatica', name: 'Zona Climática' },
            { id: 'Division Administrativa', name: 'División Administrativa' }
        ],
        metrics: [
            { id: 'Vol (m3/ha)', name: 'Volumen (m³/ha)' },
            { id: 'CO2 (ton/ha)', name: 'Carbono (ton/ha)' },
            { id: 'Densidad (arb/ha)', name: 'Densidad (árboles/ha)' },
            { id: 'ALTURA (m)', name: 'Altura Promedio (m)' },
            { id: 'DAP (cm)', name: 'DAP Promedio (cm)' }
        ]
    }
];
