const express = require("express");
const router = express.Router();
const userProfile = require("../controllers/authController");
router.get("/", userProfile);
module.exports = router;
