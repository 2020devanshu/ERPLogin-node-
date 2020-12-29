const InstitutionAttendance = require("../models/institutionAttendanceModel");
const {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
} = require("../helpers/controllerHelper");

exports.createInstitutionAttendance = createOne(InstitutionAttendance);
exports.updateInstitutionAttendance = updateOne(InstitutionAttendance);
exports.deleteInstitutionAttendance = deleteOne(InstitutionAttendance);
exports.getInstitutionAttendance = getOne(InstitutionAttendance);
exports.getAllInstitutionAttendance = getAll(InstitutionAttendance);
