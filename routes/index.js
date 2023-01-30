const router = require('express').Router();
const userRouter = require('./users');
const cardsRouter = require('./cards');
const { login, createUser } = require('../controllers/user');
const auth = require('../middlewares/auth');

router.use('/users', auth, userRouter);
router.use('/cards', auth, cardsRouter);
router.post('/signin', login);
router.post('/signup', createUser);
router.use('*', (req, res) =>
  res.status(404).send({ message: 'Запрос не найден' }),
);

module.exports = router;
