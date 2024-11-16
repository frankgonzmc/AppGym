const baseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';

const instance = axios.create({
    baseURL,
    withCredentials: true
});

export default instance;
