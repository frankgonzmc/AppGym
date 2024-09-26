import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { getEjercicio, getEjercicios, createEjercicios, updateEjercicios, deleteEjercicios } from '../controllers/ejercicio.controllers.js'

const router = Router();


router.get('/ejercicios', authRequired, getEjercicios)
router.get('/ejercicio/:id', authRequired, getEjercicio)
router.post('/ejercicios', authRequired, createEjercicios)
router.delete('/ejercicios/:id', authRequired, deleteEjercicios)
router.put('/ejercicios/:id', authRequired, updateEjercicios)

export default router;