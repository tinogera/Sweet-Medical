import { TurnoOutputDTO } from "../dtos/turnoOutputDTO.js"


export class PacienteController{
    constructor({pacienteService} = {}){
        this.pacienteService = pacienteService
    }


    listarTodos = async (req, res, next) => {
        try {
            const pacientes = await this.pacienteService.listarTodos();
            return res.status(200).json(pacientes.map(p => ({
                id: p.id,
                nombre: p.nombre,
                apellido: p.apellido,
            })));
        } catch (e) {
            return next(e);
        }
    }

    listarTurnos = async (req, res, next) => {
        try{
            const pacienteId = req.params.id
            const { pagina: numeroDePagina, limite } = req.validatedQuery

            const resultado = await this.pacienteService.listarTurnos(pacienteId, { numeroDePagina, limite })

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
}