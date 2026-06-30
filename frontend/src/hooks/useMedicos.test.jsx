import { describe, expect, test, vi, afterEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useMedicos } from "./useMedicos";
import * as medicosService from "../services/medicosService";

vi.mock("../services/medicosService", () => ({
	getMedicos: vi.fn(),
}));

describe("useMedicos", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	test("fetch exitoso: devuelve lista de médicos", async () => {
		const mockMedicos = [
			{ id: 1, nombre: "Dr. Rossi" },
			{ id: 2, nombre: "Dra. González" },
		];
		vi.mocked(medicosService.getMedicos).mockResolvedValue(mockMedicos);

		const { result } = renderHook(() => useMedicos());

		await waitFor(() => {
			expect(result.current.fase).toBe("success");
		});

		expect(result.current.data).toEqual(mockMedicos);
		expect(result.current.loading).toBe(false);
		expect(result.current.error).toBeNull();
		expect(medicosService.getMedicos).toHaveBeenCalledTimes(1);
	});

	test("fetch con error: estado error seteado", async () => {
		const testError = new Error("Error de red");
		vi.mocked(medicosService.getMedicos).mockRejectedValue(testError);

		const { result } = renderHook(() => useMedicos());

		await waitFor(() => {
			expect(result.current.fase).toBe("error");
		});

		expect(result.current.data).toBeNull();
		expect(result.current.error).toBe(testError);
		expect(result.current.loading).toBe(false);
	});

	test("refetch: execute() vuelve a llamar getMedicos", async () => {
		vi.mocked(medicosService.getMedicos)
			.mockResolvedValueOnce([{ id: 1, nombre: "Dr. A" }])
			.mockResolvedValueOnce([{ id: 2, nombre: "Dr. B" }]);

		const { result } = renderHook(() => useMedicos());

		await waitFor(() => {
			expect(result.current.fase).toBe("success");
		});
		expect(result.current.data).toEqual([{ id: 1, nombre: "Dr. A" }]);

		await act(async () => {
			await result.current.refetch();
		});

		expect(medicosService.getMedicos).toHaveBeenCalledTimes(2);
		expect(result.current.data).toEqual([{ id: 2, nombre: "Dr. B" }]);
	});
});
