const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status(500).send({ error: "Список пользователей пуст" });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.send(user);
    })
    .catch(() => {
      res.status(500).send({ error: "Пользователь не найден" });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch(() => {
      res.status(500).send({ error: "Не удалось создать пользователя" });
    });
};
