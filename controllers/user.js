const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status(404).send({ message: 'Список пользователей пуст' });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id || req.user._id)
    .then((user) => {
      if (user.id === req.params.id || req.user._id) res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'ID пользователя некорректен' });
      } else {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => {
        res.send(user);
      })
      .catch(() => {
        res.status(400).send({ message: 'Не удалось создать пользователя' });
      });
  });
};

module.exports.editUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((editedUser) => {
      res.send(editedUser);
    })
    .catch(() => {
      res.status(400).send({ message: 'Не удалось изменить пользователя' });
    });
};

module.exports.editAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((editedAvatar) => {
      res.send(editedAvatar);
    })
    .catch(() => {
      res.status(400).send({ message: 'Не удалось изменить аватар' });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  let token = '';

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильная почта или пароль'));
      }

      token = jwt.sign(
        { _id: user._id },
        'eb28135ebcfc17578f96d4d65b6c7871f2c803be4180c165061d5c2db621c51b ',
      );

      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('Неправильная почта или пароль'));
      }

      res.send({
        token,
      });
    })
    .catch(() => {
      res.status(401).send({ message: 'Не удалось авторизоваться' });
    });
};
