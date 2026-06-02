import { TurnoRepository } from "../repositories/TurnoRepository.js"
import { pacienteRepository } from "../repositories/PacienteRepository.js"
import { BadRequestError } from "../errors/AppErrors.js"
import { TurnoOutputDTO } from "../dtos/turnoOutputDTO.js"
import { TipoServicio } from "../domain/servicios/servicio.js"

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

        const { turnos } = await TurnoRepository.obtenerDisponiblesPaginados(
            numeroPagina,
            limitePorPagina,
            filtros,
            ordenarPor,
            direccion,
            paciente
        )

        const todasLasOpciones = turnos.flatMap(t => {
            // Si el turno ya tiene servicio osea que esta reservado, solo devolvemos ese
            if (t.servicio) {
                return [new TurnoOutputDTO(
                    t._id || t.id,
                    t.medico?.nombre || "Médico",
                    t.servicio.nombre,
                    t.fechaHora,
                    t.sede?.nombre || "Sede",
                    t.estadoActual().estado,
                    paciente.plan.precioDe(t.servicio)
                )];
            }

            // Si está disponible, mostramos los servicios del médico que coincidan con el filtro
            const especialidadBuscada = filtros.especialidad?.toLowerCase();
            const practicaBuscada = filtros.practica?.toLowerCase();

            let serviciosAMostrar = t.medico.servicios;

            if (especialidadBuscada) {
                serviciosAMostrar = serviciosAMostrar.filter(s => s.tipoServicio === TipoServicio.ESPECIALIDAD && s.nombre.toLowerCase().includes(especialidadBuscada));
            } else if (practicaBuscada) {
                serviciosAMostrar = serviciosAMostrar.filter(s => s.tipoServicio === TipoServicio.PRACTICA && s.nombre.toLowerCase().includes(practicaBuscada));
            }

            return serviciosAMostrar.map(s => new TurnoOutputDTO(
                t._id || t.id,
                t.medico?.nombre || "Médico",
                s.nombre,
                t.fechaHora,
                t.sede?.nombre || "Sede",
                t.estadoActual().estado,
                paciente.plan.precioDe(s)
            ));
            })

            todasLasOpciones.sort((a, b) => {
            let valorA, valorB;
            if (ordenarPor === 'fecha') {
                valorA = a.fechaHora.getTime();
                valorB = b.fechaHora.getTime();
            } else if (ordenarPor === 'costo') {
                valorA = a.costo;
                valorB = b.costo;
            }
            return direccion === 'asc' ? valorA - valorB : valorB - valorA;
            });

            const totalTurnos = todasLasOpciones.length;

        const inicio = (numeroPagina - 1) * limitePorPagina;
        const turnosDTO = todasLasOpciones.slice(inicio, inicio + limitePorPagina);

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