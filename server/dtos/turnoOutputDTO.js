export class TurnoOutputDTO {
    constructor(profesional, servicio, fechaHora, sede, estadoTurno, costo) {
        this.profesional = profesional
        this.servicio = servicio
        this.fechaHora = fechaHora
        this.sede = sede
        this.estadoTurno = estadoTurno
        this.costo = costo
    }
}