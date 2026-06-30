import express from "express";
import { gestionServiciosController } from "../config/context.js";
import { validate } from "../middlewares/validate.js"
import { listarPorMedicoSchema, agregarAMedicoSchema, eliminarSchema, actualizarSchema } from "../validators/servicios.validator.js"

const router = express.Router();

router
	.route("/:id/servicios")
	.get(validate(listarPorMedicoSchema), gestionServiciosController.listarPorMedico)
	.post(validate(agregarAMedicoSchema), gestionServiciosController.agregarAMedico);

router
	.route("/:id/servicios/:nombre")
	.delete(validate(eliminarSchema), gestionServiciosController.eliminarDeMedico)
	.patch(validate(actualizarSchema), gestionServiciosController.actualizarEnMedico);

export default router;
