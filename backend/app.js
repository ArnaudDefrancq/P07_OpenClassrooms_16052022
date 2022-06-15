const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("./config/db");
const path = require("path");
const { checkUser, requireAuth } = require("./middleware/auth-config");

// Les const pour les routes
const authRoutes = require("./routes/auth-route");
const postRoutes = require("./routes/post-route");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP",
});

app.use(limiter);

app.use(express.json());

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));
app.use(cookieParser());

// jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
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

app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
