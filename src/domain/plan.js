import { Cobertura } from './cobertura.js';

class Plan {
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
}