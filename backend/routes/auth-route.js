const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/auth-ctrl");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/", userCtrl.allUsers);

module.exports = router;
