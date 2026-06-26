import { render, screen } from "@testing-library/react";
import TurnosPasados from "./TurnosPasados";

const sampleTurnos = [
  {
    id: "past-1",
    profesional: "Dr. Carlos Méndez",
    especialidad: "Clínica Médica",
    fechaCorta: "02 Oct",
    hora: "09:15 hs",
    sede: "Centro Médico Microcentro",
    estado: "asistio",
  },
  {
    id: "past-2",
    profesional: "Dra. Silvia Paz",
    especialidad: "Oftalmología",
    fechaCorta: "15 Sep",
    hora: "11:00 hs",
    sede: "Teleconsulta",
    estado: "asistio",
  },
  {
    id: "past-3",
    profesional: "Dr. Luis Almirón",
    especialidad: "Traumatología",
    fechaCorta: "28 Ago",
    hora: "16:30 hs",
    sede: "Sanatorio Agote",
    estado: "cancelado",
  },
];

describe("TurnosPasados", () => {
  test("renders section header and table columns", () => {
    render(<TurnosPasados turnos={sampleTurnos} />);

    expect(screen.getByText("Turnos Pasados")).toBeInTheDocument();
    expect(screen.getByText("(Últimos 3 meses)")).toBeInTheDocument();

    expect(screen.getByRole("columnheader", { name: /Fecha/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /Profesional/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /Especialidad/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /Sede/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /Estado/i })).toBeInTheDocument();
  });

  test("renders one row per appointment", () => {
    render(<TurnosPasados turnos={sampleTurnos} />);

    const rows = screen.getAllByRole("row").filter((row) => row.tagName === "TR");
    // 3 data rows + 1 header row = 4
    expect(rows).toHaveLength(4);

    expect(screen.getByText("Dr. Carlos Méndez")).toBeInTheDocument();
    expect(screen.getByText("Dra. Silvia Paz")).toBeInTheDocument();
    expect(screen.getByText("Dr. Luis Almirón")).toBeInTheDocument();
  });

  test("renders estado chips with correct colors", () => {
    render(<TurnosPasados turnos={sampleTurnos} />);

    const asistenciaChips = screen.getAllByText("Realizado");
    expect(asistenciaChips).toHaveLength(2);
    asistenciaChips.forEach((chip) => {
      expect(chip.closest("[class*='chip--success']")).toBeInTheDocument();
    });

    const canceladoChip = screen.getByText("Cancelado");
    expect(canceladoChip.closest("[class*='chip--danger']")).toBeInTheDocument();
  });

  test("cancelled row has reduced opacity", () => {
    render(<TurnosPasados turnos={sampleTurnos} />);

    const canceladoRow = screen.getByText("Dr. Luis Almirón").closest("tr");
    expect(canceladoRow).toHaveClass("opacity-70");
  });

  test("renders scroll container and footer button", () => {
    render(<TurnosPasados turnos={sampleTurnos} />);

    expect(screen.getByRole("button", { name: /Ver historial completo/i })).toBeInTheDocument();
    expect(document.querySelector("[class*='table__scroll-container']")).toBeInTheDocument();
  });
});
