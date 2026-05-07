import { Router } from "express";
import { NotificacionController } from '../controllers/NotificacionController.js'

// TODO: refactor como inyeccion de deps
export const notificacionRouter = Router()

notificacionRouter.get('/:idUser', NotificacionController.getUserNotificaciones)
notificacionRouter.patch('/:idUser/:idNotificacion', NotificacionController.verNotificacion)

