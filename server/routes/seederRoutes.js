import express from "express"
import { SeederController } from "../controllers/SeederController.js"

const seederController = new SeederController()
const router = express.Router()

router.route('/')
    .post((req, res, next) => seederController.seeder(req, res, next))

export default router
