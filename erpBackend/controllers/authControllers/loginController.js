const { signToken } = require("../../helpers/getJwtToken");

exports.login = (Model) => {
  return async (req, res, next) => {
    try {
      const { username, password } = req.body;
      //1 Check if username and password exists
      if (!username || !password) {
        return res.status(404).json({
          status: "failed",
          error: `Please provide email and password`,
        });
      }
      //2. User exists and if password is correct
      let user = await Model.findOne({ username }).select("+password");
      if (!user) {
        user = await Model.findOne({ email: username }).select("+password");
      }

      if (!user || !(await user.correctPassword(password, user.password))) {
        return res.status(401).json({
          status: "failed",
          error: "Incorrect email or password",
        });
      }

      if (user.isConfirmed === false) {
        return res.status(401).json({
          status: "failed",
          error: "You are not confirmed . Please confirm yourself",
        });
      }

      const token = signToken(user._id);

      user.password = undefined;
      res.status(201).json({
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
