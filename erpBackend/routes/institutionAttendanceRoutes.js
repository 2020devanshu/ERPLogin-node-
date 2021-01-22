const express = require("express");

const { teacherCheckLogin } = require("../controllers/teacherController");
const {
  authenticate,
  restrictTo,
} = require("../controllers/authControllers/auth");
const { studentCheckLogin } = require("../controllers/studentController");
const {
  getAllInstitutionAttendance,
  getInstitutionAttendance,
  createInstitutionAttendance,
  updateInstitutionAttendance,
  deleteInstitutionAttendance,
  // getAttendanceByLectureByStudent,
} = require("../controllers/institutionAttendanceController");
const router = express.Router();
//For InstitutionAttendance

router.get(
  "/",
  teacherCheckLogin,
  authenticate,
  restrictTo("sub-admin"),
  getAllInstitutionAttendance
);
router.get(
  "/:id",
  teacherCheckLogin,
  studentCheckLogin,
  authenticate,
  getInstitutionAttendance
);
router.post("/", teacherCheckLogin, authenticate, createInstitutionAttendance);
router.patch(
  "/:id",
  teacherCheckLogin,
  authenticate,
  updateInstitutionAttendance
);
router.delete(
  "/:id",
  teacherCheckLogin,
  authenticate,
  restrictTo("sub-admin"),
  deleteInstitutionAttendance
);
module.exports = router;
