import axios from 'axios';

export const getPacientes = async () => {
    try {
        const response = await axios.get('http://localhost:3000/pacientes');
        return response.data;
    } catch (e) {
        console.error('error al obtener pacientes', e);
        return [];
    }
};
