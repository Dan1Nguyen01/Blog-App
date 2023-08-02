const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  updateUser,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("l-ogin", loginUser);
router.put("/update", updateUser);
router.post("/logout", logout);

module.exports = router;
