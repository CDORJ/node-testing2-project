const router = require("express").Router();
const User = require("./users-model.js");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.getUser();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
