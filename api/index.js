const express = require("express");
require("dotenv").config();
const app = express();

app.get("/test", (req, res) => {
  res.json("Hello World !");
});

app.listen(process.env.PORT, () => {
  console.log("listening to port: " + process.env.PORT);
});
