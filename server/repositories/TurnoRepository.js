import { BadRequestError } from "../errors/AppErrors.js";
import { TurnoModel } from "../schemas/turno.schema.js";
import { turnoToDocument } from "./turnoMapper.js";
import { TipoServicio } from "../domain/servicios/servicio.js";
import { Estado } from "../domain/turnos/estadoTurno.js";

export class TurnoRepositoryImpl {
  constructor() {
    this.model = TurnoModel;
  }

  async agregarTurno(turno) {
    const nuevoDoc = new this.model(turnoToDocument(turno));
    return await nuevoDoc.save();
  }

  async guardarturno(id, turnoModificado) {
    return await this.model.findByIdAndUpdate(id, turnoToDocument(turnoModificado), { new: true });
  }

  async reservarTurnoDisponible(id, paciente, nuevoEstado) {
    return await this.model.findOneAndUpdate(
      { _id: id, paciente: null },
      { 
        $set: { paciente: paciente },
        $push: { estadosTurno: nuevoEstado }
      },
      { new: true }
    );
  }

  async borrar(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async listar() {
    return await this.model.find()
      .populate({
        path: 'medico',
        populate: { path: 'servicios' }
      })
      .populate('sede servicio');
  }

  async obtenerPorId(id) {
    try {
      return await this.model.findById(id)
        .populate({
          path: 'medico',
          populate: { path: 'servicios' }
        })
        .populate('sede servicio');
    } catch (err) {
      if (err.name === 'CastError') {
        throw new BadRequestError(`El id proporcionado no es válido: ${id}`);
      }
      throw err;
    }
  }

  async borrarDisponiblesFuturos(medicoId, bloqueHorario) {
    const now = new Date();
    // Buscamos directamente en la DB los candidatos a borrar
    const turnos = await this.model.find({
      medico: medicoId,
      fechaHora: { $gte: now }
    }).populate('sede');

    const aEliminar = turnos.filter(t =>
      t.sede.nombre === bloqueHorario.sede.nombre &&
      t.fechaHora >= bloqueHorario.horaInicio &&
      t.fechaHora < bloqueHorario.horaFin &&
      t.estadoActual().estado === Estado.DISPONIBLE
    );

    for (const t of aEliminar) {
      await this.model.findByIdAndDelete(t._id);
    }
  }

  async obtenerDisponiblesPaginados(numeroPagina, limitePorPagina, filtros, ordenarPor = 'fecha', direccion = 'asc', paciente) {
    let query = { 
      paciente: { $eq: null } // Asegura que no tenga paciente asignado
    };

    if (filtros.profesional) query.medico = filtros.profesional;
    if (filtros.fechaDesde) query.fechaHora = { $gte: filtros.fechaDesde };
    if (filtros.fechaHasta) {
      query.fechaHora = { ...query.fechaHora, $lte: filtros.fechaHasta };
    }

    // Traemos médicos con sus servicios Y el servicio del turno
    let turnos = await this.model.find(query)
      .populate({
        path: 'medico',
        populate: { path: 'servicios' }
      })
      .populate('sede servicio');

    turnos = turnos.filter(t => t.estaDisponible());

    if (filtros.especialidad) {
      turnos = turnos.filter(t => 
        t.medico?.servicios?.some(s => 
          s.tipoServicio === TipoServicio.ESPECIALIDAD && 
          s.nombre.toLowerCase().includes(filtros.especialidad.toLowerCase())
        )
      );
    }

    if (filtros.practica) {
      turnos = turnos.filter(t => 
        t.medico?.servicios?.some(s => 
          s.tipoServicio === TipoServicio.PRACTICA && 
          s.nombre.toLowerCase().includes(filtros.practica.toLowerCase())
        )
      );
    }
if (filtros.sede) {
  turnos = turnos.filter(t => t.sede.nombre.toLowerCase().includes(filtros.sede.toLowerCase()));
}

return {
  turnos, // Devolvemos todos para que el service los expanda y pagine
  totalTurnos: turnos.length
};
}


  async obtenerTurnosDePaciente(pacienteId, numeroPagina, limitePorPagina) {
    const turnos = await this.model.find({ paciente: pacienteId }).populate('medico sede servicio');
    
    const inicio = (numeroPagina - 1) * limitePorPagina;
    return {
      turnos: turnos.slice(inicio, inicio + limitePorPagina),
      totalTurnos: turnos.length
    };
  }
}

export const TurnoRepository = new TurnoRepositoryImpl();