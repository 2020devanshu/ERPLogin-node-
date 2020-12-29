const Event = require("../models/eventModel");
const {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
} = require("../helpers/controllerHelper");

exports.createEvent = createOne(Event);
exports.updateEvent = updateOne(Event);
exports.deleteEvent = deleteOne(Event);
exports.getEvent = getOne(Event);
exports.getAllEvent = getAll(Event);
