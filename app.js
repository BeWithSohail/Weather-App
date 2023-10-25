// Selectors
let cityInput = document.querySelector(".weather__searchform");
let weather_body = document.querySelector(".weather__body");
let search_btn = document.querySelector(".search_app");
let city = document.querySelector(".weather__city");
let datetime = document.querySelector(".weather__datetime");
let weather__forecast = document.querySelector('.weather__forecast');
let weather__temperature = document.querySelector(".weather__temperature");
let weather__icon = document.querySelector(".weather__icon");
let weather__minmax = document.querySelector(".weather__minmax")
let weather__realfeel = document.querySelector('.weather__realfeel');
let weather__humidity = document.querySelector('.weather__humidity');
let weather__wind = document.querySelector('.weather__wind');
let weather__pressure = document.querySelector('.weather__pressure');
let min_temprature = document.querySelector('.min_temp')
let max_temprature = document.querySelector('.max_temp')
const apiKey = "3ed712c38f8236de0bed7459c1da0300";

function handleSearch(event) {
    event.preventDefault();
    const cityName = cityInput.value; // Get the city name from the input field
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
    getWeather(apiUrl); 
}

search_btn.addEventListener('click', handleSearch);
cityInput.addEventListener('keydown',(event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        handleSearch(event);
    }
});

search_btn.addEventListener('click', handleSearch);
async function getWeather(apiUrl) {
    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        console.log(data);
        if (response.status == 404) { 
            document.querySelector(".error_msg").style.display = "block";
            document.querySelector(".error_msg").innerHTML = data.message;
            weather_body.style.display = "none";
        }
       else{
            city.innerHTML = data.name;
            weather__temperature.innerHTML = Math.round(data.main.temp) +" °C";
            min_temprature.innerHTML = data.main.temp_min + " % " ;
            max_temprature.innerHTML = data.main.temp_max + " % ";
            weather__realfeel.innerHTML = Math.round(data.main.feels_like) + "°";
            weather__humidity.innerHTML = data.main.humidity + "°";
            weather__wind.innerHTML = Math.round(data.wind.speed) + " km/h ";
            weather__pressure.innerHTML = data.main.pressure + "°";
            weather__forecast.innerHTML = data.weather[0].description;
            weather__icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="">` 
            document.querySelector(".error_msg").style.display = "none"
            weather_body.style.display = "block";
            }
        
    } catch (error) {
        console.error('An error occurred while fetching weather data:', error);
    }   
}


