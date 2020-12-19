var unirest = require("unirest");

var API_KEY =
  "dzZ6UAYRflu3jQXmtxP1nKVrs54eHL8Ew7J2TbO0kqGvBcIgDFTRVchQfqOjkSPogvBe0muYzFEbnLH4";

exports.sendBulkSms = (form) => {
  return new Promise((resolve, reject) => {
    unirest
      .post("https://www.fast2sms.com/dev/bulk")
      .headers({
        "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
        authorization: API_KEY,
      })
      .form({
        sender_id: "FSTSMS",
        language: "english",
        route: "qt",
        ...form,
      })
      .end(function (res) {
        if (res.error) return reject(res.error);
        console.log(res.body);
        return resolve(res.body);
      });
  });
};
