import axios from './axios'

export const registerRequest = (user) => axios.post(`/register`, user)

export const loginRequest = (user) => axios.post(`/login`, user)

export const verifityTokenRequest = () => axios.get('/verify')

export const updatePasswordRequest = (currentPassword, newPassword) => {
    return axios.post('/update-password', { currentPassword, newPassword });
};