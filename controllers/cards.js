const Cards = require('../models/cards');

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res.status(400).send({ message: 'Список карточек пуст' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Cards.create({ name, link, owner: { _id: req.user._id } })
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res.status(400).send({ message: 'Некорректно заполнены поля' });
    });
};

module.exports.deleteCard = (req, res) => {
  Cards.findByIdAndRemove(req.params.id)
    .then((removedCard) => {
      if (removedCard.id === req.params.id) {
        res.send(removedCard);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректное id карточки' });
      } else {
        res.status(404).send({ message: 'Карточка не найдена' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .populate('likes owner')
    .then((card) => {
      if (card.id === req.params.id) res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректное id карточки' });
      } else {
        res.status(404).send({ message: 'Карточка не найдена' });
      }
    });
};

module.exports.deleteLikeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (card === null) {
        res.status(404).send({ message: 'Карточка с лайком не найдена' });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      res.status(400).send({ message: 'Некорректное id карточки' });
    });
};
