const Teacher = require("../models/teacherModel");
const {
  login,
  forgotPassword,
  resetPassword,
  authenticate,
  updatePassword,
  checkLogin,
  createUser,
} = require("./authControllers/auth");

exports.createSubadmin = (req, res, next) => {
  req.body.role = "sub-admin";
  next();
};
exports.createTeacher = createUser(Teacher);
exports.teacherLogin = login(Teacher);
exports.teacherForgotPassword = forgotPassword(Teacher, "teachers");
exports.teacherResetPassword = resetPassword(Teacher);
exports.teacherAuthenticate = authenticate(Teacher);
exports.teacherUpdatePassword = updatePassword(Teacher);
exports.teacherCheckLogin = checkLogin(Teacher);
