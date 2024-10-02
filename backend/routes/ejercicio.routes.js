import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { getEjercicio, getEjercicios, createEjercicios, updateEjercicios, deleteEjercicios, getNivelEjercicio } from '../controllers/ejercicio.controllers.js';
import { upload } from '../middlewares/upload.js';  // Importamos multer


const router = Router();


router.get('/ejercicios/:nivel', authRequired, getNivelEjercicio)

router.get('/ejercicios', authRequired, getEjercicios)
router.get('/ejercicio/:id', authRequired, getEjercicio)
router.post('/ejercicios', authRequired, upload.single('imagen'), createEjercicios); // Aquí aceptamos la imagen
router.delete('/ejercicios/:id', authRequired, deleteEjercicios)
router.put('/ejercicios/:id', authRequired, upload.single('imagen'), updateEjercicios); // Para actualización de imagen

export default router;