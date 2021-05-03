// const values
// open weather api key
const owApiKey = "86c53cc7b2641860bb33bd3243728e99"
// weatherstack api key
const wsApiKey = "2e3a3d64906bc051b24e7380c3faaf72"
var cityArray = [];

var cityQuery = $("#city-name").val();
// var cityQuery = "atlanta";
console.log(cityQuery);



// Weather functions
function getOpenWeather(cityName) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityQuery}&appid=${owApiKey}&units=imperial`;
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
       $('#current-weather').empty();
       $('#error-message').empty();
       let mainCard = $('<div>').addClass('col-11 main-card card border-dark mb-3 card-body text-dark');
       let title = $('<h3>').addClass('card-title').text(`${data.name}`);
       let icon = $('<img>').attr('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png`).addClass('forecast-icon');
       let date = $('<p>').addClass('card-text').text(` (${new Date().toLocaleString().split(',')[0]}) `);
       let temp = $('<p>').addClass('card-text').text(`Temp: ${data.main.temp}\xB0F`);
       let wind = $('<p>').addClass('card-text').text(`Wind Speed: ${data.wind.speed} MPH`);
       let humidity = $('<p>').addClass('card-text').text(`Humidity: ${data.main.humidity}\x25`);
       let lat = data.coord.lat;
       let lon = data.coord.lon;
 
       title.append(date, icon);
       mainCard.append(title, temp, wind, humidity);
 
       $('#current-weather').append(mainCard);
 
       getUvi(lat, lon);
       getForecast(cityName);
    })
    .catch((error) => {
       $('#search-history').empty(); 
 
       let errorMessage = $('<p>').addClass('error-mssg').text('Please enter a valid city name!');
 
       $('#error-message').append(errorMessage);
    });
 };

console.log("currently all good");