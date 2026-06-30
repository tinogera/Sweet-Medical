import axios from "axios";
import { API_BASE_URL } from "../config";

/**
 * Obtiene la lista de médicos.
 * Lanza error si la respuesta HTTP no es 2xx.
 *
 * @returns {Promise<object[]>}
 */
export const getMedicos = async () => {
	const response = await axios.get(`${API_BASE_URL}/medicos`);
	return response.data;
};
