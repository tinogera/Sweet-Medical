export class PacienteService{
    constructor(pacienteRepository, turnoRepository){
        this.pacienteRepository = pacienteRepository
        this.turnoRepository = turnoRepository
    
    }

    async listarTurnos(pacienteId, paginacion){
        
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