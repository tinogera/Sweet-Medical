import axios from 'axios';
import { API_BASE_URL } from '../config';

export const getTurnos = async (params) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/turnos`, { params });
        return response.data;
    } catch (e) {
        console.error('error al obtener turnos', e);
        return { turnos: [], paginacion: {} };
    }
};

export const reservarTurno = async (turnoId, pacienteId, servicioId) => {
    const response = await axios.patch(`${API_BASE_URL}/turnos/${turnoId}`, {
        estado: 'RESERVADO',
        responsableId: pacienteId,
        servicioId: servicioId,
    });
    return response.data;
};

export const cancelarTurno = async(turnoId, pacienteId, motivo) => {
   const response = await axios.patch(`${API_BASE_URL}/turnos/${turnoId}`, {
        estado: 'CANCELADO',
        rol: 'PACIENTE',
        responsableId: pacienteId,
        motivo: motivo || "No puedo asistir"
    });
    return response.data;
}

