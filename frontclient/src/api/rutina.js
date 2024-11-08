import axios from './axios';


export const getRutinasRequest = () => axios.get('/rutinas')
export const getRutinaRequest = (id) => axios.get(`/rutina/${id}`)

export const createRutinaRequest = (rutina) => axios.post('/rutinas', rutina)
export const updateRutinaRequest = (id, rutina) => axios.put(`/rutinas/${id}`, rutina)
export const deleteRutinaRequest = (id) => axios.delete(`/rutinas/${id}`)

export const updateEstadoRutinaRequest = (rutina, estado) => axios.put(`/rutinas/${rutina}`, { estado });

export const updateRutinaProgressRequest = (rutina, ejerciciosCompletados) => {
    return axios.put(`/rutinas/${rutina}`, { ejerciciosCompletados: ejerciciosCompletados });
};
