var inputEl = document.querySelector("input");
var buttonEl = document.querySelector("button");
var currentWeatherInfo = document.querySelector(".info");





var cityWeatherDetails = function(weatherData){
    // Create elements to display the current temperatures.
    var temp = document.createElement("p");
    temp.innerHTML = "Temp: " + Math.floor(weatherData.main.temp) + "°F";
    var wind = document.createElement("p");
    wind.innerHTML = "Wind: " + Math.floor(weatherData.wind.speed) + "MPH";
    var humidity = document.createElement("p");
    humidity.innerHTML = "Humidity: " + Math.floor(weatherData.main.humidity) + "%";
    var uvIndex = document.createElement("p");
    uvIndex.innerHTML = "UV Index: " + Math.floor(weatherData.visibility);
 
    $(".info").append(temp,wind,humidity,uvIndex);
    
};

var currentWeather = function (){
    var cityTitle = document.querySelector(".city-name");
    var city = inputEl.value;
    var currentDate = moment().format('L')
    cityTitle.innerHTML = city + " " + "("+ currentDate +")";

    // Fetch the data for the current weather from the input field.
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city +"&units=imperial&appid=379d1420e9fea3af7ba71fd81914bc2f")
        .then (function(response){
            response.json().then (function(data){
                cityWeatherDetails(data);
            });
        });
};

buttonEl.addEventListener("click", currentWeather);



