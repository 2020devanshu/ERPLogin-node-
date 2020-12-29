const Student = require("../models/studentModel");
const {
  login,
  forgotPassword,
  resetPassword,
  authenticate,
  updatePassword,
  checkLogin,
  createUser,
} = require("./authControllers/auth");

exports.createStudent = createUser(Student);
exports.studentLogin = login(Student);
exports.studentForgotPassword = forgotPassword(Student, "students");
exports.studentResetPassword = resetPassword(Student);
exports.studentAuthenticate = authenticate(Student);
exports.studentUpdatePassword = updatePassword(Student);
exports.studentCheckLogin = checkLogin(Student);
