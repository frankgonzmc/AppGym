import axios from './axios';

export const getDetalleRutinaRequest = (id) => axios.get(`/detalles-rutinas/${id}`);

export const createDetalleRutinaRequest = (detalles) => axios.post('/detalles-rutinas', detalles);

export const deleteDetalleRutinaRequest = (id) => axios.delete(`/detalles-rutinas/${id}`);

export const updateDetalleRutinaRequest = (id, detalles) => axios.put(`/detalles-rutinas/${id}`, detalles);

export const updateProgresoEjercicioRequest = async (detalleId, seriesCompletadas) => {
    return axios.put(`/detalles-rutinas/${detalleId}`, { seriesProgreso: seriesCompletadas });
};

export const updateEstadoRutinaRequest = async (detalleId, estado) => {
    return axios.put(`/detalles-rutinas/${detalleId}`, { estado });
};
