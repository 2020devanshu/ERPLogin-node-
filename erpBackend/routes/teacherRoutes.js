const express = require("express");

const {
  teacherAuthenticate,
  teacherForgotPassword,
  teacherLogin,
  teacherResetPassword,
  teacherUpdatePassword,
  createTeacher,
} = require("../controllers/teacherController");
const {
  getAllAssignment,
  getAssignment,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} = require("../controllers/assignmentController");
const {
  getAllSubject,
  getSubject,
  createSubject,
  updateSubject,
  deleteSubject,
} = require("../controllers/subjectController");
const { createStudent } = require("../controllers/studentController");
const { restrictTo } = require("../controllers/authControllers/auth");
const router = express.Router();

router.use(teacherAuthenticate);
router.post("/login", teacherLogin);
// router.post("/signup", authenticate(Admin), signup(Teacher));

router.post(
  "/createTeacher",
  restrictTo("sub-admin"),
  // (req, res, next) => {
  //   req.body.role = "teacher";
  //   next();
  // },
  createTeacher
);
router.post("/createStudent", createStudent);
router.post("/forgotPassword", restrictTo("sub-admin"), teacherForgotPassword);
router.patch(
  "/resetPassword/:token",
  restrictTo("sub-admin"),
  teacherResetPassword
);
router.patch("/updatePassword/", teacherUpdatePassword);

//For subject
router.get("/subjects/:id", getSubject);
router.post("/subjects", createSubject);
router.patch("/subjects/:id", updateSubject);
router.delete("/subjects/:id", deleteSubject);

//For assignment
router.get("/assignments/:id", getAssignment);
router.post("/assignments", createAssignment);
router.patch("/assignments/:id", updateAssignment);
router.delete("/assignments/:id", deleteAssignment);
//For assignment
router.get("/assignments/:id", getAssignment);
router.post("/assignments", createAssignment);
router.patch("/assignments/:id", updateAssignment);
router.delete("/assignments/:id", deleteAssignment);

module.exports = router;
