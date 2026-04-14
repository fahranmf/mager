const express = require("express");
const router = express.Router();
const exportCtrl = require("../controllers/exportController");
const { checkRole } = require("../middleware/authMiddleware");

router.get("/export/:user_id", checkRole("user"), exportCtrl.exportProgress);

module.exports = router;