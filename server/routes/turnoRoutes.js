import express from "express"
import { busquedaTurnoController, turnoController } from "../config/context.js"

const router = express.Router()

router.route('/')
    .get((req, res, next) => busquedaTurnoController.buscarTodos(req, res, next))
router.route('/generar')
    .post((req, res, next) => turnoController.generarTurnos(req, res, next))
router.route('/:id')
    .patch((req, res, next) => turnoController.actualizar(req, res, next))

export default router
