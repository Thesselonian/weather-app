//User types in text input app puls in formation from user input
var APIKey = "c97d9ae1e1c2e78b1a122d4cf4d4f9c5"
var city = "Salt Lake City"
//Lat lon for city declared by user using API call below.
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
function geoEncoding() {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},&appid=${APIKey}`)
    .then(function(response){
        return response.json();
    })
    .then(function(cityInformation){
        console.log(cityInformation);
        var cityLat = cityInformation[0].lat
        var cityLon = cityInformation[0].lon
        return {cityLat, cityLon}
    })
    .then(function({cityLat, cityLon}){
        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&appid=${APIKey}`)
    })
    .then(function(response){
        return response.json();
    })
    .then(function(weatherInformation){
        console.log(weatherInformation)
    })
}
geoEncoding();

//app makes http request to api server for weather data
// "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"

//API Key
// 

//display data in cards for days