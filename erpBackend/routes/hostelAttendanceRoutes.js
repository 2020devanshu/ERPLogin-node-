const express = require("express");

const { teacherCheckLogin } = require("../controllers/teacherController");
const {
  authenticate,
  restrictTo,
} = require("../controllers/authControllers/auth");
const { studentCheckLogin } = require("../controllers/studentController");
const {
  getAllHostelAttendance,
  getHostelAttendance,
  createHostelAttendance,
  updateHostelAttendance,
  deleteHostelAttendance,
} = require("../controllers/hostelAttendanceController");
const router = express.Router();
//For HostelAttendance

router.get(
  "/",
  teacherCheckLogin,
  authenticate,
  restrictTo("sub-admin"),
  getAllHostelAttendance
);
router.get(
  "/:id",
  teacherCheckLogin,
  studentCheckLogin,
  authenticate,
  getHostelAttendance
);
router.post(
  "/",
  teacherCheckLogin,
  authenticate,
  restrictTo("sub-admin"),
  createHostelAttendance
);
router.patch(
  "/:id",
  teacherCheckLogin,
  authenticate,
  restrictTo("sub-admin"),
  updateHostelAttendance
);
router.delete(
  "/:id",
  teacherCheckLogin,
  authenticate,
  restrictTo("sub-admin"),
  deleteHostelAttendance
);
module.exports = router;
