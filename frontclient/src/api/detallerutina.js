import axios from './axios';

export const getDetalleRutinaRequest = (id) => axios.get(`/detalles-rutinas/${id}`);

export const createDetalleRutinaRequest = (detalles) => axios.post('/detalles-rutinas', detalles);

export const deleteDetalleRutinaRequest = (id) => axios.delete(`/detalles-rutinas/${id}`);

export const updateDetalleRutinaRequest = (id, detalles) => axios.put(`/detalles-rutinas/${id}`, detalles);

export const updateEstadoRutinaRequest = (detalleId, estado) => axios.put(`/detalles-rutinas/${detalleId}`, { estado });

export const updateRutinaProgressRequest = (rutinaId, ejerciciosCompletos) => axios.put(`/detalles-rutinas/${rutinaId}`, { ejerciciosCompletos });

export const updateProgresoEjercicioRequest = (detalleId, seriesCompletadas) => {
    return axios.put(`/detalles-rutinas/${detalleId}`, { seriesProgreso: seriesCompletadas });
};

export const getDetallesRutina = async (rutinaId) => {
    const response = await axios.get(`/detalles-rutinas/${rutinaId}`);
    return response.data; // Debería devolver la lista de detalles de la rutina
};
