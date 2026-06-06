import { Router } from "express";
import { notificacionController } from "../config/context.js"
import { validate } from "../middlewares/validate.js"
import { getUserNotificacionesSchema, verNotificacionSchema } from "../validators/notificacion.validator.js"

const notificacionRouter = Router()

notificacionRouter.get('/:idUser', validate(getUserNotificacionesSchema), notificacionController.getUserNotificaciones)
notificacionRouter.patch('/:idUser/:idNotificacion', validate(verNotificacionSchema), notificacionController.verNotificacion)

export default notificacionRouter
