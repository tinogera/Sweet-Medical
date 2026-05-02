import express from "express"
import { ServerController } from "../controllers/ServerController.js"

const serverController = new ServerController()

const  router = express.Router()

router.route('/')
    .get((req, res) => serverController.healthcheck(req, res))

export default router