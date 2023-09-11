const Card = require('../models/card');
const {
  okStatus,
  createdStatus,
  badRequestStatus,
  notFoundStatus,
  internalServerErrorStatus,
} = require('../utils/constants');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(createdStatus).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(badRequestStatus).send({ message: err.message });
      } else {
        res.status(internalServerErrorStatus).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(() => res.status(internalServerErrorStatus).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(() => {
      res.status(okStatus).send({ message: 'Карточка удалена' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(badRequestStatus).send({ message: 'Некорректный _id карточки' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(notFoundStatus).send({ message: 'Карточка с указанным _id не найдена.' });
      } else {
        res.status(internalServerErrorStatus).send({ message: 'На сервере произошла ошибкаs' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      res.status(okStatus).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(badRequestStatus).send({ message: 'Некорректный _id карточки' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(notFoundStatus).send({ message: 'Карточка с указанным _id не найдена.' });
      } else {
        res.status(internalServerErrorStatus).send({ message: 'На сервере произошла ошибкаs' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: { likes: req.user._id },
    },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      res.status(okStatus).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(badRequestStatus).send({ message: 'Некорректный _id карточки' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(notFoundStatus).send({ message: 'Карточка с указанным _id не найдена.' });
      } else {
        res.status(internalServerErrorStatus).send({ message: 'На сервере произошла ошибкаs' });
      }
    });
};
