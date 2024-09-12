import { Router } from 'express';
import { login, logout, profile, register, verifityToken } from "../controllers/auth.controllers.js";
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js'
import { registerSchema, loginSchema } from '../validator/auth.schema.js'

const router = Router();


router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.post('/verify', verifityToken);
router.post('/logout', authRequired, logout);
router.get('/profile', authRequired, profile)

export default router
