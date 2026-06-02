import { notificacionService } from '../services/NotificacionService.js'

class NotificacionController {
  async getUserNotificaciones(req, res, next) {
    // TODO: validar y parsear correctamente los parametros
    const idUser = req.params.idUser
    const vistas = req.query.leidas

    try {
      const notificaciones = await notificacionService.getUserNotificaciones(idUser, vistas)
      res.json(notificaciones.map(notificacionDTO))
    } catch (e) {
      next(e)
    }
  }

  async verNotificacion(req, res, next) {
    const idNotificacion = req.params.idNotificacion
    const idUser = req.params.idUser

    try {
      await notificacionService.verNotificacion(idUser, idNotificacion)
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
    visto: notificacion.visto
  }
}

export const notificacionController = new NotificacionController()
