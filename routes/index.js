const router = require('express').Router();

const usersRouter = require('./users');
const cardsRouter = require('./cards');
const signUpRouter = require('./signUp');
const signInRouter = require('./signIn');

const auth = require('../middlewares/auth');

const NotFoundError = require('../errors/NotFoundError');

router.use(signUpRouter);
router.use(signInRouter);
router.use(auth);
router.use(usersRouter);
router.use(cardsRouter);
router.use((req, res, next) => {
  next(new NotFoundError('страница не найдена.'));
});

module.exports = router;
