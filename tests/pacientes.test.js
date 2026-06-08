import { jest } from "@jest/globals";
import request from "supertest";
import app from "../server/app.js";
import { PacienteRepository } from "../server/repositories/PacienteRepository.js";
import { TurnoRepositoryImpl } from "../server/repositories/TurnoRepository.js";
import { NotFoundError, BadRequestError } from "../server/errors/AppErrors.js";

describe("Paciente Endpoints", () => {
  let obtenerPacienteSpy;
  let obtenerTurnosSpy;

  beforeEach(() => {
    obtenerPacienteSpy = jest.spyOn(PacienteRepository.prototype, "obtenerPorId").mockResolvedValue({
      id: "1",
      nombre: "Jane",
      apellido: "Doe",
    });
    obtenerTurnosSpy = jest.spyOn(TurnoRepositoryImpl.prototype, "obtenerTurnosDePaciente").mockResolvedValue({
      turnos: [],
      totalTurnos: 0,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("GET /pacientes/:id/turnos", () => {
    it("debería retornar 200 y los turnos formateados en el escenario feliz", async () => {
      const mockPaciente = {
        id: "1",
        nombre: "Jane",
        apellido: "Doe",
      };

      const mockTurno = {
        id: "101",
        medico: { nombre: "Dr. Gregory", apellido: "House" },
        servicio: { nombre: "Neurología" },
        fechaHora: new Date("2026-06-10T10:00:00Z"),
        sede: { nombre: "Sede Central" },
        estadoActual: () => ({ estado: "RESERVADO" }),
        paciente: {
          plan: {
            precioDe: () => 1500,
          },
        },
      };

      obtenerPacienteSpy.mockResolvedValue(mockPaciente);
      obtenerTurnosSpy.mockResolvedValue({
        turnos: [mockTurno],
        totalTurnos: 1,
      });

      const res = await request(app).get("/pacientes/1/turnos");
      expect(res.status).toBe(200);
      expect(res.body.turnos).toHaveLength(1);
      expect(res.body.turnos[0]).toEqual({
        id: "101",
        profesional: "Dr. Gregory",
        servicio: "Neurología",
        fechaHora: "2026-06-10T10:00:00.000Z",
        sede: "Sede Central",
        estadoTurno: "RESERVADO",
        costo: 1500,
      });
      expect(res.body.paginacion).toEqual({
        numeroDePagina: 1,
        limite: 10,
        totalPaginas: 1,
        totalTurnos: 1,
      });
    });

    it("debería retornar 400 si el id del paciente no es un ObjectId válido (escenario de error)", async () => {
      obtenerPacienteSpy.mockRejectedValue(new BadRequestError("El id proporcionado no es válido: abc"));

      const res = await request(app).get("/pacientes/abc/turnos");
      expect(res.status).toBe(400);
      expect(res.body.message).toContain("no es válido");
    });

    it("debería retornar 404 si el paciente no existe (escenario de error)", async () => {
      obtenerPacienteSpy.mockRejectedValue(new NotFoundError("Paciente no encontrado"));

      const res = await request(app).get("/pacientes/999/turnos");
      expect(res.status).toBe(404);
      expect(res.body.message).toContain("Paciente no encontrado");
    });
  });
});
