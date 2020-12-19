const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.ObjectId,
    ref: "Student",
  },
  lessonId: {
    type: mongoose.Schema.ObjectId,
    ref: "Lesson",
  },
  attendance: {
    type: String,
    enum: ["present", "absent"],
    default: "absent",
  },

  createdOn: Date,
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
