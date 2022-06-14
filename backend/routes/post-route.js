const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post-ctrl.js");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth-config");

//Route des posts
router.post("/", multer, postCtrl.createPost);
router.get("/", postCtrl.findAllPost);
router.put("/:id", multer, postCtrl.modifyPost);
router.delete("/:id", postCtrl.deletePost);
router.patch("/like-post/:id", postCtrl.likePost);
router.patch("/unlike-post/:id", postCtrl.unlikePost);

// Route des  commentaires
router.patch("/comment-post/:id", postCtrl.commentPost);
router.patch("/edit-comment-post/:id", postCtrl.editCommentPost);
router.patch("/delete-comment-post/:id", postCtrl.deleteCommentPost);

module.exports = router;
