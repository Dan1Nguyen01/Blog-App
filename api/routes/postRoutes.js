const express = require("express");
const {
  getPosts,
  getPost,
  newPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/newPost", newPost);
router.put("/updatePost", updatePost);
router.delete("/delete/:id", deletePost);
module.exports = router;
