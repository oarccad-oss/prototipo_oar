
export const eramForestData = [
  // RESULTADO 1: GOBERNANZA DE PAISAJE
  {
    id: "IND-4.1.1",
    type: "gestion",
    resultado: "4.1: Mejorada la Gobernanza de Paisaje",
    line: "Plataformas de Diálogo",
    accionEstrategica: "Fortalecimiento de plataformas de participación y diálogo intersectorial (Gubernamental, Intersectorial, Pueblos Indígenas).",
    indicator: "Número de plataformas de participación y gobernanza regional fortalecidas.",
    targetText: "3 plataformas regionales activas y funcionales al 2025.",
    unit: "Plataformas",
    targetValue: 3,
    verificationMeans: [
      { name: "Actas de sesiones de las plataformas", type: "pdf", uploaded: 2, required: 3 },
      { name: "Reglamento de funcionamiento interno", type: "doc", uploaded: 3, required: 3 }
    ],
    countries: [
      { name: "SICA Regional", value: 2 }
    ]
  },
  {
    id: "IND-4.1.2",
    type: "gestion",
    resultado: "4.1: Mejorada la Gobernanza de Paisaje",
    line: "Concordancia Normativa",
    accionEstrategica: "Promover la concordancia de normas y regulaciones forestales a nivel regional para el manejo sostenible.",
    indicator: "Grado de concordancia entre las normas de regulación forestal y restaurativa.",
    targetText: "80% de avance en la alineación normativa regional.",
    unit: "% de Concordancia",
    targetValue: 80,
    verificationMeans: [
      { name: "Matriz de armonización legal por país", type: "data", uploaded: 32, required: 80 },
      { name: "Informes de consultoría técnica jurídica", type: "pdf", uploaded: 5, required: 8 }
    ],
    countries: [
      { name: "Belice", value: 30 }, { name: "Costa Rica", value: 60 }, { name: "El Salvador", value: 40 },
      { name: "Guatemala", value: 55 }, { name: "Honduras", value: 45 }, { name: "Nicaragua", value: 20 },
      { name: "Panamá", value: 50 }, { name: "Rep. Dominicana", value: 35 }
    ]
  },

  // RESULTADO 2: RESTAURACIÓN DE BOSQUES Y PAISAJES
  {
    id: "IND-4.2.1",
    type: "impacto",
    resultado: "4.2: Incrementada la Restauración de Bosques y Paisajes",
    line: "Cobertura Forestal",
    accionEstrategica: "Iniciativas de gestión conjunta entre agricultura y bosques para reducir la deforestación.",
    indicator: "Superficie forestal en proporción a la superficie total regional.",
    targetText: "Variación positiva del 5% respecto al valor base 2020.",
    unit: "% de Cobertura",
    targetValue: 40.5, // Supongamos base 38.5% + 5% de mejora
    verificationMeans: [
      { name: "Mapas oficiales de cobertura forestal", type: "map", uploaded: 8, required: 8 },
      { name: "Base de datos del Sistema de Monitoreo regional", type: "data", uploaded: 1, required: 1 }
    ],
    countries: [
      { name: "Belice", value: 58.2 }, { name: "Costa Rica", value: 52.4 }, { name: "El Salvador", value: 13.5 },
      { name: "Guatemala", value: 33.1 }, { name: "Honduras", value: 38.5 }, { name: "Nicaragua", value: 25.4 },
      { name: "Panamá", value: 62.1 }, { name: "Rep. Dominicana", value: 40.2 }
    ]
  },
  {
    id: "IND-4.2.2",
    type: "impacto",
    resultado: "4.2: Incrementada la Restauración de Bosques y Paisajes",
    line: "Restauración Activa",
    accionEstrategica: "Fortalecimiento de programas nacionales de restauración alineados a ONU, Bonn y 20x20.",
    indicator: "Superficie de plantaciones forestales y procesos de restauración activa.",
    targetText: "500,000 hectáreas en procesos de restauración activa consolidada.",
    unit: "Hectáreas (Has)",
    targetValue: 500000,
    verificationMeans: [
      { name: "Registros de incentivos a la restauración", type: "pdf", uploaded: 4500, required: "N/A" },
      { name: "Reporte Regional de Restauración (Iniciativa 20x20)", type: "link", uploaded: 1, required: 1 }
    ],
    countries: [
      { name: "Belice", value: 25000 }, { name: "Costa Rica", value: 85000 }, { name: "El Salvador", value: 40000 },
      { name: "Guatemala", value: 120000 }, { name: "Honduras", value: 95000 }, { name: "Nicaragua", value: 45000 },
      { name: "Panamá", value: 65000 }, { name: "Rep. Dominicana", value: 55000 }
    ]
  },

  // RESULTADO 3: INCREMENTO DEL VALOR DEL BOSQUE
  {
    id: "IND-4.3.1",
    type: "impacto",
    resultado: "4.3: Incremento del Valor del Bosque",
    line: "Capacidades Técnicas",
    accionEstrategica: "Fortalecimiento de capacidades organizativas y empresariales para agregación de valor forestal.",
    indicator: "Número de personas con capacidades creadas y certificadas en el sector forestal.",
    targetText: "300 personas clave capacitadas y certificadas regionalmente.",
    unit: "Personas",
    targetValue: 300,
    verificationMeans: [
      { name: "Listas de asistencia y diplomas emitidos", type: "pdf", uploaded: 215, required: 300 },
      { name: "Curricula de los programas regionales de formación", type: "doc", uploaded: 4, required: 5 }
    ],
    countries: [
      { name: "SICA Regional", value: 215 }
    ]
  },
  {
    id: "IND-4.3.3",
    type: "gestion",
    resultado: "4.3: Incremento del Valor del Bosque",
    line: "Compra Preferencial",
    accionEstrategica: "Establecer políticas regionales de compra preferencial de productos forestales certificados.",
    indicator: "Grado de desarrollo de la política pública regional de compra preferencial.",
    targetText: "100% de la política regional diseñada y validada por el consejo de ministros.",
    unit: "% de Desarrollo",
    targetValue: 100,
    verificationMeans: [
      { name: "Borrador de la Política de Compra Verde", type: "doc", uploaded: 1, required: 1 },
      { name: "Acta de validación del comité técnico regional", type: "pdf", uploaded: 0, required: 1 }
    ],
    countries: [
      { name: "SICA Regional", value: 40 }
    ]
  },

  // RESULTADO 4: INSTRUMENTOS PARA EL USO SOSTENIBLE
  {
    id: "IND-4.4.1",
    type: "impacto",
    resultado: "4.4: Instrumentos para el Uso Sostenible",
    line: "PYMES Sostenibles",
    accionEstrategica: "Fomento de producción y comercialización sostenible para PYMES de base forestal.",
    indicator: "Número de empresas o asociaciones con sellos de sostenibilidad o certificaciones.",
    targetText: "Incremento del 15% en PYMES forestales certificadas respecto a 2020.",
    unit: "Empresas",
    targetValue: 65, // Supongamos base 50 + 15
    verificationMeans: [
      { name: "Certificados FSC/PEFC vigentes", type: "data", uploaded: 45, required: 65 },
      { name: "Convenios de asistencia técnica para certificación", type: "pdf", uploaded: 12, required: 20 }
    ],
    countries: [
      { name: "Belice", value: 2 }, { name: "Costa Rica", value: 12 }, { name: "El Salvador", value: 1 },
      { name: "Guatemala", value: 15 }, { name: "Honduras", value: 8 }, { name: "Nicaragua", value: 4 },
      { name: "Panamá", value: 3 }, { name: "Rep. Dominicana", value: 0 }
    ]
  },
  {
    id: "IND-4.4.3",
    type: "gestion",
    resultado: "4.4: Instrumentos para el Uso Sostenible",
    line: "Inversión Forestal",
    accionEstrategica: "Movilización de recursos estatales y asistencia internacional para el desarrollo forestal.",
    indicator: "Grado de avance en la cartera de inversión regional para el sector forestal.",
    targetText: "100% de consolidación de la cartera de inversión regional REDD+ y ERAM.",
    unit: "% de Avance",
    targetValue: 100,
    verificationMeans: [
      { name: "Documento consolidado de la Cartera de Proyectos", type: "pdf", uploaded: 1, required: 1 },
      { name: "Informes de gestión de fondos internacionales", type: "data", uploaded: 3, required: 5 }
    ],
    countries: [
      { name: "SICA Regional", value: 60 }
    ]
  }
];
