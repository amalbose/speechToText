var express = require("express");
var app = express();
var exec = require("child_process").exec;
var cmd = "/home/pi/speech.sh Hello";

app.get("/speak", (req, res, next) => {
  exec(cmd, function(error, stdout, stderr) {
    res.json(error || stdout || stderr);
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
