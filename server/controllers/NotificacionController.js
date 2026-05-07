import { NotificacionService } from '../services/NotificacionService.js'

class NotificacionController {
  service = NotificacionService

  getUserNotificaciones(req, res, next) {
    const idUser = req.params.idUser
    const vistas = req.query.leidas

    try {
      const notificaciones = this.service.getUserNotificaciones(idUser, vistas)
      res.json(notificaciones.map(notificacionDTO))
    } catch (e) {
      next(e)
    }
  }

  verNotificacion(req, res, next) {
    const idNotificacion = req.params.idNotificacion
    const idUser = req.params.idUser

    try {
      this.service.verNotificacion(idUser, idNotificacion)
      res.status(204).json()
    } catch (e) {
      next(e)
    }
  }
}

function notificacionDTO(notificacion) {
  return {
    id: notificacion.id,
    mensaje: notificacion.mensaje,
    fecha: notificacion.fechaHoraEnviado,
  }
}

export const notificacionController = new NotificacionController()
