const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: true,
    trim: true,
  },
  subjectDescription: {
    type: String,
    trim: true,
  },

  createdOn: Date,
});

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;
