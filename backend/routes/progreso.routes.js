import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { createProgreso, deleteProgreso, getProgreso, updateProgreso, getUserStats, getUserStatsByPeriod, compareProgressWithGoals } from '../controllers/progreso.controllers.js';

const router = Router();

// Rutas para progreso de usuario
router.get('/progreso/:id', authRequired, getProgreso);
router.post('/progreso', authRequired, createProgreso);
router.delete('/progreso/:id', authRequired, deleteProgreso);
router.put('/progreso/:id', authRequired, updateProgreso);

// Rutas para estadísticas
router.get('/stats/:userId', authRequired, getUserStats);
router.get('/stats/:userId/:period', authRequired, getUserStatsByPeriod);

// Ruta para comparación de progreso con objetivos
router.get('/compare-progress/:userId', authRequired, compareProgressWithGoals);

export default router;
