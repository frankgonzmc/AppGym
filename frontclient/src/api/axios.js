import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL || 'http://localhost:5001/api', // Ajustar baseURL con el nuevo puerto
    withCredentials: true, // Asegura el envío de cookies para autenticación
});

export default instance;
