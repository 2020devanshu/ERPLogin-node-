const express = require("express");

const { teacherCheckLogin } = require("../controllers/teacherController");
const {
  authenticate,
  restrictTo,
} = require("../controllers/authControllers/auth");
const { studentCheckLogin } = require("../controllers/studentController");
const {
  getAllSubject,
  getSubject,
  createSubject,
  updateSubject,
  deleteSubject,
} = require("../controllers/subjectController");
const router = express.Router();
//For Subject

router.get("/", teacherCheckLogin, authenticate, getAllSubject);
router.get(
  "/:id",
  teacherCheckLogin,
  studentCheckLogin,
  authenticate,
  getSubject
);
router.post(
  "/",
  teacherCheckLogin,
  authenticate,
  restrictTo("sub-admin"),
  createSubject
);
router.patch(
  "/:id",
  teacherCheckLogin,
  authenticate,
  restrictTo("sub-admin"),
  updateSubject
);
router.delete(
  "/:id",
  teacherCheckLogin,
  authenticate,
  restrictTo("sub-admin"),
  deleteSubject
);
module.exports = router;
