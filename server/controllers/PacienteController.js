import { PacienteService } from "../services/PacienteService.js"
import { BadRequestError } from "../errors/AppErrors.js"
import { TurnoOutputDTO } from "../dtos/turnoOutputDTO.js"


export class PacienteController{
    constructor({pacienteService = new PacienteService} = {}){
        this.pacienteService = pacienteService
    }


    async listarTurnos(req, res, next){
        try{
            const pacienteId = Number(req.params.id)
            this.validarEnteroPositivo(pacienteId)
            const paginacion = this.extraerPaginacion(req.query)

            const resultado = await this.pacienteService.listarTurnos(pacienteId, paginacion)

            const turnosDTO = resultado.turnos.map(t => new TurnoOutputDTO(
                t.id,
                t.medico.nombre,
                t.servicio.nombre,
                t.fechaHora,
                t.sede.nombre,
                t.estadoActual().estado,
                t.paciente.plan.precioDe(t.servicio)
            ))

            res.status(200).json({
                turnos: turnosDTO,
                paginacion: {
                    numeroDePagina: resultado.numeroDePagina,
                    limite: resultado.limite,
                    totalPaginas: resultado.totalPaginas,
                    totalTurnos: resultado.totalTurnos
                }
            })

        }catch(error){
            next(error)
        }
    }


    extraerPaginacion(query){
        const numeroDePagina = query?.page === undefined ? 1 : Number(query.page)
        const limite = query?.limit === undefined ? 10 : Number(query.limit)

        this.validarEnteroPositivo(numeroDePagina)
        this.validarEnteroPositivo(limite)

        return {
            numeroDePagina,
            limite
        }
    }

    validarEnteroPositivo(valor) {
        if(!Number.isInteger(valor) || valor <= 0){
            throw new BadRequestError("El parámetro debe ser un entero positivo")
        }
    }
}