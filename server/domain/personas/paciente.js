import { Usuario } from "../notificaciones/usuario.js";

export class Paciente {
  constructor(nombre, apellido, documento, obraSocial, plan) {
    if (!obraSocial.ofrece(plan)) { throw new Error(`La obra social ${obraSocial.nombre} no tiene un plan ${plan.tipo}`) }

    this.nombre = nombre;
    this.apellido = apellido;
    this.documento = documento;
    this.obraSocial = obraSocial;
    this.plan = plan;
    this.usuario = new Usuario();
  }
}

