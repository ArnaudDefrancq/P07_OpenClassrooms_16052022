const express = require("express");
const router = express.Router();
const comsCtrl = require("../controllers/comment-ctrl");
const auth = require("../middleware/auth-config");

router.post("/", auth, comsCtrl.createComs);
router.get("/", comsCtrl.getAllComs);
router.delete("/", comsCtrl.deleteCom);

module.exports = router;