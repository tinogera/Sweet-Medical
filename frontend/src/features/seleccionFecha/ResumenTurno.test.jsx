import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ResumenTurno from "./ResumenTurno";

const renderWithRouter = (ui) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe("ResumenTurno", () => {
  test("renders Card with Avatar.Fallback initials from medico label", () => {
    const busqueda = { tipo: "medico", label: "Dr. Rossi" };
    renderWithRouter(<ResumenTurno busqueda={busqueda} />);

    expect(screen.getByTestId("resumen-turno")).toBeInTheDocument();
    expect(screen.getByText("DR")).toBeInTheDocument();
    expect(screen.getByText("Dr. Rossi")).toBeInTheDocument();
    expect(screen.getByText("Médico")).toBeInTheDocument();
  });

  test("renders Avatar.Fallback with initials from servicio label", () => {
    const busqueda = { tipo: "servicio", label: "Cardiología" };
    renderWithRouter(<ResumenTurno busqueda={busqueda} />);

    expect(screen.getByText("C")).toBeInTheDocument();
    expect(screen.getByText("Cardiología")).toBeInTheDocument();
    expect(screen.getByText("Servicio")).toBeInTheDocument();
  });

  test("renders Avatar.Fallback from multi-word label", () => {
    const busqueda = { tipo: "medico", label: "Martín Rossi" };
    renderWithRouter(<ResumenTurno busqueda={busqueda} />);

    expect(screen.getByText("MR")).toBeInTheDocument();
  });

  test("renders Cambiar link that navigates back", () => {
    const busqueda = { tipo: "medico", label: "Dr. Rossi" };
    renderWithRouter(<ResumenTurno busqueda={busqueda} />);

    expect(screen.getByRole("link", { name: /Cambiar/i })).toBeInTheDocument();
  });

  test("renders Avatar without Image when no image URL is provided", () => {
    const busqueda = { tipo: "medico", label: "Dr. Rossi" };
    const { container } = renderWithRouter(<ResumenTurno busqueda={busqueda} />);

    // Fallback should render; image should not be present
    expect(screen.getByText("DR")).toBeInTheDocument();
    const img = container.querySelector(".avatar__image");
    expect(img).not.toBeInTheDocument();
  });
});
