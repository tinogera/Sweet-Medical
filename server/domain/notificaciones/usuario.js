import { NotificacionInexistente } from "./excepcion.notificacion.js";

export class Usuario {
  constructor({ id, notificaciones, nombre } = {}) {
    this.id = id
    this.nombre = nombre
    this.notificaciones = notificaciones ?? []
  }

  recibirNotificacion(notificacion) {
    notificacion.id = this.notificaciones.length
    this.notificaciones.push(notificacion)
  }

  verNotificacion(idNotificacion) {
    const index = this.notificaciones.findIndex(n => n.id === idNotificacion);

    if (index === -1) {
      throw new NotificacionInexistente(this.id, idNotificacion);
    }

    this.notificaciones[index].marcarComoVista();
  }

  obtenerNotificacionesSinLeer() {
    return this.notificaciones.filter((n) => !n.visto)
  }

  obtenerNotificacionesLeidas() {
    return this.notificaciones.filter((n) => n.visto)
  }

}

