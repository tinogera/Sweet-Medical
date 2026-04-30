export class Notificacion {
  constructor(destinatario, mensaje) {
    this.destinatario = destinatario
    this.mensaje = mensaje
    this.fechaHoraEnviado = new Date()
    this.visto = false
    this.fechaHoraVisto = null
  }

  marcarComoVista() {
    this.visto = true
    this.fechaHoraVisto = new Date()
  }
}
