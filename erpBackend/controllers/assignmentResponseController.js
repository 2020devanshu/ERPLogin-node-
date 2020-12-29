const AssignmentResponse = require("../models/assignmentResponseModel");
const {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
} = require("../helpers/controllerHelper");

exports.createAssignmentResponse = createOne(AssignmentResponse);
exports.updateAssignmentResponse = updateOne(AssignmentResponse);
exports.deleteAssignmentResponse = deleteOne(AssignmentResponse);
exports.getAssignmentResponse = getOne(AssignmentResponse);
exports.getAllAssignmentResponse = getAll(AssignmentResponse);
