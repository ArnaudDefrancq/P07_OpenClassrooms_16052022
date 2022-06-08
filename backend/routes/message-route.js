const express = require("express");
const router = express.Router();
const messageCtrl = require("../controllers/message-ctrl.js");
const multer = require("../middleware/multer-config");

router.post("/", messageCtrl.createMeassage);
router.get("/", messageCtrl.findAllMessage);
router.get("/:id", multer, messageCtrl.findOneMessage);
router.put("/:id", multer, messageCtrl.modifyMessage);

module.exports = router;
