import axios from './axios';

/**
 * Obtener los detalles de una rutina específica
 * @param {string} rutinaId - ID de la rutina
 * @returns {Promise} - Promesa con los detalles de la rutina
 */
export const getDetalleRutinaRequest = async (rutinaId) => {
    try {
        const response = await axios.get(`/detalles-rutinas/${rutinaId}`);
        return response.data; // Devuelve los detalles de la rutina
    } catch (error) {
        console.error(`Error al obtener los detalles de la rutina ${rutinaId}:`, error);
        throw error; // Re-lanzar el error para manejarlo en otro lugar
    }
};

/**
 * Crear un nuevo detalle de rutina
 * @param {Object} detalles - Datos del detalle de la rutina
 * @returns {Promise} - Promesa con la respuesta del servidor
 */
export const createDetalleRutinaRequest = async (detalles) => {
    try {
        const response = await axios.post('/detalles-rutinas', detalles);
        return response.data;
    } catch (error) {
        console.error("Error al crear el detalle de la rutina:", error);
        throw error;
    }
};

/**
 * Eliminar un detalle de rutina por su ID
 * @param {string} detalleId - ID del detalle a eliminar
 * @returns {Promise} - Promesa con la respuesta del servidor
 */
export const deleteDetalleRutinaRequest = async (detalleId) => {
    try {
        const response = await axios.delete(`/detalles-rutinas/${detalleId}`);
        return response.data;
    } catch (error) {
        console.error(`Error al eliminar el detalle con ID ${detalleId}:`, error);
        throw error;
    }
};

/**
 * Actualizar un detalle de rutina
 * @param {string} detalleId - ID del detalle a actualizar
 * @param {Object} detalles - Datos a actualizar
 * @returns {Promise} - Promesa con la respuesta del servidor
 */
export const updateDetalleRutinaRequest = async (detalleId, detalles) => {
    try {
        const response = await axios.put(`/detalles-rutinas/${detalleId}`, detalles);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el detalle con ID ${detalleId}:`, error);
        throw error;
    }
};

/**
 * Actualizar el estado de un ejercicio específico en los detalles de la rutina
 * @param {string} detalleId - ID del detalle a actualizar
 * @param {string} estado - Nuevo estado del ejercicio (e.g., "Completado", "Pendiente")
 * @returns {Promise} - Promesa con la respuesta del servidor
 */
export const updateEstadoEjercicioRequest = async (detalleId, estado) => {
    try {
        const response = await axios.put(`/detalles-rutinas/${detalleId}`, { estado });
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el estado del ejercicio con ID ${detalleId}:`, error);
        throw error;
    }
};

/**
 * Actualizar el progreso de un ejercicio específico (series completadas)
 * @param {string} detalleId - ID del detalle a actualizar
 * @param {number} seriesProgreso - Número de series completadas
 * @returns {Promise} - Promesa con la respuesta del servidor
 */
export const updateProgresoEjercicioRequest = async (detalleId, seriesProgreso) => {
    try {
        const response = await axios.put(`/detalles-rutinas/${detalleId}/progreso`, { seriesProgreso });
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el progreso del ejercicio con ID ${detalleId}:`, error);
        throw error;
    }
};

/**
 * Obtener todos los detalles relacionados con una rutina
 * @param {string} rutinaId - ID de la rutina
 * @returns {Promise} - Promesa con los detalles de la rutina
 */
export const getDetallesRutina = async (rutinaId) => {
    try {
        const response = await axios.get(`/detalles-rutinas/${rutinaId}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener los detalles de la rutina con ID ${rutinaId}:`, error);
        throw error;
    }
};
