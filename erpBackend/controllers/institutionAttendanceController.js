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
exports.getAttendanceByLectureByStudent = async (req, res, next) => {
  try {
    const attendance = await InstitutionAttendance.find({
      lectureId: req.params.lectureId,
      studentId: req.params.studentId,
    });
    return res.status(200).json({
      status: "success",
      attendance: attendance,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      data: {
        error: err,
      },
    });
  }
};
