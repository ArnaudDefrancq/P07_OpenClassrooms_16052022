const express = require("express");
const router = express.Router();
const routerCtrl = require("../controllers/user-ctrl");
const authToken = require("../middleware/auth-config");

router.get("/:id", authToken, routerCtrl.findOneUser);
router.put("/update/:id", authToken, routerCtrl.updateUser);
router.get("/delete/:id", authToken, routerCtrl.deleteUser);

module.exports = router;
