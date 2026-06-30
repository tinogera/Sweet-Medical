import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Hook genérico para operaciones asincrónicas.
 *
 * Maneja el ciclo de vida: idle → loading → success | error
 * Incluye cleanup en unmount para evitar setState después de desmontar.
 *
 * @param {() => Promise<any>} asyncFn - Función asincrónica a ejecutar
 * @param {any[]} [deps=[]] - Dependencias que triggeran re-ejecución
 * @returns {{ data: any, loading: boolean, error: Error|null, fase: string, execute: () => Promise<any> }}
 */
export function useAsync(asyncFn, deps = []) {
	const [state, setState] = useState({
		fase: "idle",
		data: null,
		error: null,
	});
	const mountedRef = useRef(true);

	useEffect(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, []);

	const execute = useCallback(() => {
		setState({ fase: "loading", data: null, error: null });

		return asyncFn()
			.then((data) => {
				if (mountedRef.current) {
					setState({ fase: "success", data, error: null });
				}
				return data;
			})
			.catch((err) => {
				if (mountedRef.current) {
					setState({ fase: "error", data: null, error: err });
				}
				throw err;
			});
	}, deps); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		execute().catch(() => {
			// Error ya capturado y seteado en execute.catch
		});
	}, deps); // eslint-disable-line react-hooks/exhaustive-deps

	return {
		data: state.data,
		loading: state.fase === "loading",
		error: state.error,
		fase: state.fase,
		execute,
	};
}
