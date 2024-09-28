import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { createProgreso, deleteProgreso, getProgreso } from '../controllers/progreso.controllers.js'

const router = Router();

router.get('/progreso/:id', authRequired, getProgreso)


router.post('/progreso', authRequired, createProgreso);

// Eliminar un detalle de rutina existente
router.delete('/progreso:id', authRequired, deleteProgreso);

export default router