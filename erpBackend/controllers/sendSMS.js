const { sendBulkSms } = require("../helpers/sms");

exports.sendSms = (req, res, next) => {
  var numbers = req.body.numbers.join(",");
  const form = {
    numbers,
    message: req.body.messageId,
    variables: "{#BB#}|{#CC#}",
    variables_values: `${req.body.var1}|${req.body.var2}`,
  };
  sendBulkSms(form)
    .then((response) => {
      res.status(200).json({
        status: "success",
        message: response,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "failed",
        error: err,
      });
    });
};
