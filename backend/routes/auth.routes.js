import { Router } from 'express';
import { upload } from '../middlewares/uploads.js';
import { login, logout, profile, register, verifityToken, updatePassword, forgotPassword, resetPassword, checkEmail, updatePerfil } from "../controllers/auth.controllers.js";
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js'
import { registerSchema, loginSchema } from '../validator/auth.schema.js'

const router = Router();

router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.post('/update-password', authRequired, updatePassword);
router.post('/logout', authRequired, logout);
router.get('/profile', authRequired, profile); // Eliminamos `upload.single` aquí
router.put('/update-perfil', authRequired, upload.single('profileImage'), updatePerfil); // Cambiamos a PUT
router.get('/check-email', checkEmail); // Eliminamos `authRequired`
router.get('/verify', verifityToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router
