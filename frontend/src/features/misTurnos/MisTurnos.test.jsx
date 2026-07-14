import { describe, expect, test, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AppRoutes } from "../../App";
import MisTurnos from "./MisTurnos";
import * as misTurnosService from "../../service/misTurnosService";

vi.mock("../../service/misTurnosService", async () => {
	const actual = await vi.importActual("../../service/misTurnosService");
	return {
		...actual,
		getMisTurnos: vi.fn(),
	};
});

const upcomingApiTurno = {
	id: "turno-1",
	profesional: "Dr. Martín Rossi",
	servicio: "Cardiología",
	fechaHora: "2030-06-15T12:00:00.000Z",
	sede: "Centro Médico Barrio Norte",
	estadoTurno: "RESERVADO",
};

const RouteWrapper = ({ children }) => (
	<MemoryRouter initialEntries={["/mis-turnos/test-id"]}>
		<Routes>
			<Route path="/mis-turnos/:id" element={children} />
		</Routes>
	</MemoryRouter>
);

describe("MisTurnos", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	test("renders at /mis-turnos/:id under AppLayout with title and sections", async () => {
		misTurnosService.getMisTurnos.mockResolvedValue({ turnos: [] });

		render(
			<MemoryRouter initialEntries={["/mis-turnos/test-id"]}>
				<AppRoutes />
			</MemoryRouter>,
		);

		expect(
			screen.getByRole("heading", { name: /Mis Turnos/i, level: 1 }),
		).toBeInTheDocument();
		expect(screen.getByText("Próximos Turnos")).toBeInTheDocument();
		expect(screen.getByText("Turnos Pasados")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /Nuevo Turno/i }),
		).toBeInTheDocument();

		await screen.findByText("No tiene próximos turnos");
	});

	test("navigates to home when Nuevo Turno is clicked", async () => {
		misTurnosService.getMisTurnos.mockResolvedValue({ turnos: [] });

		render(
			<MemoryRouter initialEntries={["/mis-turnos/test-id"]}>
				<AppRoutes />
			</MemoryRouter>,
		);

		expect(await screen.findByText("No tiene próximos turnos")).toBeInTheDocument();

		fireEvent.click(screen.getByRole("button", { name: /Nuevo Turno/i }));
		expect(
			screen.getByRole("heading", { name: /Búsqueda de Turnos/i }),
		).toBeInTheDocument();
	});

	test("opens cancel modal when Cancelar is clicked", async () => {
		misTurnosService.getMisTurnos.mockResolvedValue({
			turnos: [upcomingApiTurno],
		});

		render(
			<RouteWrapper>
				<MisTurnos />
			</RouteWrapper>,
		);

		const cancelButton = (await screen.findAllByRole("button", {
			name: /^Cancelar$/i,
		}))[0];
		fireEvent.click(cancelButton);

		expect(screen.getByRole("dialog")).toBeInTheDocument();
		expect(screen.getByText("Cancelar turno")).toBeInTheDocument();
	});

	test("closes modal without confirming when Volver is clicked", async () => {
		misTurnosService.getMisTurnos.mockResolvedValue({
			turnos: [upcomingApiTurno],
		});

		render(
			<RouteWrapper>
				<MisTurnos />
			</RouteWrapper>,
		);

		const cancelButton = (await screen.findAllByRole("button", {
			name: /^Cancelar$/i,
		}))[0];
		fireEvent.click(cancelButton);
		fireEvent.click(screen.getByRole("button", { name: /Volver/i }));

		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	test("shows empty state when there are no upcoming appointments", async () => {
		misTurnosService.getMisTurnos.mockResolvedValue({ turnos: [] });

		render(
			<RouteWrapper>
				<MisTurnos />
			</RouteWrapper>,
		);

		expect(await screen.findByText("No tiene próximos turnos")).toBeInTheDocument();
		expect(
			screen.queryByRole("button", { name: /^Cancelar$/i }),
		).not.toBeInTheDocument();
	});
});
