import { Usuario } from "../notificaciones/usuario.js";
import { BadRequestError } from "../../errors/AppErrors.js";

export class Paciente {
  constructor(nombre, apellido, documento, obraSocial, plan) {
    if (!obraSocial.ofrece(plan)) {
      throw new BadRequestError(`La obra social ${obraSocial.nombre} no tiene un plan ${plan.tipo}`)
    }

    this.nombre = nombre;
    this.apellido = apellido;
    this.documento = documento;

    this.obraSocial = obraSocial;
    this.plan = plan;
    this.usuario = new Usuario();
  }

  recibirNotificacion(notificacion) {
    this.usuario.recibirNotificacion(notificacion);
  }
}

