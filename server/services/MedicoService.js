
export class MedicoService {
  constructor({
    medicoRepository,
    turnoRepository,
    sedeRepository,
    servicioRepository,
  } = {}) {
    this.medicoRepository = medicoRepository;
    this.turnoRepository = turnoRepository;
    this.sedeRepository = sedeRepository;
    this.servicioRepository = servicioRepository;
  }

  async agregarDisponibilidad(medicoId, { fecha, horaInicio, horaFin, sedeName }) {
    const medico = await this.medicoRepository.findById(medicoId);
    const sede = await this.sedeRepository.obtenerPorNombre(sedeName)

    const fechaBase = new Date(fecha);
    const fechaHoraInicio = new Date(fechaBase);
    fechaHoraInicio.setHours(horaInicio.hora, horaInicio.minutos, 0, 0);

    const fechaHoraFin = new Date(fechaBase);
    fechaHoraFin.setHours(horaFin.hora, horaFin.minutos, 0, 0);

    const bloqueHorario = medico.agregarDisponibilidad(fechaHoraInicio, fechaHoraFin, sede);

    const turnosGenerados = medico.generarTurnos(bloqueHorario);
    for (const t of turnosGenerados) {
      await this.turnoRepository.agregarTurno(t);
    }

    await medico.save()

    return { bloqueHorario, turnosGenerados };
  }

  async eliminarDisponibilidad(medicoId, bloqueId) {
    const medico = await this.medicoRepository.findById(medicoId);
    medico.eliminarBloque(bloqueId);
    await medico.save();
  }

  async obtenerDisponibilidad(medicoId, { sede } = {}) {
    const medico = await this.medicoRepository.findById(medicoId);

    // TODO: remplazo temporal, es logica de dominio filtrada!
    const agenda = medico.agenda
      .filter(b => !sede || (
        b.sede.nombre === sede
      ))

    return { medico, agenda };
  }
}