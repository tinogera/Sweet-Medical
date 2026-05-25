import { Router } from "express";
import { notificacionController } from '../controllers/NotificacionController.js'

// TODO: refactor como inyeccion de deps
const notificacionRouter = Router()

notificacionRouter.get('/:idUser', notificacionController.getUserNotificaciones)
notificacionRouter.patch('/:idUser/:idNotificacion', notificacionController.verNotificacion)

export default notificacionRouter
