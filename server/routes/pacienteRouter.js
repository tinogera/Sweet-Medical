import express from "express"
import { PacienteController } from "../controllers/PacienteController.js"

const pacienteController = new PacienteController()

const router = express.Router()


router.route('/:id/turnos')
    .get((req, res, next) => pacienteController.listarTurnos(req, res, next))



export default router