import { model, Schema } from "mongoose";
import { Usuario } from "../domain/notificaciones/usuario.js";
import { Notificacion } from "../domain/notificaciones/notificacion.js";

const NotificacionSchema = new Schema({
  id: Number,
  destinatario: String,
  mensaje: {
    type: String,
    required: true,
  },
  fechaHoraEnviado: {
    type: Date,
    default: Date.now,
  },
  visto: {
    type: Boolean,
    default: false,
  },
  fechaHoraVisto: Date,
}, {
  _id: false,
  versionKey: false,
})

const UsuarioSchema = new Schema({
  nombre: String,
  notificaciones: [NotificacionSchema]
}, {
  versionKey: false,
})

UsuarioSchema.loadClass(Usuario)
NotificacionSchema.loadClass(Notificacion)

export const UsuarioModel = model('Usuario', UsuarioSchema)
