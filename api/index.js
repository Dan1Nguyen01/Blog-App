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
    origin: "http://localhost:3000/login",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  res.header(
    "Access-Control-Allow-Origin",
    "https://airbandb-clone.onrender.com"
  ); // Replace with your frontend origin
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
  res.json("Hello World !");
});

//upload img from local
const upload = multer({ dest: "images" });
const fs = require("fs");
app.post("/api/upload", upload.array("photos", 100), (req, res) => {
  const [uploadedFiles] = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.file[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace(`images\\`, ""));
  }
  res.status(200).json("File has been uploaded");
});

app.listen(process.env.PORT, () => {
  console.log("Listening to port: " + process.env.PORT);
});
