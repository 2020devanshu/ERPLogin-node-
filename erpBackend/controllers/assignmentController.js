const Assignment = require("../models/assignmentModel");
const {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
} = require("../helpers/controllerHelper");

exports.createAssignment = createOne(Assignment);
exports.updateAssignment = updateOne(Assignment);
exports.deleteAssignment = deleteOne(Assignment);
exports.getAssignment = getOne(Assignment);
exports.getAllAssignment = getAll(Assignment);
