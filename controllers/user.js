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
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch(() => {
      res.status(400).send({ message: 'Не удалось создать пользователя' });
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
