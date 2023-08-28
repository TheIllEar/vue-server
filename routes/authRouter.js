/**
 * Аутентификация
 */

import { Router } from 'express';
import authController from '../controllers/auth.js';

// const router = Router();
const router = new Router();

router.post('/registration', authController.registration);
router.post('/login', authController.login);
router.get('/users', authController.getUsers);


export default router;
