import express from "express"
import { medicoController } from "../config/context.js"

const router = express.Router()

router.route('/:id/disponibilidad')
  .post((req, res, next) => medicoController.agregarDisponibilidad(req, res, next))
  .get((req, res, next) => medicoController.obtenerDisponibilidad(req, res, next))
router.route('/:id/disponibilidad/:bloqueId')
  .delete((req, res, next) => medicoController.eliminarDisponibilidad(req, res, next))
  
export default router
