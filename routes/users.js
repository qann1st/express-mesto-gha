const router = require('express').Router();
const {
  getUsers,
  editUser,
  editAvatar,
  getNowUser,
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/me', getNowUser);
router.patch('/me', editUser);
router.patch('/me/avatar', editAvatar);

module.exports = router;
