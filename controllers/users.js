const User = require('../models/user');

const {
  okStatus,
  createdStatus,
  badRequestStatus,
  notFoundStatus,
  internalServerErrorStatus,
} = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(internalServerErrorStatus).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      res.status(okStatus).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(badRequestStatus).send({ message: 'Некорректный _id' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(notFoundStatus).send({ message: 'Пользователь по указанному _id не найден.' });
      } else {
        res.status(internalServerErrorStatus).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(createdStatus).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(badRequestStatus).send({ message: err.message });
      } else {
        res.status(internalServerErrorStatus).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.updateUserData = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: 'true', runValidators: true },
  )
    .then((user) => res.status(okStatus).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(badRequestStatus).send({ message: err.message });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(notFoundStatus).send({ message: 'Пользователь по указанному _id не найден.' });
      } else {
        res.status(internalServerErrorStatus).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: 'true', runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(badRequestStatus).send({ message: err.message });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(notFoundStatus).send({ message: 'Пользователь по указанному _id не найден.' });
      } else {
        res.status(internalServerErrorStatus).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
