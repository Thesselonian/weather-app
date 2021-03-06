//User types in text input app puls in formation from user input
var APIKey = "c97d9ae1e1c2e78b1a122d4cf4d4f9c5"
var DateTime = luxon.DateTime
var city
var currentDate = (DateTime.now().toLocaleString());
var plusOneDay = (DateTime.now().plus({days:1}).endOf('day').toLocaleString());
var plusTwoDay = (DateTime.now().plus({days:2}).endOf('day').toLocaleString());
var plusThreeDay = (DateTime.now().plus({days:3}).endOf('day').toLocaleString());
var plusFourDay = (DateTime.now().plus({days:4}).endOf('day').toLocaleString());
var plusFiveDay = (DateTime.now().plus({days:5}).endOf('day').toLocaleString());
var citySearchHistory = JSON.parse(localStorage.getItem("search-history")) || [];

function geoEncoding() {
    //API call for lat lon
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},&appid=${APIKey}`)
    .then(function(response){
        return response.json();
    })
    .then(function(cityInformation){
        var cityLat = cityInformation[0].lat
        var cityLon = cityInformation[0].lon
        return {cityLat, cityLon}
    })
    //API call using lat lon for weather data
    .then(function({cityLat, cityLon}){
        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&appid=${APIKey}&units=imperial`)
    })
    .then(function(response){
        return response.json();
    })
    //updates current and forecasted weather information
    .then(function(weatherInformation){
        populateWeatherForecast(weatherInformation);
    })
}

var populateSearchHistory = function() {
    for(var i=0; i<citySearchHistory.length; i++) {
    var searchedCity = $('<button/>', {
        text: citySearchHistory[i],
        class: "row",
        click: function() {
            city = $(this).text();
            geoEncoding(); 
            populateTextValues();
        }
    });
    $('#search-history').append(searchedCity).end();
    }
}

function populateWeatherForecast(weatherInformation) {
    //Sets current weather data
    $("#UV").text(`UV Index: ${weatherInformation.current.uvi}`)
    if(weatherInformation.current.uvi < 2) {
        $("#UV").addClass("bg-success")
    }
    else if (weatherInformation.current.uvi > 2 && weatherInformation.current.uvi < 4) {
        $("#UV").addClass("bg-warning")
    }
    else {
        $("#UV").addClass("bg-danger")
    };
    $("#current-temp").text(`Temp: ${weatherInformation.current.temp} F`);
    $("#wind").text(`Wind Speed: ${weatherInformation.current.wind_speed} MPH`);
    $("#humidity").text(`Humidity: ${weatherInformation.current.humidity} Percent`);
    //current weather icon
    var currentWeatherIcon = "http://openweathermap.org/img/w/" + weatherInformation.current.weather[0].icon + ".png"
    $("#current-wicon").attr('src', currentWeatherIcon)
    //update forecasted temperatures
    $("#plus-one-day-temp").text(`Temp: ${weatherInformation.daily[0].temp.day} F`);
    $("#plus-two-day-temp").text(`Temp: ${weatherInformation.daily[1].temp.day} F`);
    $("#plus-three-day-temp").text(`Temp: ${weatherInformation.daily[2].temp.day} F`);
    $("#plus-four-day-temp").text(`Temp: ${weatherInformation.daily[3].temp.day} F`);
    $("#plus-five-day-temp").text(`Temp: ${weatherInformation.daily[4].temp.day} F`);
    //update forecast wind
    $("#plus-one-day-wind").text(`Wind: ${weatherInformation.daily[0].wind_speed} MPH`);
    $("#plus-two-day-wind").text(`Wind: ${weatherInformation.daily[1].wind_speed} MPH`);
    $("#plus-three-day-wind").text(`Wind: ${weatherInformation.daily[2].wind_speed} MPH`);
    $("#plus-four-day-wind").text(`Wind: ${weatherInformation.daily[3].wind_speed} MPH`);
    $("#plus-five-day-wind").text(`Wind: ${weatherInformation.daily[4].wind_speed} MPH`);
    //update forecasted humidity
    $("#plus-one-day-humidity").text(`Humidity: ${weatherInformation.daily[0].humidity} Percent`);
    $("#plus-two-day-humidity").text(`Humidity: ${weatherInformation.daily[1].humidity} Percent`);
    $("#plus-three-day-humidity").text(`Humidity: ${weatherInformation.daily[2].humidity} Percent`);
    $("#plus-four-day-humidity").text(`Humidity: ${weatherInformation.daily[3].humidity} Percent`);
    $("#plus-five-day-humidity").text(`Humidity: ${weatherInformation.daily[4].humidity} Percent`); 
    //weather icons for forecast
    var oneDayWeatherIcon = "http://openweathermap.org/img/w/" + weatherInformation.daily[0].weather[0].icon + ".png"
    $("#one-day-wicon").attr('src', oneDayWeatherIcon)
    var twoDayWeatherIcon = "http://openweathermap.org/img/w/" + weatherInformation.daily[1].weather[0].icon + ".png"
    $("#two-day-wicon").attr('src', twoDayWeatherIcon)
    var threeDayWeatherIcon = "http://openweathermap.org/img/w/" + weatherInformation.daily[2].weather[0].icon + ".png"
    $("#three-day-wicon").attr('src', threeDayWeatherIcon)
    var fourDayWeatherIcon = "http://openweathermap.org/img/w/" + weatherInformation.daily[3].weather[0].icon + ".png"
    $("#four-day-wicon").attr('src', fourDayWeatherIcon)
    var fiveDayWeatherIcon = "http://openweathermap.org/img/w/" + weatherInformation.daily[3].weather[0].icon + ".png"
    $("#five-day-wicon").attr('src', fiveDayWeatherIcon)
}

function populateTextValues () {
    $("#current-weather").addClass("display-block");
    $("#five-day-forecast").addClass("display-block");
    //display city name
    $("#city-name").text(`City Name: ${city} ${currentDate}`);
    //display forecast dates
    $("#plus-one-day").text(plusOneDay);
    $("#plus-two-day").text(plusTwoDay);
    $("#plus-three-day").text(plusThreeDay);
    $("#plus-four-day").text(plusFourDay);
    $("#plus-five-day").text(plusFiveDay);
}

function appendSearchHistory() {
    citySearchHistory.push(city);
    localStorage.setItem("search-history", JSON.stringify(citySearchHistory));
    var searchedCity = $('<button/>', {
        text: city,
        class: "row",
        click: function() {
            city = $(this).text();
            geoEncoding(); 
            populateTextValues();
        }
    });
    $('#search-history').append(searchedCity).end();
}

var getWeather = function() {
    $("#city-btn").click( function() {
        //assigns the text value entered by user to the city variable
        city=$("#city").val().trim();
        //api call to get data and write it to respective areas
        geoEncoding();
        //writes city name to the current weather section
        populateTextValues();
        //append city that was searched to the search history element
        appendSearchHistory();
        //erase the textbox value
        $("#city").val('');
    })
}
getWeather();
populateSearchHistory();



//app makes http request to api server for weather data
// "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"

//API Key
// 

//display data in cards for days
