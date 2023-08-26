/**
 * О компании
 */

import { Router } from 'express';
import authController from '../controllers/auth.js';

// const router = Router();
const router = new Router();

router.post('/registration', authController.registration);
router.post('/login', authController.login);
router.get('/users', authController.getUsers);

// router.get(`/auth`, async function (req, res, next) {
//   try {
//     console.log('databse 1111')

//     // res.render('pages/card', {
//     //   item: card,
//     //   page: page,
//     // });
//   } catch (error) {
//     console.error(error);
//   }
// });

export default router;
