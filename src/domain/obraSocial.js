class ObraSocial {
    constructor(nombre) {
        this.nombre = nombre;
        this.planes = [];
    }

    agregarPlan(plan) {
        this.planes.push(plan);
    }
}