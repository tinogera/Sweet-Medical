export class Paciente {
  constructor(nombre, apellido, documento, obraSocial, plan) {
    if (!obraSocial.ofrece(plan)) { throw new Error(`La obra social ${obraSocial.nombre} no tiene un plan ${plan.tipo}`) }

    this.nombre = nombre;
    this.apellido = apellido;
    this.documento = documento;

    this.obraSocial = obraSocial;
    this.plan = plan;

    this.notificaciones = [];
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
}

