import { Notificacion } from "../domain/notificaciones/notificacion.js"

export class TurnoService{
    constructor({ turnoRepository, pacienteRepository, medicoRepository, servicioRepository } = {}) {
        this.turnoRepository = turnoRepository
        this.pacienteRepository = pacienteRepository
        this.medicoRepository = medicoRepository
        this.servicioRepository = servicioRepository
    }

    async reservar(id, { responsableId, servicioId }) {
        const turno = await this.turnoRepository.obtenerPorId(id)
        const paciente = await this.pacienteRepository.obtenerPorId(responsableId)
        const servicio = await this.servicioRepository.findById(servicioId)

        turno.reservar(paciente, servicio)

        const mensaje = `El paciente ${paciente.nombre} ${paciente.apellido} ha reservado un turno para: ${turno.servicio.nombre}.`
        turno.medico.usuario.recibirNotificacion(new Notificacion({ 
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
        
        const nombreServicio = turno.servicio?.nombre || "servicio";

        turno.cancelar(responsable, motivo)
        const mensajeCancelacion = `El turno para ${nombreServicio} fue cancelado. Motivo: ${motivo}`
        if (contraparte && contraparte.usuario) {
            contraparte.usuario.recibirNotificacion(new Notificacion({
                destinatario: contraparte.usuario.nombre, 
                mensaje: mensajeCancelacion 
            }))
        }

        return await this.turnoRepository.guardarTurno(turno)
    }

    async confirmar(id) {
        const turno = await this.turnoRepository.obtenerPorId(id)

        // FIX: no se contempla que el que tenga que confirmar sea el paciente
        turno.confirmar(turno.medico)
        
        if (turno.paciente) {
            const mensajeConfirmacion = `Tu turno para ${turno.servicio.nombre} ha sido confirmado por el médico.`
            turno.paciente.recibirNotificacion(new Notificacion({
                destinatario: turno.paciente.usuario.nombre, 
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
        const medicos = await this.medicoRepository.findAll()

        // Recorremos los médicos y obtenemos una lista plana de todos los turnos generados
        const todosLosTurnosNuevos = medicos.flatMap(medico => {
            return medico.agenda.flatMap(bloque => medico.generarTurnos(bloque))
        }
        )

        // Guardamos todos los turnos generados en el repositorio general
        for (const turno of todosLosTurnosNuevos) {
            await this.turnoRepository.agregarTurno(turno)
        }

        return todosLosTurnosNuevos.length
        
    }
}
