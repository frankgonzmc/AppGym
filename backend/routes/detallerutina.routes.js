import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { updateDetalleRutina, deleteDetalleRutina } from '../controllers/detallerutina.controllers.js';

const router = Router();

// Actualizar un detalle de rutina existente
router.put('/detalles-rutinas/:id', authRequired, updateDetalleRutina);

// Eliminar un detalle de rutina existente
router.delete('/detalles-rutinas/:id', authRequired, deleteDetalleRutina);

export default router;