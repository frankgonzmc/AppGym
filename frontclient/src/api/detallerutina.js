import axios from './axios';

export const getDetalleRutinaRequest = (id) => axios.get(`/detalles-rutinas/${id}`);

export const createDetalleRutinaRequest = (detalles) => axios.post('/detalles-rutinas', detalles);

export const deleteDetalleRutinaRequest = (id) => axios.delete(`/detalles-rutinas/${id}`);

export const updateDetalleRutinaRequest = (id, detalles) => axios.put(`/detalles-rutinas/${id}`, detalles);

export const updateEstadoRutinaRequest = (detalleId, estado) => axios.put(`/detalles-rutinas/${detalleId}`, estado);

export const updateRutinaProgressRequest = (rutinaId, ejerciciosCompletos) => axios.put(`/rutinas/${rutinaId}`, ejerciciosCompletos);


export const updateProgresoEjercicioRequest = (detalleId, seriesCompletadas) => {
    return axios.put(`/detalles-rutinas/${detalleId}`, { seriesProgreso: seriesCompletadas });
};
