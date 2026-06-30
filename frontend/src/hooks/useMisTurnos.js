import { useAsync } from "./useAsync";
import { getMisTurnos, splitUpcomingPast } from "../services/misTurnosService";

/**
 * Hook que obtiene los turnos de un paciente, separando en próximos y pasados.
 *
 * @param {string} pacienteId - ID del paciente
 * @returns {{ data: { upcoming: object[], past: object[] }, loading: boolean, error: Error|null, fase: string, refetch: () => Promise<any> }}
 */
export function useMisTurnos(pacienteId) {
	const { data, loading, error, fase, execute } = useAsync(
		async () => {
			const { turnos } = await getMisTurnos(pacienteId);
			return splitUpcomingPast(turnos);
		},
		[pacienteId],
	);

	return {
		data: {
			upcoming: data?.upcoming ?? [],
			past: data?.past ?? [],
		},
		loading,
		error,
		fase,
		refetch: execute,
	};
}
