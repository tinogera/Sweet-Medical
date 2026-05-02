export class Cobertura {
  constructor(servicio, porcentaje) {
    if (porcentaje < 0 || porcentaje > 100) {
      // TODO: Crear excepciones personalizadas para el dominio
      throw new Error(`Porcentaje ${porcentaje} debe estar entre 0-100%`)
    }

    this.servicio = servicio
    this.porcentaje = porcentaje // 0-100%
  }

  calcularMonto() {
    return this.servicio.precio * (1 - (this.porcentaje / 100))
  }

  tipoCobertura() {
    switch (this.porcentaje) {
      case 100:
        return EstadoCobertura.TOTAL
      case 0:
        return EstadoCobertura.NINGUNA
      default:
        return EstadoCobertura.PARCIAL
    }
  }
}

const EstadoCobertura = Object.freeze({
  TOTAL: 'TOTAL',
  PARCIAL: 'PARCIAL',
  NINGUNA: 'NINGUNA'
});
