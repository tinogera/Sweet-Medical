import { describe, expect, test, vi, afterEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useMisTurnos } from "./useMisTurnos";
import * as misTurnosService from "../services/misTurnosService";

vi.mock("../services/misTurnosService", async () => {
	const actual = await vi.importActual("../services/misTurnosService");
	return {
		...actual,
		getMisTurnos: vi.fn(),
	};
});

describe("useMisTurnos", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	test("fetch exitoso: devuelve { upcoming, past }", async () => {
		const apiTurnos = [
			{
				id: "turno-1",
				profesional: "Dr. Martín Rossi",
				servicio: "Cardiología",
				fechaHora: "2030-06-15T12:00:00.000Z",
				sede: "Centro Médico",
				estadoTurno: "RESERVADO",
			},
			{
				id: "turno-2",
				profesional: "Dr. García",
				servicio: "Clínica Médica",
				fechaHora: "2025-01-10T10:00:00.000Z",
				sede: "Consultorios",
				estadoTurno: "REALIZADO",
			},
		];

		vi.mocked(misTurnosService.getMisTurnos).mockResolvedValue({
			turnos: apiTurnos,
		});

		const { result } = renderHook(() => useMisTurnos("pac-1"));

		await waitFor(() => {
			expect(result.current.fase).toBe("success");
		});

		expect(result.current.data.upcoming).toHaveLength(1);
		expect(result.current.data.past).toHaveLength(1);
		expect(result.current.data.upcoming[0].id).toBe("turno-1");
		expect(result.current.data.past[0].id).toBe("turno-2");
		expect(result.current.loading).toBe(false);
		expect(result.current.error).toBeNull();
	});

	test("fetch con error: estado error seteado", async () => {
		const testError = new Error("Error de red");
		vi.mocked(misTurnosService.getMisTurnos).mockRejectedValue(testError);

		const { result } = renderHook(() => useMisTurnos("pac-1"));

		await waitFor(() => {
			expect(result.current.fase).toBe("error");
		});

		expect(result.current.data.upcoming).toEqual([]);
		expect(result.current.data.past).toEqual([]);
		expect(result.current.error).toBe(testError);
		expect(result.current.loading).toBe(false);
	});

	test("refetch: vuelve a llamar getMisTurnos", async () => {
		vi.mocked(misTurnosService.getMisTurnos)
			.mockResolvedValueOnce({ turnos: [] })
			.mockResolvedValueOnce({
				turnos: [
					{
						id: "turno-3",
						profesional: "Dra. López",
						servicio: "Dermatología",
						fechaHora: "2030-07-01T14:00:00.000Z",
						sede: "Centro Médico",
						estadoTurno: "RESERVADO",
					},
				],
			});

		const { result } = renderHook(() => useMisTurnos("pac-1"));

		await waitFor(() => {
			expect(result.current.fase).toBe("success");
		});
		expect(result.current.data.upcoming).toHaveLength(0);

		await act(async () => {
			await result.current.refetch();
		});

		expect(misTurnosService.getMisTurnos).toHaveBeenCalledTimes(2);
		expect(result.current.data.upcoming).toHaveLength(1);
		expect(result.current.data.upcoming[0].id).toBe("turno-3");
	});
});
