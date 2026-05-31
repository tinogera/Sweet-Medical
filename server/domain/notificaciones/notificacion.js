export class Notificacion {
  constructor({ id, destinatario, mensaje, fechaHoraEnviado, fechaHoraVisto, visto } = {}) {
    this.id = id
    this.destinatario = destinatario
    this.mensaje = mensaje
    this.fechaHoraEnviado = fechaHoraEnviado ?? new Date()
    this.visto = visto ?? false
    this.fechaHoraVisto = fechaHoraVisto ?? null
  }

  marcarComoVista() {
    this.visto = true
    this.fechaHoraVisto = new Date()
  }
}

