import axios from 'axios';

export const getServicios = async () => {
    try {
        const response = await axios.get('http://localhost:3000/servicios');
        return response.data;
    } catch (e) {
        console.error("error al obtener servicios", e);
    }
};