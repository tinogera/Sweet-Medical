import { Router } from "express";
import { notificacionController } from "../config/context.js"

const notificacionRouter = Router()

notificacionRouter.get('/:idUser', notificacionController.getUserNotificaciones)
notificacionRouter.patch('/:idUser/:idNotificacion', notificacionController.verNotificacion)

export default notificacionRouter
