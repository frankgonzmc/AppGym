import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { getProgreso } from '../controllers/progreso.controllers.js'

const router = Router();

router.get('/progreso/:id', authRequired, getProgreso)


router.post('/progreso', authRequired, createDetalleRutina);

// Actualizar un detalle de rutina existente
router.put('/progreso/:id', authRequired, updateDetalleRutina);

// Eliminar un detalle de rutina existente
router.delete('/progreso:id', authRequired, deleteDetalleRutina);

export default router