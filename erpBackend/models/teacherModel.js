const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  role: {
    type: String,
    enum: {
      values: ["teacher", "sub-admin"],
    },
    default: "teacher",
  },
  email: {
    type: String,
    required: [true, "User must specify email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  phoneNumber: {
    type: String,
    trim: true,
    minlength: 10,
    required: [true, "User must specify phone number"],
  },

  password: {
    type: String,
    required: [true, "provide a password"],
    minlength: 8,
    select: false,
  },
  address: {
    type: String,
    required: [true, "User must specify phone number"],
  },
  attendanceType: {
    type: String,
    enum: ["day-wise", "lecture-wise"],
    required: [true, "Must specify attendanceType"],
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  username: {
    type: String,
    required: [true, "User must specify username"],
    unique: [true, "User with that username already exist."],
  },
  photo: {
    type: String,
  },

  createdOn: Date,
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

teacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

teacherSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;

  next();
});

teacherSchema.methods.changedPasswordAfter = function (jwtTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return jwtTimeStamp < changedTimeStamp;
  }

  return false;
};

teacherSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
teacherSchema.methods.createPasswordRestToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
teacherSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});
const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
