// Rutas de Detalles de Rutina
import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { validateObjectId } from '../middlewares/validateId.js';
import { getDetallesRutina, createDetalleRutina, updateDetalleRutina, deleteDetalleRutina, actualizarProgresoDetalleRutina, registrarDetalleEjercicioCompletado } from '../controllers/detallerutina.controllers.js';

const router = Router();

router.get('/detalles-rutinas/:id', authRequired, validateObjectId, getDetallesRutina);
router.post('/detalles-rutinas', authRequired, createDetalleRutina);
router.post('/detalles-rutinas/:id/registrar-completado', authRequired, validateObjectId, registrarDetalleEjercicioCompletado);
router.put('/detalles-rutinas/:id', authRequired, validateObjectId, updateDetalleRutina);
router.delete('/detalles-rutinas/:id', authRequired, validateObjectId, deleteDetalleRutina);
router.put('/detalles-rutinas/:id/progreso', authRequired, validateObjectId, actualizarProgresoDetalleRutina);

export default router;
