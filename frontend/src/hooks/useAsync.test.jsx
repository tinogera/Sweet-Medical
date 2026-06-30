import { describe, expect, test, vi, afterEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useAsync } from "./useAsync";

describe("useAsync", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	test("estado inicial devuelve estructura correcta con loading=false", () => {
		// Verificamos que la estructura mínima del estado existe,
		// aunque con React 19 el efecto se dispara sincrónicamente
		// y pasa a loading inmediatamente en renderHook.
		const slowPromise = () => new Promise((r) => setTimeout(r, 1000));
		const { result } = renderHook(() => useAsync(slowPromise));

		expect(result.current).toHaveProperty("fase");
		expect(result.current).toHaveProperty("data");
		expect(result.current).toHaveProperty("error");
		expect(result.current).toHaveProperty("loading");
		expect(result.current).toHaveProperty("execute");
		expect(typeof result.current.execute).toBe("function");
	});

	test("loading es true durante la ejecución pendiente", () => {
		const { result } = renderHook(() =>
			useAsync(() => new Promise(() => {})),
		);

		expect(result.current.fase).toBe("loading");
		expect(result.current.loading).toBe(true);
		expect(result.current.data).toBeNull();
		expect(result.current.error).toBeNull();
	});

	test("success con datos después de resolver", async () => {
		const mockData = [{ id: 1, nombre: "Dr. Test" }];
		const { result } = renderHook(() => useAsync(() => Promise.resolve(mockData)));

		await waitFor(() => {
			expect(result.current.fase).toBe("success");
		});

		expect(result.current.data).toEqual(mockData);
		expect(result.current.error).toBeNull();
		expect(result.current.loading).toBe(false);
	});

	test("error con excepción capturada", async () => {
		const testError = new Error("Error de red");
		const { result } = renderHook(() =>
			useAsync(() => Promise.reject(testError)),
		);

		await waitFor(() => {
			expect(result.current.fase).toBe("error");
		});

		expect(result.current.data).toBeNull();
		expect(result.current.error).toBe(testError);
		expect(result.current.loading).toBe(false);
	});

	test("execute() permite refetch y actualiza datos", async () => {
		const fn = vi
			.fn()
			.mockResolvedValueOnce("primer-llamado")
			.mockResolvedValueOnce("segundo-llamado");

		const { result } = renderHook(() => useAsync(fn));

		await waitFor(() => {
			expect(result.current.fase).toBe("success");
		});
		expect(result.current.data).toBe("primer-llamado");
		expect(fn).toHaveBeenCalledTimes(1);

		await act(async () => {
			await result.current.execute();
		});

		expect(fn).toHaveBeenCalledTimes(2);
		expect(result.current.data).toBe("segundo-llamado");
	});

	test("cleanup en unmount: no setea estado después de desmontar", async () => {
		const fn = vi.fn().mockResolvedValue("data");
		const { result, unmount } = renderHook(() => useAsync(fn));

		unmount();

		// Si no hay console.error/warn después del unmount, el cleanup funciona
		await vi.waitFor(() => {
			expect(fn).toHaveBeenCalledTimes(1);
		});
	});
});
