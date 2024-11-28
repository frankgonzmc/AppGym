import axios from './axios';


export const getRutinasRequest = () => axios.get('/rutinas')

export const getRutinaRequest = (id) => axios.get(`/rutinas/${id}`)

export const createRutinaRequest = (rutina) => axios.post('/rutinas', rutina)

export const updateRutinaRequest = (id, rutina) => axios.put(`/rutinas/${id}`, rutina)

export const deleteRutinaRequest = (id, rutina) => axios.delete(`/rutinas/${id}`, rutina)

export const updateEstadoRutinaRequest = (id, estado) => axios.put(`/rutinas/${id}/estado`, { estado })

export const updateRutinaProgressRequest = (rutina, ejerciciosCompletados) => {
    return axios.put(`/rutinas/${rutina}`, { ejerciciosCompletados });
};
