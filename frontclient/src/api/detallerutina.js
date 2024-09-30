import axios from './axios';


export const getDetalleRutinaRequest = (id) => axios.get(`/detalles-rutinas/${id}`)

export const createDetalleRutinaRequest = (detalles) => axios.post('/detalles-rutinas', detalles);

// Asegúrate de agregar esta función para eliminar un detalle de rutina
export const deleteDetalleRutinaRequest = (id) => axios.delete(`/detalles-rutinas/${id}`);

export const updateDetalleRutinaRequest = (id, detalles) => axios.put(`/detalles-rutinas/${id}`, detalles)