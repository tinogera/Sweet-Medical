import axios from 'axios';
import { API_BASE_URL } from '../config';

export const getPacientes = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/pacientes`);
        return response.data;
    } catch (e) {
        console.error('error al obtener pacientes', e);
        return [];
    }
};
