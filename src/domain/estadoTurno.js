class EstadoTurno{
    constructor(estado, responsableDeCambio, fechaHora, motivo) {
        this.estado = estado;
        this.responsableDeCambio = responsableDeCambio;
        this.fechaHora = fechaHora;
        this.motivo = motivo;
    }


    estaDisponible(){
        return this.estado === Estado.DISPONIBLE;
    }

    estaReservado(){
        return this.estado === Estado.RESERVADO;
    }

    estaConfirmado(){
        return this.estado === Estado.CONFIRMADO;
    }

    estaCancelado(){
        return this.estado === Estado.CANCELADO;
    }

    estaRealizado(){
        return this.estado === Estado.REALIZADO;
    }
}

const Estado = Object.freeze({
    DISPONIBLE: 'DISPONIBLE',
    RESERVADO: 'RESERVADO',
    CONFIRMADO: 'CONFIRMADO',
    CANCELADO: 'CANCELADO',
    REALIZADO: 'REALIZADO'
});