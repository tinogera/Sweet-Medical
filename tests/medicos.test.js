import { jest } from "@jest/globals";
import request from "supertest";
import app from "../server/app.js";
import { MedicoRepository } from "../server/repositories/MedicoRepository.js";
import { SedeRepository } from "../server/repositories/SedeRepository.js";
import { ServicioRepository } from "../server/repositories/ServicioRepository.js";
import { NotFoundError, BadRequestError } from "../server/errors/AppErrors.js";

describe("Medicos Endpoints", () => {
  let findByIdSpy;
  let updateSpy;
  let saveSpy;
  let obtenerSedeSpy;
  let findByNameSpy;

  beforeEach(() => {
    // Establecer mocks a nivel de prototipo para no tocar la DB
    findByIdSpy = jest.spyOn(MedicoRepository.prototype, "findById").mockResolvedValue({
      _id: "medico-123",
      nombre: "John",
      apellido: "Doe",
      agenda: [],
      servicios: [],
      sedes: [],
      atiendeEn: () => true,
      ofrece: () => true,
      agregarDisponibilidad: () => ({
        _id: "bloque-123",
        horaInicio: new Date("2026-06-10T08:00:00Z"),
        horaFin: new Date("2026-06-10T10:00:00Z"),
        sede: { nombre: "Sede Palermo" },
        servicio: { nombre: "Cardiología" },
      }),
      generarTurnos: () => [],
      save: jest.fn().mockResolvedValue(true),
    });

    updateSpy = jest.spyOn(MedicoRepository.prototype, "update").mockResolvedValue({});
    saveSpy = jest.spyOn(MedicoRepository.prototype, "save").mockResolvedValue({});
    obtenerSedeSpy = jest.spyOn(SedeRepository.prototype, "obtenerPorNombre").mockResolvedValue({ nombre: "Sede Palermo" });
    findByNameSpy = jest.spyOn(ServicioRepository.prototype, "findByName").mockResolvedValue({
      tipoServicio: "ESPECIALIDAD",
      nombre: "Cardiología",
      precio: 3000,
      duracion: 20,
    });
    jest.spyOn(ServicioRepository.prototype, "update").mockResolvedValue({});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("POST /medicos/:id/disponibilidad", () => {
    it("debería agregar disponibilidad exitosamente en el escenario feliz", async () => {
      const mockMedico = {
        _id: "medico-123",
        nombre: "John",
        apellido: "Doe",
        atiendeEn: () => true,
        ofrece: () => true,
        agregarDisponibilidad: () => ({
          _id: "bloque-123",
          horaInicio: new Date("2026-06-10T08:00:00Z"),
          horaFin: new Date("2026-06-10T10:00:00Z"),
          sede: { nombre: "Sede Palermo" },
        }),
        generarTurnos: () => [],
        save: jest.fn().mockResolvedValue(true),
      };

      findByIdSpy.mockResolvedValue(mockMedico);

      const res = await request(app)
        .post("/medicos/medico-123/disponibilidad")
        .send({
          fecha: "2026-06-10",
          horaInicio: "08:00:00",
          horaFin: "10:00:00",
          sedeName: "Sede Palermo",
        });

      expect(res.status).toBe(201);
      expect(res.body).toEqual({
        bloqueId: "bloque-123",
        horaInicio: expect.any(String),
        horaFin: expect.any(String),
        sede: "Sede Palermo",
        turnosGenerados: 0,
      });
    });

    it("debería retornar 400 si faltan campos requeridos (escenario de error)", async () => {
      const res = await request(app)
        .post("/medicos/medico-123/disponibilidad")
        .send({
          fecha: "2026-06-10",
        });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Validation Error");
    });
  });

  describe("GET /medicos/:id/disponibilidad", () => {
    it("debería retornar la disponibilidad del médico en el escenario feliz", async () => {
      const mockMedico = {
        _id: "medico-123",
        nombre: "John",
        apellido: "Doe",
        agenda: [
          {
            _id: "bloque-123",
            horaInicio: new Date("2026-06-10T08:00:00Z"),
            horaFin: new Date("2026-06-10T10:00:00Z"),
            sede: { nombre: "Sede Palermo" },
          },
        ],
      };
      findByIdSpy.mockResolvedValue(mockMedico);

      const res = await request(app).get("/medicos/medico-123/disponibilidad");
      expect(res.status).toBe(200);
      expect(res.body.medicoId).toBe("medico-123");
      expect(res.body.nombre).toBe("John Doe");
      expect(res.body.agenda).toHaveLength(1);
    });

    it("debería retornar 404 si el médico no existe (escenario de error)", async () => {
      findByIdSpy.mockRejectedValue(new NotFoundError("Médico no encontrado"));

      const res = await request(app).get("/medicos/999/disponibilidad");
      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /medicos/:id/disponibilidad/:bloqueId", () => {
    it("debería eliminar disponibilidad y retornar 204 en el escenario feliz", async () => {
      const mockMedico = {
        _id: "medico-123",
        eliminarBloque: jest.fn(),
        save: jest.fn().mockResolvedValue(true),
      };
      findByIdSpy.mockResolvedValue(mockMedico);

      const res = await request(app).delete("/medicos/medico-123/disponibilidad/bloque-123");
      expect(res.status).toBe(204);
      expect(mockMedico.eliminarBloque).toHaveBeenCalledWith("bloque-123");
    });

    it("debería retornar 404 si el médico no existe al eliminar disponibilidad (escenario de error)", async () => {
      findByIdSpy.mockRejectedValue(new NotFoundError("Médico no encontrado"));

      const res = await request(app).delete("/medicos/999/disponibilidad/bloque-123");
      expect(res.status).toBe(404);
    });
  });

  describe("Gestion Servicios de Medicos", () => {
    it("debería listar servicios del médico en el escenario feliz", async () => {
      const mockMedico = {
        servicios: [
          {
            tipoServicio: "ESPECIALIDAD",
            nombre: "Cardiología",
            precio: 3000,
            duracion: 20,
          },
        ],
      };
      findByIdSpy.mockResolvedValue(mockMedico);

      const res = await request(app).get("/medicos/123/servicios");
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].nombre).toBe("Cardiología");
    });

    it("debería agregar un servicio al médico en el escenario feliz", async () => {
      const mockMedico = {
        agregarServicio: jest.fn(),
      };
      findByIdSpy.mockResolvedValue(mockMedico);
      findByNameSpy.mockResolvedValue({
        tipoServicio: "ESPECIALIDAD",
        nombre: "Pediatría",
        precio: 2000,
        duracion: 30,
      });

      const res = await request(app)
        .post("/medicos/123/servicios")
        .send({
          tipoServicio: "ESPECIALIDAD",
          nombre: "Pediatría",
          precio: 2000,
          duracion: 30,
        });

      expect(res.status).toBe(201);
      expect(res.body.nombre).toBe("Pediatría");
      expect(mockMedico.agregarServicio).toHaveBeenCalled();
    });

    it("debería retornar 404 al agregar servicio si el médico no existe (escenario de error)", async () => {
      findByIdSpy.mockRejectedValue(new NotFoundError("Médico no encontrado"));

      const res = await request(app)
        .post("/medicos/999/servicios")
        .send({
          tipoServicio: "ESPECIALIDAD",
          nombre: "Pediatría",
          precio: 2000,
          duracion: 30,
        });

      expect(res.status).toBe(404);
    });

    it("debería eliminar servicio de médico en el escenario feliz", async () => {
      const mockMedico = {
        ofrece: () => true,
        dejarDeOfrecer: jest.fn(),
      };
      findByIdSpy.mockResolvedValue(mockMedico);
      findByNameSpy.mockResolvedValue({ nombre: "Cardiología" });

      const res = await request(app).delete("/medicos/123/servicios/Cardiología");
      expect(res.status).toBe(204);
      expect(mockMedico.dejarDeOfrecer).toHaveBeenCalled();
    });

    it("debería actualizar servicio de médico en el escenario feliz", async () => {
      const mockMedico = {
        actualizarServicio: jest.fn().mockReturnValue({
          tipoServicio: "ESPECIALIDAD",
          nombre: "Cardiología",
          precio: 3500,
          duracion: 20,
        }),
      };
      findByIdSpy.mockResolvedValue(mockMedico);

      const res = await request(app)
        .patch("/medicos/123/servicios/Cardiología")
        .send({ precio: 3500 });

      expect(res.status).toBe(200);
      expect(res.body.precio).toBe(3500);
    });
  });
});
