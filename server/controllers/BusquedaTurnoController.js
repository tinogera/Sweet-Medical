export class BusquedaTurnoController {
    constructor({ busquedaTurnoService } = {}) {
        this.busquedaTurnoService = busquedaTurnoService
    }

    buscarTodos = async (req, res, next) => {
        try {
            const { pagina: numeroPagina, limite: limitePorPagina, ordenarPor, direccion, idPaciente, ...rest } = req.validatedQuery

            const filtros = {}
            if (rest.profesional) filtros.profesional = rest.profesional
            if (rest.especialidad) filtros.especialidad = rest.especialidad
            if (rest.practica) filtros.practica = rest.practica
            if (rest.sede) filtros.sede = rest.sede
            if (rest.fechaDesde) filtros.fechaDesde = new Date(rest.fechaDesde)
            if (rest.fechaHasta) {
                const [y, m, d] = rest.fechaHasta.split('-').map(Number)
                // fechaHasta inclusive
                filtros.fechaHasta = new Date(y, m - 1, d, 23, 59, 59, 999)
            }

            const resultado = await this.busquedaTurnoService
                .buscarTurnos({
                    idPaciente, 
                    numeroPagina, 
                    limitePorPagina, 
                    filtros, 
                    ordenarPor, 
                    direccion
                })

            return res.status(200).json({
                turnos: resultado.turnosDTO,
                paginacion: {
                    numeroPagina: resultado.numeroPagina,
                    limitePorPagina: resultado.limitePorPagina,
                    totalPaginas: resultado.totalPaginas,
                    totalTurnos: resultado.totalTurnos
                }
            })
        } catch (error) {
            return next(error)
        }
    }
}