const Branch = require("../models/branchModel");
const {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
} = require("../helpers/controllerHelper");

exports.createBranch = createOne(Branch);
exports.updateBranch = updateOne(Branch);
exports.deleteBranch = deleteOne(Branch);
exports.getBranch = getOne(Branch);
exports.getAllBranch = getAll(Branch);
