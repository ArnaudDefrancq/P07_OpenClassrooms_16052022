const express = require("express");
require("dotenv").config({ path: "./config/.env" });
// const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const models = require("./models");

// Les const pour les routes
const authRoutes = require("./routes/auth-route");
const postRoutes = require("./routes/post-route");
const comRoutes = require("./routes/comment-route");
const userIdRoutes = require("./middleware/auth-config");
const userRoutes = require("./routes/user-route");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

models.sequelize.sync({ alter: true });

// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: "Too many request from this IP",
// });

// app.use(limiter);

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
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
app.use("/api/user", userRoutes);

// // Route pour poster un message
app.use("/api/post", postRoutes);

// Route pour les commentaires
app.use("/api/com", comRoutes);

// Route pour avoir userId
app.get("/userId", userIdRoutes, (req, res) => {
  res.status(200).json(req.auth);
});

app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
