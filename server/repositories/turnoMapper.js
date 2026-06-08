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
  sede._id = doc.sede._id
  sede.id = doc.sede._id?.toString()

  // --- Médico ---
  const sedesDelMedico = (doc.medico.sedes || []).map(s => {
    const inst = new Sede(s.nombre, s.ubicacion)
    inst._id = s._id
    inst.id = s._id?.toString()
    return inst
  })
  const serviciosDelMedico = (doc.medico.servicios || []).map(s => {
    const inst = new Servicio(s.tipoServicio, s.nombre, s.precio, s.duracion)
    inst._id = s._id
    inst.id = s._id?.toString()
    return inst
  })
  const medico = new Medico(doc.medico.nombre, doc.medico.apellido, doc.medico.documento, serviciosDelMedico, sedesDelMedico)
  medico._id = doc.medico._id
  medico.id = doc.medico._id?.toString()
  medico.usuario = doc.medico.usuario ? new Usuario(doc.medico.usuario) : new Usuario({ nombre: `${doc.medico.nombre} ${doc.medico.apellido}` })
  // agenda queda como POJO (solo se usa para generar turnos, no en búsqueda)

  // --- Turno ---
  const turno = new Turno(doc.fechaHora, medico, sede)
  turno._id = doc._id
  turno.id = doc._id?.toString()
  turno.version = doc.version ?? 0

  // Reemplazar estadosTurno (el constructor pone DISPONIBLE, acá los reales)
  turno.estadosTurno = (doc.estadosTurno || []).map(e =>
    new EstadoTurno(e.estado, null, e.motivo)
  )

  // --- Paciente (opcional) ---
  if (doc.paciente) {
    const obraSocial = new ObraSocial(doc.paciente.obraSocial?.nombre)
    const plan = new Plan(doc.paciente.plan?.tipo)
    obraSocial.agregarPlan(plan) // necesario para que pase la validación del constructor

    const usuario = new Usuario(doc.paciente.usuario || { nombre: `${doc.paciente.nombre} ${doc.paciente.apellido}` })
    const paciente = new Paciente(doc.paciente.nombre, doc.paciente.apellido, doc.paciente.documento, obraSocial, plan, usuario)
    paciente._id = doc.paciente._id
    paciente.id = doc.paciente._id?.toString()
    turno.paciente = paciente
  }

  // --- Servicio (opcional) ---
  if (doc.servicio) {
    const servicio = new Servicio(doc.servicio.tipoServicio, doc.servicio.nombre, doc.servicio.precio, doc.servicio.duracion)
    servicio._id = doc.servicio._id
    servicio.id = doc.servicio._id?.toString()
    turno.servicio = servicio
  }

  return turno
}
