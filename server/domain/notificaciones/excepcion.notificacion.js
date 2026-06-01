export class NotificacionInexistente extends Error {
  constructor(userId, notificacionId) {
    super(`La notificación de ID:[${notificacionId}] del usuario de ID: [${userId}] no existe`);
  }
}
