import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { getProgreso } from '../controllers/progreso.controllers.js'

const router = Router();

router.get('/progreso/:id', authRequired, getProgreso)

export default router