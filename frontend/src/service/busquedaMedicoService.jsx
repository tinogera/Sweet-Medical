import axios from 'axios';
import { API_BASE_URL } from '../config';

export const getMedicos = async (nombre = '') => {
    try {
        const response = await axios.get(`${API_BASE_URL}/medicos`, {
            params: { nombre }
        });
        return response.data;
    } catch (e) {
        console.error("error al obtener medicos", e);
    }
};