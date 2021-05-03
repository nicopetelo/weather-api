// const values
// open weather api key
const owApiKey = "86c53cc7b2641860bb33bd3243728e99";
// weatherstack api key
const wsApiKey = "2e3a3d64906bc051b24e7380c3faaf72";

var cityArray = [];
var cityQuery = document.getElementById("#city-name");
// var cityQuery = "Denver";
// console.log(cityQuery);



// Weather functions

// today's weather
function getOpenWeather(cityQuery) {
    // var cityQuery = document.getElementById("#city-name");
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityQuery}&appid=${owApiKey}`;
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        $("#current-weather").empty();
        $("#error-message").empty();
        let mainCard = $("<div>").addClass("col-11 main-card card border-dark mb-3 card-body text-dark");
        let title = $("<h3>").addClass("card-title").text(`${data.name}`);
        let icon = $("<img>").attr("src", `http://openweathermap.org/img/w/${data.weather[0].icon}.png`).addClass("forecast-icon");
        let date = $("<p>").addClass("card-text").text(` (${new Date().toLocaleString().split(",")[0]}) `);
        let temp = $("<p>").addClass("card-text").text(`Temp: ${data.main.temp}\xB0F`);
        let wind = $("<p>").addClass("card-text").text(`Wind Speed: ${data.wind.speed} mph`);
        let humidity = $("<p>").addClass("card-text").text(`Humidity: ${data.main.humidity}`);
    
        title.append(date, icon);
        mainCard.append(title, temp, wind, humidity);
    
        $("#current-weather").append(mainCard);
    
        // uv info
        let lat = data.coord.lat;
        let lon = data.coord.lon;
        getUvi(lat, lon);
        getFiveDay(cityQuery);
    })
    .catch((error) => {
       $("#search-history").empty(); 
 
       let errorMessage = $("<p>").addClass("error-mssg").text("That city name isn't valid, queen.");
 
       $("#error-message").append(errorMessage);
    });
 };

// uv because ow is weird
function getUvi(lat, lon) {
    let uvApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${owApiKey}`;
    fetch(uvApiUrl)
    .then(res => res.json())
    .then(data => {
       let uvIndex = $("<div>").text("UV Index: ");
       let uvSpan = $("<span>").text(data.current.uvi).attr("id", "uv-span");
       let testNumber = parseInt(data.current.uvi);
        if (testNumber < 3) {
           uvSpan.addClass("badge badge-success");
        } else if (testNumber < 8) {
           uvSpan.addClass("badge badge-warning");
        } else {
           uvSpan.addClass("badge badge-danger");
        }
       uvIndex.append(uvSpan);
       $(".main-card").append(uvIndex);
    });
};

// five day
function getFiveDay(cityQuery) {
    let thirdApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityQuery}&appid=${owApiKey}`;
    fetch(thirdApiUrl)
    .then(res => res.json())
    .then(data => {
       let fiveDays = $("<div>").addClass("row justify-content-between");
       $("#forecast").html("<h4>5-Day Forecast:</h4>").addClass("mt-3 row justify-content-start").append(fiveDays);
       for (let i = 4; i < 40; i += 8) {
          let card = $("<div>").addClass("col-sm-12 col-md-6 col-lg-2 card text-white bg-dark").attr("id", "forecast-card");
          let title = $("<h4>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleString().split(",")[0]);
          let icon = $("<img>").attr("src", `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`).addClass("forecast-icon");
          let temp = $("<p>").addClass("card-text").text(`Temp: ${data.list[i].main.temp - 273}\xB0C`);
          let wind = $("<p>").addClass("card-text").text(`Wind Speed: ${data.list[i].wind.speed} mph`);
          let humidity = $("<p>").addClass("card-text").text(`Humidity: ${data.list[i].main.humidity}`);
 
          card.append(title, icon, temp, wind, humidity);
 
          fiveDays.append(card);
       }
    });   
 };

function displayWeather () {
    getOpenWeather(cityQuery);
}

// getOpenWeather(cityQuery);

$("#search-btn").on("click", displayWeather);
console.log("currently all good");