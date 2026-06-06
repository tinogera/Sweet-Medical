class NotificacionController {
  constructor({ notificacionService } = {}) {
    this.notificacionService = notificacionService;
  }

  getUserNotificaciones = async (req, res, next) => {
    // TODO: validar y parsear correctamente los parametros
    const idUser = req.params.idUser
    //por que viene como string y lo convierto a booleano
    const vistas = req.query.leidas !== undefined ? req.query.leidas === "true" : undefined

    try {
      const notificaciones = await this.notificacionService.getUserNotificaciones(idUser, vistas)
      res.json(notificaciones.map(notificacionDTO))
    } catch (e) {
      next(e)
    }
  }

  verNotificacion = async (req, res, next) => {
    //por que llega como string
    const idNotificacion = Number(req.params.idNotificacion)
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
