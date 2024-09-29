import { z } from 'zod'

export const registerSchema = z.object({
    username: z.string({
        required_error: 'El Username es Requerido.',
    }),
    email: z.string({
        required_error: 'El Email es Requerido.',
    }).email({
        message: "Email Invalido...",
    }),
    password: z.string({
        required_error: 'El Password es Requerido.'
    }).min(6, {
        message: "El Password debe contener al menos 6 caracteres minimo.",
    })
    
})

export const loginSchema = z.object({
    email: z.string({
        required_error: 'El Email es Requerido.',
    }).email({
        message: "Email Invalido...",
    }),
    password: z.string({
        required_error: 'El Password es Requerido.'
    }).min(6, {
        message: "El Password debe contener al menos 6 caracteres minimo.",
    })
})