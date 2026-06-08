import express from "express"
import { busquedaTurnoController, turnoController } from "../config/context.js"
import { validate } from "../middlewares/validate.js"
import { actualizarTurnoSchema } from "../validators/turno.validator.js"
import { buscarTurnosSchema } from "../validators/busqueda.validator.js"

const router = express.Router()

router.route('/')
    .get(validate(buscarTurnosSchema), busquedaTurnoController.buscarTodos)
// FIX: /generar no sigue la convencion rest
router.route('/generar')
    .post(turnoController.generarTurnos)
router.route('/:id')
    .patch(validate(actualizarTurnoSchema), turnoController.actualizar)

export default router
