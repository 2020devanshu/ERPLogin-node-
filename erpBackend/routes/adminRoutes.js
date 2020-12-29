const express = require("express");

const {
  login,
  resendOtp,
  forgotPassword,
  resetPassword,
  updatePassword,
  confirmSignup,
  createUser,
  adminSignup,
  authenticate,
} = require("../controllers/authControllers/auth");
const { sendSms } = require("../controllers/sendSMS");
const Admin = require("../models/adminModel");
const Teacher = require("../models/teacherModel");
const router = express.Router();

router.post("/login", login(Admin));
router.post("/signup", adminSignup);
router.post("/resendOtp", resendOtp);
router.post("/confirmSignup", confirmSignup);
router.post(
  "/createSubadmin",
  authenticate(Admin),
  (req, res, next) => {
    req.body.role = "sub-admin";
    next();
  },
  createUser(Teacher)
);
router.post("/forgotPassword", forgotPassword(Admin, "admins"));
router.patch("/resetPassword/:token", resetPassword(Admin));
router.patch("/updatePassword/", authenticate(Admin), updatePassword(Admin));
router.post("/bulksms", authenticate(Admin), sendSms);
module.exports = router;
