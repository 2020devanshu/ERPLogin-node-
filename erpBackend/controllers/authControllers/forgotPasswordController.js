const sendEmail = require("../../helpers/sendMail");

exports.forgotPassword = (Model, type) => {
  return async (req, res, next) => {
    try {
      //1. Get user based on posted email
      const user = await Model.findOne({ username: req.body.username });
      console.log(user);
      if (!user) {
        return res.status(404).json({
          status: "failed",
          error: "There is no user with that username",
        });
      }
      //2. Generate the random token
      const resetToken = user.createPasswordRestToken();
      await user.save({ validateBeforeSave: false });
      try {
        console.log(req.url);

        //3. Send it as an email
        const resetURL = `${process.env.BASE_URL}/api/v1/${type}/resetPassword/${resetToken}`;

        await sendEmail({
          email: req.user ? req.user.email : user.email,
          subject: `Your password reset token {valid for 10 min}`,
          message: resetURL,
        });

        //   await new Email(user, resetURL).sendPasswordReset();

        res.status(200).json({
          status: "success",
          message: "token sent to email",
        });
      } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        return res.status(500).json({
          status: "failed",
          error: "There was an error sending the email. Try again later!",
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
