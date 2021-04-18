const router = require("express").Router();
const Cat = require("./cats-model.js");

router.post("/", async (req, res, next) => {
  const body = req.body;
  try {
    const cat = await Cat.insert(body);
    res.status(201).json(cat);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Cat.remove(req.params.id);
    res.status(204).json({ message: "deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
