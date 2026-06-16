import { jest } from "@jest/globals";
import request from "supertest";
import app from "../server/app.js";
import { SeederService } from "../server/services/SeederService.js";

describe("POST /seeder", () => {
  let seedSpy;

  beforeEach(() => {
    seedSpy = jest.spyOn(SeederService.prototype, "seed");
  });

  afterEach(() => {
    seedSpy.mockRestore();
  });

  it("debería retornar 201 y mensaje de éxito en el escenario feliz", async () => {
    seedSpy.mockResolvedValue(undefined);

    const res = await request(app).post("/seeder");
    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      status: "success",
      message: "Datos de prueba cargados correctamente en los repositorios",
    });
    expect(seedSpy).toHaveBeenCalledTimes(1);
  });

  it("debería retornar 500 y pasar el error en el escenario de error", async () => {
    const mockError = new Error("Error de conexión a la base de datos");
    seedSpy.mockRejectedValue(mockError);

    const res = await request(app).post("/seeder");
    expect(res.status).toBe(500);
    expect(seedSpy).toHaveBeenCalledTimes(1);
  });
});
