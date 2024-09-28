import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { createHistorial, deleteHistorial, getHistorial } from '../controllers/historial.controllers.js'

const router = Router();

router.get('/historial/:id', authRequired, getHistorial)

router.post('/historial', authRequired, createHistorial);

// Eliminar un detalle de rutina existente
router.delete('/historial:id', authRequired, deleteHistorial);

export default router