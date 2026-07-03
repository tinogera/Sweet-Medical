import { describe, expect, test, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import BusquedaServicio from "./BusquedaServicio";
import { BusquedaProvider } from "../../context/BusquedaContext";
import * as busquedaServicioService from "../../service/busquedaServicioService";
import * as pacientesService from "../../service/pacientesService";

vi.mock("../../service/busquedaServicioService", async () => {
  const actual = await vi.importActual("../../service/busquedaServicioService");
  return { ...actual, getServicios: vi.fn() };
});

vi.mock("../../service/pacientesService", async () => {
  const actual = await vi.importActual("../../service/pacientesService");
  return { ...actual, getPacientes: vi.fn() };
});

function renderServicios() {
  return render(
    <BusquedaProvider>
      <MemoryRouter initialEntries={["/servicios"]}>
        <Routes>
          <Route path="/servicios" element={<BusquedaServicio />} />
          <Route path="/fecha" element={<div>Selección de Fecha</div>} />
        </Routes>
      </MemoryRouter>
    </BusquedaProvider>,
  );
}

describe("BusquedaServicio", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    pacientesService.getPacientes.mockResolvedValue([{ id: "pac-1" }]);
    busquedaServicioService.getServicios.mockResolvedValue([
      { _id: "srv-1", nombre: "Ecografía", tipoServicio: "PRACTICA" },
    ]);
  });

  test("shows the suggested services", async () => {
    renderServicios();

    expect(screen.getByText("Servicios Sugeridos")).toBeInTheDocument();
    expect(screen.getByText("Cardiología")).toBeInTheDocument();
    expect(screen.getByText("Laboratorio")).toBeInTheDocument();
  });

  test("selecting a suggested service and pressing Siguiente Paso navigates to /fecha", async () => {
    renderServicios();

    fireEvent.click(screen.getByText("Pediatría"));
    fireEvent.click(screen.getByRole("button", { name: /Siguiente Paso/i }));

    await waitFor(() => {
      expect(screen.getByText("Selección de Fecha")).toBeInTheDocument();
    });
  });

  test("searching shows matching services from the API and allows selecting them", async () => {
    renderServicios();

    // Wait for the services to load before searching
    await waitFor(() => {
      expect(busquedaServicioService.getServicios).toHaveBeenCalled();
    });

    const input = screen.getByPlaceholderText(/Cardiología, Ecografía/i);
    fireEvent.change(input, { target: { value: "eco" } });
    fireEvent.click(screen.getByRole("button", { name: /^Buscar$/i }));

    expect(screen.getByText("Resultados de la búsqueda")).toBeInTheDocument();
    expect(screen.getByText("Ecografía")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Ecografía"));
    fireEvent.click(screen.getByRole("button", { name: /Siguiente Paso/i }));

    await waitFor(() => {
      expect(screen.getByText("Selección de Fecha")).toBeInTheDocument();
    });
  });
});
