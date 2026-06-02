import { MedicoRepository } from "../repositories/MedicoRepository.js";
import { TurnoRepository } from "../repositories/TurnoRepository.js";
import { TipoServicio } from "../domain/servicios/servicio.js";
import { BadRequestError, NotFoundError } from "../errors/AppErrors.js";
import { SedeRepository } from "../repositories/SedeRepository.js";
import { ServicioRepository } from "../repositories/ServicioRepository.js";

export class MedicoService {
  constructor({
    medicoRepository = new MedicoRepository(),
    turnoRepository = TurnoRepository,
    sedeRepo = new SedeRepository(),
    servicioRepo = new ServicioRepository()
  } = {}) {
    this.medicoRepository = medicoRepository;
    this.turnoRepository = turnoRepository;
    this.sedeRepository = sedeRepo
    this.servicioRepository = servicioRepo
  }

  async agregarDisponibilidad(medicoId, { fecha, horaInicio, horaFin, sedeName, servicioName }) {
    const medico = await this.medicoRepository.findById(medicoId);
    const sede = await this.sedeRepository.obtenerPorNombre(sedeName)
    const servicio = await this.servicioRepository.findByName(servicioName)

    if (!medico.atiendeEn(sede)) throw new BadRequestError(`El médico no atiende en la sede '${sedeName}'`);
    if (!medico.ofrece(servicio)) throw new BadRequestError(`El médico no ofrece el servicio '${servicioName}'`);

    const fechaBase = new Date(fecha);
    const fechaHoraInicio = new Date(fechaBase);
    fechaHoraInicio.setHours(horaInicio.hora, horaInicio.minutos, 0, 0);

    const fechaHoraFin = new Date(fechaBase);
    fechaHoraFin.setHours(horaFin.hora, horaFin.minutos, 0, 0);
    console.log(fechaHoraInicio)
    console.log(fechaHoraFin)

    const bloqueHorario = medico.agregarDisponibilidad(fechaHoraInicio, fechaHoraFin, sede, servicio);

    const turnosGenerados = medico.generarTurnos(bloqueHorario);
    for (const t of turnosGenerados) {
      await this.turnoRepository.agregarTurno(t);
    }

    await medico.save()

    return { bloqueHorario, turnosGenerados };
  }

  async eliminarDisponibilidad(medicoId, bloqueId) {
    const medico = await this.medicoRepository.findById(medicoId);
    if (!medico) throw new NotFoundError(`No existe médico con id ${medicoId}`);

    medico.eliminarBloque(bloqueId);
    
    await medico.save();
  }

  async obtenerDisponibilidad(medicoId, { especialidad, practica } = {}) {
    const medico = await this.medicoRepository.findById(medicoId);

    const agenda = medico.agenda
      .filter(b => !especialidad || (
        b.servicio.tipoServicio === TipoServicio.ESPECIALIDAD &&
        b.servicio.nombre.toLowerCase().includes(especialidad.toLowerCase())
      ))
      .filter(b => !practica || (
        b.servicio.tipoServicio === TipoServicio.PRACTICA &&
        b.servicio.nombre.toLowerCase().includes(practica.toLowerCase())
      ));

    return { medico, agenda };
  }
}