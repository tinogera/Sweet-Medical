import { EstadoTurno, Estado } from '../turnos/estadoTurno.js'
import { TurnoInvalido, TurnoNoPuedeCambiarEstado } from './excepcion.turno.js';

export class Turno {
  constructor(fechaHora, medico, sede) {
    // Aunque los turnos los generan en base a la agenda propuesta por el medico.
    // validar si un medico:
    //  - ofrece el servicio
    //  - atiende en esa sede
    //  TODO: - tiene bloqueHorario disponible en fechaHora
    if (!medico.atiendeEn(sede)) {
      throw new TurnoInvalido(`El médico ${medico.nombre} NO atiende en ${sede.nombre}.`)
    }

    this.fechaHora = fechaHora;
    this.medico = medico;
    this.estadosTurno = [new EstadoTurno(Estado.DISPONIBLE, medico, 'Turno disponible')];
    this.sede = sede;
  }

  costoEstimado() {
    return this.paciente.plan.precioDe(this.servicio)
  }

  reservar(paciente, servicio) {
    if (!this.estaDisponible()) {
      throw new TurnoNoPuedeCambiarEstado(`El turno [${this.id}] no está disponible para ser reservado`);
    }

    if (!this.medico.ofrece(servicio)) {
      throw new TurnoInvalido(`El médico ${this.medico.nombre} NO ofrece el servicio de ${servicio.nombre}.`)
    }

    this.paciente = paciente;
    this.servicio = servicio;
    this.cambiarEstado(Estado.RESERVADO, paciente, "Turno reservado por el paciente");
  }

  cancelar(responsable, motivo) {
    if (!this.puedeCancelarse()) {
      throw new TurnoNoPuedeCambiarEstado(`El turno [${this.id}] no se puede cancelar, solo turnos disponibles o reservados pueden ser cancelado`);
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
    const fechaHoraActual = Date.now()
    return (
      this.estaDisponible() || this.estaReservado()) &&
      ((this.fechaHora.getTime() - fechaHoraActual) > UNA_HORA_EN_MS
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
    const actual = this.estadoActual();
    return actual.estaDisponible ? actual.estaDisponible() : actual.estado === Estado.DISPONIBLE;
  }

  estadoActual() {
    return this.estadosTurno.at(-1);
  }

  estaReservado() {
    const actual = this.estadoActual();
    return actual.estaReservado ? actual.estaReservado() : actual.estado === Estado.RESERVADO;
  }

  marcarRealizado() {
    this.cambiarEstado(Estado.REALIZADO, this.medico, "El turno fue realizado con éxito")
  }

}
