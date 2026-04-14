const express = require("express");
const router = express.Router();
const payment = require("../controllers/paymentController");
const schedule = require("../controllers/scheduleController");
const userCourse = require("../controllers/userCourseController");
const { checkRole } = require("../middleware/authMiddleware");

// ======================
// PAYMENT (USER)
// ======================
router.post("/payments", checkRole("user"), payment.createPayment);

// ======================
// USER SCHEDULE (KALENDER LATIHAN)
// ======================
router.post("/schedules", checkRole("user"), schedule.createUserSchedule);

// GET jadwal berdasarkan user
router.get("/schedules/:user_id", checkRole("user"), schedule.getUserSchedules);

// ======================
// USER COURSES
// ======================
router.get("/courses/:user_id", checkRole("user"), userCourse.getUserCourses);

module.exports = router;