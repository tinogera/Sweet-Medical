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

            let turnoActualizado;
            const estado = actualizacionesTurno.estado;

            switch (estado) {
                case 'RESERVADO':
                    turnoActualizado = await this.turnoService.reservar(turnoId, actualizacionesTurno.responsableId);
                    break;
                case 'CANCELADO': {
                    const rol = actualizacionesTurno.rol;
                    const motivo = actualizacionesTurno.motivo;
                    this.validarRol(rol);
                    this.validarMotivo(motivo);
                    turnoActualizado = await this.turnoService.cancelar(turnoId, rol, motivo);
                    break;
                }
                case 'CONFIRMADO':
                    turnoActualizado = await this.turnoService.confirmar(turnoId);
                    break;
                case 'REALIZADO':
                    turnoActualizado = await this.turnoService.marcarRealizado(turnoId);
                    break;
                default:
                    throw new BadRequestError(`Estado inválido. Ingrese uno de: RESERVADO, CONFIRMADO, CANCELADO, REALIZADO`);
            }

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

    validarRol(rol) {
        const ROLES = ['PACIENTE', 'MEDICO'];
        if (!ROLES.includes(rol)) {
            throw new BadRequestError("Rol inválido. ingrese PACIENTE o MEDICO");
        }
    }

    validarMotivo(motivo) {
        if (typeof motivo !== 'string' || motivo.trim() === '') {
            throw new BadRequestError("El motivo debe ser un texto válido");
        }
    }
}