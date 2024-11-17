// Rutas de Detalles de Rutina
import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { validateObjectId } from '../middlewares/validateId.js';
import { getDetallesRutina, createDetalleRutina, updateDetalleRutina, deleteDetalleRutina, actualizarProgresoDetalleRutina } from '../controllers/detallerutina.controllers.js';

const router = Router();

router.get('/detalles-rutinas/:id', authRequired, validateObjectId, getDetallesRutina);
router.post('/detalles-rutinas', authRequired, createDetalleRutina);
router.put('/detalles-rutinas/:id', authRequired, validateObjectId, updateDetalleRutina);
router.delete('/detalles-rutinas/:id', authRequired, validateObjectId, deleteDetalleRutina);
router.put('/detalles-rutinas/:detalleId/progreso', authRequired, actualizarProgresoDetalleRutina);

export default router;
