import express from "express";
import { gestionServiciosController } from "../config/context.js";

const router = express.Router();

router
	.route("/:id/servicios")
	.get(gestionServiciosController.listarPorMedico)
	.post(gestionServiciosController.agregarAMedico);

router
	.route("/:id/servicios/:nombre")
	.delete(gestionServiciosController.eliminarDeMedico)
	.patch(gestionServiciosController.actualizarEnMedico);

export default router;
