const express = require("express");
const {
  getCategory,
  newCategory,
} = require("../controllers/categoryController");
const router = express.Router();

router.get("/", getCategory);
router.post("/newCate", newCategory);

module.exports = router;
