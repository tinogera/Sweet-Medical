class Turno{
    constructor(fechaHora, medico, paciente, servicio,sede, costo) {
        this.fechaHora = fechaHora;
        this.medico = medico;
        this.paciente = paciente;
        this.estadosTurno = [new EstadoTurno(Estado.DISPONIBLE, null, new Date(), null)];
        this.sede = sede;
        this.servicio = servicio;
        this.costo = costo;
    }

    reservar(paciente){
        if(!this.estaDisponible()){
            throw new Error('El turno no está disponible');
        }
        this.paciente = paciente;
        this.cambiarEstado(Estado.RESERVADO, paciente, "Turno reservado por el paciente");

    }
    
    cancelar(responsable, motivo) {
        if (!this.estaDisponible() && !this.estaReservado()) {
            throw new Error('Solo se pueden cancelar turnos disponibles o reservados');
        }
        this.cambiarEstado(Estado.CANCELADO, responsable, motivo);
    }

    cambiarEstado(nuevoEstado, responsableDeCambio, motivo){
        const estadoActual = this.estadosTurno.at(-1);
        estadoActual.responsableDeCambio = responsableDeCambio;
        estadoActual.motivo = motivo;
    
        const nuevoEstadoTurno = new EstadoTurno(nuevoEstado, null, new Date(), null);
        this.estadosTurno.push(nuevoEstadoTurno);
        //modificas el estado anterior y depues creas uno nuevo
        /*
        const nuevoEstadoTurno = new EstadoTurno(nuevoEstado, responsableDeCambio, new Date(), motivo);
        this.estadosTurno.push(nuevoEstadoTurno);
        */
    }

    estaDisponible(){
        return this.estadosTurno.at(-1).estaDisponible();
    }

}