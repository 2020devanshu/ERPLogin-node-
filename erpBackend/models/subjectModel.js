const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: true,
    trim: true,
  },

  createdOn: Date,
});

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;
