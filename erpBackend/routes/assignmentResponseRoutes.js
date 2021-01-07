const express = require("express");

const { teacherCheckLogin } = require("../controllers/teacherController");
const {
  authenticate,
  restrictTo,
} = require("../controllers/authControllers/auth");
const { studentCheckLogin } = require("../controllers/studentController");
const {
  getAllAssignmentResponse,
  getAssignmentResponse,
  createAssignmentResponse,
  updateAssignmentResponse,
  deleteAssignmentResponse,
} = require("../controllers/assignmentResponseController");
const router = express.Router();
//For AssignmentResponse

router.get(
  "/",
  teacherCheckLogin,
  authenticate,
  restrictTo("sub-admin"),
  getAllAssignmentResponse
);
router.get(
  "/:id",
  teacherCheckLogin,
  studentCheckLogin,
  authenticate,
  getAssignmentResponse
);
router.post(
  "/",
  studentCheckLogin,
  authenticate,
  restrictTo("sub-admin"),
  createAssignmentResponse
);
router.patch(
  "/:id",
  teacherCheckLogin,
  studentCheckLogin,
  authenticate,
  updateAssignmentResponse
);
router.delete(
  "/:id",
  studentCheckLogin,
  authenticate,
  restrictTo("sub-admin"),
  deleteAssignmentResponse
);
module.exports = router;
