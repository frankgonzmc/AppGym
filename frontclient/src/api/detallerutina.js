import axios from './axios';

export const createDetalleRutinaRequest = (detalle) => axios.post('/detalles-rutinas', detalle);

// Asegúrate de agregar esta función para eliminar un detalle de rutina
export const deleteDetalleRutinaRequest = (id) => axios.delete(`/detalles-rutinas/${id}`);