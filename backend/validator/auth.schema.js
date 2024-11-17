import { z } from 'zod'

export const registerSchema = z.object({
    username: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    genero: z.enum(['varon', 'mujer', 'otro']),
    edad: z.number().int().min(1, 'Edad inválida'),
    estatura: z.number().min(0.5, 'Estatura inválida').max(3),
    peso: z.number().min(1, 'Peso inválido').max(200),
    nivel: z.string().default('Principiante'),
});

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