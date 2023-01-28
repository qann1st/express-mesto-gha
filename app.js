const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("dsadasds");
});

app.listen("3000", (req, res) => {
  console.log("Server started");
});
