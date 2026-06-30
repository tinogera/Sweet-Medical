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

export const reservarTurno = async (turnoId, pacienteId, servicioId) => {
    const response = await axios.patch(`http://localhost:3000/turnos/${turnoId}`, {
        estado: 'RESERVADO',
        responsableId: pacienteId,
        servicioId: servicioId,
    });
    return response.data;
};

export const cancelarTurno = async(turnoId, pacienteId, motivo) => {
   const response = await axios.patch(`http://localhost:3000/turnos/${turnoId}`, {
        estado: 'CANCELADO',
        responsableId: pacienteId,
        motivo: motivo || "No puedo asistir"
    });
    return response.data;
}

