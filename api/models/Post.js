const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: [String],
    username: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Category model
        ref: "Category",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
