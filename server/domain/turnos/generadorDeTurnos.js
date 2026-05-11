import { Turno } from './turno.js'

export function generarTurnos(medico, bloqueHorario) {
  const turnos = [];
  let { horaInicio, horaFin, sede, servicio } = bloqueHorario;

  const duracionEnMs = servicio.duracion * 60 * 1000;

  while (horaInicio.getTime() + duracionEnMs <= horaFin.getTime()) {
    const fechaHoraTurno = new Date(horaInicio.getTime());
    const nuevoTurno = new Turno(fechaHoraTurno, medico, null, servicio, sede);
    turnos.push(nuevoTurno);
    horaInicio = new Date(horaInicio.getTime() + duracionEnMs);
  }

  return turnos;
}