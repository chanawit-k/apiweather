const express = require("express");
const bodyPaser = require("body-parser");
const app = express();
app.use(bodyPaser.urlencoded({ extend: true }));
const https = require("https");
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
	var apikey = "3bec5dfd681d856bf7634d50fcc85e48";
	var city = req.body.cityName;
	var unit = "metric";
	var url =
		"https://api.openweathermap.org/data/2.5/weather?q=" +
		city +
		"&appid=" +
		apikey +
		"&units=" +
		unit;
	https.get(url, function (response) {
		//เรียก+แปลงข้อมูลให้เป็น json เอามาใช้งาน
		response.on("data", function (data) {
			var weatherData = JSON.parse(data);
			var dataPure = weatherData.main.temp;
			var icon = weatherData.weather[0].icon;
			var iconurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
			res.write("<h1> the wether today in " + city + " is " + dataPure + "calcuis");
			res.send();
		});
	});
});

app.listen(3000, function () {
	console.log("server is run in port 3000");
});
