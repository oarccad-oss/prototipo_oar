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
