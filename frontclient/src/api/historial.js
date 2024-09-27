import axios from './axios';


export const getHistorialRequest = (id) => axios.get(`/historial/${id}`)

export const createHistorialRequest = (historial) => axios.post('/historial', historial)

export const deleteHistorialRequest = (id) => axios.delete(`/historial/${id}`)