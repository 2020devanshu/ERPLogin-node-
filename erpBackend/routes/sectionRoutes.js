const express = require("express");

const { teacherCheckLogin } = require("../controllers/teacherController");
const {
  authenticate,
  restrictTo,
} = require("../controllers/authControllers/auth");
const { studentCheckLogin } = require("../controllers/studentController");
const {
  getAllSection,
  getSection,
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/sectionController");
const router = express.Router();
//For Section

router.get(
  "/",
  teacherCheckLogin,
  authenticate,
  restrictTo("sub-admin"),
  getAllSection
);
router.get(
  "/:id",
  teacherCheckLogin,
  studentCheckLogin,
  authenticate,
  getSection
);
router.post(
  "/",
  teacherCheckLogin,
  authenticate,
  restrictTo("sub-admin"),
  createSection
);
router.patch(
  "/:id",
  teacherCheckLogin,
  authenticate,
  restrictTo("sub-admin"),
  updateSection
);
router.delete(
  "/:id",
  teacherCheckLogin,
  authenticate,
  restrictTo("sub-admin"),
  deleteSection
);
module.exports = router;
