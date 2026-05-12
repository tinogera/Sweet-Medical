import express from "express"
import { BusquedaTurnoController } from "../controllers/BusquedaTurnoController.js"
import { TurnoController } from "../controllers/TurnoController.js"

const turnoController = new TurnoController()
const busquedaTurnoController = new BusquedaTurnoController()

const router = express.Router()

router.route('/')
    .get((req, res, next) => busquedaTurnoController.buscarTodos(req, res, next))
router.route('/:id')
    .patch((req, res, next) => turnoController.actualizar(req, res, next))

export default router