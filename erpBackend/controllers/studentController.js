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
exports.studentAuthenticate = authenticate;
exports.studentUpdatePassword = updatePassword(Student);
exports.studentCheckLogin = checkLogin(Student);
exports.setStudent = (req, res, next) => {
  req.params.studentId = req.user.id;
  next();
};
exports.getStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.studentId)
      .populate({
        path: "Branch",
        // select: "-",
        populate: "Subject",
      })
      .populate("Section")
      .populate("Hostel");
    console.log(student);
    res.status(200).json({
      status: "success",
      student: student,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      student: err,
    });
  }
};
