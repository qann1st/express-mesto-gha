const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status(404).send({ error: 'Список пользователей пуст' });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.send(user);
    })
    .catch(() => {
      res.status(404).send({ error: 'Пользователь не найден' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch(() => {
      res.status(400).send({ error: 'Не удалось создать пользователя' });
    });
};

module.exports.editUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
    .then((editedUser) => {
      res.send(editedUser);
    })
    .catch(() => {
      res.status(400).send({ error: 'Не удалось изменить пользователя' });
    });
};

module.exports.editAvatar = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
    .then((editedAvatar) => {
      res.send(editedAvatar);
    })
    .catch(() => {
      res.status(400).send({ error: 'Не удалось изменить аватар' });
    });
};
