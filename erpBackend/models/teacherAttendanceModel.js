const mongoose = require("mongoose");

const teacherAttendanceSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.ObjectId,
    ref: "Teacher",
    required: [true, "Please specify Teacher Id"],
  },
  lectureId: {
    type: mongoose.Schema.ObjectId,
    ref: "Lecture",
    required: [true, "Please specify Lecture Id"],
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

const TeacherAttendance = mongoose.model(
  "TeacherAttendance",
  teacherAttendanceSchema
);

module.exports = TeacherAttendance;
