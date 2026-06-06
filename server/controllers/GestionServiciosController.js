import { ServicioOutputDTO } from "../dtos/servicioOutputDTO.js";

export class GestionServiciosController {
  constructor({ gestionServiciosService } = {}) {
    this.service = gestionServiciosService;
  }

  listarPorMedico = async (req, res, next) => {
    try {
      const medicoId = req.params.id;
      const servicios = await this.service.obtenerServiciosDeMedico(medicoId);

      const respuesta = servicios.map(s => new ServicioOutputDTO(s));
      res.status(200).json(respuesta);
    } catch (error) {
      next(error);
    }
  };

  agregarAMedico = async (req, res, next) => {
    try {
      const medicoId = req.params.id;
      const { tipoServicio, nombre, precio, duracion } = req.body;
      const nuevoServicio = await
        this.service.agregarServicioAMedico(medicoId, {
          tipoServicio, nombre, precio, duracion
        });
      res.status(201).json(new ServicioOutputDTO(nuevoServicio));
    } catch (error) {
      next(error);
    }
  };

  eliminarDeMedico = async (req, res, next) => {
    try {
      const medicoId = req.params.id;
      const nombre = req.params.nombre;
      await this.service.eliminarServicioDeMedico(medicoId, nombre);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  actualizarEnMedico = async (req, res, next) => {
    try {
      const medicoId = req.params.id;
      const nombre = req.params.nombre;
      const servicioEditado = await this.service.actualizarServicioDeMedico(medicoId, nombre, req.body);

      res.status(200).json(new ServicioOutputDTO(servicioEditado));
    } catch (error) {
      next(error);
    }
  };
}
