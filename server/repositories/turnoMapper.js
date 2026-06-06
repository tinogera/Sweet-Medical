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
