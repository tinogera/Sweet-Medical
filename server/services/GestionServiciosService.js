import { MedicoRepository } from "../repositories/MedicoRepository.js";
import { ServicioRepository } from "../repositories/ServicioRepository.js";
import { Servicio } from "../domain/servicios/servicio.js";
import { NotFoundError } from "../errors/AppErrors.js";

export class GestionServiciosService {
	constructor({
		medicoRepository = MedicoRepository,
		servicioRepository = new ServicioRepository(),
	} = {}) {
		this.medicoRepository = medicoRepository;
		this.servicioRepository = servicioRepository;
	}

	async obtenerServiciosDeMedico(medicoId) {
		const medico = this.medicoRepository.obtenerPorId(medicoId);

		if (!medico) {
                throw new NotFoundError("No se encontró el médico.");
		}
		
		return medico.servicios;
	}

	async agregarServicioAMedico(
		medicoId,
		{ tipoServicio, nombre, precio, duracion },
	) {
		const medico = this.medicoRepository.obtenerPorId(medicoId);

		if (!medico) {
                throw new NotFoundError("No se encontró el médico.");
		}
		let nuevoServicio = await this.servicioRepository.findByName(nombre);

    if (!nuevoServicio){
      nuevoServicio = new Servicio(tipoServicio, nombre, precio, duracion);
	    nuevoServicio = await this.servicioRepository.save(nuevoServicio);
    }

	medico.agregarServicio(nuevoServicio);

	return nuevoServicio;
	}

	async eliminarServicioDeMedico(medicoId, nombreServicio) {
	
	const medico = this.medicoRepository.obtenerPorId(medicoId);

	if (!medico) {
                throw new NotFoundError("No se encontró el médico.");
		}

    const servicio = await this.servicioRepository.findByName(nombreServicio);

    if(!servicio){
      throw new NotFoundError("El servicio especificado no existe.");
    }

	if (!medico.ofrece(servicio)) {
		throw new NotFoundError("El médico no ofrece el servicio especificado.");
	}

	medico.dejarDeOfrecer(servicio)
	}


	async actualizarServicioDeMedico(
		medicoId,
		nombreServicio,
		datosNuevos,
	) {
		const medico = this.medicoRepository.obtenerPorId(medicoId);

		if (!medico) {
			throw new NotFoundError("No se encontró el médico.");
		}

			const servicioPropio = medico.actualizarServicio(nombreServicio, datosNuevos);
			this.medicoRepository.guardarMedico(medicoId, medico);
			return servicioPropio;
		}
}
