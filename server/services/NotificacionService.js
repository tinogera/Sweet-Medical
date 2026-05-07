import { PacienteRepository } from '../repositories/PacienteRepository.js'
import { MedicoRepository } from '../repositories/MedicoRepository.js'


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
    if (!user) {
      user = this.repositoryMedico.obtenerPorId(userId)
    }
    return user
  }

}

export const notificacioneService = new NotificacionService()
