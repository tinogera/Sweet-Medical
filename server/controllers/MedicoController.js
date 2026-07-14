export class MedicoController {
  constructor({ medicoService } = {}) {
    this.medicoService = medicoService;
  }

  obtenerMedicos = async (req, res, next) => {
    try {
      const { nombre } = req.query;
      const medicos = await this.medicoService.obtenerMedicos({ nombre });
      
      const response = medicos.map(m => ({
        id: m.id || m._id,
        nombre: m.nombre,
        apellido: m.apellido,
        documento: m.documento,
        servicios: m.servicios.map(s => ({
          tipoServicio: s.tipoServicio,
          nombre: s.nombre,
          descripcion: s.descripcion,
          precio: s.precio,
          duracion: s.duracion
        })),
        sedes: m.sedes.map(s => ({
          nombre: s.nombre,
          ubicacion: s.ubicacion
        })),
        usuario: m.usuario
      }));

      return res.status(200).json(response);
    } catch (e) {
      return next(e);
    }
  }

  agregarDisponibilidad = async (req, res, next) => {
    try {
      const medicoId = req.params.id;
      const { fecha, horaInicio, horaFin, sedeName } = req.body;

      const { bloqueHorario, turnosGenerados } = await this.medicoService.agregarDisponibilidad(medicoId, {
        fecha, horaInicio, horaFin, sedeName
      });

      return res.status(201).json({
        bloqueId: bloqueHorario._id || bloqueHorario.id, // Support both during transition
        horaInicio: bloqueHorario.horaInicio,
        horaFin: bloqueHorario.horaFin,
        sede: bloqueHorario.sede.nombre,
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
      const { sede } = req.validatedQuery;

      const { medico, agenda } = await this.medicoService.obtenerDisponibilidad(medicoId, { sede: sede});

      return res.status(200).json({
        medicoId: medico._id || medico.id,
        nombre: `${medico.nombre} ${medico.apellido}`,
        agenda: agenda.map(b => ({
          id: b._id || b.id,
          horaInicio: b.horaInicio,
          horaFin: b.horaFin,
          sede: b.sede.nombre,
        }))
      });
    } catch (error) {
      return next(error);
    }
  }
}