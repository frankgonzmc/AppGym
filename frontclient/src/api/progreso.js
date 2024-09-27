import axios from './axios';


export const getProgresosRequest = () => axios.get('/progresos');
export const getProgresoRequest = (id) => axios.get(`/progreso/${id}`)

export const createProgresosRequest = (progreso) => axios.post('/progresos', progreso)
export const updateProgresosRequest = (progreso) => axios.put(`/progresos/${progreso._id}`, progreso)
export const deleteProgresosRequest = (id) => axios.delete(`/progresos/${id}`)