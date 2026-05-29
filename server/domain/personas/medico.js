import { Usuario } from '../notificaciones/usuario.js';
import { ServicioInexistente } from '../servicios/excepcion.servicio.js';
import { BloqueHorario } from '../turnos/bloqueHorario.js';
import { BloqueHorarioInexistente } from '../turnos/excepcion.turno.js';
import { DisponibilidadInvalida } from './excepcion.persona.js';
import { Turno } from '../turnos/turno.js';

export class Medico {
  generarTurnos(bloqueHorario) {
    const turnos = [];
    const { horaInicio, horaFin, sede, servicio } = bloqueHorario;

    const duracionEnMs = servicio.duracion * 60 * 1000;
    let horaInicioActual = new Date(horaInicio.getTime());
    const horaFinLimite = horaFin.getTime();

    while (horaInicioActual.getTime() + duracionEnMs <= horaFinLimite) {
      const fechaHoraTurno = new Date(horaInicioActual.getTime());
      // Se pasa 'this' ya que el médico actual es el responsable de generar sus turnos
      const nuevoTurno = new Turno(fechaHoraTurno, this, servicio, sede);
      turnos.push(nuevoTurno);
      horaInicioActual = new Date(horaInicioActual.getTime() + duracionEnMs);
    }

    return turnos;
  }

  constructor(nombre, apellido, documento, servicios, sedes) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.documento = documento;

    this.servicios = servicios || [];
    this.agenda = [];
    this.sedes = sedes || [];

    this.usuario = new Usuario();
  }

  atiendeEn(sede) {
    return this.sedes.some(s => s.nombre === sede.nombre)
  }

  ofrece(servicio) {
    return this.servicios.some(s => s.nombre === servicio.nombre)
  }

  dejarDeOfrecer(servicio) {
    const index = this.servicios.findIndex(s => s.nombre === servicio.nombre);

    // Si el servicio no lo ofrece, es redundante intentar eliminarlo
    if (index === -1) {
      return
    }

    this.servicios.splice(index, 1);
  }

  agregarSede(sede) {
    if (!this.sedes.includes(sede)) {
      this.sedes.push(sede);
    }
  }

  agregarServicio(servicio) {
    if (!this.servicios.includes(servicio)) {
      this.servicios.push(servicio);
    }
  }

  agregarDisponibilidad(fechaHoraInicio, fechaHoraFin, sede, servicio) {
    if (!this.atiendeEn(sede) || !this.ofrece(servicio)) {
      throw new DisponibilidadInvalida(`El médico [${this.id}] NO atiende en [${sede.nombre}] o NO ofrece [${servicio.nombre}] como servicio.`)
    }
    if (fechaHoraInicio >= fechaHoraFin) {
      throw new DisponibilidadInvalida("La hora de inicio debe ser anterior a la hora de fin")
    }
    if (fechaHoraInicio <= new Date()) {
      throw new DisponibilidadInvalida("No se puede agregar disponibilidad para fechas pasadas")
    }

    const nuevoBloqueHorario = new BloqueHorario(fechaHoraInicio, fechaHoraFin, sede, servicio);
    nuevoBloqueHorario.id = Math.floor(Math.random() * 10);
    this.agenda.push(nuevoBloqueHorario);

    return nuevoBloqueHorario;
  }

  eliminarBloque(bloqueId) {
    const index = this.agenda.findIndex(b => b.id === bloqueId);
    if (index === -1) throw new BloqueHorarioInexistente(bloqueId);
    this.agenda.splice(index, 1);
  }

  actualizarServicio(nombreServicio, datosNuevos) {
    const index = this.servicios.findIndex(s => s.tieneNombre(nombreServicio));
    if (index === -1) {
      throw new ServicioInexistente("El médico no ofrece el servicio especificado.");
    }
    const servicioPropio = this.servicios[index].clonarCon(datosNuevos);
    this.servicios[index] = servicioPropio;
    return servicioPropio;
  }
}
