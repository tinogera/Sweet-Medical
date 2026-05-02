import { Turno } from './turno.js'

export class GeneradorDeTurnos {
  static generarTurnos(medico, bloqueHorario) {
    const turnos = [];
    const { horaInicio, horaFin, sede, servicio } = bloqueHorario;

    const duracionEnMs = servicio.duracion * 60 * 1000;

    // Revisar fechaHoraTurno es en la fecha correspondiente del bloqueHorario
    while (horaInicio.getTime() + duracionEnMs <= horaFin.getTime()) {
      const fechaHoraTurno = new Date(horaInicio.getTime());
      const nuevoTurno = new Turno(fechaHoraTurno, medico, null, servicio, sede);
      turnos.push(nuevoTurno);
      horaInicio = new Date(tiempoActual.getTime() + duracionEnMs);
    }

    return turnos;
  }
}
