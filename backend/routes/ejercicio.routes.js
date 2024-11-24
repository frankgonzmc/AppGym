import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { validateObjectId } from '../middlewares/validateId.js';
import { getEjercicio, getEjercicios, createEjercicios, updateEjercicios, deleteEjercicios, getNivelEjercicio, registrarEjercicioCompletado } from '../controllers/ejercicio.controllers.js';
import { upload } from '../middlewares/uploads.js';  // Importamos multer

const router = Router();

router.get('/ejercicios', authRequired, getEjercicios); // Obtiene todos los ejercicios
router.get('/ejercicio/:id', authRequired, validateObjectId, getEjercicio); // Detalles de un ejercicio
router.get('/ejercicios/:nivel', authRequired, getNivelEjercicio); // Filtrar por nivel
router.post('/ejercicios', authRequired, upload.single('imagen'), createEjercicios);
router.post('/ejercicios/:id/registrar-completado', authRequired, validateObjectId, registrarEjercicioCompletado);
router.put('/ejercicios/:id', authRequired, validateObjectId, upload.single('imagen'), updateEjercicios);
router.delete('/ejercicios/:id', authRequired, validateObjectId, deleteEjercicios);

export default router;