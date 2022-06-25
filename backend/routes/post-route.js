const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post-ctrl");
const authToken = require("../middleware/auth-config");
const upload = require("../middleware/multer-config");

router.post("/", authToken, upload, postCtrl.createPost);
router.put("/update/:id", authToken, postCtrl.updatePost);
router.get("/", authToken, postCtrl.getAllPosts);
router.delete("/:id", authToken, postCtrl.deletePost);

module.exports = router;
