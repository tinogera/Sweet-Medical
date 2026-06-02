import { pacienteRepository as defaultPacienteRepository } from "../repositories/PacienteRepository.js"
import { TurnoRepository } from "../repositories/TurnoRepository.js"


export class PacienteService{
    constructor(pacienteRepository = defaultPacienteRepository, turnoRepository = TurnoRepository){
        this.pacienteRepository = pacienteRepository
        this.turnoRepository = turnoRepository
    
    }

    async listarTurnos(pacienteId, paginacion){
        const _paciente = await this.pacienteRepository.obtenerPorId(pacienteId)
        
        const { turnos, totalTurnos } = await this.turnoRepository.obtenerTurnosDePaciente(
            pacienteId, 
            paginacion.numeroDePagina, 
            paginacion.limite
        )

        const totalPaginas = totalTurnos === 0 ? 0 : Math.ceil(totalTurnos / paginacion.limite)

        return {
            turnos,
            totalTurnos,
            totalPaginas,
            numeroDePagina: paginacion.numeroDePagina,
            limite: paginacion.limite
        };
    }
}