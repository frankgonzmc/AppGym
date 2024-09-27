import axios from './axios';


export const getProgresoRequest = (id) => axios.get(`/progreso/${id}`)

export const createProgresosRequest = (progreso) => axios.post('/progresos', progreso)

export const deleteProgresosRequest = (id) => axios.delete(`/progresos/${id}`)