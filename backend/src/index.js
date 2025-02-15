const express = require("express");

const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");

dotenv.config({
  path: __dirname + "/.env",
});

db.connect();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!dasdasd");
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
