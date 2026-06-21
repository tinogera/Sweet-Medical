import axios from 'axios';

export const getTurnos = async (params) => {
    try {
        const response = await axios.get('http://localhost:3000/turnos', { params });
        return response.data;
    } catch (e) {
        console.error('error al obtener turnos', e);
        return { turnos: [], paginacion: {} };
    }
};
