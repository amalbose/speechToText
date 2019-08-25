var express = require("express");
var app = express();
var exec = require("child_process").exec;
var cmd = "/home/pi/speech.sh ";

app.get("/speak", (req, res, next) => {
  var text = req.query.t;
  var speakCmd = cmd + text;
  exec(speakCmd, function(error, stdout, stderr) {
    res.json("OK");
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
