import { Paciente } from "../domain/personas/paciente.js";
import { ObraSocial } from "../domain/obrasSociales/obraSocial.js";
import { Plan } from "../domain/obrasSociales/plan.js";
import { Cobertura } from "../domain/obrasSociales/cobertura.js";
import { Servicio } from "../domain/servicios/servicio.js";
import { Usuario } from "../domain/notificaciones/usuario.js";
import { Notificacion } from "../domain/notificaciones/notificacion.js";

export function pacienteToDocument(paciente) {
  return {
    id: paciente.id,
    nombre: paciente.nombre,
    apellido: paciente.apellido,
    documento: paciente.documento,
    obraSocial: { nombre: paciente.obraSocial.nombre },
    plan: {
      tipo: paciente.plan.tipo,
      coberturaPorServicio: paciente.plan.coberturaPorServicio.map((c) => ({
        servicio: c.servicio._id || c.servicio.id || c.servicio,
        porcentaje: c.porcentaje,
      })),
    },
  };
}

export async function pacienteFromDocument(doc) {
  const obj = doc.toObject ? doc.toObject({ versionKey: false }) : doc;

  const obraSocial = new ObraSocial(obj.obraSocial.nombre);
  // El mismo Plan se usa en la obra social y en el Paciente: el constructor de
  // Paciente valida obraSocial.ofrece(plan) por identidad (===).
  const plan = planFromEmbedded(obj.plan);
  obraSocial.agregarPlan(plan);

  const usuario = usuarioFromRef(obj.usuarioId);

  const paciente = new Paciente(
    obj.nombre,
    obj.apellido,
    obj.documento,
    obraSocial,
    plan,
    usuario,
  );
  paciente.id = obj.id;

  return paciente;
}

function planFromEmbedded(planDoc) {
  const plan = new Plan(planDoc.tipo);
  for (const coberturaDoc of planDoc.coberturaPorServicio ?? []) {
    const svc = coberturaDoc.servicio;
    const servicio = new Servicio(svc.tipoServicio, svc.nombre, svc.precio, svc.duracion);
    if (svc._id) servicio._id = svc._id;
    plan.agregarCobertura(new Cobertura(servicio, coberturaDoc.porcentaje));
  }
  return plan;
}

function usuarioFromRef(usuarioRef) {
  if (usuarioRef && typeof usuarioRef === "object" && usuarioRef._id) {
    return usuarioFromPlain(usuarioRef);
  }
  if (usuarioRef) {
    return new Usuario({ id: usuarioRef.toString() });
  }
  return undefined;
}

function usuarioFromPlain(usuario) {
  return new Usuario({
    id: usuario._id.toString(),
    nombre: usuario.nombre,
    notificaciones: (usuario.notificaciones ?? []).map(
      (n) => new Notificacion(n),
    ),
  });
}
