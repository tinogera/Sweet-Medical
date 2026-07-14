export class TurnoOutputDTO {
    constructor(id, profesional, servicio, fechaHora, sede, estadoTurno, costo, servicioId) {
        this.id = id
        this.profesional = profesional
        this.servicio = servicio
        this.fechaHora = fechaHora
        this.sede = sede
        this.estadoTurno = estadoTurno
        this.costo = costo
        this.servicioId = servicioId ?? null
    }
}