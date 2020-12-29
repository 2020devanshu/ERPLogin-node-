const Subject = require("../models/subjectModel");
const {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
} = require("../helpers/controllerHelper");

exports.createSubject = createOne(Subject);
exports.updateSubject = updateOne(Subject);
exports.deleteSubject = deleteOne(Subject);
exports.getSubject = getOne(Subject);
exports.getAllSubject = getAll(Subject);
