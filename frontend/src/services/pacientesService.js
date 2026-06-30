import axios from "axios";
import { API_BASE_URL } from "../config";

/**
 * Obtiene la lista de pacientes.
 * Lanza error si la respuesta HTTP no es 2xx.
 *
 * @returns {Promise<object[]>}
 */
export const getPacientes = async () => {
	const response = await axios.get(`${API_BASE_URL}/pacientes`);
	return response.data;
};
