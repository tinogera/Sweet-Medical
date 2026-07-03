import { useCallback, useEffect, useState } from "react";

/**
 * Centraliza el patrón de carga de datos: estado `cargando`,
 * carga inicial al montar y re-carga (por ejemplo, al buscar)
 * con los argumentos que reciba `cargar`.
 */
export function useCargarDatos(obtenerDatos) {
	const [datos, setDatos] = useState([]);
	const [cargando, setCargando] = useState(true);

	const cargar = useCallback(
		async (...args) => {
			setCargando(true);
			try {
				const data = await obtenerDatos(...args);
				if (data) setDatos(data);
			} finally {
				setCargando(false);
			}
		},
		[obtenerDatos],
	);

	useEffect(() => {
		cargar();
	}, [cargar]);

	return { datos, cargando, cargar };
}
