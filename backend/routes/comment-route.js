const express = require("express");
const router = express.Router();
const comsCtrl = require("../controllers/comment-ctrl");
const auth = require("../middleware/auth-config");

router.post("/:id", auth, comsCtrl.createComs);
router.get("/:id", comsCtrl.getAllComs);
router.put("/update/:id", comsCtrl.updateCom);
router.delete("/:id", auth, comsCtrl.deleteCom);

module.exports = router;
