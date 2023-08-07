const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser"); // Import the cookie-parser middleware
require("dotenv").config();
const cors = require("cors"); // Import the cors middleware

const User = require("../models/User");
const app = express();
app.use(cors());
app.use(cookieParser()); // Use the cookie-parser middleware

const userProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWTSECRET, {}, async (error, tokenData) => {
      if (error) throw error;
      const { username, email, _id, profilePic, intro, categories } =
        await User.findById(tokenData.id);
      res
        .status(200)
        .json({ username, email, _id, profilePic, intro, categories });
    });
  }
};

module.exports = userProfile;
