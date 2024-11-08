import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { getRutina, getRutinas, createRutinas, updateRutina, deleteRutina, actualizarEstadoRutina } from '../controllers/rutina.controllers.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createRutinaSchema } from '../validator/rutina.schema.js'

const router = Router()


router.get('/rutinas', authRequired, getRutinas)
router.get('/rutina/:id', authRequired, getRutina)
router.post('/rutinas', authRequired, validateSchema(createRutinaSchema), createRutinas)
router.delete('/rutinas/:id', authRequired, deleteRutina)
router.put('/rutinas/:id', authRequired, updateRutina)
router.put('/rutinas/:rutinaId/estado', authRequired, actualizarEstadoRutina);

export default router