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
exports.lectureBySubject = async (req, res, next) => {
  try {
    const lectures = await Lecture.find({ subjectId: req.params.id });
    return res.status(200).json({
      status: "success",
      lectures: lectures,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      data: {
        error: err,
      },
    });
  }
};
