import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL || 'http://localhost:5000/api',
    withCredentials: true,
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Asegúrate de que el token se obtiene correctamente
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;
