import { Notificacion } from "../domain/notificaciones/notificacion.js"

export class TurnoService{
    constructor({ turnoRepository, pacienteRepository, medicoRepository } = {}) {
        this.turnoRepository = turnoRepository
        this.pacienteRepository = pacienteRepository
        this.medicoRepository = medicoRepository
    }

    async reservar(id, responsableId) {
        const turno = await this.turnoRepository.obtenerPorId(id)
        const paciente = await this.pacienteRepository.obtenerPorId(responsableId)

        // cambia su estado interior
        turno.reservar(paciente)

        const mensaje = `El paciente ${paciente.nombre} ${paciente.apellido} ha reservado un turno para: ${turno.servicio.nombre}.`
        turno.medico.recibirNotificacion(new Notificacion({ 
            destinatario: "sistema@clinica.com", 
            mensaje: mensaje 
        }))

        const turnoReservado = await this.turnoRepository.guardarTurno(turno)

        return turnoReservado
    }

    async cancelar(id, rol, motivo) {
        const turno = await this.turnoRepository.obtenerPorId(id)

        const [responsable, contraparte] = (rol === "PACIENTE") 
            ? [turno.paciente, turno.medico] 
            : [turno.medico, turno.paciente];
        
        turno.cancelar(responsable, motivo)
        const mensajeCancelacion = `El turno para ${turno.servicio.nombre} fue cancelado. Motivo: ${motivo}`
        contraparte.recibirNotificacion(new Notificacion({
            // FIX: paciente no tiene email
            destinatario: contraparte.email, 
            mensaje: mensajeCancelacion 
        }))

        return await this.turnoRepository.guardarTurno(id, turno)
    }

    async confirmar(id) {
        const turno = await this.turnoRepository.obtenerPorId(id)

        // FIX: no se contempla que el que tenga que confirmar sea el paciente
        turno.confirmar(turno.medico)
        
        if (turno.paciente) {
            const mensajeConfirmacion = `Tu turno para ${turno.servicio.nombre} ha sido confirmado por el médico.`
            turno.paciente.recibirNotificacion(new Notificacion({
                destinatario: turno.paciente.email, 
                mensaje: mensajeConfirmacion 
            }))
        }

        return await this.turnoRepository.guardarTurno(turno)
    }

    async marcarRealizado(id) {
        const turno = await this.turnoRepository.obtenerPorId(id)
        turno.marcarRealizado()
        return await this.turnoRepository.guardarTurno(turno)
    }


    async generarTodosLosTurnos() {
        const medicos = await this.medicoRepository.obtenerTodos()

        // Recorremos los médicos y obtenemos una lista plana de todos los turnos generados
        const todosLosTurnosNuevos = medicos.flatMap(medico => 
            medico.agenda.flatMap(bloque => medico.generarTurnos(bloque))
        )

        // Guardamos todos los turnos generados en el repositorio general
        for (const turno of todosLosTurnosNuevos) {
            await this.turnoRepository.agregarTurno(turno)
        }

        return todosLosTurnosNuevos.length
        
    }
}
