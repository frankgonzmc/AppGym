import axios from './axios';


export const getEjerciciosRequest = () => axios.get('/ejercicios');
export const getEjercicioRequest = (id) => axios.get(`/ejercicio/${id}`)

export const createEjerciciosRequest = (ejercicio) => axios.post('/ejercicios', ejercicio)
export const updateEjerciciosRequest = (ejercicio) => axios.put(`/ejercicios/${ejercicio._id}`, ejercicio)
export const deleteEjerciciosRequest = (id) => axios.delete(`/ejercicios/${id}`)