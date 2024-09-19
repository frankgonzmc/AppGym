import axios from './axios';


export const getHistorialsRequest = () => axios.get('/historial');
export const getHistorialRequest = (id) => axios.get(`/historial/${historial._id}`)

export const createHistorialRequest = (historial) => axios.post('/historial', historial)
export const updateHistorialRequest = (historial) => axios.put(`/historial/${historial._id}`, historial)
//export const deleteHistorialRequest = (id) => axios.delete(`/historial/${historial._id}`)