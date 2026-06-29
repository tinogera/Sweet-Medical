import { describe, expect, test, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { BusquedaProvider } from "../../context/BusquedaContext";
import ConfirmacionTurno from "./ConfirmacionTurno";
import * as turnosService from "../../service/turnosService";

vi.mock("../../service/turnosService", async () => {
  const actual = await vi.importActual("../../service/turnosService");
  return {
    ...actual,
    getTurnos: vi.fn(),
  };
});

function makeTurno(id, hora, extras = {}) {
  return {
    id,
    servicioId: "serv-1",
    fechaHora: `2026-07-15T${hora}:00`,
    profesional: "Dr. Fernández",
    sede: "Clínica Olivos",
    servicio: "Cardiología General",
    ...extras,
  };
}

const servicioState = {
  tipo: "servicio",
  label: "Cardiología",
  especialidad: "Cardiología",
  practica: "Consulta",
  pacienteId: "pac-1",
};

function renderAtConfirmacionTurno(
  fechaKey = "2026-07-15",
  initialBusqueda = { ...servicioState, fechaKey },
) {
  return render(
    <BusquedaProvider initialValue={initialBusqueda}>
      <MemoryRouter initialEntries={["/turno"]}>
        <Routes>
          <Route path="/turno" element={<ConfirmacionTurno />} />
        </Routes>
      </MemoryRouter>
    </BusquedaProvider>,
  );
}

describe("ConfirmacionTurno", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("shows loading state while fetching turnos", () => {
    // Keep promise pending
    turnosService.getTurnos.mockReturnValue(new Promise(() => {}));

    renderAtConfirmacionTurno();

    // The loading state should render skeleton placeholders
    const skeletons = document.querySelectorAll(".skeleton");
    expect(skeletons.length).toBeGreaterThanOrEqual(3);
  });

  test("renders responsive grid with turno cards showing time, badge, service, professional, and location", async () => {
    const turnos = [
      makeTurno("t1", "09:30"),
      makeTurno("t2", "10:15", {
        profesional: "Dra. González",
        servicio: "Cardiología General",
        sede: "Centro Médico Barrio Norte",
      }),
    ];
    turnosService.getTurnos.mockResolvedValue({ turnos });

    renderAtConfirmacionTurno();

    // Wait for cards to render
    await waitFor(() => {
      expect(screen.getByText("09:30")).toBeInTheDocument();
    });

    // Card 1 assertions
    expect(screen.getByText("09:30")).toBeInTheDocument();
    expect(screen.getByText("10:15")).toBeInTheDocument();

    // Each card should have a "Disponible" badge
    const badges = screen.getAllByText("Disponible");
    expect(badges).toHaveLength(2);

    // Service info — both turnos have "Cardiología General"
    const serviceTexts = screen.getAllByText("Cardiología General");
    expect(serviceTexts).toHaveLength(2);

    // Professional names
    expect(screen.getByText("Dr. Fernández")).toBeInTheDocument();
    expect(screen.getByText("Dra. González")).toBeInTheDocument();

    // Location / sede
    expect(screen.getByText("Clínica Olivos")).toBeInTheDocument();
    expect(screen.getByText("Centro Médico Barrio Norte")).toBeInTheDocument();

    // Material Symbol icons should be present
    const icons = document.querySelectorAll(".material-symbols-outlined");
    const iconTexts = Array.from(icons).map((el) => el.textContent?.trim());
    expect(iconTexts).toContain("medical_services");
    expect(iconTexts).toContain("person");
    expect(iconTexts).toContain("location_on");

    // Grid should have responsive classes
    const gridContainer = document.querySelector(".grid");
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer.className).toContain("grid-cols-1");
    expect(gridContainer.className).toContain("md:grid-cols-2");
    expect(gridContainer.className).toContain("lg:grid-cols-3");
  });

  test("renders empty state message when no turnos available", async () => {
    turnosService.getTurnos.mockResolvedValue({ turnos: [] });

    renderAtConfirmacionTurno();

    await waitFor(() => {
      expect(
        screen.getByText("No hay turnos disponibles para esta fecha."),
      ).toBeInTheDocument();
    });

    // No cards should render
    const cards = document.querySelectorAll('[data-testid="turno-card"]');
    expect(cards).toHaveLength(0);
  });

  test("turno cards have fade-in class and staggered animationDelay", async () => {
    const turnos = [
      makeTurno("t1", "09:30"),
      makeTurno("t2", "10:15"),
      makeTurno("t3", "11:00"),
    ];
    turnosService.getTurnos.mockResolvedValue({ turnos });

    renderAtConfirmacionTurno();

    await waitFor(() => {
      expect(screen.getByText("09:30")).toBeInTheDocument();
    });

    // Each card container should have the fade-in class
    const cardContainers = document.querySelectorAll(".fade-in");
    expect(cardContainers.length).toBeGreaterThanOrEqual(3);

    // Each container should have unique animationDelay (staggered)
    const delays = new Set();
    cardContainers.forEach((el) => {
      const delay = el.style.animationDelay;
      if (delay) delays.add(delay);
    });
    // At least some containers should have distinct animation delays
    expect(delays.size).toBeGreaterThanOrEqual(2);
  });

  test("no standalone Volver button is rendered", async () => {
    const turnos = [
      makeTurno("t1", "09:30"),
    ];
    turnosService.getTurnos.mockResolvedValue({ turnos });

    renderAtConfirmacionTurno();

    await waitFor(() => {
      expect(screen.getByText("09:30")).toBeInTheDocument();
    });

    // No standalone button with "Volver" text should be on the page
    // (TransactionalLayout covers back navigation)
    const volverButtons = screen.queryAllByRole("button", { name: /Volver/i });
    // If there's a Volver button inside a modal (from ConfirmarModal), that's fine
    // but there should be no standalone Volver on the page itself
    // Since ConfirmarModal is not rendered in this slice, any Volver button
    // would be a standalone one — which we DON'T want
    expect(volverButtons).toHaveLength(0);
  });

  test("Reservar Turno button opens ConfirmarModal with turno data", async () => {
    const turno = makeTurno("t1", "09:30");
    turnosService.getTurnos.mockResolvedValue({ turnos: [turno] });

    renderAtConfirmacionTurno();

    await waitFor(() => {
      expect(screen.getByText("09:30")).toBeInTheDocument();
    });

    // Click the "Reservar Turno" button
    const reservarBtn = screen.getByRole("button", { name: /Reservar Turno/i });
    expect(reservarBtn).toBeInTheDocument();
    fireEvent.click(reservarBtn);

    // Modal should open with the turno details
    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
    expect(
      screen.getByRole("heading", { name: /Confirmar Reserva/i }),
    ).toBeInTheDocument();
  });
});
