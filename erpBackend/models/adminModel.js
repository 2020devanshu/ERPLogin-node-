const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please tell us your name"],
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
  role: {
    type: String,
    enum: {
      values: ["admin", "super-admin", "sub-admin"],
    },
    default: "admin",
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
    required: [true, "please tell us your username"],
    unique: [true, "User with that username already exist."],
  },
  photo: {
    type: String,
  },
  isConfirmed: {
    type: Boolean,
    default: false,
  },
  signupOtp: {
    type: Number,
    select: false,
  },
  otpExpiresIn: Date,
  provider: String,
  uid: {
    type: String,
  },

  createdOn: Date,
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

//encrypts password
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

// update password changed at
adminSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;

  next();
});

// Check if the password is changed after the specified time
adminSchema.methods.changedPasswordAfter = function (jwtTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return jwtTimeStamp < changedTimeStamp;
  }

  return false;
};

//check if passwords are correct
adminSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

//to create resettoken for reset password
adminSchema.methods.createPasswordRestToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

//Only active admins will be shown in querying
adminSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
