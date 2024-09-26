import axios from './axios';

export const createDetalleRutinaRequest = (detalle) => axios.post('/detalles-rutinas', detalle);
