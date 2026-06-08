import { Turno } from "../domain/turnos/turno.js"
import { Medico } from "../domain/personas/medico.js"
import { Paciente } from "../domain/personas/paciente.js"
import { Sede } from "../domain/sedes/sede.js"
import { Servicio } from "../domain/servicios/servicio.js"
import { EstadoTurno } from "../domain/turnos/estadoTurno.js"
import { Plan } from "../domain/obrasSociales/plan.js"
import { ObraSocial } from "../domain/obrasSociales/obraSocial.js"
import { Usuario } from "../domain/notificaciones/usuario.js"

export function turnoToDocument(turno) {
  return {
    fechaHora: turno.fechaHora,
    medico: turno.medico?._id || turno.medico?.id || turno.medico,
    paciente: turno.paciente?._id || turno.paciente?.id || turno.paciente,
    sede: turno.sede?._id || turno.sede?.id || turno.sede,
    servicio: turno.servicio?._id || turno.servicio?.id || turno.servicio,
    version: turno.version,
    estadosTurno: (turno.estadosTurno || []).map(e => ({
      estado: e.estado,
      fechaHora: e.fechaHora,
      motivo: e.motivo
    }))
  };
}

export function documentToTurno(doc) {
  // --- Sede ---
  const sede = new Sede(doc.sede.nombre, doc.sede.ubicacion)
  sede.id = doc.sede._id?.toString()

  // --- Médico ---
  const sedesDelMedico = (doc.medico.sedes || []).map(s => {
    const inst = new Sede(s.nombre, s.ubicacion)
    inst.id = s._id?.toString()
    return inst
  })

  const serviciosDelMedico = (doc.medico.servicios || []).map(s => {
    const inst = new Servicio(s.tipoServicio, s.nombre, s.precio, s.duracion)
    inst.id = s._id?.toString()
    return inst
  })

  const medico = new Medico({
    nombre: doc.medico.nombre, 
    apellido: doc.medico.apellido, 
    documento: doc.medico.documento, 
    servicios: serviciosDelMedico, 
    sedes: sedesDelMedico,
    usuario: new Usuario(doc.medico.usuario)
  })

  medico.id = doc.medico._id?.toString()

  // Estados (el constructor pone DISPONIBLE, acá los reales)
  const estados = (doc.estadosTurno || []).map(e =>
    new EstadoTurno(e.estado, null, e.motivo)
  )

  // --- Turno ---
  const turno = new Turno({
    fechaHora: doc.fechaHora, 
    medico: medico, 
    sede: sede,
    version: doc.version,
    estados: estados
  })
  turno.id = doc._id?.toString()


  // --- Paciente (opcional) ---
  if (doc.paciente) {
    const plan = new Plan(doc.paciente.plan?.tipo)
    const obraSocial = new ObraSocial({ nombre: doc.paciente.obraSocial.nombre })
    obraSocial.agregarPlan(plan) // necesario para que pase la validación del constructor

    const usuario = new Usuario(doc.paciente.usuarioId)
    const paciente = new Paciente(doc.paciente.nombre, doc.paciente.apellido, doc.paciente.documento, obraSocial, plan, usuario)
    paciente.id = doc.paciente._id?.toString()
    turno.paciente = paciente
  }

  // --- Servicio (opcional) ---
  if (doc.servicio) {
    const servicio = new Servicio(doc.servicio.tipoServicio, doc.servicio.nombre, doc.servicio.precio, doc.servicio.duracion)
    servicio.id = doc.servicio._id?.toString()
    turno.servicio = servicio
  }

  return turno
}
