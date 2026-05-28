import { BloqueHorario } from '../turnos/bloqueHorario.js';

export class Medico {
  constructor(nombre, apellido, documento, servicios, sedes) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.documento = documento;

    this.servicios = servicios || [];
    this.agenda = [];
    this.sedes = sedes || [];

    this.notificaciones = [];
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
      throw new Error(`El médico ${this.nombre} NO atiende en ${sede.nombre} o NO ofrece ${servicio.nombre} como servicio.`)
    }

    if (fechaHoraInicio >= fechaHoraFin) {
      throw new Error("La hora de inicio debe ser anterior a la hora de fin")
    }
    if (fechaHoraInicio <= new Date()) {
      throw new Error("No se puede agregar disponibilidad para fechas pasadas")
    }

    const nuevoBloqueHorario = new BloqueHorario(fechaHoraInicio, fechaHoraFin, sede, servicio);
    nuevoBloqueHorario.id = Math.floor(Math.random() * 10);
    this.agenda.push(nuevoBloqueHorario);

    return nuevoBloqueHorario;
  }

  eliminarBloque(bloqueId) {
    const index = this.agenda.findIndex(b => b.id === bloqueId);
    if (index === -1) throw new Error(`Bloque con id ${bloqueId} no encontrado en la agenda`);
    this.agenda.splice(index, 1);
  }

  recibirNotificacion(notificacion) {
    this.notificaciones.push(notificacion)
  }

  verNotificacion(idNotificacion) {
    //busca en qué posición (índice) se encuentra el objeto notificacion dentro del arreglo notificacionesPendientes
    const index = this.notificaciones.findIndex(n => n.id === idNotificacion);

    if (index === -1) {
      throw new Error("La notificación no se encuentra en la lista de pendientes.");
    }

    this.notificaciones[index].marcarComoVista();
  }

  obtenerNotificacionesSinLeer() {
    return this.notificaciones.filter((n) => !n.visto)
  }

  obtenerNotificacionesLeidas() {
    return this.notificaciones.filter((n) => n.visto)
  }

  actualizarServicio(nombreServicio, datosNuevos) {
    const index = this.servicios.findIndex(s => s.tieneNombre(nombreServicio));
    if (index === -1) {
      throw new Error("El médico no ofrece el servicio especificado.");
    }
    const servicioPropio = this.servicios[index].clonarCon(datosNuevos);
    this.servicios[index] = servicioPropio;
    return servicioPropio;
  }
}
