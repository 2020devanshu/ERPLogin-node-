const Review = require("../models/reviewModel");
const {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
} = require("../helpers/controllerHelper");

exports.createReview = createOne(Review);
exports.updateReview = updateOne(Review);
exports.deleteReview = deleteOne(Review);
exports.getReview = getOne(Review);
exports.getAllReview = getAll(Review);
