class Notificacion {
    constructor(destinatario, mensaje, fechaHoraEnviado = new Date(), visto = false, fechaHoraVisto = null){
        this.destinatario = destinatario
        this.mensaje = mensaje
        this.fechaHoraEnviado = fechaHoraEnviado
        this.visto = visto
        this.fechaHoraVisto = fechaHoraVisto
    }

    marcarComoVista(fecha){
        visto = true
        fechaHoraVisto = fecha
    }
}