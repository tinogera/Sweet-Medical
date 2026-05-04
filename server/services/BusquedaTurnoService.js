import { Turno } from "../domain/turnos/turno.js"
import { TurnoRepository } from "../repositories/TurnoRepository.js"
import { PacienteRepository } from "../repositories/PacienteRepository.js"
import { AppError, NotFoundError, BadRequestError } from "../errors/appErrors.js"
import { TurnoOutputDTO } from "../dtos/turnoOutputDTO.js"

export class BusquedaTurnoService {

    /* Cuando tengamos la implementacion real descomentar esto
    constructor({ turnoRepository = new TurnoRepository(), pacienteRepository = new PacienteRepository() } = {} ) {
        this.turnoRepository = turnoRepository
        this.pacienteRepository = pacienteRepository
    }
    */

    async buscarTurnos({ idPaciente, numeroPagina = 1, limitePorPagina = 10, filtros = {} } = {}) {
        this.validarPaginacion(numeroPagina, limitePorPagina)
        this.validarFiltros(filtros)

        const paciente = PacienteRepository.obtenerPorId(idPaciente)

        const { turnos, totalTurnos } = TurnoRepository.obtenerPaginados(
            numeroPagina,
            limitePorPagina,
            filtros
        )

        const turnosDTO = turnos.map(t => new TurnoOutputDTO(
            t.medico.nombre,
            t.servicio.nombre,
            t.fechaHora,
            t.sede,
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

    validarFiltros(filtros) {
        const hoy = new Date()

        // Si debemos poder buscar el historial de un paciente esto habria que borrarlo
        if (filtros.fechaDesde) {
            if (filtros.fechaDesde < hoy) {
                throw new BadRequestError("La fecha de búsqueda no puede ser anterior a la actual")
            }
        }

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