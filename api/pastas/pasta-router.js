const router = require("express").Router();
const Pasta = require("./pasta-model.js");

router.post("/", async (req, res, next) => {
  const body = req.body;
  try {
    const pasta = await Pasta.insert(body);
    res.status(201).json(pasta);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
