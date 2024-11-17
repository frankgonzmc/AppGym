import { Router } from 'express';
import { getRecomendaciones } from '../controllers/recomendacion.controllers.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.get('/recomendaciones', authRequired, getRecomendaciones); // Usamos el ID del usuario autenticado

export default router;
