import { TurnoOutputDTO } from "../dtos/turnoOutputDTO.js"
import { TipoServicio } from "../domain/servicios/servicio.js"

export class BusquedaTurnoService {

    constructor({ turnoRepository, pacienteRepository } = {} ) {
        this.turnoRepository = turnoRepository
        this.pacienteRepository = pacienteRepository
    }

    async buscarTurnos({ idPaciente, numeroPagina = 1, limitePorPagina = 10, filtros = {}, ordenarPor = 'fecha', direccion = 'asc' } = {}) {
        const paciente = await this.pacienteRepository.obtenerPorId(idPaciente)

        const { turnos } = await this.turnoRepository.obtenerDisponiblesPaginados(
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
                    `${t.medico?.nombre || ''} ${t.medico?.apellido || ''}`.trim() || "Médico",
                    t.servicio.nombre,
                    t.fechaHora,
                    t.sede?.nombre || "Sede",
                    t.estadoActual().estado,
                    paciente.plan.precioDe(t.servicio)
                )];
            }

			const especialidadBuscada = filtros.especialidad?.toLowerCase();
			const practicaBuscada = filtros.practica?.toLowerCase();
			// FIX: que el filtro lo haga la base de datos
            let serviciosAMostrar = t.medico.servicios;
            if (especialidadBuscada) {
                serviciosAMostrar = serviciosAMostrar.filter(s => s.tipoServicio === TipoServicio.ESPECIALIDAD && s.nombre.toLowerCase().includes(especialidadBuscada));
            } else if (practicaBuscada) {
                serviciosAMostrar = serviciosAMostrar.filter(s => s.tipoServicio === TipoServicio.PRACTICA && s.nombre.toLowerCase().includes(practicaBuscada));
            }

            return serviciosAMostrar.map(s => new TurnoOutputDTO(
                t._id || t.id,
                `${t.medico?.nombre || ''} ${t.medico?.apellido || ''}`.trim() || "Médico",
                s.nombre,
                t.fechaHora,
                t.sede?.nombre || "Sede",
                t.estadoActual().estado,
                paciente.plan.precioDe(s),
                s._id?.toString() || s.id,
            ));
		});
		
		// FIX: Que el sort lo haga la base de datos
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

		// FIX: idem. Que lo haga la db para eso le pagan
            const totalTurnos = todasLasOpciones.length;
        const inicio = (numeroPagina - 1) * limitePorPagina;
        const turnosDTO = todasLasOpciones.slice(inicio, inicio + limitePorPagina);

        const totalPaginas = totalTurnos === 0 ? 0 : Math.ceil(totalTurnos / limitePorPagina)

        return {
            turnosDTO,
            numeroPagina,
            limitePorPagina,
            totalPaginas,
            totalTurnos,
        };
    }
}
