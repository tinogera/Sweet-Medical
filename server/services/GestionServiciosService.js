 import { MedicoRepository } from
      "../repositories/MedicoRepository.js";
     import { ServicioRepository } from
      "../repositories/ServicioRepository.js";
     import { Servicio } from "../domain/servicios/servicio.js";
     import { NotFoundError, BadRequestError } from
      "../errors/AppErrors.js";

 export class GestionServiciosService {
   constructor({
     medicoRepository = MedicoRepository,
     servicioRepository = ServicioRepository
      } = {}) {
        this.medicoRepository = medicoRepository;
        this.servicioRepository = servicioRepository;
      }
   
      async obtenerServiciosDeMedico(medicoId) {
        const medico = this.medicoRepository.obtenerPorId(medicoId);
        return medico.servicios;
      }
   
      async agregarServicioAMedico(medicoId, { tipoServicio, nombre,
      precio, duracion }) {
        const medico = this.medicoRepository.obtenerPorId(medicoId);
   
        // Verificamos si el médico ya ofrece este servicio
        if (medico.servicios.some(s => s.nombre.toLowerCase() ===
      nombre.toLowerCase())) {
            throw new BadRequestError("El médico ya ofrece este servicio.");
        }
   
        const nuevoServicio = new Servicio(tipoServicio, nombre,
      precio, duracion);
   
        // Agregamos al médico (usando el método del dominio)
        medico.agregarServicio(nuevoServicio);
   
        // Opcionalmente lo registramos en el repositorio global si no existe
        try {
            this.servicioRepository.agregar(nuevoServicio);
        } catch (e) {
            // Si ya existe en el global, no hacemos nada
        }
   
        this.medicoRepository.guardarMedico(medicoId, medico);
        return nuevoServicio;
      }
   
      async eliminarServicioDeMedico(medicoId, nombreServicio) {
        const medico = this.medicoRepository.obtenerPorId(medicoId);
   
        const index = medico.servicios.findIndex(s =>
      s.nombre.toLowerCase() === nombreServicio.toLowerCase());
        if (index === -1) {
            throw new NotFoundError("El médico no ofrece el servicio especificado.");
        }
   
        medico.servicios.splice(index, 1);
        this.medicoRepository.guardarMedico(medicoId, medico);
      }
    


      async actualizarServicioDeMedico(medicoId, nombreServicio, { precio, duracion }) {
        const medico = this.medicoRepository.obtenerPorId(medicoId);
  
        const servicio = medico.servicios.find(s =>
           s.nombre.toLowerCase() === nombreServicio.toLowerCase()
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