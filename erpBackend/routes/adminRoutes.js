const express = require("express");

const {
  login,
  signup,
  forgotPassword,
  resetPassword,
  updatePassword,
  authenticate,
} = require("../controllers/authControllers/auth");
const { sendSms } = require("../controllers/sendSMS");
const Admin = require("../models/adminModel");
const router = express.Router();

router.post("/login", login(Admin));
router.post("/signup", authenticate(Admin), signup(Admin));
router.post("/forgotPassword", forgotPassword(Admin, "admins"));
router.patch("/resetPassword/:token", resetPassword(Admin));
router.patch("/updatePassword/", authenticate(Admin), updatePassword(Admin));
router.post("/bulksms", authenticate(Admin), sendSms);
module.exports = router;
