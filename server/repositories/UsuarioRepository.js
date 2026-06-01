import { Usuario } from "../domain/notificaciones/usuario.js";

class UsuarioRepository {
  // TODO: con mongodb
  getById(userId) {
    const user = new Usuario()
    user.id = userId
    return user
  }
}

export const usuarioRepository = new UsuarioRepository();
