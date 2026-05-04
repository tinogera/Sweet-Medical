import { Turno } from "../domain/turnos/turno.js"
import { TurnoRepository } from "../repositories/TurnoRepository.js"
import { AppError } from "../errors/appErrors.js"

export class BusquedaTurnoService {

    constructor({ turnoRepository = new TurnoRepository() } = {} ) {
        this.turnoRepository = turnoRepository
    }

    buscarTurnos({ numeroPagina = 1, limitePorPagina = 10, filtros = {} } = {}) {
        this.validarPaginacion(numeroPagina, limitePorPagina)
        this.validarFiltros(filtros)

        const { turnos, totalTurnos } = this.turnoRepository.obtenerPaginados(
            numeroPagina,
            limitePorPagina,
            filtros
        )

        const totalPaginas = totalTurnos === 0 ? 0 : Math.ceil(totalTurnos / limitePorPagina)

        return {
            turnos,
            numeroPagina,
            limitePorPagina,
            totalPaginas,
            totalTurnos
        }
    }

    validarPaginacion(numeroPagina, limitePorPagina) {
        this.validarEnteroPositivo(numeroPagina, "Numero de página")
        this.validarEnteroPositivo(limitePorPagina, "Límite por página")
    }

    validarFiltros(filtros) {

        // TODO ver validaciones faltantes
        if (filtros.fechaDesde && filtros.fechaHasta) {
            if (filtros.fechaDesde > filtros.fechaHasta) {
                throw new BadRequestError("fechaDesde no puede ser mayor que fechaHasta")
            }
        }

    }

    validarEnteroPositivo(numero, parametro) {
        if (!Number.isInteger(numero) || numero <= 0) {
            throw new BadRequestError(`${parametro} debe ser un entero positivo`)
        }
    }
}