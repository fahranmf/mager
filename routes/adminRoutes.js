const express = require("express");
const router = express.Router();
const course = require("../controllers/courseController");
const payment = require("../controllers/paymentController");
const { checkRole } = require("../middleware/authMiddleware");

// ======================
// COURSE MANAGEMENT
// ======================
router.get("/courses", checkRole("admin"), course.getCourses);
router.post("/courses", checkRole("admin"), course.createCourse);
router.put("/courses/:id", checkRole("admin"), course.updateCourse);
router.delete("/courses/:id", checkRole("admin"), course.deleteCourse);

// ======================
// PAYMENT MANAGEMENT (MASTER)
// ======================
router.get("/payments", checkRole("admin"), payment.getPaymentMethods);
router.post("/payments", checkRole("admin"), payment.createPaymentMethod);
router.put("/payments/:id", checkRole("admin"), payment.updatePaymentMethod);
router.delete("/payments/:id", checkRole("admin"), payment.deletePaymentMethod);

module.exports = router;