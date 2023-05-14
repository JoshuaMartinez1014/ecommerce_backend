const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ err, message: "not working" });
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ err, message: "not working" });
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  if (!req.body.hasOwnProperty("tag_name")) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Update Successful" });
  } catch (err) {
    res.status(400).send(`Error updating category: ${err.message}`);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    console.log(deletedTag);
    res.status(200).json({ message: "Delete Successful" });
  } catch (err) {
    console.log(err);
    res.status(400).send(`Error deleting category: ${err.message}`);
  }
});

module.exports = router;
