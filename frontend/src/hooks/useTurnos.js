import { useBusqueda } from "../context/BusquedaContext";
import { useAsync } from "./useAsync";
import { getTurnos } from "../services/turnosService";

/**
 * Agrupa turnos por fecha (dateKey) para facilitar el renderizado.
 *
 * @param {object[]} turnos
 * @returns {object<string, object[]>}
 */
function agruparPorFecha(turnos) {
	return turnos.reduce((acc, tur) => {
		const day = new Date(tur.fechaHora);
		const key = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;
		if (!acc[key]) acc[key] = [];
		acc[key].push(tur);
		return acc;
	}, {});
}

/**
 * Construye los parámetros para getTurnos a partir del contexto de búsqueda.
 *
 * @param {object} busqueda
 * @returns {object}
 */
function buildTurnosParams(busqueda) {
	const params = {
		idPaciente: busqueda.pacienteId,
		ordenarPor: "fecha",
		direccion: "asc",
		pagina: 1,
		limite: 100,
	};

	if (busqueda.tipo === "medico" && busqueda.profesionalId) {
		params.profesional = busqueda.profesionalId;
	} else if (busqueda.tipo === "servicio") {
		if (busqueda.especialidad) params.especialidad = busqueda.especialidad;
		if (busqueda.practica) params.practica = busqueda.practica;
	}

	return params;
}

/**
 * Hook que obtiene turnos según el contexto de búsqueda actual.
 * Usa valores primitivos del contexto como dependencias (no el objeto entero).
 *
 * @returns {{ data: { turnos: object[], porFecha: object<string, object[]> }, loading: boolean, error: Error|null, fase: string, refetch: () => Promise<any> }}
 */
export function useTurnos() {
	const { busqueda } = useBusqueda();

	const deps = [
		busqueda.tipo,
		busqueda.profesionalId,
		busqueda.especialidad,
		busqueda.practica,
		busqueda.pacienteId,
	];

	const { data, loading, error, fase, execute } = useAsync(
		() => getTurnos(buildTurnosParams(busqueda)),
		deps,
	);

	const turnos = data?.turnos ?? [];

	return {
		data: {
			turnos,
			porFecha: agruparPorFecha(turnos),
		},
		loading,
		error,
		fase,
		refetch: execute,
	};
}
