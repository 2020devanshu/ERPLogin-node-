const express = require("express");

const {
  studentAuthenticate,
  studentLogin,
  studentForgotPassword,
  studentResetPassword,
  studentUpdatePassword,
} = require("../controllers/studentController");
const { teacherAuthenticate } = require("../controllers/teacherController");
const router = express.Router();

router.post("/login", studentLogin);
// router.post("/signup", teacherAuthenticate, signup(Student));
router.post("/forgotPassword", teacherAuthenticate, studentForgotPassword);
router.patch(
  "/resetPassword/:token",
  teacherAuthenticate,
  studentResetPassword
);
router.patch("/updatePassword/", studentAuthenticate, studentUpdatePassword);
module.exports = router;
