import { BadRequestError } from "../errors/AppErrors.js"


export class BusquedaTurnoController {
    constructor({ busquedaTurnoService } = {}) {
        this.busquedaTurnoService = busquedaTurnoService
    }

    buscarTodos = async (req, res, next) => {
        try {
            const paginacion = this.extraerPaginacion(req.query)
            const filtros = this.extraerFiltros(req.query)
            const ordenamiento = this.extraerOrdenamiento(req.query)
            
            const idPaciente = req.query.idPaciente
            if (!idPaciente || String(idPaciente).trim() === "") {
                throw new BadRequestError("El parámetro idPaciente es requerido")
            }

            const resultado = await this.busquedaTurnoService.buscarTurnos({ idPaciente, ...paginacion, filtros, ...ordenamiento } )

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

    extraerOrdenamiento(query) {
        // Por defecto fecha
        const ordenarPor = query.ordenarPor || 'fecha' 

        // Por defecto ascendente
        const direccion = query.direccion || 'asc' 

        if (!['fecha', 'costo'].includes(ordenarPor)) {
            throw new BadRequestError("Solo se puede ordenar por 'fecha' o 'costo'")
        }

        if (!['asc', 'desc'].includes(direccion)) {
            throw new BadRequestError("La dirección debe ser 'asc' o 'desc'")
        }

        return { ordenarPor, direccion }
    }

    extraerFiltros(query) {
        const filtros = {}

        if (query.profesional !== undefined) {
            const profesional = String(query.profesional)
            if (profesional.trim() === "") {
                throw new BadRequestError("El ID del profesional debe ser válido")
            }
            filtros.profesional = profesional
        }

        if (query.especialidad !== undefined) {
            const especialidad = String(query.especialidad)
            if (especialidad.trim() === "") {
                throw new BadRequestError("El servicio debe ser válido")
            }
            filtros.especialidad = especialidad
        }

        if (query.practica !== undefined) {
            const practica = String(query.practica)
            if (practica.trim() === "") {
                throw new BadRequestError("La practica debe ser válida")
            }
            filtros.practica = practica
        }

        if (query.sede !== undefined) {
            const sede = String(query.sede)
            if (sede.trim() === "") {
                throw new BadRequestError("La sede debe ser válida")
            }
            filtros.sede = sede
        }

        if (query.fechaDesde !== undefined) {
            const partes = query.fechaDesde.split('-')
            if (partes.length !== 3) throw new BadRequestError("Formato de fechaDesde inválido")

            const [y, m, d] = partes.map(Number)
            const fechaDesde = new Date(y, m - 1, d)

            if (Number.isNaN(fechaDesde.getTime())) {
                throw new BadRequestError("fechaDesde inválida")
            }

            filtros.fechaDesde = fechaDesde
        }

        if (query.fechaHasta !== undefined) {
            const partes = query.fechaHasta.split('-')
            if (partes.length !== 3) throw new BadRequestError("Formato de fechaHasta inválido")

            const [y, m, d] = partes.map(Number)
            const fechaHasta = new Date(y, m - 1, d, 23, 59, 59, 999)

            if (Number.isNaN(fechaHasta.getTime())) {
                throw new BadRequestError("fechaHasta inválida");
            }

            filtros.fechaHasta = fechaHasta;
        }

        return filtros
    }

    extraerPaginacion(query) {
        const numeroPagina = query?.pagina === undefined ? 1 : Number(query.pagina)
        const limitePorPagina = query?.limite === undefined ? 10 : Number(query.limite)

        this.validarEnteroPositivo(numeroPagina, "pagina")
        this.validarEnteroPositivo(limitePorPagina, "limite")

        return { numeroPagina, limitePorPagina }
    }

    validarEnteroPositivo(numero, parametro) {
        if (!Number.isInteger(numero) || numero <= 0) {
            throw new BadRequestError(`El parámetro ${parametro} debe ser un entero positivo`)
        }
    }
}