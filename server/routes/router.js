import express from "express"
import serverRouter from "./serverRoutes.js"
import turnoRouter from "./turnoRoutes.js"
import seederRouter from "./seederRoutes.js"
import servicioRouter from "./servicioRoutes.js"

const router = express.Router()

router.use('/healthcheck', serverRouter)
router.use('/seeder', seederRouter)
router.use('/turnos', turnoRouter)
router.use('/medicos', servicioRouter) 

export default router