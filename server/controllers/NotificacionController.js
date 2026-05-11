import { notificacionService } from '../services/NotificacionService.js'

class NotificacionController {
  getUserNotificaciones(req, res, next) {
    // TODO: validar y parsear correctamente los parametros
    const idUser = Number(req.params.idUser)
    const vistas = req.query.leidas

    try {
      const notificaciones = notificacionService.getUserNotificaciones(idUser, vistas)
      res.json(notificaciones.map(notificacionDTO))
    } catch (e) {
      next(e)
    }
  }

  verNotificacion(req, res, next) {
    const idNotificacion = req.params.idNotificacion
    const idUser = req.params.idUser

    try {
      notificacionService.verNotificacion(idUser, idNotificacion)
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
