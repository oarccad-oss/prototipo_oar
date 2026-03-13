import {
    Trees, Shield, Flame, Footprints, CloudRain, Anchor, Droplet, Map as MapIcon, Database
} from 'lucide-react';

export const QUESTIONS_DATA = [
    {
        id: 'forest-state',
        icon: Trees,
        question: "¿Cuál es el estado de los bosques de la región?",
        shortQuestion: "¿Cómo están los bosques?",
        description: "Análisis integral del estado de los recursos forestales (Estado de los Bosques).",
        highlight: "Monitoreo integral",
        path: "/preguntas/estado-bosques",
        color: "#15803D",
        category: "Bosques"
    },
    {
        id: 'forest-loss',
        icon: Trees,
        question: "¿Dónde y cuánto bosque estamos perdiendo?",
        shortQuestion: "¿Dónde y cuánto bosque perdemos?",
        description: "Análisis anual de pérdida de cobertura arbórea y emisiones asociadas (GFW).",
        highlight: '<p class="text-sm text-slate-600">Más de <span class="font-bold text-[#97BD3D]">7 millones de hectáreas</span> de cobertura arbórea perdidas en el SICA desde 2010.</p>',
        path: "/preguntas/perdida-bosque",
        color: "#97BD3D",
        category: "Bosques"
    },
    {
        id: 'conservation-30x30',
        icon: Shield,
        question: "¿Estamos cerca de la meta de conservación 30x30?",
        shortQuestion: "¿Cómo vamos con la meta 30x30?",
        description: "Estado actual de las áreas protegidas y OECMs reportadas.",
        highlight: '<p class="text-sm text-slate-600">La región protege el <span class="font-bold text-[#10B981]">20.4%</span> de su territorio. Falta un 9.6% para alcanzar el objetivo global al 2030.</p>',
        path: "/preguntas/meta-30x30",
        color: "#10B981",
        category: "Biodiversidad"
    },
    {
        id: 'active-fires',
        icon: Flame,
        question: "¿Dónde hay incendios activos en este momento?",
        shortQuestion: "¿Dónde hay incendios activos ahora?",
        description: "Monitoreo en tiempo casi real de alertas de fuego (VIIRS/MODIS).",
        highlight: '<p class="text-sm text-slate-600">Detectados <span class="font-bold text-[#EF4444]">7,280 focos de calor</span> en las últimas 24h, con alta incidencia en el Petén y Olancho.</p>',
        path: "/preguntas/incendios-activos",
        color: "#EF4444",
        category: "Incendios"
    },
    {
        id: 'species-records',
        icon: Footprints,
        question: "¿Qué nos dicen los registros de especies en vivo?",
        shortQuestion: "¿Qué especies hay registradas?",
        description: "Dashboard de biodiversidad basado en observaciones de GBIF.",
        highlight: "Monitorero GBIF en vivo",
        path: "/preguntas/registros-especies",
        color: "#F59E0B",
        category: "Biodiversidad"
    },
    {
        id: 'drought-risk',
        icon: CloudRain,
        question: "¿Cuál es el riesgo de sequía en el Corredor Seco?",
        shortQuestion: "¿Riesgo de sequía en Corredor Seco?",
        description: "Indicadores climáticos y proyecciones de estrés hídrico.",
        highlight: '<p class="text-sm text-slate-600">Riesgo <span class="font-bold text-[#8B5CF6]">Moderado a Severo</span> debido a un déficit pluviométrico detectado en los últimos 90 días.</p>',
        path: "/preguntas/riesgo-sequia",
        color: "#8B5CF6",
        category: "Clima"
    },
    {
        id: 'ocean-health',
        icon: Anchor,
        question: "¿Cuál es el estado de salud de nuestros océanos?",
        shortQuestion: "¿Nuestros océanos se calientan?",
        description: "Índice de salud oceánica y áreas marinas protegidas.",
        highlight: '<p class="text-sm text-slate-600">Anomalía térmica de <span class="font-bold text-[#06B6D4]">+0.88°C</span> en aguas regionales, elevando el riesgo de blanqueamiento coralino.</p>',
        path: "/preguntas/salud-oceanos",
        color: "#06B6D4",
        category: "Mares"
    },
    {
        id: 'water-security',
        icon: Droplet,
        question: "¿Cuál es el riesgo de seguridad hídrica por país?",
        shortQuestion: "¿Qué tan segura es nuestra agua?",
        description: "Disponibilidad y extracción de agua dulce (Aqueduct).",
        highlight: '<p class="text-sm text-slate-600">Estrés hídrico <span class="font-bold text-[#3B82F6]">Medio-Alto (2.8/5)</span> en la región, con una cobertura de agua potable del 89%.</p>',
        path: "/preguntas/seguridad-hidrica",
        color: "#3B82F6",
        category: "Agua"
    },
    {
        id: 'protected-areas',
        icon: MapIcon,
        question: "¿Qué áreas protegidas están reportadas oficialmente?",
        shortQuestion: "¿Qué áreas están protegidas?",
        description: "Base de datos mundial sobre áreas protegidas (Protected Planet).",
        highlight: "Reporte oficial WDPA",
        path: "/preguntas/areas-protegidas",
        color: "#10B981",
        category: "Biodiversidad"
    },
    {
        id: 'analisis-multidimensional',
        icon: Database,
        question: "¿Cómo puedo realizar cruces de variables personalizados?",
        shortQuestion: "Análisis Multidimensional (BI)",
        description: "Explore y cruce variables de múltiples bases de datos oficiales en un entorno sandbox.",
        highlight: "Sandbox Experimental",
        path: "/analisis-multidimensional",
        color: "#1E293B",
        category: "Herramientas"
    }
];
