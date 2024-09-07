// const { log } = require("console");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");

})
app.post("/", function (req, res) {
    
    const query = req.body.cityName;
    const apikey = "c337a884ed9d45b4d429e2c248aec9b0";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);  // converting hexadecimal data into JSON
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            // console.log(imageURL);

            res.write("<p>The Weather description is " + description + "<p>");
            res.write("<h1>The temprature in "+ req.body.cityName +" is " + temp + " degree celsius</h1>");
            res.write("<img src=" + imageURL + ">");

            res.send();
            // res.sendFile("index.html")
        });
    });
})





app.listen(3000, function () {
    console.log("Server is running on port 3000");
}) 