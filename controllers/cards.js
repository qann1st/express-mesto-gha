const Cards = require("../models/cards");

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res.status(500).send({ error: "Список карточек пуст" });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Cards.create({ name, link, owner: req.user._id })
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res.status(500).send({ error: "Не удалось создать пользователя" });
    });
};

module.exports.deleteCard = (req, res) => {
  Cards.findByIdAndRemove(req.params.id)
    .then((removedCard) => {
      res.send(removedCard);
    })
    .catch(() => {
      res.status(500).send({ error: "Не удалось удалить карточку" });
    });
};
