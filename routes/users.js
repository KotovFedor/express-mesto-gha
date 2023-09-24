const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUserById,
  updateUserData,
  updateUserAvatar,
  getMyData,
} = require('../controllers/users');
const regexForUrl = require('../utils/constants');

router.get('/users', getUsers);

router.get('/users/me', getMyData);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserById);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserData);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regexForUrl),
  }),
}), updateUserAvatar);

module.exports = router;
