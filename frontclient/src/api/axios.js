import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL || 'http://localhost:5000/api',
    withCredentials: true,
});

export default instance;
