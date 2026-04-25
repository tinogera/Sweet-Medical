class GeneradorDeTurnos{
    static generarTurnos(medico, bloqueHorario){
        const turnos = [];
        const { fecha, horaInicio, horaFin, sede, servicio } = bloqueHorario;
        
        const duracionMs = servicio.duracion * 60 * 1000; 
        let tiempoActual = new Date(horaInicio.getTime());
        
        while (tiempoActual.getTime() + duracionMs <= horaFin.getTime()) {
            const fechaHoraTurno = new Date(tiempoActual.getTime());
            
            const nuevoTurno = new Turno(fechaHoraTurno, medico, null, servicio, sede, servicio.precio);
            turnos.push(nuevoTurno);
            
            tiempoActual = new Date(tiempoActual.getTime() + duracionMs);
        }
        
        return turnos;
    }
}