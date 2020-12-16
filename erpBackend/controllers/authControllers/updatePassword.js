const { signToken } = require("../../helpers/getJwtToken");

exports.updatePassword = (Model) => {
  return async (req, res, next) => {
    // Get user from collection
    try {
      const user = await Model.findById(req.user.id).select("+password");
      //check if posted password is correct

      if (
        !(await user.correctPassword(req.body.passwordCurrent, user.password))
      ) {
        return res.status(401).json({
          status: "failed",
          error: "Your current password is wrong",
        });
      }

      user.password = req.body.password;
      await user.save();

      //log user in,send jwt
      token = signToken(user._id);
      res.status(200).json({
        status: "success",
        token,
        data: {
          user,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "failed",
        error: err,
      });
    }
  };
};
