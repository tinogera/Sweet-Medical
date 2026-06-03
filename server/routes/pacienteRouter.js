import express from "express"
import { pacienteController } from "../config/context.js"

const router = express.Router()

router.route('/:id/turnos')
    .get((req, res, next) => pacienteController.listarTurnos(req, res, next))

export default router
