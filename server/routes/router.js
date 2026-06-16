import express from "express"
import serverRouter from "./serverRoutes.js"
import turnoRouter from "./turnoRoutes.js"
import seederRouter from "./seederRoutes.js"
import servicioRouter from "./servicioRoutes.js"
import notificacionRouter from "./notificacionRoutes.js"
import pacienteRouter from "./pacienteRouter.js"
import medicoRouter from "./medicoRoutes.js"

const router = express.Router()

router.use('/healthcheck', serverRouter)
router.use('/seeder', seederRouter)
router.use('/turnos', turnoRouter)
router.use('/medicos', servicioRouter)
router.use('/notificaciones', notificacionRouter)
router.use('/pacientes', pacienteRouter)
router.use('/medicos', medicoRouter)

export default router
