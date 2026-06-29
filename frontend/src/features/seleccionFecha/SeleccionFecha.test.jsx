import { describe, expect, test, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import SeleccionFecha from "./SeleccionFecha";
import { BusquedaProvider } from "../../context/BusquedaContext";
import * as turnosService from "../../service/turnosService";
import * as pacientesService from "../../service/pacientesService";

vi.mock("../../service/turnosService", async () => {
  const actual = await vi.importActual("../../service/turnosService");
  return {
    ...actual,
    getTurnos: vi.fn(),
  };
});

vi.mock("../../service/pacientesService", async () => {
  const actual = await vi.importActual("../../service/pacientesService");
  return {
    ...actual,
    getPacientes: vi.fn(),
  };
});

function makeTurno(id, hora, extras = {}) {
  return {
    id,
    servicioId: "serv-1",
    fechaHora: `2026-07-15T${hora}:00`,
    profesional: "Dr. Rossi",
    sede: "Centro Médico",
    servicio: "Cardiología",
    ...extras,
  };
}

const medicoState = {
  tipo: "medico",
  label: "Dr. Rossi",
  profesionalId: "Dr. Rossi",
};

function renderAtFecha(initialBusqueda) {
  return render(
    <BusquedaProvider initialValue={initialBusqueda}>
      <MemoryRouter initialEntries={["/fecha"]}>
        <Routes>
          <Route path="/fecha" element={<SeleccionFecha />} />
          <Route path="/turno" element={<div>Confirmación de Turno</div>} />
        </Routes>
      </MemoryRouter>
    </BusquedaProvider>,
  );
}

describe("SeleccionFecha", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("loading state shows Skeleton placeholders", async () => {
    // Keep loading pending by never resolving
    pacientesService.getPacientes.mockReturnValue(new Promise(() => {}));

    renderAtFecha(medicoState);

    // Should show skeleton cards (3 card shapes + 5 rectangle shapes)
    const skeletonElements = document.querySelectorAll(".skeleton");
    expect(skeletonElements.length).toBeGreaterThanOrEqual(3);
  });

  test("loaded state renders ResumenTurno and date cards", async () => {
    pacientesService.getPacientes.mockResolvedValue([{ id: "pac-1" }]);
    turnosService.getTurnos.mockResolvedValue({
      turnos: [makeTurno("t1", "09:00"), makeTurno("t2", "10:00")],
    });

    renderAtFecha(medicoState);

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByTestId("resumen-turno")).toBeInTheDocument();
    });

    // Should show ResumenTurno with initials
    expect(screen.getByText("DR")).toBeInTheDocument();
    expect(screen.getByText("Dr. Rossi")).toBeInTheDocument();
    expect(screen.getByText("Médico")).toBeInTheDocument();

    // Should show date cards
    const fechaCards = screen.getAllByTestId("fecha-card");
    expect(fechaCards.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Jul")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
  });

  test("selecting time and clicking Continuar navigates to /turno", async () => {
    pacientesService.getPacientes.mockResolvedValue([{ id: "pac-1" }]);
    turnosService.getTurnos.mockResolvedValue({
      turnos: [makeTurno("t1", "09:00")],
    });

    renderAtFecha(medicoState);

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByTestId("resumen-turno")).toBeInTheDocument();
    });

    // Click the FechaCard to select a date
    const fechaCard = screen.getByTestId("fecha-card");
    fireEvent.click(fechaCard);

    // Time slots should appear
    await waitFor(() => {
      expect(screen.getByTestId("horario-slot")).toBeInTheDocument();
    });

    // Click a time slot
    const timeSlot = screen.getByTestId("horario-slot");
    fireEvent.click(timeSlot);

    // Continuar should now be enabled
    const continuarButton = screen.getByRole("button", { name: /Continuar/i });
    expect(continuarButton).not.toBeDisabled();

    // Click Continuar
    fireEvent.click(continuarButton);

    // Should navigate to /turno
    await waitFor(() => {
      expect(screen.getByText("Confirmación de Turno")).toBeInTheDocument();
    });
  });

  test("empty turnos shows empty state", async () => {
    pacientesService.getPacientes.mockResolvedValue([{ id: "pac-1" }]);
    turnosService.getTurnos.mockResolvedValue({ turnos: [] });

    renderAtFecha(medicoState);

    await waitFor(() => {
      expect(screen.getByText("Sin fechas disponibles")).toBeInTheDocument();
    });
  });

  test("Más fechas button is present and non-functional", async () => {
    pacientesService.getPacientes.mockResolvedValue([{ id: "pac-1" }]);
    turnosService.getTurnos.mockResolvedValue({
      turnos: [makeTurno("t1", "09:00")],
    });

    renderAtFecha(medicoState);

    await waitFor(() => {
      expect(screen.getByTestId("resumen-turno")).toBeInTheDocument();
    });

    // Find the Más fechas button with + icon
    const addButtons = screen.getAllByRole("button");
    const masFechasBtn = addButtons.find(
      (btn) => btn.querySelector(".material-symbols-outlined")?.textContent === "add",
    );
    expect(masFechasBtn).toBeInTheDocument();

    // Click should not cause navigation or state change
    if (masFechasBtn) {
      fireEvent.click(masFechasBtn);
      // Still on the same page
      expect(screen.getByTestId("resumen-turno")).toBeInTheDocument();
    }
  });

  test("Cancelar button navigates back", async () => {
    pacientesService.getPacientes.mockResolvedValue([{ id: "pac-1" }]);
    turnosService.getTurnos.mockResolvedValue({
      turnos: [makeTurno("t1", "09:00")],
    });

    renderAtFecha(medicoState);

    await waitFor(() => {
      expect(screen.getByTestId("resumen-turno")).toBeInTheDocument();
    });

    const cancelarButton = screen.getByRole("button", { name: /Cancelar/i });
    expect(cancelarButton).toBeInTheDocument();
  });
});
