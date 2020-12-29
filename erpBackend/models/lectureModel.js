const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
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
  lectureDate:{
    type:Date,
    require:[true,"Please specify lecture date"]
  },
  createdOn: Date,
});

const Lecture = mongoose.model("Lecture", lectureSchema);

module.exports = Lecture;
