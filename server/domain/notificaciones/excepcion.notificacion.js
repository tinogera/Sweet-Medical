export class NotificacionInexistente extends Error {
  constructor(userId, notificacionId) {
    super(`La notificación de ID:[${notificacionId}] del usuario de ID: [${userId}] no existe`);
  }
}

export class UsuarioNoEncontrado extends Error {
  constructor(userId) {
    super(`El usuario de ID: [${userId}] no fue encontrado`);
  }
}
