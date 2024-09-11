import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { getHistorial } from '../controllers/historial.controllers.js'

const router = Router();

router.get('/historial/:id', authRequired, getHistorial)

export default router