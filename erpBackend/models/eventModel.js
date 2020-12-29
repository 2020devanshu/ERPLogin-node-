const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    trim: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },

  createdOn: Date,
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
