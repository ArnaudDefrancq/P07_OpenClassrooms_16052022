const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./config/db");

// Les const pour les routes
const authRoutes = require("./routes/auth-route");
const postRoutes = require("./routes/post-route");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({ credentials: true, origin: "*" }));

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP",
});

app.use(limiter);

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
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
app.use("/api/auth", authRoutes);

// // Route pour poster un message
app.use("/api/post", postRoutes);

module.exports = app;
