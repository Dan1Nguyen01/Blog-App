const Category = require("../models/Category");
const newCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await Category.findOne({ name: name });
    if (category) {
      return res.json({ error: "Category can't be doublicated" });
    }
    const newCate = await Category.create({ name });

    res.status(200).json(newCate);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getCategory = async (req, res) => {
  try {
    const cats = await Category.find();
    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { newCategory, getCategory };
