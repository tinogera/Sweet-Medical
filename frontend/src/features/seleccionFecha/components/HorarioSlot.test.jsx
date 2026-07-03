import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ToggleButtonGroup } from "@heroui/react";
import HorarioSlot from "./HorarioSlot";

function makeTurno(horaLocal) {
  const fechaHora = `2026-07-15T${horaLocal}:00`;
  return {
    id: "turno-1",
    servicioId: "serv-1",
    fechaHora,
    profesional: "Dr. Rossi",
    sede: "Centro Médico",
    servicio: "Cardiología",
  };
}

function formattedTime(horaLocal) {
  return new Date(`2026-07-15T${horaLocal}:00`).toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

describe("HorarioSlot", () => {
  test("renders time string inside ToggleButton", () => {
    const turno = makeTurno("09:00");
    const turnoKey = "turno-1-serv-1";
    render(
      <ToggleButtonGroup
        selectionMode="single"
        selectedKeys={new Set()}
        onSelectionChange={() => {}}
      >
        <HorarioSlot
          turno={turno}
          turnoKey={turnoKey}
          hora={formattedTime("09:00")}
        />
      </ToggleButtonGroup>,
    );

    const slot = screen.getByTestId("horario-slot");
    expect(slot).toBeInTheDocument();
    expect(screen.getByText(formattedTime("09:00"))).toBeInTheDocument();
  });

  test("renders servicio and sede below the time", () => {
    const turno = makeTurno("09:00");
    render(
      <ToggleButtonGroup
        selectionMode="single"
        selectedKeys={new Set()}
        onSelectionChange={() => {}}
      >
        <HorarioSlot
          turno={turno}
          turnoKey="turno-1-serv-1"
          hora={formattedTime("09:00")}
        />
      </ToggleButtonGroup>,
    );

    expect(screen.getByText("Cardiología")).toBeInTheDocument();
    expect(screen.getByText("Centro Médico")).toBeInTheDocument();
  });

  test("fires onSelectionChange when ToggleButton is clicked", () => {
    const onSelectionChange = vi.fn();
    const turno = makeTurno("09:00");
    const turnoKey = "turno-1-serv-1";
    render(
      <ToggleButtonGroup
        selectionMode="single"
        selectedKeys={new Set()}
        onSelectionChange={onSelectionChange}
      >
        <HorarioSlot
          turno={turno}
          turnoKey={turnoKey}
          hora={formattedTime("09:00")}
        />
      </ToggleButtonGroup>,
    );

    fireEvent.click(screen.getByTestId("horario-slot"));
    expect(onSelectionChange).toHaveBeenCalled();
  });
});
