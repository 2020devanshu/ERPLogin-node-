const Hostel = require("../models/hostelModel");
const {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
} = require("../helpers/controllerHelper");

exports.createHostel = createOne(Hostel);
exports.updateHostel = updateOne(Hostel);
exports.deleteHostel = deleteOne(Hostel);
exports.getHostel = getOne(Hostel);
exports.getAllHostel = getAll(Hostel);
