import { TurnoOutputDTO } from "../dtos/turnoOutputDTO.js"
import { BadRequestError } from "../errors/AppErrors.js"

export class TurnoController{
    constructor({turnoService} = {}){
        this.turnoService = turnoService
    }


    actualizar = async (req, res, next) => {
        try{
            const turnoId = req.params.id
            const actualizacionesTurno = req.body

            let turnoActualizado;
            const estado = actualizacionesTurno.estado;

            switch (estado) {
                case 'RESERVADO':
                    turnoActualizado = await this.turnoService.reservar(turnoId, actualizacionesTurno.responsableId);
                    break;
                case 'CANCELADO':
                    turnoActualizado = await this.turnoService.cancelar(turnoId, actualizacionesTurno.rol, actualizacionesTurno.motivo);
                    break;
                case 'CONFIRMADO':
                    turnoActualizado = await this.turnoService.confirmar(turnoId);
                    break;
                case 'REALIZADO':
                    turnoActualizado = await this.turnoService.marcarRealizado(turnoId);
                    break;
                default:
                    throw new BadRequestError(`Estado inválido. Ingrese uno de: RESERVADO, CONFIRMADO, CANCELADO, REALIZADO`);
            }

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

    generarTurnos = async (_req, res, next) => {
        try {
            const resultado = await this.turnoService.generarTodosLosTurnos()

            res.status(201).json({
                status: "success",
                message: "Turnos generados internamente con éxito",
                data: resultado
            })
        } catch (error) {
            next(error)
        }
    }
}