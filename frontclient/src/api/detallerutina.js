import axios from './axios';

export const getDetalleRutinaRequest = (id) => axios.get(`/detalles-rutinas/${id}`);

export const createDetalleRutinaRequest = (detalles) => axios.post('/detalles-rutinas', detalles);

export const deleteDetalleRutinaRequest = (id) => axios.delete(`/detalles-rutinas/${id}`);

export const updateDetalleRutinaRequest = (id, detalles) => axios.put(`/detalles-rutinas/${id}`, detalles);

// api/detallerutina.js
export const updateEstadoRutinaRequest = async (rutinaId, ejerciciosCompletos) => {
    try {
        // Este endpoint debe existir en tu backend para actualizar la rutina
        const response = await axios.put(`/rutinas/${rutinaId}/estado`, { ejerciciosCompletos });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el estado de la rutina:", error);
        throw error;
    }
};

export const updateRutinaProgressRequest = (rutinaId, ejerciciosCompletos) => axios.put(`/detalle-rutinas/${rutinaId}`, { ejerciciosCompletos });

export const updateProgresoEjercicioRequest = (detalleId, seriesCompletadas) => {
    return axios.put(`/detalles-rutinas/${detalleId}`, { seriesProgreso: seriesCompletadas });
};

export const getDetallesRutina = async (rutinaId) => {
    const response = await axios.get(`/detalles-rutinas/${rutinaId}`);
    return response.data; // Debería devolver la lista de detalles de la rutina
};
