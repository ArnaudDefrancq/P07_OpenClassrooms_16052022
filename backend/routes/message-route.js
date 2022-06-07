const express = require("express");
const router = express.Router();
const messageCtrl = require("../controllers/message-ctrl.js");

router.post("/", messageCtrl.createMeassage);
router.get("/", messageCtrl.findAllMessage);

module.exports = router;
