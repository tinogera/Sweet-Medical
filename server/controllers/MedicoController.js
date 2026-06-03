import { BadRequestError } from "../errors/AppErrors.js";

export class MedicoController {
  constructor({ medicoService } = {}) {
    this.medicoService = medicoService;
  }

  agregarDisponibilidad = async (req, res, next) => {
    try {
      const medicoId = req.params.id;
      const { fecha, horaInicio, horaFin, sedeName, servicioName } = req.body;

      if (!fecha || !horaInicio || !horaFin || !sedeName || !servicioName) {
        throw new BadRequestError("Debe proveer: fecha, horaInicio, horaFin, sedeName y servicioName");
      }

      const { bloqueHorario, turnosGenerados } = await this.medicoService.agregarDisponibilidad(medicoId, {
        fecha, horaInicio, horaFin, sedeName, servicioName
      });

      return res.status(201).json({
        bloqueId: bloqueHorario._id || bloqueHorario.id, // Support both during transition
        horaInicio: bloqueHorario.horaInicio,
        horaFin: bloqueHorario.horaFin,
        sede: bloqueHorario.sede.nombre,
        servicio: bloqueHorario.servicio.nombre,
        turnosGenerados: turnosGenerados.length
      });
    } catch (error) {
      return next(error);
    }
  }

  eliminarDisponibilidad = async (req, res, next) => {
    try {
      const medicoId = req.params.id;
      const bloqueId = req.params.bloqueId;

      await this.medicoService.eliminarDisponibilidad(medicoId, bloqueId);

      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }

  obtenerDisponibilidad = async (req, res, next) => {
    try {
      const medicoId = req.params.id;
      const { especialidad, practica } = req.query;

      const { medico, agenda } = await this.medicoService.obtenerDisponibilidad(medicoId, { especialidad, practica });

      return res.status(200).json({
        medicoId: medico._id || medico.id,
        nombre: `${medico.nombre} ${medico.apellido}`,
        agenda: agenda.map(b => ({
          id: b._id || b.id,
          horaInicio: b.horaInicio,
          horaFin: b.horaFin,
          sede: b.sede.nombre,
          servicio: b.servicio.nombre
        }))
      });
    } catch (error) {
      return next(error);
    }
  }
}