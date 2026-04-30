export class Paciente {
  constructor(nombre, apellido, documento, obraSocial, plan) {
    if (!obraSocial.ofrece(plan)) { throw new Error(`La obra social ${obraSocial.nombre} no tiene un plan ${plan.tipo}`) }

    this.nombre = nombre;
    this.apellido = apellido;
    this.documento = documento;

    this.obraSocial = obraSocial;
    this.plan = plan;

    this.notificacionesPendientes = [];
    this.notificacionesVistas = [];
  }

  recibirNotificacion(notificacion) {
    this.notificacionesPendientes.push(notificacion)
  }

  verNotificacion(notificacion) {
    //busca en qué posición (índice) se encuentra el objeto notificacion dentro del arreglo notificacionesPendientes
    const index = this.notificacionesPendientes.indexOf(notificacion);

    if (index === -1) {
      throw new Error("La notificación no se encuentra en la lista de pendientes.");
    }

    //se elimina físicamente la notificación de la lista de pendientes. El 1 indica que solo quiero borrar un elemento a partir de esa posición.
    this.notificacionesPendientes.splice(index, 1);
    this.notificacionesVistas.push(notificacion);
    notificacion.marcarComoVista();
  }


  obtenerNotificacionesSinLeer() {
    return this.notificacionesPendientes
  }

  obtenerNotificacionesLeidas() {
    return this.notificacionesVistas
  }
}

