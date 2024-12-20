import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { validateObjectId } from '../middlewares/validateId.js';
import { createProgreso, deleteProgreso, getProgreso, updateProgreso, getUserStats, getUserStatsByPeriod, compareProgressWithGoals, getProgresoUsuarioRequest, updateEstadoProgreso } from '../controllers/progreso.controllers.js';

const router = Router();

// Rutas principales
router.get('/progreso/:id', authRequired, validateObjectId, getProgreso);

router.post('/progreso', authRequired, createProgreso);

router.put('/progreso/:id', authRequired, validateObjectId, updateProgreso);

router.put('/progreso/:id/estado', authRequired, validateObjectId, updateEstadoProgreso)

router.delete('/progreso/:id', authRequired, validateObjectId, deleteProgreso);

// Rutas para estadísticas
router.get('/stats/:userId', authRequired, getUserStats);
router.get('/stats/:userId/:period', authRequired, getUserStatsByPeriod); // Cambiado POST a GET
router.get('/compare-progress/:userId', authRequired, compareProgressWithGoals);

// Nueva ruta para obtener progreso de un usuario por ID
router.get('/progreso/user/:userId', authRequired, getProgresoUsuarioRequest);

export default router;
