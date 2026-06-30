import { describe, expect, test, vi, afterEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import React from "react";
import { BusquedaProvider, useBusqueda } from "../context/BusquedaContext";
import { useTurnos } from "./useTurnos";
import * as turnosService from "../services/turnosService";

vi.mock("../services/turnosService", () => ({
	getTurnos: vi.fn(),
}));

const medicoState = {
	tipo: "medico",
	label: "Dr. Rossi",
	profesionalId: "Dr. Rossi",
	especialidad: null,
	practica: null,
	pacienteId: "pac-1",
};

const servicioState = {
	tipo: "servicio",
	label: "Cardiología",
	profesionalId: null,
	especialidad: "Cardiología",
	practica: "Consulta",
	pacienteId: "pac-2",
};

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

describe("useTurnos", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	test("fetch exitoso con turnos: devuelve { turnos, porFecha }", async () => {
		const apiTurnos = [makeTurno("t1", "09:00"), makeTurno("t2", "10:00")];
		vi.mocked(turnosService.getTurnos).mockResolvedValue({
			turnos: apiTurnos,
		});

		const wrapper = ({ children }) => (
			<BusquedaProvider initialValue={medicoState}>
				{children}
			</BusquedaProvider>
		);

		const { result } = renderHook(() => useTurnos(), { wrapper });

		await waitFor(() => {
			expect(result.current.fase).toBe("success");
		});

		expect(result.current.data.turnos).toHaveLength(2);
		expect(result.current.data.porFecha).toHaveProperty("2026-07-15");
		expect(result.current.data.porFecha["2026-07-15"]).toHaveLength(2);
		expect(result.current.loading).toBe(false);
		expect(result.current.error).toBeNull();
		expect(turnosService.getTurnos).toHaveBeenCalledTimes(1);
		expect(turnosService.getTurnos).toHaveBeenCalledWith(
			expect.objectContaining({
				profesional: "Dr. Rossi",
				idPaciente: "pac-1",
			}),
		);
	});

	test("fetch vacío: turnos vacío y porFecha vacío", async () => {
		vi.mocked(turnosService.getTurnos).mockResolvedValue({ turnos: [] });

		const wrapper = ({ children }) => (
			<BusquedaProvider initialValue={servicioState}>
				{children}
			</BusquedaProvider>
		);

		const { result } = renderHook(() => useTurnos(), { wrapper });

		await waitFor(() => {
			expect(result.current.fase).toBe("success");
		});

		expect(result.current.data.turnos).toEqual([]);
		expect(result.current.data.porFecha).toEqual({});
		expect(turnosService.getTurnos).toHaveBeenCalledWith(
			expect.objectContaining({
				especialidad: "Cardiología",
				practica: "Consulta",
				idPaciente: "pac-2",
			}),
		);
	});

	test("cambio de dependencias dispara refetch automático", async () => {
		vi.mocked(turnosService.getTurnos)
			.mockResolvedValueOnce({
				turnos: [makeTurno("t1", "09:00")],
			})
			.mockResolvedValueOnce({
				turnos: [makeTurno("t2", "10:00")],
			});

		// Exponemos setSearchOptions para mutar el contexto desde el test
		const searchOptionsRef = { current: null };

		function Wrapper({ children }) {
			return (
				<BusquedaProvider initialValue={medicoState}>
					<ContextCapture />
					{children}
				</BusquedaProvider>
			);

			function ContextCapture() {
				const { setSearchOptions } = useBusqueda();
				searchOptionsRef.current = setSearchOptions;
				return null;
			}
		}

		const { result } = renderHook(() => useTurnos(), { wrapper: Wrapper });

		await waitFor(() => {
			expect(result.current.fase).toBe("success");
		});
		expect(result.current.data.turnos).toHaveLength(1);
		expect(turnosService.getTurnos).toHaveBeenCalledTimes(1);

		// Cambiamos el profesional via context → gatilla refetch automático
		await act(async () => {
			searchOptionsRef.current({ profesionalId: "Dr. Pérez" });
		});

		await waitFor(() => {
			expect(turnosService.getTurnos).toHaveBeenCalledTimes(2);
		});
	});
});
