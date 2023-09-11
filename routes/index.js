const router = require('express').Router();

const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { notFoundStatus } = require('../utils/constants');

router.use(usersRouter);
router.use(cardsRouter);
router.use((req, res) => {
  res.status(notFoundStatus).send({ message: 'Страница не найдена.' });
});

module.exports = router;
