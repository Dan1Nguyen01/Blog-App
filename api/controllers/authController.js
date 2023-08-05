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
      const { name, email, _id } = await User.findById(tokenData.id);
      res.status(200).json({ name, email, _id });
    });
  }
  // res.status(400).json("Token is null");
};

module.exports = userProfile;
