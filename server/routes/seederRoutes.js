import express from "express"
import { seederController } from "../config/context.js"

const router = express.Router()

router.route('/')
    .post((req, res, next) => seederController.seeder(req, res, next))

export default router
