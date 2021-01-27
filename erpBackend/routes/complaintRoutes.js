const express = require("express");

const { teacherCheckLogin } = require("../controllers/teacherController");
const {
  authenticate,
  restrictTo,
} = require("../controllers/authControllers/auth");
const { studentCheckLogin } = require("../controllers/studentController");
const {
  getAllComplaint,
  getComplaint,
  createComplaint,
  updateComplaint,
  deleteComplaint,
} = require("../controllers/complaintController");
const router = express.Router();
//For Complaint

router.get(
  "/",
  teacherCheckLogin,
  authenticate,
  restrictTo("sub-admin"),
  getAllComplaint
);
router.get(
  "/:id",
  teacherCheckLogin,
  studentCheckLogin,
  authenticate,
  getComplaint
);
router.post(
  "/",
  studentCheckLogin,
  authenticate,
  restrictTo("sub-admin"),
  createComplaint
);
router.patch(
  "/:id",
  teacherCheckLogin,
  studentCheckLogin,
  authenticate,
  updateComplaint
);
router.delete(
  "/:id",
  studentCheckLogin,
  authenticate,
  restrictTo("sub-admin"),
  deleteComplaint
);
module.exports = router;
