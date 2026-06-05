import { Servicio } from "../domain/servicios/servicio.js";
import { NotFoundError } from "../errors/AppErrors.js";

export class GestionServiciosService {
	constructor({
		medicoRepository,
		servicioRepository,
	} = {}) {
		this.medicoRepository = medicoRepository;
		this.servicioRepository = servicioRepository;
	}

	async obtenerServiciosDeMedico(medicoId) {
		const medico = await this.medicoRepository.findById(medicoId);

		if (!medico) {
                throw new NotFoundError("No se encontró el médico.");
		}
		
		return medico.servicios;
	}

	async agregarServicioAMedico(
		medicoId,
		{ tipoServicio, nombre, precio, duracion },
	) {
		const medico = await this.medicoRepository.findById(medicoId);

		if (!medico) {
                throw new NotFoundError("No se encontró el médico.");
		}
		let nuevoServicio = await this.servicioRepository.findByName(nombre);

    if (!nuevoServicio){
          nuevoServicio = new Servicio(tipoServicio, nombre, precio, duracion);
	    nuevoServicio = await this.servicioRepository.save(nuevoServicio);
    }

	medico.agregarServicio(nuevoServicio);
	await this.medicoRepository.update(medicoId, medico);

	return nuevoServicio;
	}

	async eliminarServicioDeMedico(medicoId, nombreServicio) {
	
	const medico = await this.medicoRepository.findById(medicoId);

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
	await this.medicoRepository.update(medicoId, medico);
	}


	async actualizarServicioDeMedico(
		medicoId,
		nombreServicio,
		datosNuevos,
	) {
		const medico = await this.medicoRepository.findById(medicoId);

		if (!medico) {
			throw new NotFoundError("No se encontró el médico.");
		}

			const servicioPropio = medico.actualizarServicio(nombreServicio, datosNuevos);
			await this.servicioRepository.update(servicioPropio._id || servicioPropio.id, servicioPropio);
			await this.medicoRepository.update(medicoId, medico);
			return servicioPropio;
		}
}
