const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле "name" должно быть заполнено'],
      minlength: [2, 'Минимальное количество символов - 2'],
      maxlength: [30, 'Максимальное количество символов - 30'],
    },
    about: {
      type: String,
      required: [true, 'Поле "about" должно быть заполнено'],
      minlength: [2, 'Минимальное количество символов - 2'],
      maxlength: [30, 'Максимальное количество символов - 30'],
    },
    avatar: {
      type: String,
      required: [true, 'Поле "avatar" должно быть заполнено'],
      validate: {
        validator(url) {
          return /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/.test(url);
        },
        message: 'Введите URL',
      },
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
