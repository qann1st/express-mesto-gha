const router = require("express").Router();
const {
  getUsers,
  createUser,
  getUser,
  editUser,
  editAvatar,
} = require("../controllers/user");

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.patch("/:id", editUser);
router.patch("/:id/avatar", editAvatar);

module.exports = router;
