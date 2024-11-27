import axios from './axios';

// Obtener el progreso específico de un usuario para una rutina
export const getProgresoRequest = (id) => axios.get(`/progreso/${id}`);

// Crear un nuevo progreso
export const createProgresoRequest = (progreso) => axios.post('/progreso', progreso);

// Eliminar un progreso específico
export const deleteProgresoRequest = (id) => axios.delete(`/progreso/${id}`);

// Actualizar un progreso específico
export const updateProgresoRequest = (id, progreso) => axios.put(`/progreso/${id}`, progreso);

// Actualizar el estado de un progreso específico
export const updateEstadoProgresoRequest = (id, estado) => axios.put(`/progreso/${id}/estado`, { estado }); // Asegúrate de enviar un objeto con la clave `estado`

// Obtener estadísticas del progreso por período (mensual, semanal, anual)
export const getUserStatsRequest = (userId, period) => axios.get(`/stats/${userId}/${period}`);

// Comparar progreso con los objetivos del usuario
export const compareProgressRequest = (userId) => axios.get(`/compare-progress/${userId}`);

// Obtener el progreso de un usuario específico (API Request)
export const getProgresoUsuarioRequest = (userId) => axios.get(`/progreso/user/${userId}`);