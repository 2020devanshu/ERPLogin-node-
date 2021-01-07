const express = require("express");

const { teacherCheckLogin } = require("../controllers/teacherController");
const {
  authenticate,
  restrictTo,
} = require("../controllers/authControllers/auth");
const {
  getAllTeacherAttendance,
  getTeacherAttendance,
  createTeacherAttendance,
  updateTeacherAttendance,
  deleteTeacherAttendance,
} = require("../controllers/teacherAttendanceController");
const router = express.Router();
//For TeacherAttendance

router.get(
  "/",
  teacherCheckLogin,
  authenticate,
  restrictTo("sub-admin"),
  getAllTeacherAttendance
);
router.get("/:id", teacherCheckLogin, authenticate, getTeacherAttendance);
router.post(
  "/",
  teacherCheckLogin,
  authenticate,
  restrictTo("sub-admin"),
  createTeacherAttendance
);
router.patch(
  "/:id",
  teacherCheckLogin,
  authenticate,
  restrictTo("sub-admin"),
  updateTeacherAttendance
);
router.delete(
  "/:id",
  teacherCheckLogin,
  authenticate,
  restrictTo("sub-admin"),
  deleteTeacherAttendance
);
module.exports = router;
