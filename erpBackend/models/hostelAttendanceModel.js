const mongoose = require("mongoose");

const hostelAttendanceSchema = new mongoose.Schema({
  hostelId: {
    type: mongoose.Schema.ObjectId,
    ref: "Hostel",
    required: [true, "Please specify the hostel id"],
  },
  studentId: {
    type: mongoose.Schema.ObjectId,
    ref: "Student",
    required: [true, "Please specify the Student id"],
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

const HostelAttendance = mongoose.model(
  "HostelAttendance",
  hostelAttendanceSchema
);

module.exports = HostelAttendance;
