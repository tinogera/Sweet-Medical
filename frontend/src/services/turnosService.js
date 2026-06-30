import axios from "axios";
import { API_BASE_URL } from "../config";

/**
 * Obtiene turnos según los parámetros de búsqueda.
 * Lanza error si la respuesta HTTP no es 2xx.
 *
 * @param {object} params - Parámetros de búsqueda (fecha, profesional, etc.)
 * @returns {Promise<{ turnos: object[], paginacion: object }>}
 */
export const getTurnos = async (params) => {
	const response = await axios.get(`${API_BASE_URL}/turnos`, { params });
	return response.data;
};

/**
 * Reserva un turno (PATCH con estado RESERVADO).
 * Lanza error si el turno ya no está disponible (HTTP 409) u otro error.
 *
 * @param {string} turnoId
 * @param {string} pacienteId
 * @param {string} servicioId
 * @returns {Promise<object>}
 */
export const reservarTurno = async (turnoId, pacienteId, servicioId) => {
	const response = await axios.patch(
		`${API_BASE_URL}/turnos/${turnoId}`,
		{
			estado: "RESERVADO",
			responsableId: pacienteId,
			servicioId: servicioId,
		},
	);
	return response.data;
};
