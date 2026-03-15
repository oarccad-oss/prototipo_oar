
export const indicatorsData = [
  {
    category: "Objetivos Globales",
    id: "Goal A (1)",
    type: "impacto",
    title: "A.1 Lista Roja de Ecosistemas",
    synergies: ["CDB", "CNULD"],
    metrics: [
      {
        variable: "Ecosistemas evaluados; categoría de riesgo de colapso",
        unit: "Número, %, Categoría",
        method: "Aplicación de los criterios A-E de la UICN RLE (modelado de reducción espacial y degradación).",
        sources: {
          national: "Informes nacionales UICN RLE; mapas históricos de cobertura; series climáticas.",
          regional: "Informes nacionales UICN RLE; mapas históricos de cobertura; series climáticas."
        }
      }
    ]
  },
  {
    category: "Objetivos Globales",
    id: "Goal A (2)",
    type: "impacto",
    title: "A.2 Extensión de ecosistemas naturales",
    synergies: ["CDB", "CMNUCC", "CNULD"],
    metrics: [
      {
        variable: "Área de ecosistemas naturales; pérdida/ganancia neta; fragmentación",
        unit: "Hectáreas (ha), km², % de cambio",
        method: "Análisis de transición de uso de suelo (matrices LULC) mediante Sistemas de Información Geográfica.",
        sources: {
          national: "Sistemas Nacionales de Monitoreo de Bosques (MRV); MapBiomas, Dynamic World.",
          regional: "Sistemas Nacionales de Monitoreo de Bosques (MRV); MapBiomas, Dynamic World."
        }
      }
    ]
  },
  {
    category: "Objetivos Globales",
    id: "Goal A (3)",
    type: "impacto",
    title: "A.3 Índice de la Lista Roja",
    synergies: ["CDB"],
    metrics: [
      {
        variable: "Especies por categoría UICN; cambios genuinos en riesgo de extinción",
        unit: "Índice (0 a 1)",
        method: "Fórmula RLI (sumatoria de cambios de peso por categoría de amenaza).",
        sources: {
          national: "Base de datos API de la Lista Roja UICN; Listas Rojas Nacionales.",
          regional: "Base de datos API de la Lista Roja UICN; Listas Rojas Nacionales."
        }
      }
    ]
  },
  {
    category: "Objetivos Globales",
    id: "Goal A (4)",
    type: "impacto",
    title: "A.4 Proporción de poblaciones con tamaño efectivo > 500",
    synergies: ["CDB"],
    metrics: [
      {
        variable: "Tamaño efectivo poblacional (Ne); % con Ne > 500",
        unit: "Número, %",
        method: "Modelado genético espacial o estimación demográfica.",
        sources: {
          national: "Monitoreos genéticos; bases de datos genómicas (NCBI).",
          regional: "Monitoreos genéticos; bases de datos genómicas (NCBI)."
        }
      }
    ]
  },
  {
    category: "Objetivos Globales",
    id: "Goal B",
    type: "impacto",
    title: "B.1 Servicios proporcionados por los ecosistemas",
    synergies: ["CDB", "CMNUCC", "CNULD"],
    metrics: [
      {
        variable: "Oferta y uso de servicios ecosistémicos; magnitud biofísica; valor económico",
        unit: "Unidades biofísicas, Valor monetario",
        method: "Modelado espacial de oferta/demanda y valoración de mercado o transferencia de beneficios.",
        sources: {
          national: "Cuentas Nacionales SEEA-EA; modelos InVEST/ARIES.",
          regional: "Cuentas Nacionales SEEA-EA; modelos InVEST/ARIES."
        }
      }
    ]
  },
  {
    category: "Objetivos Globales",
    id: "Goal B (b)",
    type: "gestion",
    title: "B.b Políticas/acciones de uso sostenible",
    synergies: ["CDB"],
    metrics: [
      {
        variable: "Existencia de políticas; cobertura sectorial; presupuesto",
        unit: "Binario (Sí/No), Número",
        method: "Revisión documental y mapeo de políticas vigentes en planificación sectorial.",
        sources: {
          national: "Boletines oficiales; repositorios de Ministerios de Ambiente.",
          regional: "Boletines oficiales; repositorios de Ministerios de Ambiente."
        }
      }
    ]
  },
  {
    category: "Objetivos Globales",
    id: "Goal C",
    type: "gestion",
    title: "C.1 / C.2 Beneficios monetarios y no monetarios",
    synergies: ["CDB"],
    metrics: [
      {
        variable: "Permisos para recursos genéticos; transferencias de material",
        unit: "Número, Valor (USD)",
        method: "Contabilidad de ingresos (tasas, regalías) y recuento de permisos IRCC emitidos.",
        sources: {
          national: "ABS Clearing-House (ABSCH); Oficinas de Patentes.",
          regional: "ABS Clearing-House (ABSCH); Oficinas de Patentes."
        }
      }
    ]
  },
  {
    category: "Objetivos Globales",
    id: "Goal D",
    type: "gestion",
    title: "D.1 / D.2 / D.3 Financiación pública y privada",
    synergies: ["CDB", "CMNUCC", "CNULD"],
    metrics: [
      {
        variable: "Flujos financieros hacia la biodiversidad; AOD; inversión privada",
        unit: "Valor monetario (USD/Local)",
        method: "Marcadores de Río de la OCDE y etiquetado presupuestario (BIOFIN).",
        sources: {
          national: "Sistema CRS de la OCDE; presupuestos de Hacienda.",
          regional: "Sistema CRS de la OCDE; presupuestos de Hacienda."
        }
      }
    ]
  },
  {
    category: "Metas de Reducción de Amenazas",
    id: "Meta 1",
    type: "gestion",
    title: "1.1 % Áreas bajo planificación espacial",
    synergies: ["CDB", "CMNUCC", "CNULD"],
    metrics: [
      {
        variable: "Zonas intactas retenidas; áreas clave para la biodiversidad (KBA)",
        unit: "% del territorio, ha",
        method: "Análisis SIG de superposición entre planes de ordenamiento territorial vigentes y KBAs.",
        sources: {
          national: "Catastros y SIG municipales/nacionales; base World Database of KBAs.",
          regional: "Catastros y SIG municipales/nacionales; base World Database of KBAs."
        }
      }
    ]
  },
  {
    category: "Metas de Reducción de Amenazas",
    id: "Meta 2",
    type: "impacto",
    title: "2.2 Zona en restauración",
    synergies: ["CDB", "CMNUCC", "CNULD"],
    metrics: [
      {
        variable: "Extensión bajo restauración activa o pasiva",
        unit: "Hectáreas (ha), km²",
        method: "Análisis de series temporales satelitales (tendencias NDVI/EVI) y áreas de proyectos.",
        sources: {
          national: "Plataforma Restor; Registros REDD+ y reforestación.",
          regional: "Plataforma Restor; Registros REDD+ y reforestación."
        }
      }
    ]
  },
  {
    category: "Metas de Reducción de Amenazas",
    id: "Meta 3",
    type: "impacto",
    title: "3.1 Cobertura de áreas protegidas y OECM",
    synergies: ["CDB", "CMNUCC", "CNULD"],
    metrics: [
      {
        variable: "Polígonos de AP; conectividad (ProtConn); efectividad (PAME)",
        unit: "%, ha, Índice",
        method: "Sumatoria espacial disuelta de polígonos de AP/OECM sobre la superficie total.",
        sources: {
          national: "WDPA; Sistemas Nacionales de AP (SINAP); reportes METT.",
          regional: "WDPA; Sistemas Nacionales de AP (SINAP); reportes METT."
        }
      }
    ]
  },
  {
    category: "Metas de Reducción de Amenazas",
    id: "Meta 5",
    type: "impacto",
    title: "5.1 Proporción de poblaciones de peces sostenibles",
    synergies: ["CDB"],
    metrics: [
      {
        variable: "Biomasa de poblaciones reproductoras; niveles de pesca",
        unit: "% de poblaciones, Toneladas",
        method: "Evaluaciones de stock pesquero en base al Rendimiento Máximo Sostenible (RMS).",
        sources: {
          national: "Autoridades Pesqueras; FAO FishStatJ.",
          regional: "Autoridades Pesqueras; FAO FishStatJ."
        }
      }
    ]
  },
  {
    category: "Metas de Reducción de Amenazas",
    id: "Meta 6",
    type: "impacto",
    title: "6.1 Tasa de establecimiento de especies invasoras",
    synergies: ["CDB"],
    metrics: [
      {
        variable: "Tasa de propagación; número de intercepciones fronterizas",
        unit: "Número, Tasa",
        method: "Conteo anual de nuevos registros confirmados de especies no nativas invasoras.",
        sources: {
          national: "Redes de alerta temprana; Global Register of Introduced and Invasive Species.",
          regional: "Redes de alerta temprana; Global Register of Introduced and Invasive Species."
        }
      }
    ]
  },
  {
    category: "Metas de Reducción de Amenazas",
    id: "Meta 7",
    type: "impacto",
    title: "7.1 / 7.2 Eutrofización y plaguicidas",
    synergies: ["CDB", "CNULD"],
    metrics: [
      {
        variable: "Uso de fertilizantes/plaguicidas por hectárea; calidad de agua",
        unit: "kg/ha, mg/L",
        method: "División de importaciones de agroquímicos entre el área cultivable; mediciones hidrológicas.",
        sources: {
          national: "Estadísticas aduaneras; Ministerios de Agricultura.",
          regional: "Estadísticas aduaneras; Ministerios de Agricultura."
        }
      }
    ]
  },
  {
    category: "Metas de Reducción de Amenazas",
    id: "Meta 8",
    type: "impacto",
    title: "8.1 Mitigación del cambio climático (LULUCF)",
    synergies: ["CDB", "CMNUCC", "CNULD"],
    metrics: [
      {
        variable: "Inventarios de GEI de AFOLU/LULUCF; biomasa aérea",
        unit: "Binario, tCO2e",
        method: "Ecuaciones de inventarios de GEI aplicadas a matrices de cambios de uso de suelo (LULC).",
        sources: {
          national: "Comunicaciones CMNUCC; mapas de biomasa ESA CCI.",
          regional: "Comunicaciones CMNUCC; mapas de biomasa ESA CCI."
        }
      }
    ]
  },
  {
    category: "Metas de Uso Sostenible y Beneficios",
    id: "Meta 9",
    type: "impacto",
    title: "9.1 / 9.2 Uso sostenible de especies silvestres",
    synergies: ["CDB"],
    metrics: [
      {
        variable: "Volumen de productos no maderables; ocupaciones tradicionales",
        unit: "Toneladas, % de población",
        method: "Censos demográficos y cuantificación de volúmenes extraídos.",
        sources: {
          national: "Institutos de Estadística; encuestas rurales.",
          regional: "Institutos de Estadística; encuestas rurales."
        }
      }
    ]
  },
  {
    category: "Metas de Uso Sostenible y Beneficios",
    id: "Meta 10",
    type: "impacto",
    title: "10.1 / 10.2 Agricultura y silvicultura sostenibles",
    synergies: ["CDB", "CMNUCC", "CNULD"],
    metrics: [
      {
        variable: "Superficie bajo certificación forestal o agrícola sostenible",
        unit: "% de superficie, ha",
        method: "Sumatoria de áreas reportadas bajo esquemas de certificación sostenible vigentes.",
        sources: {
          national: "Certificadoras (FSC, PEFC, orgánicas); Min. Agricultura.",
          regional: "Certificadoras (FSC, PEFC, orgánicas); Min. Agricultura."
        }
      }
    ]
  },
  {
    category: "Metas de Uso Sostenible y Beneficios",
    id: "Meta 12",
    type: "impacto",
    title: "12.1 Espacios verdes/azules urbanos",
    synergies: ["CDB", "CMNUCC"],
    metrics: [
      {
        variable: "Proporción de superficie urbana verde/azul de acceso público",
        unit: "% de área, m²/hab",
        method: "Extracción de áreas verdes (índice NDVI en casco urbano) divididas por población.",
        sources: {
          national: "Imágenes satelitales; OpenStreetMap; catastros.",
          regional: "Imágenes satelitales; OpenStreetMap; catastros."
        }
      }
    ]
  },
  {
    category: "Herramientas y Soluciones",
    id: "Meta 14",
    type: "gestion",
    title: "14.1 Integración sectorial",
    synergies: ["CDB", "CMNUCC", "CNULD"],
    metrics: [
      {
        variable: "Metas de biodiversidad en políticas sectoriales, EIA y cuentas",
        unit: "Binario (Sí/No), Número",
        method: "Auditoría de documentos normativos y Evaluaciones de Impacto Ambiental.",
        sources: {
          national: "Gacetas oficiales; bases de resoluciones ambientales (EIA).",
          regional: "Gacetas oficiales; bases de resoluciones ambientales (EIA)."
        }
      }
    ]
  },
  {
    category: "Herramientas y Soluciones",
    id: "Meta 15",
    type: "gestion",
    title: "15.1 Empresas que divulgan riesgos/impactos",
    synergies: ["CDB", "CMNUCC"],
    metrics: [
      {
        variable: "Número de informes de sostenibilidad corporativa",
        unit: "Número",
        method: "Auditoría de reportes corporativos estandarizados alineados a marcos financieros.",
        sources: {
          national: "Registros de Bolsas de Valores; bases TNFD/GRI.",
          regional: "Registros de Bolsas de Valores; bases TNFD/GRI."
        }
      }
    ]
  },
  {
    category: "Herramientas y Soluciones",
    id: "Meta 16",
    type: "impacto",
    title: "16.1 Consumo sostenible",
    synergies: ["CDB", "CMNUCC"],
    metrics: [
      {
        variable: "Índice de desperdicio de alimentos; huella material; tasas de reciclaje",
        unit: "Binario, kg/cápita, %",
        method: "Análisis de flujos de materiales a nivel nacional y cálculos de generación de residuos.",
        sources: {
          national: "Cuentas de flujo de materiales; informes de plantas de tratamiento.",
          regional: "Cuentas de flujo de materiales; informes de plantas de tratamiento."
        }
      }
    ]
  },
  {
    category: "Herramientas y Soluciones",
    id: "Meta 17",
    type: "gestion",
    title: "17.1 Bioseguridad",
    synergies: ["CDB"],
    metrics: [
      {
        variable: "Medidas legislativas y capacidad institucional (bioseguridad)",
        unit: "Binario (Sí/No), Número",
        method: "Evaluación institucional sobre marcos vigentes y auditoría de presupuestos a laboratorios.",
        sources: {
          national: "Biosafety Clearing-House; Min. Ciencia y Agricultura.",
          regional: "Biosafety Clearing-House; Min. Ciencia y Agricultura."
        }
      }
    ]
  },
  {
    category: "Herramientas y Soluciones",
    id: "Meta 18",
    type: "gestion",
    title: "18.1 / 18.2 Subsidios e incentivos",
    synergies: ["CDB", "CMNUCC"],
    metrics: [
      {
        variable: "Incentivos positivos; valor de subsidios perjudiciales reformados",
        unit: "Valor monetario",
        method: "Análisis del Gasto Puesto para identificar y contabilizar subsidios agrícolas/pesqueros perjudiciales.",
        sources: {
          national: "Ministerios de Hacienda; bases de subsidios OCDE y FAO.",
          regional: "Ministerios de Hacienda; bases de subsidios OCDE y FAO."
        }
      }
    ]
  },
  {
    category: "Herramientas y Soluciones",
    id: "Meta 19",
    type: "gestion",
    title: "19.1 Recursos financieros",
    synergies: ["CDB", "CMNUCC", "CNULD"],
    metrics: [
      {
        variable: "Financiamiento internacional, doméstico y privado",
        unit: "Valor monetario",
        method: "Consolidación contable mediante etiquetado presupuestario y sumatoria de AOD.",
        sources: {
          national: "Plataformas GEF; reportes BIOFIN; base OCDE CRS.",
          regional: "Plataformas GEF; reportes BIOFIN; base OCDE CRS."
        }
      }
    ]
  },
  {
    category: "Herramientas y Soluciones",
    id: "Meta 20",
    type: "gestion",
    title: "20.b Creación de capacidad y tecnología",
    synergies: ["CDB", "CMNUCC", "CNULD"],
    metrics: [
      {
        variable: "Acciones de fortalecimiento, transferencia e innovación",
        unit: "Número, Valor (USD)",
        method: "Contabilidad de proyectos de cooperación oficial y fondos para transferencia tecnológica.",
        sources: {
          national: "Agencias de Cooperación (AOD); repositorios de proyectos.",
          regional: "Agencias de Cooperación (AOD); repositorios de proyectos."
        }
      }
    ]
  },
  {
    category: "Herramientas y Soluciones",
    id: "Meta 21",
    type: "gestion",
    title: "21.1 Información relativa a la biodiversidad",
    synergies: ["CDB", "CMNUCC", "CNULD"],
    metrics: [
      {
        variable: "Cobertura de datos; % de headline indicators disponibles",
        unit: "Número, %",
        method: "Análisis de completitud (Gap analysis) en el sistema nacional de información.",
        sources: {
          national: "Sistemas de Información de Biodiversidad; nodos GBIF.",
          regional: "Sistemas de Información de Biodiversidad; nodos GBIF."
        }
      }
    ]
  },
  {
    category: "Herramientas y Soluciones",
    id: "Meta 22",
    type: "gestion",
    title: "22.1 / 22.b Pueblos indígenas y equidad",
    synergies: ["CDB", "CMNUCC", "CNULD"],
    metrics: [
      {
        variable: "Cambio LULC en territorios tradicionales; tenencia legal",
        unit: "Binario, ha, %",
        method: "Análisis SIG superponiendo mapas de títulos de propiedad comunitaria con capas de cambio de cobertura.",
        sources: {
          national: "Catastros; Sistemas Nacionales de Propiedad.",
          regional: "Catastros; Sistemas Nacionales de Propiedad."
        }
      }
    ]
  },
  {
    category: "Herramientas y Soluciones",
    id: "Meta 23",
    type: "gestion",
    title: "23.b Igualdad de género",
    synergies: ["CDB", "CMNUCC", "CNULD"],
    metrics: [
      {
        variable: "Marco legal implementado; acceso a tierra por sexo",
        unit: "Binario, % tenencia",
        method: "Extracción de datos estadísticos de propiedad de tierras segmentados por género.",
        sources: {
          national: "Censos Agrícolas; Registros de Propiedad; Min. Mujer.",
          regional: "Censos Agrícolas; Registros de Propiedad; Min. Mujer."
        }
      }
    ]
  }
];
