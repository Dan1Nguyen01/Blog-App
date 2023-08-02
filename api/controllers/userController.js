const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const registerUser = async (req, res) => {
  const { username, email, password, profilePic } = req.body;

  try {
    const userName = await User.findOne({ username });
    if (userName) {
      return res.status(401).json({ error: "This username is already taken" });
    }
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return res
        .status(401)
        .json({ error: "You already have an account with this email" });
    }
    const salt = bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hash,
      profilePic,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "You have not sign up!" });
    }
    const correct = bcrypt.compare(password, user.password);
    if (!correct) {
      return res
        .status(422)
        .json({ error: "Your email or password is not correct !" });
    }

    jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      process.env.JWTSECRET,
      {},
      (error, token) => {
        if (error) throw error;
        return res.status(200).cookie("token", token).json(user);
      }
    );
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
};

const logout = (req, res) => {
  res.cookie("token", "").json(true);
};

const updateUser = async (req, res) => {
  const { username, profilePic, email, password, id } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "No such user" });
    }

    const salt = bcrypt.genSalt(10);
    const hash = bcrypt.hash(passowrd, salt);

    user.username = username;
    user.profilePic = profilePic;
    user.email = email;
    user.password = hash;

    await user.save();
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser, logout, updateUser };
