const User = require("../models/User");
const Post = require("../models/Post");
const Category = require("../models/Category");
const jwt = require("jsonwebtoken");
const newPost = (req, res) => {
  // const { title, desc, photo, username, categories } = req.body;
  const { title, desc, photo, categories } = req.body;
  const { token } = req.cookies;
  console.log("where is the photo: " + photo);
  try {
    jwt.verify(token, process.env.JWTSECRET, {}, async (error, tokenData) => {
      if (error) throw error;
      const post = await Post.create({
        username: tokenData.username,
        title,
        desc,
        photo,
        categories,
      });
      console.log(post);
      const savedPost = await post.save();
      res.status(200).json(savedPost);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);

    try {
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE POST
const deletePost = async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;
  try {
    const post = await Post.findByIdAndDelete(id);
    res.status(200).json("Post has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET POST
const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET ALL POSTS
const getPosts = async (req, res) => {
  const post = await Post.find({}).populate("categories");
  res.status(200).json(post);
};

module.exports = { newPost, getPosts, getPost, updatePost, deletePost };
