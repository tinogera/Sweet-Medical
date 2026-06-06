import express from "express"
import { medicoController } from "../config/context.js"
import { validate } from "../middlewares/validate.js"
import { agregarDisponibilidadSchema, obtenerDisponibilidadSchema, eliminarDisponibilidadSchema } from "../validators/medico.validator.js"

const router = express.Router()

router.route('/:id/disponibilidad')
  .post(validate(agregarDisponibilidadSchema), (req, res, next) => medicoController.agregarDisponibilidad(req, res, next))
  .get(validate(obtenerDisponibilidadSchema), (req, res, next) => medicoController.obtenerDisponibilidad(req, res, next))
router.route('/:id/disponibilidad/:bloqueId')
  .delete(validate(eliminarDisponibilidadSchema), (req, res, next) => medicoController.eliminarDisponibilidad(req, res, next))
   
export default router
