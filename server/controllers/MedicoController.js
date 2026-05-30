import { MedicoService } from "../services/MedicoService.js";
import { BadRequestError } from "../errors/AppErrors.js";
import { toHttpError } from "../errors/httpErrorMapper.js";

export class MedicoController {
  constructor({ medicoService = new MedicoService() } = {}) {
    this.medicoService = medicoService;
  }

  agregarDisponibilidad = async (req, res, next) => {
    try {
      const medicoId = Number(req.params.id);
      const { fecha, horaInicio, horaFin, sedeName, servicioName } = req.body;

      if (!fecha || !horaInicio || !horaFin || !sedeName || !servicioName) {
        throw new BadRequestError("Debe proveer: fecha, horaInicio, horaFin, sedeName y servicioName");
      }

      const { bloqueHorario, turnosGenerados } = await this.medicoService.agregarDisponibilidad(medicoId, {
        fecha, horaInicio, horaFin, sedeName, servicioName
      });

      return res.status(201).json({
        bloqueId: bloqueHorario.id,
        horaInicio: bloqueHorario.horaInicio,
        horaFin: bloqueHorario.horaFin,
        sede: bloqueHorario.sede.nombre,
        servicio: bloqueHorario.servicio.nombre,
        turnosGenerados: turnosGenerados.length
      });
    } catch (error) {
      const { status, message } = toHttpError(error)
      return res.status(status).json({ message })
    }
  }

  eliminarDisponibilidad = async (req, res, next) => {
    try {
      const medicoId = Number(req.params.id);
      const bloqueId = Number(req.params.bloqueId);

      if (!Number.isInteger(medicoId) || medicoId <= 0) {
        throw new BadRequestError("El id del médico debe ser un entero positivo");
      }
      if (!Number.isInteger(bloqueId) || bloqueId <= 0) {
        throw new BadRequestError("El id del bloque debe ser un entero positivo");
      }

      await this.medicoService.eliminarDisponibilidad(medicoId, bloqueId);

      return res.status(204).send();
    } catch (error) {
      const { status, message } = toHttpError(error)
      return res.status(status).json({ message })
    }
  }

  obtenerDisponibilidad = async (req, res, next) => {
    try {
      const medicoId = Number(req.params.id);
      const { especialidad, practica } = req.query;

      const { medico, agenda } = await this.medicoService.obtenerDisponibilidad(medicoId, { especialidad, practica });

      return res.status(200).json({
        medicoId: medico.id,
        nombre: `${medico.nombre} ${medico.apellido}`,
        agenda: agenda.map(b => ({
          id: b.id,
          horaInicio: b.horaInicio,
          horaFin: b.horaFin,
          sede: b.sede.nombre,
          servicio: b.servicio.nombre
        }))
      });
    } catch (error) {
      const { status, message } = toHttpError(error)
      return res.status(status).json({ message })
    }
  }
}