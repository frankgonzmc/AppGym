import { Router } from 'express';
import { getRecomendaciones } from '../controllers/recomendacion.controllers.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.get('/recomendaciones/:userId', authRequired, getRecomendaciones);

export default router;
