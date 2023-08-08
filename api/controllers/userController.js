const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Post = require("../models/Post");
const registerUser = async (req, res) => {
  const { username, email, password, profilePic } = req.body;

  try {
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({ error: "Username already taken" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      profilePic,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ error: "An error occurred during registration" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "You have not sign up!" });
    }
    const correct = await bcrypt.compare(password, user.password);
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
  const { username, profilePic, email, id, categories, intro } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "No such user" });
    }
    const posts = await Post.find({ username: user.username });
    user.username = username;
    user.profilePic = profilePic;
    user.email = email;
    user.categories = categories;
    user.intro = intro;

    for (const post of posts) {
      post.username = username;
      await post.save();
    }

    // Save the updated user and posts
    await Promise.all([user.save(), ...posts.map((post) => post.save())]);
    return res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePassword = async (req, res) => {
  const { id, password, newPassword } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "No such user" });
    }
    const correctPassword = await bcrypt.compare(password, user.password);
    if (correctPassword) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newPassword, salt);
      user.password = hash;
      await user.save();
      res.json({ message: "Password updated successfully!" });
    } else {
      res.json({ message: "Current password is wrong!" });
    }
  } catch (err) {
    return res.status(500).json({ erorr: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    try {
      await Post.deleteMany({ username: user.username });
      await User.findOneAndDelete(id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(404).json("User not found!");
  }
};

const getUser = async (req, res) => {
  const { username } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne(username);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logout,
  updateUser,
  updatePassword,
  deleteUser,
  getUser,
};
