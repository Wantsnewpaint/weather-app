let now = new Date();
let months = ["January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"];
let month = months[now.getMonth()];

let days = ["Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"];
let day = days[now.getDay()];

let date = now.getDate();

let hour = now.getHours();
if (hour < 10) {
    hour = `0${hour}`;
  };
let minutes = now.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
  };

let li = document.querySelector("#currentDate");
li.innerHTML = `${day}, ${month} ${date}, ${hour}:${minutes}`;

function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {

  forecastHTML = forecastHTML + `
  <div class="col-3">
  <div class="date">${formatDay(forecastDay.dt)}</div>
  <div class="icon"><img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="70px"/></div>
  <div class="temp">
  <span class="weather-forecast-max">${Math.round(forecastDay.temp.max)}°</span> / 
  <span class="weather-forcast-min">${Math.round(forecastDay.temp.min)}°</span>
  </div>
</div>`;
    }
});

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;

}

function getForecast(coordinates) {
  let apiKey ="dc3dd8fad72c3a037e39c29f90d88da6";
  let apiForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiForecastUrl).then(displayForecast);
  }

function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#temperature");
  temperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(temperature);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let tempHigh = document.querySelector("#tempHigh");
  tempMax = response.data.main.temp_max;
  tempHigh.innerHTML = Math.round(tempMax);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  
  weatherImage.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
  weatherImage.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey ="dc3dd8fad72c3a037e39c29f90d88da6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchCityElement = document.querySelector("#searchCity");
  search(searchCityElement.value);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey ="dc3dd8fad72c3a037e39c29f90d88da6";
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=dc3dd8fad72c3a037e39c29f90d88da6`;
  axios.get(apiUrl).then(displayTemperature);
}

navigator.geolocation.getCurrentPosition(showPosition);
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
  tempHigh.innerHTML = Math.round((tempMax * 9) / 5 + 32);
}

function displayCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(temperature);
  tempHigh.innerHTML = Math.round(tempMax);
}

let temperature = null;
