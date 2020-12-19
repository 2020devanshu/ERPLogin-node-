const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  start: Date,
  end: Date,
  teacherId: {
    type: mongoose.Schema.ObjectId,
    ref: "Teacher",
  },
  subjectId: {
    type: mongoose.Schema.ObjectId,
    ref: "Subject",
  },
  createdOn: Date,
});

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;
