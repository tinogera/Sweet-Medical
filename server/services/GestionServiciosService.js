import { MedicoRepository } from "../repositories/MedicoRepository.js";
import { ServicioRepository } from "../repositories/ServicioRepository.js";
import { Servicio } from "../domain/servicios/servicio.js";
import { NotFoundError } from "../errors/AppErrors.js";

export class GestionServiciosService {
	constructor({
		medicoRepository = MedicoRepository,
		servicioRepository = ServicioRepository,
	} = {}) {
		this.medicoRepository = medicoRepository;
		this.servicioRepository = servicioRepository;
	}

	async obtenerServiciosDeMedico(medicoId) {
		const medico = this.medicoRepository.obtenerPorId(medicoId);
		return medico.servicios;
	}

	async agregarServicioAMedico(
		medicoId,
		{ tipoServicio, nombre, precio, duracion },
	) {
		const medico = this.medicoRepository.obtenerPorId(medicoId);
		let nuevoServicio = this.servicioRepository.obtenerPorNombre(nombre);

    if (!nuevoServicio){
      nuevoServicio = new Servicio(tipoServicio, nombre, precio, duracion);
    }

		// Agregamos al médico (usando el método del dominio)
		medico.agregarServicio(nuevoServicio);
		try {
			this.servicioRepository.agregar(nuevoServicio);
		} catch (_e) {
      // TODO: gestionar excepciones
		}

		return nuevoServicio;
	}

	async eliminarServicioDeMedico(medicoId, nombreServicio) {
		const medico = this.medicoRepository.obtenerPorId(medicoId);
    const servicio = this.servicioRepository.obtenerPorNombre(nombreServicio);

    if(!servicio){
      throw new NotFoundError("El servicio especificado no existe.");
    }

		if (!medico.ofrece(servicio)) {
			throw new NotFoundError("El médico no ofrece el servicio especificado.");
		}

		medico.dejarDeOfrecer(servicio)
	}

  // El medico puede actualizar los servicios??? SUS...
  // tener en cuenta que muchos medicos pueden ofrecer el mismo servicio
  // entonces un cambio se ve reflejado en todos los medicos que lo ofrecen e incluso sobre las obras sociales que lo incluyen
  // TODO: consultar
	async actualizarServicioDeMedico(
		medicoId,
		nombreServicio,
		{ precio, duracion },
	) {
		const medico = this.medicoRepository.obtenerPorId(medicoId);

		const servicio = medico.servicios.find(
			(s) => s.nombre.toLowerCase() === nombreServicio.toLowerCase(),
		);

		if (!servicio) {
			throw new NotFoundError("El médico no ofrece el servicio especificado.");
		}

		servicio.precio = precio;
		servicio.duracion = duracion;

		// Guardamos los cambios en el repositorio
		this.medicoRepository.guardarMedico(medicoId, medico);
		return servicio;
	}
}
