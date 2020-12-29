const TeacherAttendance = require("../models/teacherAttendanceModel");
const {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
} = require("../helpers/controllerHelper");

exports.createTeacherAttendance = createOne(TeacherAttendance);
exports.updateTeacherAttendance = updateOne(TeacherAttendance);
exports.deleteTeacherAttendance = deleteOne(TeacherAttendance);
exports.getTeacherAttendance = getOne(TeacherAttendance);
exports.getAllTeacherAttendance = getAll(TeacherAttendance);
