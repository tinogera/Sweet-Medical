import express from "express"
import { BusquedaTurnoController } from "../controllers/BusquedaTurnoController.js"

const busquedaTurnoController = new BusquedaTurnoController()

const router = express.Router()

router.route('/')
    .get((req, res) => busquedaTurnoController.buscarTodos(req, res))

export default router