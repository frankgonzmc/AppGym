import axios from './axios'

export const registerRequest = (user) => axios.post(`/register`, user)

export const loginRequest = (user) => axios.post(`/login`, user)

export const verifityTokenRequest = () => axios.get('/verify')

export const resetPasswordRequest = () => axios.post('/reset-password')

export const forgotPasswordRequest = (email) => axios.post('/forgot-password', { email })

export const updatePasswordRequest = (currentPassword, newPassword) => {
    return axios.post('/update-password', { currentPassword, newPassword });
};

export const updatePerfilRequest = (datos) => axios.put('/update-perfil', datos, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});


export const checkEmailRequest = (email) => axios.get(`/check-email?email=${email}`);
