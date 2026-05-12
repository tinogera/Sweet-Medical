import { TurnoService } from "../services/TurnoService.js"
import { TurnoOutputDTO } from "../dtos/turnoOutputDTO.js"

export class TurnoController{
    constructor({turnoService = new TurnoService} = {}){
        this.turnoService = turnoService
    }


    async actualizar(req, res, next){
        try{
            const turnoId = Number(req.params.id)
            const actualizacionesTurno = req.body

            const turnoActualizado = await this.turnoService.actualizar(turnoId, actualizacionesTurno)

            res.status(200).json(
                new TurnoOutputDTO(
                    turnoActualizado.medico.nombre,
                    turnoActualizado.servicio.nombre,
                    turnoActualizado.fechaHora,
                    turnoActualizado.sede.nombre,
                    turnoActualizado.estadoActual().estado,
                    turnoActualizado.paciente.plan.precioDe(turnoActualizado.servicio)
                )
            )

        }catch(error){
            next(error)
        }
    
    }
}