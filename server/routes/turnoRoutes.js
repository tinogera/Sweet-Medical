import express from "express"
import { busquedaTurnoController, turnoController } from "../config/context.js"
import { validate } from "../middlewares/validate.js"
import { actualizarTurnoSchema, generarTurnosSchema } from "../validators/turno.validator.js"
import { buscarTurnosSchema } from "../validators/busqueda.validator.js"

const router = express.Router()

router.route('/')
    .get(validate(buscarTurnosSchema), (req, res, next) => busquedaTurnoController.buscarTodos(req, res, next))
router.route('/generar')
    .post(validate(generarTurnosSchema), (req, res, next) => turnoController.generarTurnos(req, res, next))
router.route('/:id')
    .patch(validate(actualizarTurnoSchema), (req, res, next) => turnoController.actualizar(req, res, next))

export default router
