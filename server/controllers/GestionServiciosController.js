import { ServicioOutputDTO } from "../dtos/servicioOutputDTO.js";
import { BadRequestError } from "../errors/AppErrors.js";

export class GestionServiciosController {
  constructor({ gestionServiciosService } = {}) {
    this.service = gestionServiciosService;
  }

  _validarId(id) {
    if (!id) throw new BadRequestError("El id proporcionado es requerido");
    return id;
  }

  listarPorMedico = async (req, res, next) => {
    try {
      const medicoId = this._validarId(req.params.id);
      const servicios = await this.service.obtenerServiciosDeMedico(medicoId);

      //Envía datos y finaliza.
      const respuesta = servicios.map(s => new ServicioOutputDTO(s));
      res.status(200).json(respuesta);
    } catch (error) {
      next(error);
    }
  };

  agregarAMedico = async (req, res, next) => {
    try {
      const medicoId = this._validarId(req.params.id);
      const { tipoServicio, nombre, precio, duracion } = req.body;
      const nuevoServicio = await
        this.service.agregarServicioAMedico(medicoId, {
          tipoServicio, nombre, precio, duracion
        });
      // Envía el nuevo objeto y finaliza.
      res.status(201).json(new ServicioOutputDTO(nuevoServicio));
    } catch (error) {
      next(error);
    }
  };

  eliminarDeMedico = async (req, res, next) => {
    try {
      const medicoId = this._validarId(req.params.id);
      const nombre = req.params.nombre;
      await this.service.eliminarServicioDeMedico(medicoId, nombre);
      //No envía datos y finaliza.
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  actualizarEnMedico = async (req, res, next) => {
    try {
      //obtengo el id
      const medicoId = this._validarId(req.params.id);
      const nombre = req.params.nombre;
      const servicioEditado = await this.service.actualizarServicioDeMedico(medicoId, nombre, req.body);

      res.status(200).json(new ServicioOutputDTO(servicioEditado));
    } catch (error) {
      next(error);
    }
  };
}
