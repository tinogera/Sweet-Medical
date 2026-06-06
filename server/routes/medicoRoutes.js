import express from "express"
import { medicoController } from "../config/context.js"
import { validate } from "../middlewares/validate.js"
import { agregarDisponibilidadSchema, obtenerDisponibilidadSchema, eliminarDisponibilidadSchema } from "../validators/medico.validator.js"

const router = express.Router()

router.route('/:id/disponibilidad')
  .post(validate(agregarDisponibilidadSchema), medicoController.agregarDisponibilidad)
  .get(validate(obtenerDisponibilidadSchema), medicoController.obtenerDisponibilidad)
router.route('/:id/disponibilidad/:bloqueId')
  .delete(validate(eliminarDisponibilidadSchema), medicoController.eliminarDisponibilidad)
   
export default router
