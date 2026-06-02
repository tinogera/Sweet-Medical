import { Paciente } from "../domain/personas/paciente.js";
import { ObraSocial } from "../domain/obrasSociales/obraSocial.js";
import { Plan } from "../domain/obrasSociales/plan.js";
import { Cobertura } from "../domain/obrasSociales/cobertura.js";
import { Servicio } from "../domain/servicios/servicio.js";
import { Usuario } from "../domain/notificaciones/usuario.js";
import { Notificacion } from "../domain/notificaciones/notificacion.js";
import { ServicioRepository } from "./ServicioRepository.js";

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
        servicio: {
          tipoServicio: c.servicio.tipoServicio,
          nombre: c.servicio.nombre,
          precio: c.servicio.precio,
          duracion: c.servicio.duracion,
        },
        porcentaje: c.porcentaje,
      })),
    },
  };
}

export function pacienteFromDocument(doc) {
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
    // Re-vincula el Servicio al que vive en ServicioRepository para que
    // Plan.precioDe / coberturaDe (comparan con ===) funcionen contra el
    // Servicio vivo del turno. Si no existe, crea uno nuevo (fallback).
    const servicio =
      ServicioRepository.obtenerPorNombre(coberturaDoc.servicio.nombre) ??
      new Servicio(
        coberturaDoc.servicio.tipoServicio,
        coberturaDoc.servicio.nombre,
        coberturaDoc.servicio.precio,
        coberturaDoc.servicio.duracion,
      );
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
