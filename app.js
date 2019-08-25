var express = require("express");
var request = require("request");

var app = express();
var exec = require("child_process").exec;
var cmd = "/home/pi/speech.sh ";

app.get("/speak", (req, res, next) => {
  var text = req.query.t;
  var speakCmd = cmd + text;
  speak(speakCmd);
});

function speak(speakCmd) {
  exec(speakCmd, function(error, stdout, stderr) {});
}

app.get("/weather", (req, res) => {
  let apiKey = "ff6a34ae62e19ceb84ca7f7c30affb4f";
  let city = "Thiruvananthapuram";
  let url = `http://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

  request(url, function(err, response, body) {
    if (err) {
      console.log("error:", error);
    } else {
      let weather = JSON.parse(body);
      let message = `It's ${weather.main.temp} degrees in ${weather.name}! with ${weather.weather[0].description}`;
      speak(message, res);
      res.json(message);
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
