export function medicoToDocument(medico) {
  return {
    nombre: medico.nombre,
    apellido: medico.apellido,
    documento: medico.documento,
    usuario: medico.usuario?.id ? medico.usuario.id : undefined,
    servicios: medico.servicios.map(s => s._id || s.id || s),
    sedes: medico.sedes.map(s => s._id || s.id || s),
    agenda: medico.agenda.map(b => ({
      sede: b.sede._id || b.sede.id || b.sede,
      horaInicio: b.horaInicio,
      horaFin: b.horaFin
    }))
  };
}
