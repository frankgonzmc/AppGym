import axios from './axios';


export const getRutinasRequest = () => axios.get('/rutinas')
export const getRutinaRequest = (id) => axios.get(`/rutina/${id}`)

export const createRutinaRequest = (rutina) => axios.post('/rutinas', rutina)
export const updateRutinaRequest = (rutina) => axios.put(`/rutinas/${rutina._id}`, rutina)
export const deleteRutinaRequest = (id) => axios.delete(`/rutinas/${id}`)