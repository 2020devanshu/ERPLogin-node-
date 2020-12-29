const { signToken } = require("../../helpers/getJwtToken");
const sendMail = require("../../helpers/sendMail");
const { createOtp } = require("../../helpers/createOtp");
const Admin = require("../../models/adminModel");
exports.createUser = (Model) => {
  return async (req, res, next) => {
    try {
      if (
        req.user.role == "admin" ||
        (req.user.role == "sub-admin" && req.body.role != "admin")
      ) {
        const newUser = await Model.create({
          createdOn: new Date().toISOString(),
          ...req.body,
        });
        const token = signToken(newUser._id);

        newUser.password = undefined;
        res.status(201).json({
          status: "success",
          token,
          data: {
            user: newUser,
          },
        });
      } else {
        return res.status(401).json({
          status: "failed",
          error: "You are not authorized to perform this action",
        });
      }
    } catch (err) {
      res.status(400).json({
        status: "failed",
        error: err,
      });
    }
  };
};

exports.adminSignup = async (req, res, next) => {
  try {
    //const newUser = await User.create(req.body);
    const otp = createOtp();
    const newUser = await Admin.create({
      ...req.body,
      signupOtp: otp,
      otpExpiresIn: Date.now() + 10 * 60 * 1000,
    });
    sendMail({
      email: newUser.email,
      subject: "Confirm yourself",
      message: `Your otp is ${otp}`,
    });
    newUser.password = undefined;
    newUser.signupOtp = undefined;
    res.status(200).json({
      status: "success",
      message: "Otp sent successfully in your email. Please confirm yourself",
      data: {
        newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      data: {
        error: err,
      },
    });
  }
};

exports.confirmSignup = async (req, res, next) => {
  try {
    const user = await Admin.findOne({
      signupOtp: req.body.otp,
      otpExpiresIn: { $gt: Date.now() },
    });
    console.log(user, "User");

    if (!user) {
      return res.status(401).json({
        status: "failed",
        data: {
          error: "Invalid otp or otp has expired",
        },
      });
    }
    console.log(user);
    user.isConfirmed = true;
    user.active = true;
    user.signupOtp = undefined;
    user.otpExpiresIn = undefined;

    await user.save({ validateBeforeSave: false });
    const token = signToken(user._id);

    user.password = undefined;
    res.status(200).json({
      status: "success",
      message: "User confirmed successfully",
      token,
      data: {
        user: user,
      },
    });
  } catch (err) {
    res.status(403).json({
      status: "failed",
      data: {
        error: err,
      },
    });
  }
};

exports.resendOtp = async (req, res, next) => {
  try {
    const user = await Admin.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({
        status: "failed",
        data: {
          error: "User with that email does'nt exist. Please signup",
        },
      });
    } else {
      // console.log(user);

      const otp = createOtp();
      const updatedUser = await Admin.findByIdAndUpdate(
        user._id,
        {
          signupOtp: otp,
          otpExpiresIn: Date.now() + 10 * 60 * 1000,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      // console.log(updatedUser);

      sendMail({
        email: updatedUser.email,
        subject: "Confirm yourself",
        message: `Your otp is ${otp}`,
      });
      res.status(200).json({
        status: "success",
        message: "Otp sent successfully.Please confirm yourself.",
        data: {
          user: updatedUser,
        },
      });
    }
  } catch (err) {
    console.log(err);

    res.status(403).json({
      status: "failed",
      data: {
        error: err,
      },
    });
  }
};
