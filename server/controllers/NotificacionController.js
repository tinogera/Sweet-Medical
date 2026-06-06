class NotificacionController {
  constructor({ notificacionService } = {}) {
    this.notificacionService = notificacionService;
  }

  getUserNotificaciones = async (req, res, next) => {
    const idUser = req.params.idUser
    const vistas = req.validatedQuery.leidas

    try {
      const notificaciones = await this.notificacionService.getUserNotificaciones(idUser, vistas)
      res.json(notificaciones.map(notificacionDTO))
    } catch (e) {
      next(e)
    }
  }

  verNotificacion = async (req, res, next) => {
    const idNotificacion = req.params.idNotificacion
    const idUser = req.params.idUser

    try {
      await this.notificacionService.verNotificacion(idUser, idNotificacion)
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

export { NotificacionController };
