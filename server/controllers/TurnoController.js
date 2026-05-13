import { TurnoService } from "../services/TurnoService.js"
import { TurnoOutputDTO } from "../dtos/turnoOutputDTO.js"
import { BadRequestError } from "../errors/AppErrors.js"

export class TurnoController{
    constructor({turnoService = new TurnoService} = {}){
        this.turnoService = turnoService
    }


    async actualizar(req, res, next){
        try{
            const turnoId = Number(req.params.id)
            const actualizacionesTurno = req.body

            if (!Number.isInteger(turnoId) || turnoId <= 0) {
                throw new BadRequestError("El id del turno debe ser un entero positivo")
            }
            if (!actualizacionesTurno?.estado) {
                throw new BadRequestError("Se requiere proveer un 'estado' para actualizar el turno")
            }

            const turnoActualizado = await this.turnoService.actualizar(turnoId, actualizacionesTurno)
            console.log(turnoActualizado)

            res.status(200).json(
                new TurnoOutputDTO(
                    turnoActualizado.id,
                    turnoActualizado.medico.nombre,
                    turnoActualizado.servicio.nombre,
                    turnoActualizado.fechaHora,
                    turnoActualizado.sede.nombre,
                    turnoActualizado.estadoActual().estado,
                    turnoActualizado.paciente ? turnoActualizado.costoEstimado(turnoActualizado.servicio) : null
                )
            )

        }catch(error){
            next(error)
        }
    
    }
}