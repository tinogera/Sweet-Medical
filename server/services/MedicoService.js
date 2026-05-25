import { MedicoRepository } from "../repositories/MedicoRepository.js";
import { TurnoRepository } from "../repositories/TurnoRepository.js";
import { generarTurnos } from "../domain/turnos/generadorDeTurnos.js";
import { TipoServicio } from "../domain/servicios/servicio.js";
import { BadRequestError, NotFoundError } from "../errors/AppErrors.js";
import { SedeRepository } from "../repositories/SedeRepository.js";
import { ServicioRepository } from "../repositories/ServicioRepository.js";

export class MedicoService {
  constructor({
    medicoRepository = MedicoRepository,
    turnoRepository = TurnoRepository,
    sedeRepo = SedeRepository,
    servicioRepo = ServicioRepository
  } = {}) {
    this.medicoRepository = medicoRepository;
    this.turnoRepository = turnoRepository;
    this.sedeReposotory = sedeRepo
    this.servicioRepository = servicioRepo
  }

  async agregarDisponibilidad(medicoId, { fecha, horaInicio, horaFin, sedeName, servicioName }) {
    const medico = this.medicoRepository.obtenerPorId(medicoId);
    const sede = this.sedeReposotory.obtenerPorNombre(sedeName)
    const servicio = this.servicioRepository.obtenerPorNombre(servicioName)

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
    bloqueHorario.id = this.medicoRepository.obtenerSiguienteIdBloque(); 

    const turnosGenerados = generarTurnos(medico, bloqueHorario);
    for (const t of turnosGenerados) {
      this.turnoRepository.agregarTurno(t);
    }

    this.medicoRepository.guardarMedico(medico.id, medico);

    return { bloqueHorario, turnosGenerados };
  }

  async eliminarDisponibilidad(medicoId, bloqueId) {
    const medico = this.medicoRepository.obtenerPorId(medicoId);

    const bloqueHorario = medico.agenda.find(b => b.id === bloqueId);
    if (!bloqueHorario) throw new NotFoundError(`No existe un bloque con id ${bloqueId} en la agenda del médico`);

    this.turnoRepository.borrarDisponiblesFuturos(medico.id, bloqueHorario);
    medico.eliminarBloque(bloqueId);
    this.medicoRepository.guardarMedico(medico.id, medico);
  }

  async obtenerDisponibilidad(medicoId, { especialidad, practica } = {}) {
    const medico = this.medicoRepository.obtenerPorId(medicoId);

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