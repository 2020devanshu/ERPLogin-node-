const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  complaint: {
    type: String,
    required: true,
    trim: true,
  },
  from: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Student",
    },
  ],
  complaintType: {
    type: String,
    required: true,
  },

  createdOn: Date,
});

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;
