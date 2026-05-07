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

  // TODO: Definir un formato para las "horas"
  // Asumo que va a ser un objeto { hora: int, minutos: int }
  agregarDisponibilidad(horaInicio, horaFin, sede, fecha, servicio) {
    if (!this.atiendeEn(sede) || !this.ofrece(servicio)) {
      throw new Error(`El médico ${this.nombre} NO atiende en ${sede.nombre} o NO ofrece ${servicio.nombre} como servicio.`)
    }

    const fechaHoraInicio = fecha.setHours(horaInicio.hora, horaInicio.minutos)
    const fechaHoraFin = fecha.setHours(horaFin.hora, horaFin.minutos)
    const ahora = new Date()

    if (fechaHoraInicio < fechaHoraFin && fechaHoraInicio > ahora) {
      throw new Error("No se puede cambiar la disponibilidad para fechas pasadas")
    }

    const nuevoBloqueHorario = new BloqueHorario(fechaHoraInicio, fechaHoraFin, sede, servicio);
    this.agenda.push(nuevoBloqueHorario);
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

    notificaciones[index].marcarComoVista();
  }

  obtenerNotificacionesSinLeer() {
    return this.notificaciones.filter((n) => !n.visto)
  }

  obtenerNotificacionesLeidas() {
    return this.notificaciones.filter((n) => n.visto)
  }
}
