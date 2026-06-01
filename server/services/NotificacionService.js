import { usuarioRepository } from '../repositories/UsuarioRepository.js'

class NotificacionService {
  repositoryUsuario = usuarioRepository;

  getUserNotificaciones(userId, vistas) {
    const user = this.repositoryUsuario.getById(userId);
    const notificaciones = vistas === undefined
      ? user.notificaciones
      : (vistas ? user.obtenerNotificacionesLeidas() : user.obtenerNotificacionesSinLeer())
    return notificaciones
  }

  verNotificacion(userId, notificacionId) {
    const user = this.repositoryUsuario.getById(userId)
    user.verNotificacion(notificacionId)
  }

}

export const notificacionService = new NotificacionService()
