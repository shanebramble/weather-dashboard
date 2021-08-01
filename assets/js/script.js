var inputEl = document.querySelector("input");
var buttonEl = document.querySelector("button");
var currentWeatherInfo = document.querySelector(".info");
var fiveDaySectionEl = document.querySelector(".five-day-section");
var currentWeatherEl = document.querySelector(".current-weather");


var getWeatherDetails = function (lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=379d1420e9fea3af7ba71fd81914bc2f")
        .then(function (response) {
            response.json().then(function (data) {
                cityWeatherDetails(data);
                fiveDayForecast(data);
            });
        });
};

var fiveDayForecast = function (data) {
    fiveDaySectionEl.innerHTML = "";
    for (var i = 0; i < (data.daily.length - 3); i++) {

        // Convert Unix Time into Local Date Format
        var date = moment.unix(data.daily[i].dt).format("L");

        // Create elements to store the 5 day forecast info.
        var dailyDivEl = document.createElement("div");
        dailyDivEl.classList.add("card", "col");

        // Image Element
        var dailyImgEl = document.createElement("img");
        dailyImgEl.setAttribute("src", "http://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png");
        // Daily Info Container
        var dailyDivInfo = document.createElement("div");
        dailyDivInfo.classList.add("card-body");
        // Daily Forecast Date
        var dailyDate = document.createElement("h5");
        dailyDate.classList.add("card-title");
        dailyDate.textContent = date;
        // Daily Temperature 
        var dailyTemp = document.createElement("p");
        dailyTemp.classList.add("card-text");
        dailyTemp.innerHTML = "Temp: " + Math.floor(data.daily[i].temp.day) + " °F";
        // Daily Wind 
        var dailyWind = document.createElement("p");
        dailyWind.classList.add("card-text");
        dailyWind.innerHTML = "Wind: " + data.daily[i].wind_speed + " MPH";
        // Daily Humidy 
        var dailyHumidity = document.createElement("p");
        dailyHumidity.classList.add("card-text");
        dailyHumidity.innerHTML = "Humidity: " + data.daily[i].humidity + "%";

        // Appending all elements to their appropriate sections.
        $(dailyDivInfo).append(dailyDate, dailyTemp, dailyWind, dailyHumidity);
        $(dailyDivEl).append(dailyImgEl, dailyDivInfo);
        $(fiveDaySectionEl).append(dailyDivEl);
    }
};

var cityWeatherDetails = function (weatherData) {
     $(".info").empty();
    //  $(".info").textContent = "";

    // Create elements to display the current temperatures.
    var temp = document.createElement("p");
    temp.innerHTML = "Temp: " + Math.floor(weatherData.current.temp) + "°F";
    var wind = document.createElement("p");
    wind.innerHTML = "Wind: " + Math.floor(weatherData.current.wind_speed) + "MPH";
    var humidity = document.createElement("p");
    humidity.innerHTML = "Humidity: " + Math.floor(weatherData.current.humidity) + "%";
    var uvIndex = document.createElement("p");
    var uvIndexBtn = document.createElement("span");
    uvIndex.innerHTML = "UV Index: ";
    uvIndexBtn.innerHTML = weatherData.current.uvi;
    uvIndexBtn.classList.add("btn", "btn-sm");

    // Check the range for the UV Index.
    // The values of the index range from zero [to eleven and beyond] - the higher 
    // the UVI, the greater the potential for damage to the skin and eye, and the 
    // less time it takes for harm to occur.

    if (weatherData.current.uvi < 3) {
        uvIndexBtn.classList.add("btn-success");
    } else if (weatherData.current.uvi < 7) {
        uvIndexBtn.classList.add("btn-warning");
    } else {
        uvIndexBtn.classList.add("btn-danger");
    }

    uvIndex.appendChild(uvIndexBtn);

    $(".info").append(temp, wind, humidity, uvIndex);

};

var generateWeather = function () {

    var city = inputEl.value;
    inputEl.value = ""

    // Fetch the data for the current weather from the input field.
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=379d1420e9fea3af7ba71fd81914bc2f")
        .then(function (response) {
            response.json().then(function (data) {

                var cityTitle = document.querySelector(".city-name");
                var currentDate = moment().format('L')
                cityTitle.innerHTML = city + " " + "(" + currentDate + ")";
                var imgEl = document.createElement("img");
                imgEl.setAttribute("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
                cityTitle.appendChild(imgEl);
                getWeatherDetails(data.coord.lat, data.coord.lon);
            });
        });
};

buttonEl.addEventListener("click", generateWeather);