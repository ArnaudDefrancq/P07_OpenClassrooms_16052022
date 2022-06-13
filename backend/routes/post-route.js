const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post-ctrl.js");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth-config");

router.post("/", postCtrl.createPost);
router.get("/", postCtrl.findAllPost);
router.put("/:id", multer, postCtrl.modifyPost);
router.delete("/:id", postCtrl.deletePost);
router.patch("/like-post/:id", postCtrl.likePost);
router.patch("/unlike-post/:id", postCtrl.unlikePost);

module.exports = router;
