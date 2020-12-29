const HostelAttendance = require("../models/hostelAttendanceModel");
const {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
} = require("../helpers/controllerHelper");

exports.createHostelAttendance = createOne(HostelAttendance);
exports.updateHostelAttendance = updateOne(HostelAttendance);
exports.deleteHostelAttendance = deleteOne(HostelAttendance);
exports.getHostelAttendance = getOne(HostelAttendance);
exports.getAllHostelAttendance = getAll(HostelAttendance);
