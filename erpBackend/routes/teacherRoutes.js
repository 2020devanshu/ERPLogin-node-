const express = require("express");

const {
  teacherAuthenticate,
  teacherForgotPassword,
  teacherLogin,
  teacherResetPassword,
  teacherUpdatePassword,
  createTeacher,
} = require("../controllers/teacherController");
const { createStudent } = require("../controllers/studentController");
const { restrictTo } = require("../controllers/authControllers/auth");
const router = express.Router();

router.post("/login", teacherLogin);
// router.post("/signup", authenticate(Admin), signup(Teacher));

router.post(
  "/createTeacher",
  teacherAuthenticate,
  restrictTo("sub-admin"),
  // (req, res, next) => {
  //   req.body.role = "teacher";
  //   next();
  // },
  createTeacher
);
router.post("/createStudent", teacherAuthenticate, createStudent);
router.post(
  "/forgotPassword",
  teacherAuthenticate,
  restrictTo("sub-admin"),
  teacherForgotPassword
);
router.patch(
  "/resetPassword/:token",
  teacherAuthenticate,
  restrictTo("sub-admin"),
  teacherResetPassword
);
router.patch("/updatePassword/", teacherAuthenticate, teacherUpdatePassword);
module.exports = router;
