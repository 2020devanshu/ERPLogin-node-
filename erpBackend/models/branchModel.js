const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
  branchName: {
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

const Branch = mongoose.model("Branch", branchSchema);

module.exports = Branch;
