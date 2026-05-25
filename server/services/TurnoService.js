import { TurnoRepository } from "../repositories/TurnoRepository.js"
import { PacienteRepository } from "../repositories/PacienteRepository.js"
import { MedicoRepository } from "../repositories/MedicoRepository.js"
import { BadRequestError } from "../errors/AppErrors.js"
import { Notificacion } from "../domain/notificaciones/notificacion.js"

export class TurnoService{
    constructor({ turnoRepository = TurnoRepository, pacienteRepository = PacienteRepository, medicoRepository = MedicoRepository} = {}) {
        this.turnoRepository = turnoRepository
        this.pacienteRepository = pacienteRepository
        this.medicoRepository = medicoRepository
    }

    async actualizar(id, actualizaciones) {
        const ESTADOS = ['DISPONIBLE', 'RESERVADO', 'CONFIRMADO', 'CANCELADO', 'REALIZADO']

        if(!ESTADOS.includes(actualizaciones.estado)){
            throw new BadRequestError(`Estado inválido. Ingrese uno de: ${ESTADOS.join(', ')}`)
        }

        const turno = await this.turnoRepository.obtenerPorId(id) 
        const estado = actualizaciones.estado 
        const rol = actualizaciones.rol
        

        if(estado === "RESERVADO"){
            if(!actualizaciones.responsableId) throw new BadRequestError("Se requiere responsableId para reservar un turno")
            const paciente = await this.pacienteRepository.obtenerPorId(actualizaciones.responsableId) 
            turno.reservar(paciente)

            const mensaje = `El paciente ${paciente.nombre} ${paciente.apellido} ha reservado un turno para: ${turno.servicio.nombre}.`
            turno.medico.recibirNotificacion(new Notificacion("sistema@clinica.com", mensaje))
        }


        if(estado === "CANCELADO"){
            const motivo = actualizaciones.motivo 
            const _rol = actualizaciones.rol
            this.validarMotivo(motivo)
            this.validarRol(rol)
            const [responsable, contraparte] = (rol === "PACIENTE") 
                ? [turno.paciente, turno.medico] 
                : [turno.medico, turno.paciente];
            turno.cancelar(responsable, motivo)
            const mensajeCancelacion = `El turno para ${turno.servicio.nombre} fue cancelado. Motivo: ${motivo}`
            contraparte.recibirNotificacion(new Notificacion("sistema@clinica.com", mensajeCancelacion))

        }

        if(estado === "REALIZADO"){
            turno.marcarRealizado()
        }

        if(estado === "CONFIRMADO"){
            turno.confirmar(turno.medico)
            
            if (turno.paciente) {
                const mensajeConfirmacion = `Tu turno para ${turno.servicio.nombre} ha sido confirmado por el médico.`
                turno.paciente.recibirNotificacion(new Notificacion("sistema@clinica.com", mensajeConfirmacion))
            }
        }


        const turnoActualizado = await this.turnoRepository.guardarturno(id, turno)
        return turnoActualizado
    
    }


    validarRol(rol){
        const ROLES = ['PACIENTE', 'MEDICO']
        if(!ROLES.includes(rol)){
            throw new BadRequestError("Rol inválido. ingrese PACIENTE o MEDICO")
        }
    }

    validarMotivo(motivo){
        if(typeof motivo !== 'string'){
            throw new BadRequestError("El motivo debe ser un texto válido")
        } 
    }
}