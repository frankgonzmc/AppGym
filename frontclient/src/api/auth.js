import axios from './axios'

export const registerRequest = async (user) => axios.post(`/register`, user)

export const loginRequest = async (user) => axios.post(`/login`, user)

export const verifityTokenRequest = async () => axios.get('/verify')

export const updatePasswordRequest = (currentPassword, newPassword) => {
    return axios.post('/update-password', { currentPassword, newPassword });
};