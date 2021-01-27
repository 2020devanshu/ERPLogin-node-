const Complaint = require("../models/complaintModel");
const {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
} = require("../helpers/controllerHelper");

exports.createComplaint = createOne(Complaint);
exports.updateComplaint = updateOne(Complaint);
exports.deleteComplaint = deleteOne(Complaint);
exports.getComplaint = getOne(Complaint);
exports.getAllComplaint = getAll(Complaint);
