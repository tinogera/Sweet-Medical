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
        if (!this.puedeCancelarse()) {
            throw new Error('Solo se pueden cancelar turnos disponibles o reservados');
        }
        this.cambiarEstado(Estado.CANCELADO, responsable, motivo);
    }

    puedeCancelarse() {
        // se puede cancelar si ests disponible o reservado Y falta mas de 1 hora 
        const unaHora = 60*60*1000;
        return (this.estaDisponible() || this.estaReservado()) && ((this.fechaHora - new Date()) > unaHora);
    }



    cambiarEstado(nuevoEstado, responsableDeCambio, motivo){
        this.estadoActual().responsableDeCambio = responsableDeCambio;
        this.estadoActual().motivo = motivo;
    
        const nuevoEstadoTurno = new EstadoTurno(nuevoEstado, null, new Date(), null);
        this.estadosTurno.push(nuevoEstadoTurno);
        //modificas el estado anterior y depues creas uno nuevo
        /*
        const nuevoEstadoTurno = new EstadoTurno(nuevoEstado, responsableDeCambio, new Date(), motivo);
        this.estadosTurno.push(nuevoEstadoTurno);
        */
    }

    estaDisponible(){
        return this.estadoActual().estaDisponible();
    }

    estadoActual(){
        return this.estadosTurno.at(-1);
    }

    estaReservado(){
        return this.estadoActual().estaReservado();
    }

}