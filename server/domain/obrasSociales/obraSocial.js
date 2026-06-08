export class ObraSocial {
  constructor({nombre, planes} = {}) {
    this.nombre = nombre;
    this.planes = planes ?? [];
  }

  agregarPlan(plan) {
    this.planes.push(plan);
  }

  ofrece(plan) {
    return this.planes.some(p => plan === p)
  }
}
