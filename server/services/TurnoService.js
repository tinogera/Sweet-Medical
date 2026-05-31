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

    async reservar(id, responsableId) {
        const turno = await this.turnoRepository.obtenerPorId(id) 
        const paciente = await this.pacienteRepository.obtenerPorId(responsableId) 
        turno.reservar(paciente)

        const mensaje = `El paciente ${paciente.nombre} ${paciente.apellido} ha reservado un turno para: ${turno.servicio.nombre}.`
        turno.medico.recibirNotificacion(new Notificacion("sistema@clinica.com", mensaje))

        return await this.turnoRepository.guardarturno(id, turno)
    }

    async cancelar(id, rol, motivo) {
        const turno = await this.turnoRepository.obtenerPorId(id)

        const [responsable, contraparte] = (rol === "PACIENTE") 
            ? [turno.paciente, turno.medico] 
            : [turno.medico, turno.paciente];
        
        turno.cancelar(responsable, motivo)
        const mensajeCancelacion = `El turno para ${turno.servicio.nombre} fue cancelado. Motivo: ${motivo}`
        contraparte.recibirNotificacion(new Notificacion("sistema@clinica.com", mensajeCancelacion))

        return await this.turnoRepository.guardarturno(id, turno)
    }

    async confirmar(id) {
        const turno = await this.turnoRepository.obtenerPorId(id)
        turno.confirmar(turno.medico)
        
        if (turno.paciente) {
            const mensajeConfirmacion = `Tu turno para ${turno.servicio.nombre} ha sido confirmado por el médico.`
            turno.paciente.recibirNotificacion(new Notificacion("sistema@clinica.com", mensajeConfirmacion))
        }

        return await this.turnoRepository.guardarturno(id, turno)
    }

    async marcarRealizado(id) {
        const turno = await this.turnoRepository.obtenerPorId(id)
        turno.marcarRealizado()
        return await this.turnoRepository.guardarturno(id, turno)
    }


    async generarTodosLosTurnos() {
        const medicos = await this.medicoRepository.obtenerTodos()

        // Recorremos los médicos y obtenemos una lista plana de todos los turnos generados
        const todosLosTurnosNuevos = medicos.flatMap(medico => 
            medico.agenda.flatMap(bloque => medico.generarTurnos(bloque))
        )

        // Guardamos todos los turnos generados en el repositorio general
        for (const turno of todosLosTurnosNuevos) {
            this.turnoRepository.agregarTurno(turno)
        }

        return todosLosTurnosNuevos.length
        
    }
}