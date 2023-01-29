const Cards = require('../models/cards');

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res.status(400).send({ error: 'Список карточек пуст' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Cards.create({ name, link, owner: { _id: req.user._id } })
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res.status(500).send({ error: 'Не удалось добавить карточку' });
    });
};

module.exports.deleteCard = (req, res) => {
  Cards.findByIdAndRemove(req.params.id)
    .then((removedCard) => {
      res.send(removedCard);
    })
    .catch(() => {
      res.status(400).send({ error: 'Не удалось удалить карточку' });
    });
};

module.exports.likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .populate('likes owner')
    .then((card) => res.send(card))
    .catch(() => {
      res.status(400).send({ error: 'Не удалось поставить лайк' });
    });
};

module.exports.deleteLikeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => res.send(card))
    .catch(() => {
      res.status(400).send({ error: 'Не удалось убрать лайк' });
    });
};
