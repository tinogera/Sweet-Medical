import { TurnoRepository } from "../repositories/TurnoRepository.js"
import { pacienteRepository } from "../repositories/PacienteRepository.js"
import { BadRequestError } from "../errors/AppErrors.js"
import { TurnoOutputDTO } from "../dtos/turnoOutputDTO.js"

export class BusquedaTurnoService {

    /* Cuando tengamos la implementacion real descomentar esto
    constructor({ turnoRepository = new TurnoRepository(), pacienteRepository = new PacienteRepository() } = {} ) {
        this.turnoRepository = turnoRepository
        this.pacienteRepository = pacienteRepository
    }
    */

    async buscarTurnos({ idPaciente, numeroPagina = 1, limitePorPagina = 10, filtros = {}, ordenarPor = 'fecha', direccion = 'asc' } = {}) {
        const ahora = new Date()
        this.validarPaginacion(numeroPagina, limitePorPagina)
        this.ajustarYValidarFiltros(filtros, ahora)

        const paciente = await pacienteRepository.obtenerPorId(idPaciente)

        const { turnos, totalTurnos } = TurnoRepository.obtenerDisponiblesPaginados(
            numeroPagina,
            limitePorPagina,
            filtros,
            ordenarPor,
            direccion,
            paciente
        )

        const turnosDTO = turnos.map(t => new TurnoOutputDTO(
            t.id,
            t.medico.nombre,
            t.servicio.nombre,
            t.fechaHora,
            t.sede.nombre,
            t.estadoActual().estado,
            paciente.plan.precioDe(t.servicio)
        ))

        const totalPaginas = totalTurnos === 0 ? 0 : Math.ceil(totalTurnos / limitePorPagina)

        return {
            turnosDTO,
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

    ajustarYValidarFiltros(filtros, ahora) {
        if (filtros.fechaDesde) {
            if (filtros.fechaDesde.toDateString() === ahora.toDateString()) {
                filtros.fechaDesde = ahora
            }

            if (filtros.fechaDesde.getTime() < ahora.getTime()) {
                throw new BadRequestError("La fecha de búsqueda no puede ser anterior a la actual")
            }
        }

        if (filtros.fechaDesde && filtros.fechaHasta) {
            if (filtros.fechaDesde.getTime() > filtros.fechaHasta.getTime()) {
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