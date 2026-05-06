import express from "express";
import { GestionServiciosController } from
      "../controllers/GestionServiciosController.js";
    
     const controller = new GestionServiciosController();
     const router = express.Router();
    

    
    router.route('/:id/servicios')
      .get(controller.listarPorMedico)
      .post(controller.agregarAMedico);
   
    router.route('/:id/servicios/:nombre')
      .delete(controller.eliminarDeMedico)
      .put(controller.actualizarEnMedico);
   
    export default router;