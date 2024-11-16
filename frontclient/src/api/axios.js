import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL || 'http://100.125.85.115:5000/api',
    withCredentials: true,
});
export default instance;
