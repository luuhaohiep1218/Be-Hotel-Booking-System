const express = require("express");
const morgan = require("morgan");

const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");
const { errorHandle } = require("./middlewares/errorMiddleware");

const authRouter = require("./routes/authRouter");

dotenv.config({
  path: __dirname + "/.env",
});

db.connect();

const app = express();

// app.use(morgan("combined"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!dasdasd");
});

app.use("/api/auth", authRouter);

app.use(errorHandle);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
