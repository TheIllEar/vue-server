/**
 * index
 */

import { Router } from 'express';

const router = new Router();

router.get('/', (req, res, next) => {
  res.send('<h1 style="color: #6a00ff;">Hi, I am Server</h1>');
//   res.render('pages/card', {
//     item: card,
//     page: page,
//   });
});

export default router;
