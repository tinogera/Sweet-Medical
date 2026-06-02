import request from "supertest";
import app from "../server/app.js";

describe("GET /healthcheck", () => {
  it("debería retornar status 200 y OK en el escenario feliz", async () => {
    const res = await request(app).get("/healthcheck");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "OK" });
  });

  it("debería retornar 404 para un método no soportado (POST)", async () => {
    const res = await request(app).post("/healthcheck");
    expect(res.status).toBe(404);
  });
});
