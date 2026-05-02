export class ObraSocial {
  constructor(nombre) {
    this.nombre = nombre;
    this.planes = [];
  }

  agregarPlan(plan) {
    this.planes.push(plan);
  }

  ofrece(plan) {
    return this.planes.some(p => plan === p)
  }
}
