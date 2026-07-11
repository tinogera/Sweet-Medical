import axios from 'axios';
import { API_BASE_URL } from '../config';

export const getMedicos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/medicos`);
    return response.data;
  } catch (e) {
    console.error("error al obtener medicos", e);
    return [];
  }
};

export const getDisponibilidad = async (medicoId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/medicos/${medicoId}/disponibilidad`);
    return response.data;
  } catch (e) {
    console.error("error al obtener disponibilidad", e);
    throw e;
  }
};

export const agregarDisponibilidad = async (medicoId, { fecha, horaInicio, horaFin, sedeName }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/medicos/${medicoId}/disponibilidad`, {
      fecha,
      horaInicio,
      horaFin,
      sedeName
    });
    return response.data;
  } catch (e) {
    console.error("error al agregar disponibilidad", e);
    throw e;
  }
};

export const eliminarDisponibilidad = async (medicoId, bloqueId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/medicos/${medicoId}/disponibilidad/${bloqueId}`);
    return response.data;
  } catch (e) {
    console.error("error al eliminar disponibilidad", e);
    throw e;
  }
};
