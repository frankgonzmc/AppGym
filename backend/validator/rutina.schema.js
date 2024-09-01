import { z } from 'zod'

export const createRutinaSchema = z.object({
    nombre: z.string({
        required_error: "El nombre es requerido"
    }),
    descripcion: z.string({
        required_error: "La descripcion es requerida"
    }),
    nivel: z.string({
        required_error: "El nivel de la rutina es requerido"
    }),
    date: z.string().datetime().optional(),
})