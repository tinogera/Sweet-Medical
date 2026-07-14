import express from "express";
import { servicioController } from "../config/context.js"

const router = express.Router()

router
    .route("/")
    .get(servicioController.getAll)

export default router