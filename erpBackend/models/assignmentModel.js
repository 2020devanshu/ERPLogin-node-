const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  subjectId: {
    type: mongoose.Schema.ObjectId,
    ref: "Subject",
    required: [true, "Please specify subject Id"],
  },
  attachments: {
    type: [String],
  },
  contents: {
    type: String,
  },
  dueDate: {
    type: Date,
    required: [true, "Please specify Due Date of assignment"],
  },
  createdOn: {
    type: Date,
    required: true,
  },
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;
