import axios from './axios';

// Obtener los detalles de una rutina específica
export const getDetalleRutinaRequest = (rutinaId) => axios.get(`/detalles-rutinas/${rutinaId}`);

// Crear un nuevo detalle de rutina
export const createDetalleRutinaRequest = (detalles) => axios.post('/detalles-rutinas', detalles);

// Eliminar un detalle de rutina por su ID
export const deleteDetalleRutinaRequest = (detalleId) => axios.delete(`/detalles-rutinas/${detalleId}`);

// Actualizar un detalle de rutina (general)
export const updateDetalleRutinaRequest = (detalleId, detalles) => axios.put(`/detalles-rutinas/${detalleId}`, detalles);

// Actualizar el estado de un ejercicio específico en los detalles de la rutina
export const updateEstadoEjercicioRequest = (detalleId, estado) =>
    axios.put(`/detalles-rutinas/${detalleId}`, { estado });

// Actualizar el progreso de un ejercicio específico (series completadas)
export const updateProgresoEjercicioRequest = (detalleId, seriesProgreso) =>
    axios.put(`/detalles-rutinas/${detalleId}/progreso`, { seriesProgreso });

// Obtener todos los detalles relacionados con una rutina
export const getDetallesRutina = async (rutinaId) => {
    const response = await axios.get(`/detalles-rutinas/${rutinaId}`);
    return response.data; // Devuelve los detalles de la rutina
};
