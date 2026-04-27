import {
    Globe, Layers, TrendingUp, Zap, Focus, Map, ShieldAlert, TreePine, ShieldCheck, AlertTriangle, Trees, Shield, Flame, Footprints, CloudRain, Anchor, Droplet, Map as MapIcon, Database, Waves
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
        color: "#059669",
        categories: ["bosques"]
    },
    {
        id: 'forest-loss',
        icon: Trees,
        question: "¿Dónde y cuánto bosque estamos perdiendo?",
        shortQuestion: "¿Dónde y cuánto bosque perdemos?",
        description: "Análisis anual de pérdida de cobertura arbórea y emisiones asociadas (GFW).",
        highlight: '<p class="text-sm text-slate-600">Más de <span class="font-bold text-[#97BD3D]">7 millones de hectáreas</span> de cobertura arbórea perdidas en el SICA desde 2010.</p>',
        path: "/preguntas/perdida-bosque",
        color: "#059669",
        categories: ["bosques"]
    },
    {
        id: 'conservation-30x30',
        icon: Shield,
        question: "¿Estamos cerca de la meta de conservación 30x30?",
        shortQuestion: "¿Cómo vamos con la meta 30x30?",
        description: "Estado actual de las áreas protegidas y OECMs reportadas.",
        highlight: '<p class="text-sm text-slate-600">La región protege el <span class="font-bold text-[#10B981]">20.4%</span> de su territorio. Falta un 9.6% para alcanzar el objetivo global al 2030.</p>',
        path: "/preguntas/meta-30x30",
        color: "#0891b2",
        categories: ["mares"]
    },
    {
        id: 'active-fires',
        icon: Flame,
        question: "¿Dónde hay incendios activos en este momento?",
        shortQuestion: "¿Dónde hay incendios activos ahora?",
        description: "Monitoreo en tiempo casi real de alertas de fuego (VIIRS/MODIS).",
        highlight: '<p class="text-sm text-slate-600">Detectados <span class="font-bold text-[#EF4444]">7,280 focos de calor</span> en las últimas 24h, con alta incidencia en el Petén y Olancho.</p>',
        path: "/preguntas/incendios-activos",
        color: "#059669",
        categories: ["bosques"]
    },
    {
        id: 'species-records',
        icon: Footprints,
        question: "¿Qué nos dicen los registros de especies en vivo?",
        shortQuestion: "¿Qué especies hay registradas?",
        description: "Dashboard de biodiversidad basado en observaciones de GBIF.",
        highlight: "Monitorero GBIF en vivo",
        path: "/preguntas/registros-especies",
        color: "#0891b2",
        categories: ["mares"]
    },
    {
        id: 'drought-risk',
        icon: CloudRain,
        question: "¿Cuál es el riesgo de sequía en el Corredor Seco?",
        shortQuestion: "¿Riesgo de sequía en Corredor Seco?",
        description: "Indicadores climáticos y proyecciones de estrés hídrico.",
        highlight: '<p class="text-sm text-slate-600">Riesgo <span class="font-bold text-[#8B5CF6]">Moderado a Severo</span> debido a un déficit pluviométrico detectado en los últimos 90 días.</p>',
        path: "/preguntas/riesgo-sequia",
        color: "#9333ea",
        categories: ["clima", "agua"]
    },

    // ─── Q1: RIESGO DE COLAPSO ────────────────────────────────────────────
    {
        id: 'Q1',
        icon: AlertTriangle,
        question: "¿Cuál es el riesgo de colapso de los ecosistemas en la región SICA?",
        shortQuestion: "Riesgo de Colapso",
        description: "Evaluación del estado de 199 ecosistemas naturales basada en 1.68 millones de hectáreas perdidas entre 2001-2020, aplicando umbrales UICN de reducción de área.",
        highlight: "1.68M ha perdidas (2001-2020)",
        path: "/preguntas/Q1",
        color: "#ef4444",
        categories: ['bosques']
    },

    // ─── Q2: BRECHA DE PROTECCIÓN ─────────────────────────────────────────
    {
        id: 'Q2',
        icon: ShieldCheck,
        question: "¿Qué porcentaje del territorio regional carece de protección legal?",
        shortQuestion: "Brecha de Protección",
        description: "La región SICA cuenta con 1,017 Áreas Protegidas que cubren 12.5M ha (24.8% del territorio). El 75.6% restante carece de figura de protección.",
        highlight: "75.6% Sin Protección",
        path: "/preguntas/Q2",
        color: "#3b82f6",
        categories: ['bosques']
    },

    // ─── Q3: PÉRDIDA DE BOSQUE RECIENTE ───────────────────────────────────
    {
        id: 'Q3',
        icon: TreePine,
        question: "¿Cuánta cobertura forestal se perdió en el último quinquenio monitoreado?",
        shortQuestion: "Pérdida Reciente",
        description: "Deforestación registrada en el periodo 2016-2020 en los 8 países SICA, equivalente a una tasa de 122,396 ha/año.",
        highlight: "611,979 ha (2016-2020)",
        path: "/preguntas/Q3",
        color: "#10b981",
        categories: ['bosques']
    },

    // ─── Q4: INTEGRIDAD DE ÁREAS PROTEGIDAS ───────────────────────────────
    {
        id: 'Q4',
        icon: ShieldAlert,
        question: "¿Cuánta deforestación ha ocurrido dentro de las Áreas Protegidas?",
        shortQuestion: "Integridad de APs",
        description: "De las 1,017 APs, 338 registran pérdida de bosque. El 44.1% de toda la deforestación regional ha ocurrido dentro de territorios con protección legal.",
        highlight: "739,456 ha en APs",
        path: "/preguntas/Q4",
        color: "#8b5cf6",
        categories: ['bosques']
    },

    // ─── Q5: TRANSFORMACIÓN DEL TERRITORIO ────────────────────────────────
    {
        id: 'Q5',
        icon: Map,
        question: "¿Qué proporción del territorio ha sido transformada por actividades humanas?",
        shortQuestion: "Territorio Transformado",
        description: "25.6 millones de ha han sido convertidas a sistemas agropecuarios (25.5M ha) y áreas urbanas (120k ha), representando la mitad del territorio regional.",
        highlight: "50.5% Transformado",
        path: "/preguntas/Q5",
        color: "#f97316",
        categories: ['bosques']
    },

    // ─── Q6: CONCENTRACIÓN DE PRESIÓN ─────────────────────────────────────
    {
        id: 'Q6',
        icon: Focus,
        question: "¿Qué países concentran la mayor pérdida de bosque regional?",
        shortQuestion: "Concentración de Presión",
        description: "Guatemala (32.5%), Nicaragua (32.3%) y Honduras (20.4%) acumulan el 85.2% de la deforestación regional entre 2001-2020.",
        highlight: "3 países = 85.2%",
        path: "/preguntas/Q6",
        color: "#06b6d4",
        categories: ['bosques']
    },

    // ─── Q7: ACELERACIÓN DE LA DEFORESTACIÓN ──────────────────────────────
    {
        id: 'Q7',
        icon: Zap,
        question: "¿En cuántos ecosistemas se ha acelerado la deforestación?",
        shortQuestion: "Aceleración",
        description: "En 51 unidades ecosistémicas, la pérdida de bosque del periodo 2016-2020 superó en más de un 50% a la del periodo 2011-2015.",
        highlight: "51 Ecosistemas",
        path: "/preguntas/Q7",
        color: "#f43f5e",
        categories: ['bosques']
    },

    // ─── Q8: TENDENCIA HISTÓRICA ──────────────────────────────────────────
    {
        id: 'Q8',
        icon: TrendingUp,
        question: "¿Cómo ha evolucionado la tasa de deforestación en las últimas dos décadas?",
        shortQuestion: "Tendencia Histórica",
        description: "La tasa anual de pérdida pasó de 55,055 ha/año (2001-2005) a 122,396 ha/año (2016-2020), un incremento del 122% en dos décadas.",
        highlight: "+122% de aceleración",
        path: "/preguntas/Q8",
        color: "#eab308",
        categories: ['bosques']
    },

    // ─── Q9: DIVERSIDAD ECOSISTÉMICA ──────────────────────────────────────
    {
        id: 'Q9',
        icon: Layers,
        question: "¿Cuántos ecosistemas naturales distintos alberga la región SICA?",
        shortQuestion: "Diversidad Ecosistémica",
        description: "La región contiene 199 ecosistemas naturales y 6 categorías antrópicas (agropecuario, urbano, acuacultura, embalses, etc.) distribuidos en 8 países.",
        highlight: "199 Ecosistemas Naturales",
        path: "/preguntas/Q9",
        color: "#22c55e",
        categories: ['bosques']
    },

    // ─── Q10: PRESIÓN SOBRE EL ÁREA NATURAL ───────────────────────────────
    {
        id: 'Q10',
        icon: Globe,
        question: "¿Qué porcentaje del área natural remanente se ha perdido en 20 años?",
        shortQuestion: "Presión sobre lo Natural",
        description: "Del área natural remanente (aprox. 26 millones de ha), el 6.5% ha sufrido pérdida de cobertura forestal registrada entre 2001-2020.",
        highlight: "6.5% del Área Natural",
        path: "/preguntas/Q10",
        color: "#14b8a6",
        categories: ['bosques']
    },

    // ─── Q11: ESTADO DE MANGLARES ─────────────────────────────────────────
    {
        id: 'Q11',
        icon: Waves,
        question: "¿Cuál es el estado de los manglares en la región SICA?",
        shortQuestion: "Estado de Manglares",
        description: "Análisis de 419k ha de manglares. Solo se ha perdido el 0.9% en dos décadas, demostrando alta resiliencia.",
        highlight: "419,174 ha totales",
        path: "/preguntas/Q11",
        color: "#06b6d4",
        categories: ['mares', 'bosques']
    },

    // ─── Q12: EMISIONES CO2 ───────────────────────────────────────────────
    {
        id: 'Q12',
        icon: CloudRain,
        question: "¿Cuánto carbono estamos emitiendo por la deforestación?",
        shortQuestion: "Emisiones CO2",
        description: "La pérdida de bosque ha liberado 922 millones de toneladas de CO2e. La tasa actual es de 67.4 Mt CO2e/año.",
        highlight: "922 Mt CO2e emitidas",
        path: "/preguntas/Q12",
        color: "#f43f5e",
        categories: ['clima', 'bosques']
    },

    // ─── Q13: HOTSPOTS MUNICIPALES ────────────────────────────────────────
    {
        id: 'Q13',
        icon: Focus,
        question: "¿Cuáles son los hotspots de deforestación a nivel municipal?",
        shortQuestion: "Hotspots Municipales",
        description: "Solo 17 municipios (1.7%) concentran la mitad de la deforestación regional. Identificación de prioridades locales.",
        highlight: "17 municipios = 50% pérdida",
        path: "/preguntas/Q13",
        color: "#f59e0b",
        categories: ['bosques']
    },

    // ─── Q14: ECOSISTEMA AMENAZADO ────────────────────────────────────────
    {
        id: 'Q14',
        icon: ShieldAlert,
        question: "¿Cuál es el ecosistema más amenazado de la región?",
        shortQuestion: "Ecosistema Amenazado",
        description: "El Bosque tropical siempreverde estacional latifolia (26-2) ha perdido el 29.3% de su área original.",
        highlight: "29.3% de pérdida",
        path: "/preguntas/Q14",
        color: "#e11d48",
        categories: ['bosques']
    },
    {
        id: 'ocean-health',
        icon: Anchor,
        question: "¿Cuál es el estado de salud de nuestros océanos?",
        shortQuestion: "¿Nuestros océanos se calientan?",
        description: "Índice de salud oceánica y áreas marinas protegidas.",
        highlight: '<p class="text-sm text-slate-600">Anomalía térmica de <span class="font-bold text-[#06B6D4]">+0.88°C</span> en aguas regionales, elevando el riesgo de blanqueamiento coralino.</p>',
        path: "/preguntas/salud-oceanos",
        color: "#0891b2",
        categories: ["mares"]
    },
    {
        id: 'water-security',
        icon: Droplet,
        question: "¿Cuál es el riesgo de seguridad hídrica por país?",
        shortQuestion: "¿Qué tan segura es nuestra agua?",
        description: "Disponibilidad y extracción de agua dulce (Aqueduct).",
        highlight: '<p class="text-sm text-slate-600">Estrés hídrico <span class="font-bold text-[#3B82F6]">Medio-Alto (2.8/5)</span> en la región, con una cobertura de agua potable del 89%.</p>',
        path: "/preguntas/seguridad-hidrica",
        color: "#3b82f6",
        categories: ["agua"]
    },
    {
        id: 'protected-areas',
        icon: MapIcon,
        question: "¿Qué áreas protegidas están reportadas oficialmente?",
        shortQuestion: "¿Qué áreas están protegidas?",
        description: "Base de datos mundial sobre áreas protegidas (Protected Planet).",
        highlight: "Reporte oficial WDPA",
        path: "/preguntas/areas-protegidas",
        color: "#0891b2",
        categories: ["mares"]
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
        categories: []
    }
];
