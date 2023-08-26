/**
 * Карточка
 */

import { Router } from 'express';

const router = Router(),
  url = '';
  
  router.get(`/socketserver`, async function (req, res, next) {
    try {
      

      // res.render('pages/card', {
      //   item: card,
      //   page: page,
      // });
    } catch (error) {
      console.error(chalk.red('Ошибка на бэке:'), error);
    }
  });

export default router;
