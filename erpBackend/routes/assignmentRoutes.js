const express = require("express");

const { teacherCheckLogin } = require("../controllers/teacherController");
const { authenticate } = require("../controllers/authControllers/auth");
const { studentCheckLogin } = require("../controllers/studentController");
const {
  getAllAssignment,
  getAssignment,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} = require("../controllers/assignmentController");
const router = express.Router();
//For assignment

router.get("/", teacherCheckLogin, authenticate, getAllAssignment);
router.get(
  "/:id",
  teacherCheckLogin,
  studentCheckLogin,
  authenticate,
  getAssignment
);
router.post("/", teacherCheckLogin, authenticate, createAssignment);
router.patch("/:id", teacherCheckLogin, authenticate, updateAssignment);
router.delete("/:id", teacherCheckLogin, authenticate, deleteAssignment);
module.exports = router;
