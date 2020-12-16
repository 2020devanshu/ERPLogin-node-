const express = require("express");
const studentRouter = require("./routes/studentRoutes");
const teacherRouter = require("./routes/teacherRoutes");
const adminRouter = require("./routes/adminRoutes");
const app = express();
app.use(express.json());

app.use("/api/v1/students", studentRouter);
app.use("/api/v1/teachers", teacherRouter);
app.use("/api/v1/admins", adminRouter);
module.exports = app;
