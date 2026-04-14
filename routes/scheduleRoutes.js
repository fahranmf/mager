const express = require("express");
const router = express.Router();
const schedule = require("../controllers/scheduleController");

router.get("/", schedule.getSchedules);

module.exports = router;