const express = require("express");

const {
  studentLogin,
  studentForgotPassword,
  studentResetPassword,
  studentUpdatePassword,
  setStudent,
  getStudent,
  studentCheckLogin,
} = require("../controllers/studentController");
const { authenticate } = require("../controllers/authControllers/auth");
const {
  getAttendanceByLectureByStudent,
} = require("../controllers/institutionAttendanceController");
const { teacherCheckLogin } = require("../controllers/teacherController");
const router = express.Router();

router.post("/login", studentLogin);
router.get(
  "/my-attendance/lecture/:lectureId",
  studentCheckLogin,
  authenticate,
  setStudent,
  getAttendanceByLectureByStudent
);

router.get(
  "/:studentId",
  studentCheckLogin,
  teacherCheckLogin,
  authenticate,
  getStudent
);
router.get("/me", studentCheckLogin, authenticate, setStudent, getStudent);
// router.post("/signup", teacherAuthenticate, signup(Student));
router.post(
  "/forgotPassword",
  teacherCheckLogin,
  authenticate,
  studentForgotPassword
);
router.patch(
  "/resetPassword/:token",
  teacherCheckLogin,
  authenticate,
  studentResetPassword
);
router.patch(
  "/updatePassword/",
  studentCheckLogin,
  authenticate,
  studentUpdatePassword
);
module.exports = router;
