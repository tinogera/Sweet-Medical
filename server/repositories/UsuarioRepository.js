import { UsuarioModel } from "../schemas/usuario.schema.js";
import { Usuario } from "../domain/notificaciones/usuario.js";
import { Notificacion } from "../domain/notificaciones/notificacion.js";
import { UsuarioNoEncontrado } from "../domain/notificaciones/excepcion.notificacion.js";

class UsuarioRepository {
  async getById(userId) {
    const userDoc = await UsuarioModel.findById(userId);
    if (!userDoc) throw new UsuarioNoEncontrado(userId);
    return this.#fromDB(userDoc)
  }

  save(usuario) {
    return UsuarioModel.findByIdAndUpdate(usuario.id, {
      nombre: usuario.nombre,
      notificaciones: usuario.notificaciones
    }, { returnDocument: false });
  }

  #fromDB(userDoc) {
    const obj = userDoc.toObject({ virtual: true, versionKey: false });
    return new Usuario({
      id: obj._id.toString(),
      nombre: obj.nombre,
      notificaciones: obj.notificaciones.map(notificacion => new Notificacion(notificacion))
    });
  }

}

export const usuarioRepository = new UsuarioRepository();
