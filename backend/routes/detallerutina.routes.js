import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { getDetallesRutina, createDetalleRutina, updateDetalleRutina, deleteDetalleRutina, actualizarProgresoDetalleRutina, actualizandoLosDetallesRutinas } from '../controllers/detallerutina.controllers.js';

const router = Router();

router.get('/detalles-rutinas/:id', authRequired, getDetallesRutina);

// Actualizar el progreso de un detalle de rutina existente
router.put('/detalles-rutinas/:id', authRequired, actualizarProgresoDetalleRutina);

router.put('/detalles-rutinas/:id', authRequired, actualizandoLosDetallesRutinas);

router.post('/detalles-rutinas', authRequired, createDetalleRutina);

// Actualizar un detalle de rutina existente
router.put('/detalles-rutinas/:id', authRequired, updateDetalleRutina);

// Eliminar un detalle de rutina existente
router.delete('/detalles-rutinas/:id', authRequired, deleteDetalleRutina);

export default router;