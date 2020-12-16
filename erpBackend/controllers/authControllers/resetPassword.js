const crypto = require("crypto");
const { signToken } = require("../../helpers/getJwtToken");
exports.resetPassword = (Model) => {
  return async (req, res, next) => {
    try {
      // Get user based on token from

      const hashedToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

      const user = await Model.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
      });
      if (!user) {
        return res.status(400).json({
          status: "failed",
          error: "Token is invalid or has expired",
        });
      }

      user.password = req.body.password;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;

      user.save();
      // update the chanedpasswordAt property
      // log user in,send JWT

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
