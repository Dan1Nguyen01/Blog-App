const express = require("express");
require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/images", express.static(path.join(__dirname, "/images")));

app.use(
  cors({
    credentials: true,
    origin: "https://camel-blog.onrender.com/",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  res.header("Access-Control-Allow-Origin", "https://camel-blog.onrender.com/"); // Replace with your frontend origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE"); // Include PUT in the allowed methods
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method === "OPTIONS") {
    res.send(200);
  } else {
    next();
  }
});
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

app.get("/test", (req, res) => {
  res.json("Hello World!");
});
//upload img from local
const upload = multer({ dest: "images" });
const fs = require("fs");

const uploadedFiles = []; // Initialize an array to hold uploaded file paths
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    const { path, originalname } = req.file;
    uploadedFiles.push(originalname); // Push the original file name without modifications

    res.status(200).json({ message: "File has been uploaded", uploadedFiles });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while processing the upload." });
  }
});

// app.post("/api/upload", upload.single("file"), (req, res) => {
//   try {
//     const { path, originalname } = req.file;
//     const parts = originalname.split(".");
//     const ext = parts[parts.length - 1];
//     const newPath = path + "." + ext;
//     fs.renameSync(path, newPath);
//     //  uploadedFiles.push(newPath.replace(`images\\`, ""));
//     uploadedFiles.push(newPath);

//     res.status(200).json({ message: "File has been uploaded", uploadedFiles });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while processing the upload." });
//   }
// });

app.use(express.static("./build file/build"));

const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

const postRoutes = require("./routes/postRoutes");
app.use("/api/post", postRoutes);

const categoryRoutes = require("./routes/categoryRoutes");
app.use("/api/category", categoryRoutes);

const auth = require("./routes/authRoutes");
app.use("/api/auth", auth);

app.listen(process.env.PORT, () => {
  console.log("Listening to port: " + process.env.PORT);
});
