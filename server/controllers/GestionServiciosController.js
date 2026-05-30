import { GestionServiciosService } from "../services/GestionServiciosService.js";
import { ServicioOutputDTO } from "../dtos/servicioOutputDTO.js";
import { toHttpError } from "../errors/httpErrorMapper.js";

export class GestionServiciosController {
  constructor({ gestionServiciosService = new GestionServiciosService() } =
    {}) {
    this.service = gestionServiciosService;
  }

  listarPorMedico = async (req, res, next) => {
    try {
      const medicoId = Number(req.params.id);
      const servicios = await this.service.obtenerServiciosDeMedico(medicoId);

      //Envía datos y finaliza.
      const respuesta = servicios.map(s => new ServicioOutputDTO(s));
      res.status(200).json(respuesta);
    } catch (error) {
      const { status, message } = toHttpError(error)
      res.status(status).json({ message })
    }
  };

  agregarAMedico = async (req, res, next) => {
    try {
      const medicoId = Number(req.params.id);
      const { tipoServicio, nombre, precio, duracion } = req.body;
      const nuevoServicio = await
        this.service.agregarServicioAMedico(medicoId, {
          tipoServicio, nombre, precio, duracion
        });
      // Envía el nuevo objeto y finaliza.
      res.status(201).json(new ServicioOutputDTO(nuevoServicio));
    } catch (error) {
      const { status, message } = toHttpError(error)
      res.status(status).json({ message })
    }
  };

  eliminarDeMedico = async (req, res, next) => {
    try {
      const medicoId = Number(req.params.id);
      const nombre = req.params.nombre;
      await this.service.eliminarServicioDeMedico(medicoId, nombre);
      //No envía datos y finaliza.
      res.status(204).send();
    } catch (error) {
      const { status, message } = toHttpError(error)
      res.status(status).json({ message })
    }
  };

  actualizarEnMedico = async (req, res, next) => {
    try {
      //obtengo el id
      const medicoId = Number(req.params.id);
      const nombre = req.params.nombre;
      const servicioEditado = await this.service.actualizarServicioDeMedico(medicoId, nombre, req.body);

      res.status(200).json(new ServicioOutputDTO(servicioEditado));
    } catch (error) {
      const { status, message } = toHttpError(error)
      res.status(status).json({ message })
    }
  };
}
