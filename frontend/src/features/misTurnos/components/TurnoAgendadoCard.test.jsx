import { render, screen } from "@testing-library/react";
import TurnoAgendadoCard from "./TurnoAgendadoCard";

const mockTurno = {
  id: "upcoming-1",
  profesional: "Dr. Martín Rossi",
  especialidad: "Cardiología",
  dia: "15",
  mes: "NOV",
  hora: "10:30 hs",
  sede: "Centro Médico Barrio Norte - Consultorio 12",
  modalidad: "presencial",
};

describe("TurnoAgendadoCard", () => {
  test("renders date box, specialty, doctor, location and type", () => {
    render(<TurnoAgendadoCard turno={mockTurno} />);

    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByText("NOV")).toBeInTheDocument();
    expect(screen.getByText("10:30 hs")).toBeInTheDocument();
    expect(screen.getByText("Cardiología")).toBeInTheDocument();
    expect(screen.getByText("Dr. Martín Rossi")).toBeInTheDocument();
    expect(screen.getByText(/Centro Médico Barrio Norte/)).toBeInTheDocument();
    expect(screen.getByText("Presencial")).toBeInTheDocument();
  });
});
