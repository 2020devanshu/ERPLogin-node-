const mongoose = require("mongoose");

const institutionAttendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.ObjectId,
    ref: "Student",
    required: [true, "Please specify the Student id"],
  },
  lectureId: {
    type: mongoose.Schema.ObjectId,
    ref: "Lecture",
    required: [true, "Please specify the Lecture id"],
  },
  attendanceMarkedOn: {
    type: Date,
    required: [true, "Please specify Attendance Date"],
  },
  attendanceStatus: {
    type: String,
    enum: ["present", "absent"],
    required: [true, "Please specify the attendance Status"],
  },

  absentReason: {
    type: String,
  },

  attendanceRecordedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Teacher",
  },
  createdOn: {
    type: Date,
    required: true,
  },
});
institutionAttendanceSchema.index({ lectureId: 1, studentId: -1 });

const InstitutionAttendance = mongoose.model(
  "InstitutionAttendance",
  institutionAttendanceSchema
);

module.exports = InstitutionAttendance;
