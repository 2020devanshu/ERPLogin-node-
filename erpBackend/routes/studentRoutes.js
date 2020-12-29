const express = require("express");

const {
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  authenticate,
} = require("../controllers/authControllers/auth");
const Student = require("../models/studentModel");
const Admin = require("../models/adminModel");
const router = express.Router();

router.post("/login", login(Student));
// router.post("/signup", authenticate(Admin), signup(Student));
router.post(
  "/forgotPassword",
  authenticate(Admin),
  forgotPassword(Student, "students")
);
router.patch(
  "/resetPassword/:token",
  authenticate(Admin),
  resetPassword(Student)
);
router.patch(
  "/updatePassword/",
  authenticate(Student),
  updatePassword(Student)
);
module.exports = router;
