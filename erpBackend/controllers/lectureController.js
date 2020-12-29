const Lecture = require("../models/lectureModel");
const {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
} = require("../helpers/controllerHelper");

exports.createLecture = createOne(Lecture);
exports.updateLecture = updateOne(Lecture);
exports.deleteLecture = deleteOne(Lecture);
exports.getLecture = getOne(Lecture);
exports.getAllLecture = getAll(Lecture);
