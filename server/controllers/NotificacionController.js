import { notificacionService } from '../services/NotificacionService.js'
import { toHttpError } from '../errors/httpErrorMapper.js'

class NotificacionController {
  getUserNotificaciones(req, res, next) {
    // TODO: validar y parsear correctamente los parametros
    const idUser = Number(req.params.idUser)
    const vistas = req.query.leidas

    try {
      const notificaciones = notificacionService.getUserNotificaciones(idUser, vistas)
      res.json(notificaciones.map(notificacionDTO))
    } catch (e) {
      const { status, message } = toHttpError(e)
      res.status(status).json({ message })
    }
  }

  verNotificacion(req, res, next) {
    const idNotificacion = Number(req.params.idNotificacion)
    const idUser = Number(req.params.idUser)

    try {
      notificacionService.verNotificacion(idUser, idNotificacion)
      res.status(204).json()
    } catch (e) {
      const { status, message } = toHttpError(e)
      res.status(status).json({ message })
    }
  }
}

function notificacionDTO(notificacion) {
  return {
    id: notificacion.id,
    mensaje: notificacion.mensaje,
    fecha: notificacion.fechaHoraEnviado,
    visto: notificacion.visto
  }
}

export const notificacionController = new NotificacionController()
