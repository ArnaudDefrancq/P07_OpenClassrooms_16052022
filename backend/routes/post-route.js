const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post-ctrl");

router.post("/", postCtrl.createPost);
router.put("/update/:id", postCtrl.updatePost);
router.get("/", postCtrl.getAllPosts);
router.delete("/:id", postCtrl.deletePost);

module.exports = router;
