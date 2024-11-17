import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { createProgreso, deleteProgreso, getProgreso, updateProgreso, getUserStats, getUserStatsByPeriod, compareProgressWithGoals } from '../controllers/progreso.controllers.js';

const router = Router();

// Rutas principales
router.get('/progreso/:id', authRequired, getProgreso);
router.post('/progreso', authRequired, createProgreso);
router.put('/progreso/:id', authRequired, updateProgreso);
router.delete('/progreso/:id', authRequired, deleteProgreso);

// Rutas para estadísticas
router.get('/progreso/stats/:userId', authRequired, getUserStats);
router.post('/progreso/stats/:userId/period', authRequired, getUserStatsByPeriod);
router.get('/progreso/compare/:userId', authRequired, compareProgressWithGoals);

export default router;
