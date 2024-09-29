import axios from './axios';


export const getProgresoRequest = (id) => axios.get(`/progreso/${id}`)

export const createProgresoRequest = (progreso) => axios.post('/progresos', progreso)

export const deleteProgresoRequest = (id) => axios.delete(`/progresos/${id}`)

export const updateProgresoRequest = (id, progreso) => axios.put(`/progresos/${id}`, progreso)