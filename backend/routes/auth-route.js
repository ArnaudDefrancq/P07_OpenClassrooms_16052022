const express = require("express");
const router = express.Router();
const connectCtrl = require("../controllers/auth-Ctrl");

router.post("/signup", connectCtrl.signup);
router.post("/login", connectCtrl.login);

module.exports = router;
