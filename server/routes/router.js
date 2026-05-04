import express from "express"
import serverRouter from "./serverRoutes.js"
import turnoRouter from "./turnoRoutes.js"

const router = express.Router()

router.use('/healthcheck', serverRouter)
router.use('/turnos', turnoRouter)

export default router