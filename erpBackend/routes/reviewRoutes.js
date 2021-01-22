const express = require("express");

const { teacherCheckLogin } = require("../controllers/teacherController");
const {
  authenticate,
  restrictTo,
} = require("../controllers/authControllers/auth");
const { studentCheckLogin } = require("../controllers/studentController");
const {
  getAllReview,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const router = express.Router();
//For Review

router.get(
  "/",
  teacherCheckLogin,
  authenticate,
  restrictTo("sub-admin"),
  getAllReview
);
router.get(
  "/:id",
  teacherCheckLogin,
  studentCheckLogin,
  authenticate,
  getReview
);
router.post("/", studentCheckLogin, createReview);
router.patch("/:id", studentCheckLogin, updateReview);
router.delete("/:id", studentCheckLogin, deleteReview);
module.exports = router;
