export class TurnoOutputDTO {
    constructor(id,profesional, servicio, fechaHora, sede, estadoTurno, costo) {
        this.id = id
        this.profesional = profesional
        this.servicio = servicio
        this.fechaHora = fechaHora
        this.sede = sede
        this.estadoTurno = estadoTurno
        this.costo = costo
    }
}