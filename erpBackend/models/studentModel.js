const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  admissionNumber: {
    type: String,
    required: [true, "admission number is required"],
  },
  email: {
    type: String,
    required: [true, "User must specify email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  branch: {
    type: mongoose.Schema.ObjectId,
    ref: "Branch",
    required: [true, "Must specify Branch"],
  },
  hostel: {
    type: mongoose.Schema.ObjectId,
    ref: "Hostel",
    required: [true, "Must specify Hostel"],
  },
  section: {
    type: mongoose.Schema.ObjectId,
    ref: "Section",
    required: [true, "Must specify section"],
  },
  studentType: {
    type: String,
    enum: ["Hosteler", "Day-Scholar"],
    required: [true, "Must specify type"],
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
  institutionAttendancePercentage: {
    type: Number,
  },
  hostelAttendancePercentage: {
    type: Number,
  },
});

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

studentSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;

  next();
});

studentSchema.methods.changedPasswordAfter = function (jwtTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return jwtTimeStamp < changedTimeStamp;
  }

  return false;
};

studentSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
studentSchema.methods.createPasswordRestToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
studentSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
