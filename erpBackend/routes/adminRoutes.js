const express = require("express");

const {
  adminAuthenticate,
  adminForgotPassword,
  adminLogin,
  adminResetPassword,
  adminSignup,
  adminUpdatePassword,
  resendOtp,
  confirmSignup,
} = require("../controllers/adminController");
const {
  createSubadmin,
  createTeacher,
} = require("../controllers/teacherController");
const { sendSms } = require("../controllers/sendSMS");
const router = express.Router();

router.post("/login", adminLogin);
router.post("/signup", adminSignup);
router.post("/resendOtp", resendOtp);
router.post("/confirmSignup", confirmSignup);
router.post("/subadmin", adminAuthenticate, createSubadmin, createTeacher);
router.post("/forgotPassword", adminForgotPassword);
router.patch("/resetPassword/:token", adminResetPassword);
router.patch("/updatePassword/", adminAuthenticate, adminUpdatePassword);
router.post("/bulksms", adminAuthenticate, sendSms);
module.exports = router;
