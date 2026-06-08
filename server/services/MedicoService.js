
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
    //divide el string de la fecha
    const partsInicio = horaInicio.split(':');
    const fechaHoraInicio = new Date(fechaBase);
    //defino hora, minutos, segundos y milisegundos
    fechaHoraInicio.setHours(parseInt(partsInicio[0]), parseInt(partsInicio[1]), 0, 0);

    // Fin
    //lo mismo que el inicio pero para el fin
    const partsFin = horaFin.split(':');
    const fechaHoraFin = new Date(fechaBase);
    fechaHoraFin.setHours(parseInt(partsFin[0]), parseInt(partsFin[1]), 0, 0);

    const bloqueHorario = medico.agregarDisponibilidad(fechaHoraInicio, fechaHoraFin, sede);

    // TODO: esto re calcula los turnos cuando se agrega nueva disponibilidad,
    // se agregan al repo, pero no reemplaza los existentes invalidados
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

    // FIX: remplazo temporal, es logica de dominio filtrada!
    const agenda = medico.agenda
      .filter(b => !sede || (
        b.sede.nombre === sede
      ))

    return { medico, agenda };
  }
}