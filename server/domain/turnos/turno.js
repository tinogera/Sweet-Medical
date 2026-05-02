import { EstadoTurno, Estado } from '../turnos/estadoTurno.js'

export class Turno {
  constructor(fechaHora, medico, servicio, sede) {
    // Aunque los turnos los generan en base a la agenda propuesta por el medico.
    // validar si un medico:
    //  - ofrece el servicio
    //  - atiende en esa sede
    //  TODO: - tiene bloqueHorario disponible en fechaHora
    if (!medico.atiendeEn(sede) || !medico.ofrece(servicio)) {
      throw new Error(`El médico ${medico.nombre} NO atiende en ${sede.nombre} o NO ofrece ${servicio.nombre} como servicio.`)
    }

    this.fechaHora = fechaHora;
    this.medico = medico;
    this.estadosTurno = [new EstadoTurno(Estado.DISPONIBLE, medico, 'Turno disponible')];
    this.sede = sede;
    this.servicio = servicio;
  }

  // Consultar!!
  costoEstimado() { }

  reservar(paciente) {
    if (!this.estaDisponible()) {
      throw new Error('El turno no está disponible');
    }
    this.paciente = paciente;
    this.cambiarEstado(Estado.RESERVADO, paciente, "Turno reservado por el paciente");
  }

  cancelar(responsable, motivo) {
    if (!this.puedeCancelarse()) {
      throw new Error('Solo se pueden cancelar turnos disponibles o reservados');
    }
    this.cambiarEstado(Estado.CANCELADO, responsable, motivo);
  }

  confirmar(responsable) {
    this.cambiarEstado(Estado.CONFIRMADO, responsable, "Turno confirmado");
  }

  puedeCancelarse() {
    // CRITERIOS:
    // +  esta disponible o reservado
    // +  falta más de 1 hora
    const UNA_HORA_EN_MS = 60 * 60 * 1000;
    const fechaHoraActual = new Date.now()
    return (
      this.estaDisponible() || this.estaReservado()) &&
      ((fechaHoraActual - this.fechaHora.getTime()) > UNA_HORA_EN_MS
      );
  }

  puedeModificarse() {
    // CRITERIOS:
    //  + Turnos a suceder
    //  + No está reservado
    return this.fechaHora > new Date() && this.estaDisponible()
  }

  cambiarEstado(nuevoEstado, responsableDeCambio, motivo) {
    const nuevoEstadoTurno = new EstadoTurno(nuevoEstado, responsableDeCambio, motivo);
    this.estadosTurno.push(nuevoEstadoTurno);
  }

  estaDisponible() {
    return this.estadoActual().estaDisponible();
  }

  estadoActual() {
    const LAST = -1
    return this.estadosTurno.at(LAST);
  }

  estaReservado() {
    return this.estadoActual().estaReservado();
  }

  marcarRealizado() {
    this.cambiarEstado(Estado.REALIZADO, this.medico, "El turno fue realizado con éxito")
  }

}
