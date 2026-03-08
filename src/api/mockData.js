export const COUNTRIES = [
    { code: "GT", name: "Guatemala", flag: "🇬🇹" },
    { code: "SV", name: "El Salvador", flag: "🇸🇻" },
    { code: "HN", name: "Honduras", flag: "🇭🇳" },
    { code: "NI", name: "Nicaragua", flag: "🇳🇮" },
    { code: "CR", name: "Costa Rica", flag: "🇨🇷" },
    { code: "PA", name: "Panama", flag: "🇵🇦" },
    { code: "BZ", name: "Belize", flag: "🇧🇿" },
    { code: "DO", name: "Rep. Dominicana", flag: "🇩🇴" },
];

export const KPI_DATA = {
    regional: {
        forestCover: { value: 18450000, unit: "Ha", trend: "down", change: -1.2, goal: 20000000, status: "warning", source: "Global Forest Watch", method: "Análisis Satelital Landsat", updated: "2024-01-15" },
        emissions: { value: 45000, unit: "tCO2e", trend: "up", change: 2.5, goal: 40000, status: "danger", source: "Inventario Nacional GEI", method: "IPCC 2006 Tier 2", updated: "2023-12-01" },
        fireAlerts: { value: 124, unit: "Alertas 24h", trend: "up", change: 15, goal: 50, status: "danger", source: "NASA FIRMS", method: "VIIRS 375m", updated: "2h atrás" },
        restoration: { value: 450000, unit: "Ha Restauradas", trend: "up", change: 5.4, goal: 1000000, status: "success", source: "Sistemas Nacionales", method: "Reporte AFOLU 2020+", updated: "2024-02-10" }
    },
    byCountry: {
        GT: { forestCover: 3500000, emissions: 12000, fireAlerts: 45 },
        SV: { forestCover: 600000, emissions: 8000, fireAlerts: 12 },
        HN: { forestCover: 5200000, emissions: 15000, fireAlerts: 55 },
        NI: { forestCover: 3800000, emissions: 9000, fireAlerts: 30 },
        CR: { forestCover: 2900000, emissions: 4000, fireAlerts: 5 },
        PA: { forestCover: 3100000, emissions: 5000, fireAlerts: 8 },
        BZ: { forestCover: 1200000, emissions: 1000, fireAlerts: 2 },
        DO: { forestCover: 1800000, emissions: 6000, fireAlerts: 18 },
    }
};

export const TREND_DATA = [
    { year: 2020, cover: 19000000, loss: 120000, restoration: 10000 },
    { year: 2021, cover: 18880000, loss: 125000, restoration: 25000 },
    { year: 2022, cover: 18755000, loss: 130000, restoration: 45000 },
    { year: 2023, cover: 18625000, loss: 140000, restoration: 80000 },
    { year: 2024, cover: 18450000, loss: 175000, restoration: 120000 },
];

export const EMISSION_DATA = [
    { country: "GT", emissions: 12000 },
    { country: "HN", emissions: 15000 },
    { country: "NI", emissions: 9000 },
    { country: "SV", emissions: 8000 },
    { country: "DO", emissions: 6000 },
    { country: "PA", emissions: 5000 },
    { country: "CR", emissions: 4000 },
    { country: "BZ", emissions: 1000 },
];

export const MAP_LAYERS = [
    // Environmental
    { id: "fires", name: "Puntos de Calor (VIIRS)", category: "Ambiental", type: "GeoJSON", status: "active", color: "#DC2626", description: "Detecciones de anomalías térmicas en las últimas 24h." },
    { id: "cover", name: "Cobertura Forestal", category: "Ambiental", type: "WMS", status: "active", color: "#15803D", description: "Mapa de uso de suelo y bosque." },
    { id: "protected", name: "Áreas Protegidas", category: "Ambiental", type: "GeoJSON", status: "inactive", color: "#1E3A8A", description: "Sistema Regional de Áreas Protegidas (SICAP)." },
    { id: "corridors", name: "Corredores Biológicos", category: "Ambiental", type: "GeoJSON", status: "inactive", color: "#10B981", description: "Conectividad ecológica crítica." },

    // Productive
    { id: "crops", name: "Mapa de Cultivos", category: "Productiva", type: "WMS", status: "inactive", color: "#F59E0B", description: "Zonas de Café y Palma Africana." },
    { id: "cattle", name: "Ganadería Extensiva", category: "Productiva", type: "WMS", status: "inactive", color: "#B45309", description: "Pasturas dedicadas a ganadería." },

    // Climate
    { id: "carbon", name: "Stock de Carbono", category: "Climática", type: "Raster", status: "inactive", color: "#7C3AED", description: "Biomasa aérea y carbono en suelo." },
    { id: "risk", name: "Riesgo Climático (Sequía)", category: "Climática", type: "Raster", status: "inactive", color: "#EF4444", description: "Proyecciones de déficit hídrico 2050." },
];

export const DOCUMENTS = [
    { id: 1, title: "Anuario Estadístico Forestal 2023", country: "GT", year: 2023, category: "Bosques", type: "PDF", size: "4.5 MB" },
    { id: 2, title: "Reporte de Incendios Q1 2024", country: "HN", year: 2024, category: "Incendios", type: "Excel", size: "1.2 MB" },
    { id: 3, title: "Mapa de Áreas Protegidas", country: "CR", year: 2022, category: "Áreas Protegidas", type: "Shapefile", size: "15 MB" },
    { id: 4, title: "Inventario Nacional de Gases", country: "Regional", year: 2023, category: "Cambio Climático", type: "PDF", size: "8.1 MB" },
    { id: 5, title: "Plan de Restauración AFOLU", country: "SV", year: 2021, category: "Suelos", type: "PDF", size: "3.2 MB" },
    { id: 6, title: "Alertas Tempranas Sequía", country: "NI", year: 2024, category: "Agua", type: "PDF", size: "2.8 MB" },
];

export const AI_RESPONSES = {
    default: "Soy el asistente virtual del OAR. Puedo ayudarte a encontrar datos sobre bosques, incendios y cambio climático en la región SICA.",
    incendios: "Según los datos de VIIRS (NASA), en las últimas 24 horas se han detectado **124 alertas de incendio** en la región, concentrándose principalmente en la biósfera maya (Guatemala) y la Moskitia (Honduras). ¿Deseas ver el mapa de calor?",
    cobertura: "La cobertura boscosa actual es de **18.45 millones de hectáreas** con una tendencia a la baja del 1.2% anual. El reporte completo está en el 'Anuario Estadístico 2023'.",
    reporte: "He encontrado 3 documentos relevantes. El más reciente es el 'Anuario Estadístico Forestal 2023' (PDF). ¿Quieres descargarlo?",
    restauracion: "La meta regional es restaurar 10 millones de Ha. Actualmente llevamos un avance de **450,000 Ha** registradas en el sistema AFOLU."
};

export const API_CATALOG = [
    { id: 1, name: "Forest Cover WMS", method: "GET", url: "/api/wms/cover", status: "Active", format: "PNG/TIF", description: "Servicio de mapas web para cobertura forestal." },
    { id: 2, name: "Fire Alerts GeoJSON", method: "GET", url: "/api/v1/fires/active", status: "Active", format: "GeoJSON", description: "Polígonos de anomalías térmicas en tiempo real." },
    { id: 3, name: "Carbon Stock Stats", method: "GET", url: "/api/v1/stats/carbon", status: "Beta", format: "JSON", description: "Estadísticas agregadas de stock de carbono por país." },
];
 
export const ZONES = [
    { id: 'corredor_seco', name: 'Corredor Seco Centroamericano' },
    { id: 'trifinio', name: 'Región Trifinio' },
    { id: 'golfo_fonseca', name: 'Golfo de Fonseca' }
];
