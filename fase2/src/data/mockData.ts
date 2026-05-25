export type Tendencia = 'alza' | 'baja' | 'estable'
export type Modalidad = 'presencial' | 'hibrido-flexible' | 'hibrido-estructurado' | 'remoto-supervisado'
export type Semaforo = 'verde' | 'ambar' | 'rojo'

export interface Employee {
  id: string
  nombre: string
  puesto: string
  agencia: string
  score: number
  semaforo: Semaforo
  tendencia: Tendencia
  diasSinVacaciones: number
  ausentismoMes: number
  horasExtra: number
  demandas: number
  recursos: number
  historial: number[]
  factoresRiesgo: string[]
}

export interface Leader {
  id: string
  nombre: string
  puesto: string
  scoreIndividual: number
  scoreCascada: number
  equipo: Employee[]
}

export interface Department {
  id: string
  nombre: string
  riesgo: number
  tamano: number
  lider: string
  tendencia: Tendencia
  intervenciones: Intervencion[]
}

export interface Intervencion {
  id: string
  nombre: string
  descripcion: string
  roi: string
  prioridad: number
  impacto: 'alto' | 'medio' | 'bajo'
}

export interface MobilityProfile extends Employee {
  zona: string
  tiempoTraslado: number
  distancia: number
  modalidadActual: Modalidad
  cfi: number
  modalidadRecomendada: Modalidad
  coloniaBarrio: string
}

// --- Empleados ---
export const employees: Employee[] = [
  {
    id: 'E001',
    nombre: 'Carlos Alvarado Méndez',
    puesto: 'Cajero Bancario',
    agencia: 'Agencia Central Zona 1',
    score: 78,
    semaforo: 'rojo',
    tendencia: 'alza',
    diasSinVacaciones: 210,
    ausentismoMes: 3,
    horasExtra: 22,
    demandas: 82,
    recursos: 28,
    historial: [55, 62, 78],
    factoresRiesgo: [
      'Más de 6 meses sin vacaciones',
      'Carga horaria superior al promedio del área',
      'Ausentismo recurrente (3 días/mes)',
      'Indicadores de agotamiento emocional elevado',
    ],
  },
  {
    id: 'E002',
    nombre: 'María García López',
    puesto: 'Ejecutiva de Cuenta',
    agencia: 'Agencia Zona 10',
    score: 71,
    semaforo: 'rojo',
    tendencia: 'alza',
    diasSinVacaciones: 185,
    ausentismoMes: 2,
    horasExtra: 18,
    demandas: 75,
    recursos: 32,
    historial: [48, 60, 71],
    factoresRiesgo: [
      'Demandas emocionales altas por atención al cliente',
      'Falta de autonomía en toma de decisiones',
      'Sin acceso a plan de carrera definido',
    ],
  },
  {
    id: 'E003',
    nombre: 'Roberto Juárez Cifuentes',
    puesto: 'Asesor de Inversiones',
    agencia: 'Banca Empresarial Central',
    score: 68,
    semaforo: 'rojo',
    tendencia: 'estable',
    diasSinVacaciones: 160,
    ausentismoMes: 1,
    horasExtra: 25,
    demandas: 71,
    recursos: 30,
    historial: [65, 66, 68],
    factoresRiesgo: [
      'Horas extra excesivas (>20h/mes)',
      'Presión por metas de captación',
      'Bajo soporte del supervisor inmediato',
    ],
  },
  {
    id: 'E004',
    nombre: 'Ana Pérez Hernández',
    puesto: 'Cajera Bancaria',
    agencia: 'Agencia Mixco',
    score: 74,
    semaforo: 'rojo',
    tendencia: 'alza',
    diasSinVacaciones: 240,
    ausentismoMes: 4,
    horasExtra: 12,
    demandas: 77,
    recursos: 25,
    historial: [50, 63, 74],
    factoresRiesgo: [
      'Más de 8 meses sin vacaciones (máximo crítico)',
      'Ausentismo por posible síndrome de burnout',
      'Traslado diario superior a 90 minutos',
      'Conflicto trabajo-familia reportado',
    ],
  },
  {
    id: 'E005',
    nombre: 'Luis Fernando Ovando',
    puesto: 'Ejecutivo de Cuenta Empresarial',
    agencia: 'Banca Empresarial Zona 14',
    score: 45,
    semaforo: 'ambar',
    tendencia: 'baja',
    diasSinVacaciones: 90,
    ausentismoMes: 1,
    horasExtra: 10,
    demandas: 55,
    recursos: 44,
    historial: [52, 48, 45],
    factoresRiesgo: [
      'Carga de trabajo moderadamente elevada',
      'Necesita refuerzo en herramientas digitales',
    ],
  },
  {
    id: 'E006',
    nombre: 'Sandra Morales Ixchel',
    puesto: 'Asesora de Crédito',
    agencia: 'Agencia Villa Nueva',
    score: 52,
    semaforo: 'ambar',
    tendencia: 'estable',
    diasSinVacaciones: 110,
    ausentismoMes: 0,
    horasExtra: 8,
    demandas: 58,
    recursos: 40,
    historial: [55, 53, 52],
    factoresRiesgo: [
      'Presión moderada por metas de colocación',
      'Necesita capacitación en resolución de conflictos',
    ],
  },
  {
    id: 'E007',
    nombre: 'Diego Estrada Porras',
    puesto: 'Supervisor de Caja',
    agencia: 'Agencia Central Zona 1',
    score: 38,
    semaforo: 'ambar',
    tendencia: 'baja',
    diasSinVacaciones: 75,
    ausentismoMes: 0,
    horasExtra: 14,
    demandas: 48,
    recursos: 42,
    historial: [44, 41, 38],
    factoresRiesgo: [
      'Horas extra en temporada de fin de mes',
      'Responsabilidad de equipo sin apoyo adicional',
    ],
  },
  {
    id: 'E008',
    nombre: 'Patricia Culajay Batz',
    puesto: 'Oficial de Cumplimiento',
    agencia: 'Oficinas Centrales',
    score: 41,
    semaforo: 'ambar',
    tendencia: 'estable',
    diasSinVacaciones: 95,
    ausentismoMes: 1,
    horasExtra: 6,
    demandas: 50,
    recursos: 38,
    historial: [40, 42, 41],
    factoresRiesgo: [
      'Carga regulatoria alta en período de auditoría',
      'Comunicación interdepartamental deficiente',
    ],
  },
  {
    id: 'E009',
    nombre: 'Héctor Tzul Ajú',
    puesto: 'Analista de Riesgo',
    agencia: 'Oficinas Centrales',
    score: 55,
    semaforo: 'ambar',
    tendencia: 'alza',
    diasSinVacaciones: 130,
    ausentismoMes: 0,
    horasExtra: 15,
    demandas: 62,
    recursos: 35,
    historial: [45, 50, 55],
    factoresRiesgo: [
      'Volumen de análisis aumentado sin ajuste de equipo',
      'Falta de claridad en priorización de proyectos',
    ],
  },
  {
    id: 'E010',
    nombre: 'Claudia Orozco Vásquez',
    puesto: 'Cajera Bancaria',
    agencia: 'Agencia Zona 10',
    score: 22,
    semaforo: 'verde',
    tendencia: 'baja',
    diasSinVacaciones: 30,
    ausentismoMes: 0,
    horasExtra: 3,
    demandas: 30,
    recursos: 65,
    historial: [28, 25, 22],
    factoresRiesgo: [],
  },
  {
    id: 'E011',
    nombre: 'Jorge Cojti Ajú',
    puesto: 'Ejecutivo de Cuenta',
    agencia: 'Agencia Quetzaltenango',
    score: 18,
    semaforo: 'verde',
    tendencia: 'baja',
    diasSinVacaciones: 15,
    ausentismoMes: 0,
    horasExtra: 2,
    demandas: 25,
    recursos: 72,
    historial: [24, 21, 18],
    factoresRiesgo: [],
  },
  {
    id: 'E012',
    nombre: 'Elena Chávez Ramírez',
    puesto: 'Analista de Operaciones',
    agencia: 'Oficinas Centrales',
    score: 25,
    semaforo: 'verde',
    tendencia: 'estable',
    diasSinVacaciones: 45,
    ausentismoMes: 0,
    horasExtra: 5,
    demandas: 33,
    recursos: 60,
    historial: [26, 25, 25],
    factoresRiesgo: [],
  },
  {
    id: 'E013',
    nombre: 'Fernando Sosa Leiva',
    puesto: 'Gestor de Tesorería',
    agencia: 'Oficinas Centrales',
    score: 15,
    semaforo: 'verde',
    tendencia: 'baja',
    diasSinVacaciones: 20,
    ausentismoMes: 0,
    horasExtra: 4,
    demandas: 22,
    recursos: 78,
    historial: [20, 18, 15],
    factoresRiesgo: [],
  },
  {
    id: 'E014',
    nombre: 'Rosa Ajú Cuxum',
    puesto: 'Especialista de RRHH',
    agencia: 'Oficinas Centrales',
    score: 20,
    semaforo: 'verde',
    tendencia: 'estable',
    diasSinVacaciones: 35,
    ausentismoMes: 0,
    horasExtra: 2,
    demandas: 28,
    recursos: 68,
    historial: [22, 21, 20],
    factoresRiesgo: [],
  },
  {
    id: 'E015',
    nombre: 'Manuel Mérida Godoy',
    puesto: 'Analista de TI',
    agencia: 'Oficinas Centrales',
    score: 12,
    semaforo: 'verde',
    tendencia: 'baja',
    diasSinVacaciones: 10,
    ausentismoMes: 0,
    horasExtra: 6,
    demandas: 20,
    recursos: 80,
    historial: [18, 15, 12],
    factoresRiesgo: [],
  },
]

// --- Líderes ---
export const leaders: Leader[] = [
  {
    id: 'L001',
    nombre: 'Ximena Batres Morales',
    puesto: 'Gerente de Banca Retail',
    scoreIndividual: 72,
    scoreCascada: 67,
    equipo: [employees[0], employees[1], employees[6], employees[9]],
  },
  {
    id: 'L002',
    nombre: 'Andrés Cifuentes Palacios',
    puesto: 'Jefe de Operaciones',
    scoreIndividual: 44,
    scoreCascada: 38,
    equipo: [employees[4], employees[7], employees[11], employees[14]],
  },
  {
    id: 'L003',
    nombre: 'Valeria Esquivel Coto',
    puesto: 'Directora de Riesgo y Cumplimiento',
    scoreIndividual: 58,
    scoreCascada: 52,
    equipo: [employees[3], employees[5], employees[8], employees[12]],
  },
]

// --- Departamentos ---
const intervencionesBancaRetail: Intervencion[] = [
  { id: 'I1', nombre: 'Ajuste de carga horaria', descripcion: 'Redistribuir carga de cajeros en horario pico con apoyo de gestores flotantes', roi: 'Q 280,000/año', prioridad: 1, impacto: 'alto' },
  { id: 'I2', nombre: 'Plan de reconocimiento', descripcion: 'Programa mensual de reconocimiento por desempeño y servicio al cliente', roi: 'Q 45,000/año', prioridad: 2, impacto: 'medio' },
  { id: 'I3', nombre: 'Cambio de modalidad', descripcion: 'Implementar horario flexible para ejecutivos de cuenta con roles remotizables', roi: 'Q 120,000/año', prioridad: 3, impacto: 'alto' },
  { id: 'I4', nombre: 'Plan de carrera estructurado', descripcion: 'Definir rutas de ascenso claras con criterios objetivos para el área', roi: 'Q 180,000/año', prioridad: 4, impacto: 'alto' },
  { id: 'I5', nombre: 'Conversación de retención', descripcion: 'Sesiones 1:1 de TyC con los 4 empleados en rojo para diagnóstico individual', roi: 'Evita Q 560,000 en reposición', prioridad: 5, impacto: 'alto' },
]

const intervencionesOperaciones: Intervencion[] = [
  { id: 'I1', nombre: 'Automatización de procesos', descripcion: 'Reducir carga manual con RPA en conciliación y reportería', roi: 'Q 320,000/año', prioridad: 1, impacto: 'alto' },
  { id: 'I2', nombre: 'Capacitación técnica', descripcion: 'Programa de upskilling en plataformas digitales del banco', roi: 'Q 60,000/año', prioridad: 2, impacto: 'medio' },
  { id: 'I3', nombre: 'Modalidad híbrida estructurada', descripcion: '3 días presencial + 2 días remoto para perfiles compatibles', roi: 'Q 95,000/año', prioridad: 3, impacto: 'medio' },
  { id: 'I4', nombre: 'Mejora de comunicación interna', descripcion: 'Implementar daily standup y canales de comunicación claros entre áreas', roi: 'Q 40,000/año', prioridad: 4, impacto: 'bajo' },
  { id: 'I5', nombre: 'Vacaciones programadas', descripcion: 'Garantizar descanso de empleados con más de 90 días sin vacaciones', roi: 'Evita Q 230,000 en rotación', prioridad: 5, impacto: 'alto' },
]

const intervencionesTesoria: Intervencion[] = [
  { id: 'I1', nombre: 'Revisión de metas', descripcion: 'Calibrar metas de captación con datos de mercado guatemalteco', roi: 'Q 150,000/año', prioridad: 1, impacto: 'alto' },
  { id: 'I2', nombre: 'Apoyo psicológico', descripcion: 'Acceso a 6 sesiones de apoyo psicológico anual financiadas por BAM', roi: 'Q 35,000/año', prioridad: 2, impacto: 'medio' },
  { id: 'I3', nombre: 'Mentoría de liderazgo', descripcion: 'Programa de mentoría para jefes intermedios sobre gestión de equipos', roi: 'Q 80,000/año', prioridad: 3, impacto: 'alto' },
  { id: 'I4', nombre: 'Rotación interna', descripcion: 'Permitir rotación voluntaria entre subáreas de tesorería cada 18 meses', roi: 'Q 45,000/año', prioridad: 4, impacto: 'bajo' },
  { id: 'I5', nombre: 'Dashboard de bienestar', descripcion: 'Habilitar acceso del empleado a su propio score para autoconsciencia', roi: 'Q 20,000/año', prioridad: 5, impacto: 'bajo' },
]

const intervencionesPrescriptivas = (n: number): Intervencion[] =>
  [
    intervencionesBancaRetail,
    intervencionesOperaciones,
    intervencionesTesoria,
  ][n % 3]

export const departments: Department[] = [
  { id: 'D001', nombre: 'Banca Retail', riesgo: 74, tamano: 312, lider: 'Ximena Batres Morales', tendencia: 'alza', intervenciones: intervencionesBancaRetail },
  { id: 'D002', nombre: 'Operaciones', riesgo: 58, tamano: 145, lider: 'Andrés Cifuentes Palacios', tendencia: 'estable', intervenciones: intervencionesOperaciones },
  { id: 'D003', nombre: 'Banca Personal', riesgo: 67, tamano: 228, lider: 'Rodrigo Palacios Soto', tendencia: 'alza', intervenciones: intervencionesPrescriptivas(0) },
  { id: 'D004', nombre: 'Tesorería', riesgo: 41, tamano: 38, lider: 'Gabriela Recinos Paz', tendencia: 'baja', intervenciones: intervencionesTesoria },
  { id: 'D005', nombre: 'Gestión de Riesgo', riesgo: 52, tamano: 62, lider: 'Valeria Esquivel Coto', tendencia: 'estable', intervenciones: intervencionesPrescriptivas(1) },
  { id: 'D006', nombre: 'Tecnología e Innovación', riesgo: 28, tamano: 88, lider: 'José Barrios Molina', tendencia: 'baja', intervenciones: intervencionesPrescriptivas(2) },
  { id: 'D007', nombre: 'Recursos Humanos', riesgo: 33, tamano: 42, lider: 'Andrea Cumes Ajú', tendencia: 'estable', intervenciones: intervencionesPrescriptivas(0) },
  { id: 'D008', nombre: 'Banca Empresarial', riesgo: 62, tamano: 185, lider: 'Marcos Gálvez Ixcot', tendencia: 'alza', intervenciones: intervencionesPrescriptivas(1) },
]

// --- FLOW: candidatos en rojo ---
export interface FlowCandidate extends Employee {
  probabilidadRenuncia: number
  diasEnRojo: number
  intervencionRecomendada: string
}

export const flowCandidates: FlowCandidate[] = [
  { ...employees[3], probabilidadRenuncia: 0.87, diasEnRojo: 45, intervencionRecomendada: 'Conversación de retención urgente + ajuste de modalidad' },
  { ...employees[0], probabilidadRenuncia: 0.79, diasEnRojo: 38, intervencionRecomendada: 'Plan de vacaciones inmediato + redistribución de carga' },
  { ...employees[1], probabilidadRenuncia: 0.72, diasEnRojo: 30, intervencionRecomendada: 'Sesión 1:1 con RRHH + plan de carrera formalizado' },
  { ...employees[2], probabilidadRenuncia: 0.68, diasEnRojo: 21, intervencionRecomendada: 'Ajuste de metas + mentoría de supervisor' },
]

// --- MOBILITY: perfiles de movilidad ---
export const mobilityProfiles: MobilityProfile[] = [
  {
    ...employees[3],
    zona: 'Mixco',
    coloniaBarrio: 'Colonia El Naranjo',
    tiempoTraslado: 95,
    distancia: 22,
    modalidadActual: 'presencial',
    cfi: 81,
    modalidadRecomendada: 'hibrido-flexible',
  },
  {
    ...employees[0],
    zona: 'Villa Nueva',
    coloniaBarrio: 'Colonia Bethania',
    tiempoTraslado: 75,
    distancia: 18,
    modalidadActual: 'presencial',
    cfi: 68,
    modalidadRecomendada: 'hibrido-estructurado',
  },
  {
    ...employees[1],
    zona: 'Zona 6',
    coloniaBarrio: 'Colonia Uni versidad',
    tiempoTraslado: 45,
    distancia: 9,
    modalidadActual: 'presencial',
    cfi: 42,
    modalidadRecomendada: 'presencial',
  },
  {
    ...employees[4],
    zona: 'Zona 14',
    coloniaBarrio: 'Oakland',
    tiempoTraslado: 20,
    distancia: 4,
    modalidadActual: 'presencial',
    cfi: 18,
    modalidadRecomendada: 'presencial',
  },
  {
    ...employees[2],
    zona: 'Amatitlán',
    coloniaBarrio: 'Colonia El Tesoro',
    tiempoTraslado: 110,
    distancia: 35,
    modalidadActual: 'presencial',
    cfi: 91,
    modalidadRecomendada: 'remoto-supervisado',
  },
]
