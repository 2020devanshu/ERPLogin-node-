const express = require("express");

const {
  login,
  createUser,
  forgotPassword,
  resetPassword,
  updatePassword,
  authenticate,
} = require("../controllers/authControllers/auth");
const Teacher = require("../models/teacherModel");
const Student = require("../models/studentModel");
const Admin = require("../models/adminModel");
const router = express.Router();

router.post("/login", login(Teacher));
// router.post("/signup", authenticate(Admin), signup(Teacher));

router.post(
  "/createTeacher",
  authenticate(Teacher),
  (req, res, next) => {
    req.body.role = "teacher";
    next();
  },
  createUser(Teacher)
);
router.post("/createStudent", authenticate(Teacher), createUser(Student));
router.post(
  "/forgotPassword",
  authenticate(Admin),
  forgotPassword(Teacher, "teachers")
);
router.patch(
  "/resetPassword/:token",
  authenticate(Admin),
  resetPassword(Teacher)
);
router.patch(
  "/updatePassword/",
  authenticate(Teacher),
  updatePassword(Teacher)
);
module.exports = router;
