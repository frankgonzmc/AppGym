import axios from './axios';


export const getEjerciciosRequest = () => axios.get('/ejercicios');
export const getEjercicioRequest = (id) => axios.get(`/ejercicio/${id}`)

export const createEjerciciosRequest = (ejercicio) => axios.post('/ejercicios', ejercicio)
export const updateEjerciciosRequest = (id, ejercicio) => axios.put(`/ejercicios/${id}`, ejercicio)
export const deleteEjerciciosRequest = (id) => axios.delete(`/ejercicios/${id}`)

export const registrarEjercicioCompletadoRequest = (id) => axios.post(`/ejercicios/${id}/registrar-completado`);