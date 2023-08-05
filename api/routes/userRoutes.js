const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  updateUser,
  getUser,
  deleteUser,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("login", loginUser);
router.put("/update", updateUser);
router.post("/logout", logout);
router.get("/", getUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
