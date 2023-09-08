const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const appRouter = require('./routes/index');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb ' } = process.env;

const app = express();

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '64fb2a12178dbdd9890f8e5c', // _id созданного пользователя
  };

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(appRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Страница не найдена.' });
});

app.listen(PORT);
