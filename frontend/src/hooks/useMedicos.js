import { useAsync } from "./useAsync";
import { getMedicos } from "../services/medicosService";

/**
 * Hook que obtiene la lista de médicos vía useAsync.
 *
 * @returns {{ data: object[], loading: boolean, error: Error|null, fase: string, refetch: () => Promise<any> }}
 */
export function useMedicos() {
	const { data, loading, error, fase, execute } = useAsync(getMedicos, []);

	return {
		data,
		loading,
		error,
		fase,
		refetch: execute,
	};
}
