import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppRoutes } from "../../App";
import MisTurnos from "./MisTurnos";
import { upcomingTurnos } from "./mockTurnos";

const Wrapper = ({ children, initialEntries = ["/mis-turnos"] }) => (
  <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
);

describe("MisTurnos", () => {
  test("renders at /mis-turnos under AppLayout with title and sections", () => {
    render(
      <Wrapper>
        <AppRoutes />
      </Wrapper>
    );

    expect(screen.getByRole("heading", { name: /Mis Turnos/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByText("Próximos Turnos")).toBeInTheDocument();
    expect(screen.getByText("Turnos Pasados")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Nuevo Turno/i })).toBeInTheDocument();
  });

  test("navigates to home when Nuevo Turno is clicked", () => {
    render(
      <Wrapper>
        <AppRoutes />
      </Wrapper>
    );

    fireEvent.click(screen.getByRole("button", { name: /Nuevo Turno/i }));
    expect(screen.getByRole("heading", { name: /Búsqueda de Turnos/i })).toBeInTheDocument();
  });

  test("opens cancel modal when Cancelar is clicked", () => {
    render(
      <Wrapper>
        <MisTurnos />
      </Wrapper>
    );

    const cancelButton = screen.getAllByRole("button", { name: /^Cancelar$/i })[0];
    fireEvent.click(cancelButton);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Cancelar turno")).toBeInTheDocument();
  });

  test("closes modal without confirming when Volver is clicked", () => {
    render(
      <Wrapper>
        <MisTurnos />
      </Wrapper>
    );

    fireEvent.click(screen.getAllByRole("button", { name: /^Cancelar$/i })[0]);
    fireEvent.click(screen.getByRole("button", { name: /Volver/i }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("shows empty state when there are no upcoming appointments", () => {
    render(
      <Wrapper>
        <MisTurnos upcomingTurnos={[]} />
      </Wrapper>
    );

    expect(screen.getByText("No tiene próximos turnos")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /^Cancelar$/i })).not.toBeInTheDocument();
  });
});
