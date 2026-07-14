import { describe, expect, test, vi } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useCargarDatos } from "./useCargarDatos";

describe("useCargarDatos", () => {
  test("carga los datos al montar y apaga el estado de carga", async () => {
    const obtenerDatos = vi.fn().mockResolvedValue([{ id: 1 }]);

    const { result } = renderHook(() => useCargarDatos(obtenerDatos));

    expect(result.current.cargando).toBe(true);

    await waitFor(() => {
      expect(result.current.cargando).toBe(false);
    });

    expect(obtenerDatos).toHaveBeenCalledTimes(1);
    expect(result.current.datos).toEqual([{ id: 1 }]);
  });

  test("cargar() vuelve a pedir datos con los argumentos recibidos", async () => {
    const obtenerDatos = vi
      .fn()
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([{ id: 2 }]);

    const { result } = renderHook(() => useCargarDatos(obtenerDatos));

    await waitFor(() => {
      expect(result.current.cargando).toBe(false);
    });

    await act(async () => {
      await result.current.cargar("gardel");
    });

    expect(obtenerDatos).toHaveBeenLastCalledWith("gardel");
    expect(result.current.datos).toEqual([{ id: 2 }]);
  });

  test("conserva los datos anteriores si la carga no devuelve nada", async () => {
    const obtenerDatos = vi
      .fn()
      .mockResolvedValueOnce([{ id: 1 }])
      .mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useCargarDatos(obtenerDatos));

    await waitFor(() => {
      expect(result.current.cargando).toBe(false);
    });

    await act(async () => {
      await result.current.cargar();
    });

    expect(result.current.datos).toEqual([{ id: 1 }]);
    expect(result.current.cargando).toBe(false);
  });
});
