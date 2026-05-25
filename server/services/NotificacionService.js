import { PacienteRepository } from '../repositories/PacienteRepository.js'
import { MedicoRepository } from '../repositories/MedicoRepository.js'
import { NotFoundError } from '../errors/AppErrors.js'


class NotificacionService {
  repositoryMedico = MedicoRepository
  repositoryPaciente = PacienteRepository

  getUserNotificaciones(userId, vistas) {
    const user = this.encontrarUserById(userId)
    const notificaciones = vistas === undefined
      ? user.notificaciones
      : (vistas ? user.obtenerNotificacionesLeida() : user.obtenerNotificacionesSinLeer())
    return notificaciones
  }

  verNotificacion(userId, notificacionId) {
    const user = this.encontrarUserById(userId)
    user.verNotificacion(notificacionId)
  }

  encontrarUserById(userId) {
    let user = this.repositoryPaciente.obtenerPorId(userId)
    //console.log("pacientes: ", this.repositoryPaciente.listar())
    if (!user) {
      user = this.repositoryMedico.obtenerPorId(userId)
      //console.log("medicos: ", this.repositoryMedico.listar())
    }

    if (!user) {
      throw new NotFoundError("Usuario no encontrado")
    }

    return user
  }

}

export const notificacionService = new NotificacionService()
