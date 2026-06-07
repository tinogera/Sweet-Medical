import { Servicio } from "../domain/servicios/servicio.js";
import { BadRequestError } from "../errors/AppErrors.js";

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
		return medico.servicios;
	}

	async agregarServicioAMedico(
		medicoId,
		{ tipoServicio, nombre, precio, duracion },
	) {
		const medico = await this.medicoRepository.findById(medicoId);
		let nuevoServicio = await this.servicioRepository.findByName(nombre);

    	if (!nuevoServicio) {
        	nuevoServicio = new Servicio(tipoServicio, nombre, precio, duracion);
	    	nuevoServicio = await this.servicioRepository.save(nuevoServicio);
    	}

		medico.agregarServicio(nuevoServicio);
		await this.medicoRepository.update(medicoId, medico);

		return nuevoServicio;
	}

	async eliminarServicioDeMedico(medicoId, nombreServicio) {
		const medico = await this.medicoRepository.findById(medicoId);
		const servicio = await this.servicioRepository.findByName(nombreServicio);

		if(!servicio){
			throw new BadRequestError("El servicio especificado no existe.");
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

		const servicioPropio = medico.actualizarServicio(nombreServicio, datosNuevos);
		await this.servicioRepository.update(servicioPropio._id || servicioPropio.id, servicioPropio);
		await this.medicoRepository.update(medicoId, medico);
		return servicioPropio;
	}
}
