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
		const nuevoServicio = this.servicioRepository.obtenerPorNombre(nombre);

    if (!nuevoServicio){
      nuevoServicio = new Servicio(tipoServicio, nombre, precio, duracion);
    }

	medico.agregarServicio(nuevoServicio);


	try {
		this.servicioRepository.agregar(nuevoServicio);
	} catch (e) {
		throw new Error("No se pudo guardar el servicio correctamente.");
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


	async actualizarServicioDeMedico(
		medicoId,
		nombreServicio,
		datosNuevos,
	) {
		/* Primera forma que lo hice que esta mal ya que cambia al servicio de todos los medicos
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
	*/

		//la forma correcta que afecta solo a este medico particular el cambio
		
		const medico = this.medicoRepository.obtenerPorId(medicoId);

    	 if (!medico) {
    	     throw new NotFoundError("No se encontró el médico.");
    	 }

    	 const indice = medico.servicios.findIndex(
    	     (s) => s.nombre.toLowerCase() === nombreServicio.toLowerCase()
    	    );
   
        if (indice === -1) {
            throw new NotFoundError("El médico no ofrece el servicio especificado.");
        }
   
        const servicioOriginal = medico.servicios[indice];
   
        // Uso el operador spread (...) para crear un objeto nuevo con los mismos datos
        // pero en una dirección de memoria distinta.
        const servicioPropio = { ...servicioOriginal };
   
        if (datosNuevos.precio !== undefined) {
            servicioPropio.precio = datosNuevos.precio;
        }
        if (datosNuevos.duracion !== undefined) {
            servicioPropio.duracion = datosNuevos.duracion;
        }
   
        // Ahora este médico apunta a su propia versión, mientras los demás
        // siguen apuntando al original.
        medico.servicios[indice] = servicioPropio;
   
        this.medicoRepository.guardarMedico(medicoId, medico);
        return servicioPropio;
		
	}
}
