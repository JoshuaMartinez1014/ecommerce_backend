const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json({ err, message: "not working" });
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json({ err, message: "not working" });
  }
});

router.post("/", async (req, res) => {
  // create a new category
  if (!req.body.hasOwnProperty("category_name")) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    await Category.update(req.body, {
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
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    console.log(deletedCategory);
    res.status(200).json({ message: "Delete Successful" });
  } catch (err) {
    console.log(err);
    res.status(400).send(`Error deleting category: ${err.message}`);
  }
});

module.exports = router;
