const express = require("express");
const path = require("path");
require("dotenv").config({ path: "./config/.env" });
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth-route");
const cors = require("cors");
const postRoute = require("./routes/post-route");
const Db = require("./config/db-config");
const modelsUser = require("./models/User");
const modelsPost = require("./models/Post");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({ credentials: true, origin: "http://localhost:3001" }));

Db.sync()
  .then(console.log("connection à la bdd"))
  .catch((err) => console.log(err));

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP",
});

app.use(limiter);

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Hello from the express server",
  });
});

// Route user
app.use("/api/auth", authRoute);

// // Route pour poster un message
app.use("/api/articles", postRoute);

module.exports = app;
