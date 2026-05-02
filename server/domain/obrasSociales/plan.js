export class Plan {
  constructor(tipo) {
    this.tipo = tipo;
    this.coberturaPorServicio = [];
  }

  agregarCobertura(cobertura) {
    this.coberturaPorServicio.push(cobertura);
  }

  coberturaDe(servicio) {
    return this.coberturaPorServicio.find(c => c.servicio === servicio);
  }//si no esta devuelve un []

  precioDe(servicio) {
    // Si no tiene una cobertura para un servicio, directamente devuelve el precio del servicio
    return this.coberturaDe(servicio) ? this.coberturaDe(servicio).calcularMonto() : servicio.precio
  }
}
