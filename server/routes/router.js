import express from "express"
import serverRouter from "./serverRoutes.js"
import turnoRouter from "./turnoRoutes.js"
import seederRouter from "./seederRoutes.js"
import servicioMedicoRouter from "./servicioMedicoRoutes.js"
import notificacionRouter from "./notificacionRoutes.js"
import pacienteRouter from "./pacienteRouter.js"
import medicoRouter from "./medicoRoutes.js"
import serviciosRouter from "./serviciosRoutes.js"

const router = express.Router()

router.use('/healthcheck', serverRouter)
router.use('/seeder', seederRouter)
router.use('/turnos', turnoRouter)
router.use('/medicos', servicioMedicoRouter)
router.use('/notificaciones', notificacionRouter)
router.use('/pacientes', pacienteRouter)
router.use('/medicos', medicoRouter)
router.use('/servicios', serviciosRouter)

export default router
