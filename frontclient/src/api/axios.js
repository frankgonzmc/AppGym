import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL || 'http://179.6.42.7:5001/api',
    withCredentials: true,
});
export default instance;
