const express = require("express");
const router = express.Router();
const likeCtrl = require("../controllers/like-ctrl");
const authToken = require("../middleware/auth-config");

router.get("/", authToken, likeCtrl.getAllLike);
router.post("/:id/like", authToken, likeCtrl.createLike);
router.delete("/:id/unlike", authToken, likeCtrl.unlike);

module.exports = router;
