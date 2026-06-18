import axios from 'axios';

export const getMedicos = async () => {
    try {
        const response = await axios.get('http://localhost:3000/medicos');
        return response.data;
    } catch (e) {
        console.error("error al obtener medicos", e);
    }
};