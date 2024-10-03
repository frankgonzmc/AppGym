import axios from './axios';


export const getRutinasRequest = () => axios.get('/rutinas')
export const getRutinaRequest = (id) => axios.get(`/rutina/${id}`)

export const createRutinaRequest = (rutina) => axios.post('/rutinas', rutina)
export const updateRutinaRequest = (id, rutina) => axios.put(`/rutinas/${id}`, rutina)
export const deleteRutinaRequest = (id) => axios.delete(`/rutinas/${id}`)