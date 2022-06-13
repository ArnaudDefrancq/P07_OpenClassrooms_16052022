const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post-ctrl.js");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth-config");

router.post("/", postCtrl.createPost);
router.get("/", postCtrl.findAllPost);
router.get("/:id", multer, postCtrl.findOnePost);
router.put("/:id", multer, postCtrl.modifyPost);
router.delete("/:id", postCtrl.deletePost);

module.exports = router;
