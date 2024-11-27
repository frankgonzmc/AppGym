import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { getRutina, getRutinas, createRutinas, updateRutina, deleteRutina, getIncompleteRoutines } from '../controllers/rutina.controllers.js'
import { registrarRutinaCompletado } from '../controllers/rutina.controllers.js'
import Rutinas from '../models/rutina.model.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { validateObjectId } from '../middlewares/validateId.js'
import { createRutinaSchema } from '../validator/rutina.schema.js'

const router = Router()

router.get('/rutinas', authRequired, getRutinas);
router.get('/rutinas/:id', authRequired, validateObjectId, getRutina);
router.post('/rutinas', authRequired, validateSchema(createRutinaSchema), createRutinas);
router.post('/rutinas/:id/registrar-completado', authRequired, validateObjectId, registrarRutinaCompletado);
router.put('/rutinas/:id', authRequired, validateObjectId, updateRutina);
router.delete('/rutinas/:id', authRequired, validateObjectId, deleteRutina);

// Obtener rutinas incompletas
router.get('/rutinas/:id/incomplete', authRequired, validateObjectId, getIncompleteRoutines);

// Nueva ruta para obtener recomendaciones de rutinas basadas en el nivel
router.get('/rutinas/recomendadas', authRequired, async (req, res) => {
    try {
        const { nivel } = req.user;
        const rutinas = await Rutinas.find({ nivelRequerido: nivel });
        res.json(rutinas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener rutinas recomendadas", error });
    }
});


export default router