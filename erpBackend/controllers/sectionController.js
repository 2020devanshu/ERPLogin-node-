const Section = require("../models/sectionModel");
const {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
} = require("../helpers/controllerHelper");

exports.createSection = createOne(Section);
exports.updateSection = updateOne(Section);
exports.deleteSection = deleteOne(Section);
exports.getSection = getOne(Section);
exports.getAllSection = getAll(Section);
