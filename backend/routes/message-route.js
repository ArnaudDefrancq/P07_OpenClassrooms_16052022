const express = require("express");
const router = express.Router();
const sauceCtrl = require("../controllers/message-ctrl.js");

router.post("/", sauceCtrl.createMessage);

module.exports = router;
