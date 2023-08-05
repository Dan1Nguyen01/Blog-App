const Category = require("../models/Category");
const newCategory = async (req, res) => {
  const newCate = new Category(req.body);
  try {
    const saveCategory = await newCate.save();
    res.status(200).json(saveCategory);
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
