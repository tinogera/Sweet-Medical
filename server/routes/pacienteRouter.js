import express from "express"
import { pacienteController } from "../config/context.js"
import { validate } from "../middlewares/validate.js"
import { listarTurnosSchema } from "../validators/paciente.validator.js"

const router = express.Router()

router.route('/:id/turnos')
    .get(validate(listarTurnosSchema), pacienteController.listarTurnos)

export default router
