const express = require("express");
const passport = require("passport");
const studentRouter = require("./routes/studentRoutes");
const teacherRouter = require("./routes/teacherRoutes");
const adminRouter = require("./routes/adminRoutes");
const { signToken } = require("./helpers/getJwtToken");
require("./helpers/passport/passport-google");
const { checkLogin } = require("./controllers/authControllers/auth");
const app = express();
app.use(express.json());
app.use(passport.initialize());

app.get(
  "/auth/google",
  checkLogin,
  passport.authenticate("google", {
    session: false,
    scope: ["openid", "profile", "email"],
  })
);
app.get(
  "/auth/google/callback",
  //   authenticate(Admin),
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
module.exports = app;
