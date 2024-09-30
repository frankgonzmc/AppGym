import axios from './axios';


export const getProgresoRequest = (id) => axios.get(`/progreso/${id}`)

export const createProgresoRequest = (progreso) => axios.post('/progreso', progreso)

export const deleteProgresoRequest = (id) => axios.delete(`/progreso/${id}`)

export const updateProgresoRequest = (id, progreso) => axios.put(`/progreso/${id}`, progreso)