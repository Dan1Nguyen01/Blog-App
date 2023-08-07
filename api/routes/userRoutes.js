const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  updateUser,
  getUser,
  deleteUser,
  updatePassword,
} = require("../controllers/userController");

router.get("/", getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update", updateUser);
router.put("/updateP", updatePassword);
router.post("/logout", logout);
router.delete("/delete/:id", deleteUser);

module.exports = router;
