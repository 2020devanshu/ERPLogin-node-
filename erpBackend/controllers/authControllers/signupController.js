const { signToken } = require("../../helpers/getJwtToken");

exports.signup = (Model) => {
  return async (req, res, next) => {
    try {
      if (
        req.user.role == "super-admin" ||
        (req.user.role == "admin" && req.body.role != "super-admin") ||
        (req.user.role == "sub-admin" &&
          req.body.role != "admin" &&
          req.body.role != "super-admin")
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
