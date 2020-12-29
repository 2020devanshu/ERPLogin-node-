const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const Admin = require("../../models/adminModel");

exports.authenticate = (Model) => {
  return async (req, res, next) => {
    try {
      //!Getting token and checking if it exist
      let token;

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
        return res.status(401).json({
          status: "failed",
          error: "You are not logged in.Please login!!",
        });
      }

      //2. Verification the token

      // it will create a new testSignature and compare it with the token provided
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );
      //console.log(decoded);

      //3.Check if  User exist

      const freshUser = await Model.findById(decoded.id);
      if (!freshUser) {
        return res.status(401).json({
          status: "failed",
          error: "The user does not exist . Please try again",
        });
      }
      //4.Check if user changed password after token is issued

      if (freshUser.changedPasswordAfter(decoded.iat)) {
        return res.status(401).json({
          status: "failed",
          error: "User recently changed the password!Please login again..",
        });
      }
      //Grant access to the protected routes

      req.user = freshUser;

      next();
    } catch (err) {
      return res.status(400).json({
        status: "failed",
        error: err,
      });
    }
  };
};

exports.checkLogin = async (req, res, next) => {
  try {
    //!Getting token and checking if it exist
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      req.user = undefined;
      next();
    }

    //2. Verification the token

    // it will create a new testSignature and compare it with the token provided
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //console.log(decoded);

    //3.Check if  User exist

    const freshUser = await Admin.findById(decoded.id);
    if (!freshUser) {
      req.user = undefined;
      next();
    }
    //4.Check if user changed password after token is issued

    if (freshUser.changedPasswordAfter(decoded.iat)) {
      req.user = undefined;
      next();
    }
    //Grant access to the protected routes

    req.user = freshUser;

    next();
  } catch (err) {
    req.user = undefined;
    next();
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    //roles ['admin','lead-guide]
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "failed",
        message: "You are not authorized to perform this action",
      });
    }
    next();
  };
};
