import {BusquedaTurnoService} from "../services/BusquedaTurnoService.js"
import { BadRequestError } from "../errors/appErrors.js"

export class BusquedaTurnoController {
    constructor({ busquedaTurnoService = new BusquedaTurnoService() } = {}) {
        this.busquedaTurnoService = busquedaTurnoService
    }

    buscarTodos = async (req, res, next) => {
        try {
            const paginacion = this.extraerPaginacion(req.query)
            const filtros = this.extraerFiltros(req.query)
            const idPaciente = parseInt(req.query.idPaciente)
            if (isNaN(idPaciente)) {
                throw new BadRequestError("El parámetro idPaciente es requerido y debe ser un número")
            
            }
            
            const resultado = await this.busquedaTurnoService.buscarTurnos({ idPaciente, ...paginacion, filtros } )

            return res.status(200).json({
                data: resultado.turnosDTO,
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

    extraerFiltros(query) {
        const filtros = {}

        if (query.profesional !== undefined) {
            const profesional = Number(query.profesional)
            if (!Number.isFinite(profesional)) {
                throw new BadRequestError("El profesional debe ser un ID con número válido")
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
            const fechaDesde = new Date(query.fechaDesde)

            if (isNaN(fechaDesde.getTime())) {
                throw new BadRequestError("fechaDesde inválida")
            }

            filtros.fechaDesde = fechaDesde
        }

        if (query.fechaHasta !== undefined) {
            const fechaHasta = new Date(query.fechaHasta)

            if (isNaN(fechaHasta.getTime())) {
                throw new BadRequestError("fechaHasta inválida")
            }

            filtros.fechaHasta = fechaHasta
        }

        return filtros
    }

    extraerPaginacion(query) {
        const numeroPagina = query?.page === undefined ? 1 : Number(query.page)
        const limitePorPagina = query?.limit === undefined ? 10 : Number(query.limit)

        this.validarEnteroPositivo(numeroPagina, "page")
        this.validarEnteroPositivo(limitePorPagina, "limit")

        return { numeroPagina, limitePorPagina }
    }

    validarEnteroPositivo(numero, parametro) {
        if (!Number.isInteger(numero) || numero <= 0) {
            throw new BadRequestError(`El parámetro ${parametro} debe ser un entero positivo`)
        }
    }
}