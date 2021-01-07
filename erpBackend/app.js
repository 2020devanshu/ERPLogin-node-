const express = require("express");
const passport = require("passport");
const cors = require("cors");
const studentRouter = require("./routes/studentRoutes");
const teacherRouter = require("./routes/teacherRoutes");
const adminRouter = require("./routes/adminRoutes");
const branchRouter = require("./routes/branchRoutes");
const subjectRouter = require("./routes/subjectRoutes");
const sectionRouter = require("./routes/sectionRoutes");
const lectureRouter = require("./routes/lectureRoutes");
const eventRouter = require("./routes/eventRoutes");
const hostelRouter = require("./routes/hostelRoutes");
const hostelAttendanceRouter = require("./routes/hostelAttendanceRoutes");
const teacherAttendanceRouter = require("./routes/teacherAttendanceRoutes");
const institutionAttendanceRouter = require("./routes/institutionAttendanceRoutes");
const assignmentResponseRouter = require("./routes/assignmentResponseRoutes");
const assignmentRouter = require("./routes/assignmentRoutes");
const { signToken } = require("./helpers/getJwtToken");
require("./helpers/passport/passport-google");
const { adminCheckLogin } = require("./controllers/adminController");
const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.get(
  "/auth/google",
  adminCheckLogin,
  passport.authenticate("google", {
    session: false,
    scope: ["openid", "profile", "email"],
  })
);
app.get(
  "/auth/google/callback",
  adminCheckLogin,
  passport.authenticate("google", { session: false }),
  (req, res) => {
    try {
      res.send({ token: signToken(req.user.id) });
    } catch (err) {
      console.log(err);
    }
  }
);

app.use("/api/v1/students", studentRouter);
app.use("/api/v1/teachers", teacherRouter);
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/assignments", assignmentRouter);
app.use("/api/v1/assignmentResponses", assignmentResponseRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/lectures", lectureRouter);
app.use("/api/v1/hostels", hostelRouter);
app.use("/api/v1/sections", sectionRouter);
app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/branches", branchRouter);
app.use("/api/v1/hostelAttendances", hostelAttendanceRouter);
app.use("/api/v1/institutionAttendances", institutionAttendanceRouter);
app.use("/api/v1/teacherAttendances", teacherAttendanceRouter);
module.exports = app;
