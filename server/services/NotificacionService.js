import { usuarioRepository } from '../repositories/UsuarioRepository.js'

class NotificacionService {
  repositoryUsuario = usuarioRepository;

  async getUserNotificaciones(userId, vistas) {
    const user = await this.repositoryUsuario.getById(userId);
    console.log(user)
    const notificaciones = vistas === undefined
      ? user.notificaciones
      : (vistas ? user.obtenerNotificacionesLeidas() : user.obtenerNotificacionesSinLeer())
    return notificaciones
  }

  async verNotificacion(userId, notificacionId) {
    const user = await this.repositoryUsuario.getById(userId)
    user.verNotificacion(notificacionId)
    await this.repositoryUsuario.save(user)
  }

}

export const notificacionService = new NotificacionService()
