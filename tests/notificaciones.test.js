import { jest } from "@jest/globals";
import request from "supertest";
import app from "../server/app.js";
import { usuarioRepository } from "../server/repositories/UsuarioRepository.js";
import { Usuario } from "../server/domain/notificaciones/usuario.js";
import { Notificacion } from "../server/domain/notificaciones/notificacion.js";
import { UsuarioNoEncontrado, NotificacionInexistente } from "../server/domain/notificaciones/excepcion.notificacion.js";

describe("Notificaciones Endpoints", () => {
  let getByIdSpy;
  let saveSpy;

  beforeEach(() => {
    getByIdSpy = jest.spyOn(usuarioRepository, "getById");
    saveSpy = jest.spyOn(usuarioRepository, "save");
  });

  afterEach(() => {
    getByIdSpy.mockRestore();
    saveSpy.mockRestore();
  });

  describe("GET /notificaciones/:idUser", () => {
    it("debería retornar 200 y la lista de notificaciones en el escenario feliz", async () => {
      const mockUser = new Usuario({
        id: "user-123",
        nombre: "John Doe",
        notificaciones: [
          new Notificacion({ id: 0, mensaje: "Noti 1", visto: false }),
          new Notificacion({ id: 1, mensaje: "Noti 2", visto: true }),
        ],
      });
      getByIdSpy.mockResolvedValue(mockUser);

      const res = await request(app).get("/notificaciones/user-123");
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
      expect(res.body[0]).toEqual({
        id: 0,
        mensaje: "Noti 1",
        fecha: expect.any(String),
        visto: false,
      });
    });

    it("debería filtrar notificaciones leídas si query ?leidas=true", async () => {
      const mockUser = new Usuario({
        id: "user-123",
        nombre: "John Doe",
        notificaciones: [
          new Notificacion({ id: 0, mensaje: "Noti 1", visto: false }),
          new Notificacion({ id: 1, mensaje: "Noti 2", visto: true }),
        ],
      });
      getByIdSpy.mockResolvedValue(mockUser);

      const res = await request(app).get("/notificaciones/user-123?leidas=true");
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].visto).toBe(true);
    });

    it("debería retornar 500 si el usuario no es encontrado (escenario de error)", async () => {
      getByIdSpy.mockRejectedValue(new UsuarioNoEncontrado("user-123"));

      const res = await request(app).get("/notificaciones/user-123");
      expect(res.status).toBe(500);
      expect(res.body.status).toBe("error");
      expect(res.body.message).toBe("Error interno del servidor");
    });
  });

  describe("PATCH /notificaciones/:idUser/:idNotificacion", () => {
    it("debería marcar como leída la notificación y retornar 204 en el escenario feliz", async () => {
      const mockUser = new Usuario({
        id: "user-123",
        nombre: "John Doe",
        notificaciones: [
          new Notificacion({ id: 0, mensaje: "Noti 1", visto: false }),
        ],
      });
      getByIdSpy.mockResolvedValue(mockUser);
      saveSpy.mockResolvedValue(mockUser);

      const res = await request(app).patch("/notificaciones/user-123/0");
      expect(res.status).toBe(204);
      expect(mockUser.notificaciones[0].visto).toBe(true);
      expect(saveSpy).toHaveBeenCalledWith(mockUser);
    });

    it("debería retornar 500 si la notificación no existe (escenario de error)", async () => {
      const mockUser = new Usuario({
        id: "user-123",
        nombre: "John Doe",
        notificaciones: [],
      });
      getByIdSpy.mockResolvedValue(mockUser);

      const res = await request(app).patch("/notificaciones/user-123/99");
      expect(res.status).toBe(500);
    });
  });
});
