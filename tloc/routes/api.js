var express = require("express");
var request = require("request");
var multiparty = require("multiparty");
var fs = require("fs");
var router = express.Router();

/* GET home page. */
router.post("/audio", function (req, res, next) {
  const parseMultipart = (req, opts) =>
    new Promise((resolve, reject) => {
      const form = new multiparty.Form(opts);
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          resolve({ fields, files });
        }
      });
    });

  parseMultipart(req).then((parsedResponse) => {
    var request_api = request.post(
      "http://127.0.0.1:5000/audio",
      function (err, resp, body) {
        if (err) {
          console.log("Error!");
        } else {
          res.json(body);
        }
      }
    );

    var form_api = request_api.form();

    form_api.append(
      "file",
      fs.createReadStream(parsedResponse.files.file[0].path)
    );

    form_api.append("question", parsedResponse.fields.question[0]);

    form_api.append("debug", "false");
  });
});

module.exports = router;
