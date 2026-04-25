import express from "express"
import serverRouter from "./serverRoutes.js"

const router = express.Router()

router.use('/healthcheck', serverRouter)

export default router