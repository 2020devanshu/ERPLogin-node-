const express = require("express");

const { teacherCheckLogin } = require("../controllers/teacherController");
const {
  authenticate,
  restrictTo,
} = require("../controllers/authControllers/auth");
const { studentCheckLogin } = require("../controllers/studentController");
const {
  getAllLecture,
  getLecture,
  createLecture,
  updateLecture,
  deleteLecture,
  lectureBySubject,
} = require("../controllers/lectureController");
const router = express.Router();
//For Lecture

router.get(
  "/",
  teacherCheckLogin,
  authenticate,
  restrictTo("sub-admin"),
  getAllLecture
);
router.get(
  "/:id",
  teacherCheckLogin,
  studentCheckLogin,
  authenticate,
  getLecture
);
router.get(
  "/by-subject/:id",
  teacherCheckLogin,
  studentCheckLogin,
  authenticate,
  lectureBySubject
);
router.post(
  "/",
  teacherCheckLogin,
  authenticate,
  restrictTo("sub-admin"),
  createLecture
);
router.patch(
  "/:id",
  teacherCheckLogin,
  authenticate,
  restrictTo("sub-admin"),
  updateLecture
);
router.delete(
  "/:id",
  teacherCheckLogin,
  authenticate,
  restrictTo("sub-admin"),
  deleteLecture
);
module.exports = router;
