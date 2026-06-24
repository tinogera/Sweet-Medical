/**
 * @typedef {Object} TurnoProximo
 * @property {string} id
 * @property {string} profesional
 * @property {string} especialidad
 * @property {string} fecha
 * @property {string} dia
 * @property {string} mes
 * @property {string} hora
 * @property {string} sede
 * @property {'presencial'|'teleconsulta'} modalidad
 * @property {string} [modalidadDetalle]
 */

/**
 * @typedef {Object} TurnoPasado
 * @property {string} id
 * @property {string} profesional
 * @property {string} especialidad
 * @property {string} fechaCorta
 * @property {string} hora
 * @property {string} sede
 * @property {'asistio'|'cancelado'} estado
 */

/** @type {TurnoProximo[]} */
export const upcomingTurnos = [
  {
    id: "upcoming-1",
    profesional: "Dr. Martín Rossi",
    especialidad: "Cardiología",
    fecha: "2025-11-15",
    dia: "15",
    mes: "NOV",
    hora: "10:30 hs",
    sede: "Centro Médico Barrio Norte - Consultorio 12",
    modalidad: "presencial",
  },
  {
    id: "upcoming-2",
    profesional: "Dra. Laura Gómez",
    especialidad: "Dermatología",
    fecha: "2025-11-22",
    dia: "22",
    mes: "NOV",
    hora: "15:00 hs",
    sede: "Centro Médico Palermo - Piso 3",
    modalidad: "teleconsulta",
    modalidadDetalle: "Link disponible 15 min antes",
  },
  {
    id: "upcoming-3",
    profesional: "Dr. Javier Ríos",
    especialidad: "Neurología",
    fecha: "2025-11-29",
    dia: "29",
    mes: "NOV",
    hora: "09:00 hs",
    sede: "Sanatorio Agote - Consultorio 8",
    modalidad: "presencial",
  },
];

/** @type {TurnoPasado[]} */
export const pastTurnos = [
  {
    id: "past-1",
    profesional: "Dr. Carlos Méndez",
    especialidad: "Clínica Médica",
    fechaCorta: "02 Oct",
    hora: "09:15 hs",
    sede: "Centro Médico Microcentro",
    estado: "asistio",
  },
  {
    id: "past-2",
    profesional: "Dra. Silvia Paz",
    especialidad: "Oftalmología",
    fechaCorta: "15 Sep",
    hora: "11:00 hs",
    sede: "Teleconsulta",
    estado: "asistio",
  },
  {
    id: "past-3",
    profesional: "Dr. Luis Almirón",
    especialidad: "Traumatología",
    fechaCorta: "28 Ago",
    hora: "16:30 hs",
    sede: "Sanatorio Agote",
    estado: "cancelado",
  },
    {
    id: "past-4",
    profesional: "Dr. Carlos Méndez",
    especialidad: "Clínica Médica",
    fechaCorta: "02 Oct",
    hora: "09:15 hs",
    sede: "Centro Médico Microcentro",
    estado: "asistio",
  },
  {
    id: "past-5",
    profesional: "Dra. Silvia Paz",
    especialidad: "Oftalmología",
    fechaCorta: "15 Sep",
    hora: "11:00 hs",
    sede: "Teleconsulta",
    estado: "reprogramado",
  },
  {
    id: "past-6",
    profesional: "Dr. Luis Almirón",
    especialidad: "Traumatología",
    fechaCorta: "28 Ago",
    hora: "16:30 hs",
    sede: "Sanatorio Agote",
    estado: "cancelado",
  },
];
