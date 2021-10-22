//User types in text input app puls in formation from user input
var APIKey = "c97d9ae1e1c2e78b1a122d4cf4d4f9c5"
var city
let cityTemp
var cityWind
var cityHumidity
var cityUV
var DateTime = luxon.DateTime
var currentDate = (DateTime.now().toLocaleString());
var plusOneDay = (DateTime.now().plus({days:1}).endOf('day').toLocaleString());
var plusTwoDay = (DateTime.now().plus({days:2}).endOf('day').toLocaleString());
var plusThreeDay = (DateTime.now().plus({days:3}).endOf('day').toLocaleString());
var plusFourDay = (DateTime.now().plus({days:4}).endOf('day').toLocaleString());
var plusFiveDay = (DateTime.now().plus({days:5}).endOf('day').toLocaleString());
var weatherInformation
//Lat lon faint georgeor city declared by user using API call below.
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
function geoEncoding() {
    var weatherInformation = fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},&appid=${APIKey}`)
    .then(function(response){
        return response.json();
    })
    .then(function(cityInformation){
        var cityLat = cityInformation[0].lat
        var cityLon = cityInformation[0].lon
        return {cityLat, cityLon}
    })
    .then(function({cityLat, cityLon}){
        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&appid=${APIKey}&units=imperial`)
    })
    .then(function(response){
        return response.json();
    })
    .then(function(weatherInformation){
        $("#plus-one-day").text(plusOneDay);
        $("#plus-two-day").text(plusTwoDay);
        $("#plus-three-day").text(plusThreeDay);
        $("#plus-four-day").text(plusFourDay);
        $("#plus-five-day").text(plusFiveDay);
        $("#UV").text(`UV Index: ${weatherInformation.current.uvi}`)
        $("#current-temp").text(`Temp: ${weatherInformation.current.temp} F`);
        $("#wind").text(`Wind Speed: ${weatherInformation.current.wind_speed} MPH`);
        $("#humidity").text(`Humidity: ${weatherInformation.current.humidity} Percent`);
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
        console.log(weatherInformation);
    })
}

function populateValues () {
    $("#city-name").text(`City Name: ${city} ${currentDate}`);
}

var getWeather = function() {
    $("#city-btn").click( function() {
        city=$("#city").val().trim();
        geoEncoding();
        populateValues();
        $("#city").val('');
    })
}
var updateForecast = function() {
    
}
getWeather();

//app makes http request to api server for weather data
// "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"

//API Key
// 

//display data in cards for days
