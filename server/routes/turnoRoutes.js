import express from "express"
import { BusquedaTurnoController } from "../controllers/BusquedaTurnoController.js"

const busquedaTurnoController = new BusquedaTurnoController()

const router = express.Router()

router.route('/')
    .get((req, res, next) => busquedaTurnoController.buscarTodos(req, res, next))

export default router