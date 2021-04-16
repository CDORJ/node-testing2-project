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

router.delete("/:id", async (req, res, next) => {
  try {
    await Pasta.remove(req.params.id);
    res.status(204).json({ message: "deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
