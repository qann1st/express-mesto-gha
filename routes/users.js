const router = require('express').Router();
const {
  getUsers,
  getUser,
  editUser,
  editAvatar,
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/me', getUser);
router.get('/:id', getUser);
router.patch('/me', editUser);
router.patch('/me/avatar', editAvatar);

module.exports = router;
