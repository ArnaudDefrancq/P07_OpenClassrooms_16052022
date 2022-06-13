const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post-ctrl.js");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth-config");

router.post("/", postCtrl.createMeassage);
router.get("/", auth, postCtrl.findAllMessage);
router.get("/:id", auth, multer, postCtrl.findOneMessage);
router.put("/:id", auth, multer, postCtrl.modifyMessage);

module.exports = router;
