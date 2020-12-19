const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
  gradeName: {
    type: String,
    required: true,
    trim: true,
  },
  subjects: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Subject",
      required: [true, "Must specify subject"],
    },
  ],

  createdOn: Date,
});

const Grade = mongoose.model("Grade", gradeSchema);

module.exports = Grade;
