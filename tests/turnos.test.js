import { jest } from "@jest/globals";
import request from "supertest";
import app from "../server/app.js";
import { TurnoRepositoryImpl } from "../server/repositories/TurnoRepository.js";
import { PacienteRepository } from "../server/repositories/PacienteRepository.js";
import { MedicoRepository } from "../server/repositories/MedicoRepository.js";
import { TurnoService } from "../server/services/TurnoService.js";
import { BadRequestError, NotFoundError } from "../server/errors/AppErrors.js";

describe("Turnos Endpoints", () => {
  let obtenerPacienteSpy;
  let obtenerDisponiblesPaginadosSpy;
  let obtenerTurnoPorIdSpy;
  let reservarTurnoSpy;
  let generarTodosLosTurnosSpy;
  let guardarTurnoSpy;

  beforeEach(() => {
    // Evitar llamadas reales a la DB
    jest.spyOn(MedicoRepository.prototype, "findAll").mockResolvedValue([]);
    
    obtenerPacienteSpy = jest.spyOn(PacienteRepository.prototype, "obtenerPorId").mockResolvedValue({
      id: "1",
      plan: {
        precioDe: () => 1000,
      },
    });

    obtenerDisponiblesPaginadosSpy = jest.spyOn(TurnoRepositoryImpl.prototype, "obtenerDisponiblesPaginados").mockResolvedValue({
      turnos: [],
      totalTurnos: 0,
    });

    obtenerTurnoPorIdSpy = jest.spyOn(TurnoRepositoryImpl.prototype, "obtenerPorId").mockResolvedValue({
      id: "201",
      medico: { nombre: "Dr. House" },
      servicio: { nombre: "Diagnóstico" },
      fechaHora: new Date("2026-06-15T09:00:00Z"),
      sede: { nombre: "Sede Belgrano" },
      estadoActual: () => ({ estado: "DISPONIBLE" }),
    });

    reservarTurnoSpy = jest.spyOn(TurnoRepositoryImpl.prototype, "reservarTurnoDisponible").mockResolvedValue({
      id: "201",
      estadoActual: () => ({ estado: "RESERVADO" }),
    });

    guardarTurnoSpy = jest.spyOn(TurnoRepositoryImpl.prototype, "guardarTurno").mockResolvedValue({});

    generarTodosLosTurnosSpy = jest.spyOn(TurnoService.prototype, "generarTodosLosTurnos").mockResolvedValue(5);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("GET /turnos", () => {
    it("debería retornar 200 y la lista de turnos en el escenario feliz", async () => {
      const mockPaciente = {
        id: "1",
        plan: {
          precioDe: () => 1000,
        },
      };

      const mockTurno = {
        id: "201",
        medico: { nombre: "Dr. House", apellido: "" },
        servicio: { nombre: "Diagnóstico" },
        fechaHora: new Date("2026-06-15T09:00:00Z"),
        sede: { nombre: "Sede Belgrano" },
        estadoActual: () => ({ estado: "DISPONIBLE" }),
      };

      obtenerPacienteSpy.mockResolvedValue(mockPaciente);
      obtenerDisponiblesPaginadosSpy.mockResolvedValue({
        turnos: [mockTurno],
        totalTurnos: 1,
      });

      const res = await request(app).get("/turnos?idPaciente=1");
      expect(res.status).toBe(200);
      expect(res.body.turnos).toHaveLength(1);
      expect(res.body.turnos[0].profesional).toBe("Dr. House");
      expect(res.body.turnos[0].costo).toBe(1000);
    });

    it("debería retornar 400 si falta el parámetro idPaciente (escenario de error)", async () => {
      const res = await request(app).get("/turnos");
      expect(res.status).toBe(400);
      expect(res.body.message).toContain("Validation Error");
    });
  });

  describe("POST /turnos/generar", () => {
    it("debería generar los turnos y retornar 201 en el escenario feliz", async () => {
      generarTodosLosTurnosSpy.mockResolvedValue(5);

      const res = await request(app).post("/turnos/generar");
      expect(res.status).toBe(201);
      expect(res.body).toEqual({
        status: "success",
        message: "Turnos generados internamente con éxito",
        data: 5,
      });
    });

    it("debería retornar 500 si la generación falla (escenario de error)", async () => {
      generarTodosLosTurnosSpy.mockRejectedValue(new Error("Error de generación"));

      const res = await request(app).post("/turnos/generar");
      expect(res.status).toBe(500);
    });
  });

  describe("PATCH /turnos/:id", () => {
    it("debería reservar un turno exitosamente y retornar 200 en el escenario feliz", async () => {
      const mockPaciente = { id: "1", nombre: "Jane", apellido: "Doe" };
      const mockTurno = {
        id: "201",
        estaDisponible: () => true,
        medico: {
          nombre: "Dr. House",
          apellido: "",
          usuario: {
            id: "user-medico-id",
          },
          recibirNotificacion: jest.fn(),
        },
        servicio: { nombre: "Diagnóstico" },
        fechaHora: new Date("2026-06-15T09:00:00Z"),
        sede: { nombre: "Sede Belgrano" },
        estadoActual: () => ({ estado: "RESERVADO" }),
        costoEstimado: () => 1200,
        paciente: mockPaciente,
        reservar: jest.fn(),
      };

      obtenerTurnoPorIdSpy.mockResolvedValue(mockTurno);
      obtenerPacienteSpy.mockResolvedValue(mockPaciente);
      reservarTurnoSpy.mockResolvedValue(mockTurno);
      guardarTurnoSpy.mockResolvedValue(mockTurno);

      const res = await request(app)
        .patch("/turnos/201")
        .send({ estado: "RESERVADO", responsableId: "1" });

      expect(res.status).toBe(200);
      expect(res.body.estadoTurno).toBe("RESERVADO");
      expect(res.body.costo).toBe(1200);
    });

    it("debería retornar 400 si no se provee estado (escenario de error)", async () => {
      const res = await request(app)
        .patch("/turnos/201")
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.message).toContain("Validation Error");
    });

    it("debería retornar 404 si el turno no existe al intentar reservar (escenario de error)", async () => {
      obtenerTurnoPorIdSpy.mockRejectedValue(new NotFoundError("El turno con id: 999, no existe"));

      const res = await request(app)
        .patch("/turnos/999")
        .send({ estado: "RESERVADO", responsableId: "1" });

      expect(res.status).toBe(404);
    });
  });
});
