// const values
const apiKey = "86c53cc7b2641860bb33bd3243728e99"

var cityQuery = "San Francisco";
// var cityQuery = document.getElementById("#city-name");
console.log(cityQuery);



// Weather functions
function getWeatherData () {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityQuery}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
}

getWeatherData();