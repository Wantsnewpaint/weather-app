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

function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let realFeel = document.querySelector("#realFeel");
  realFeel.innerHTML = Math.round(response.data.main.feels_like);
  
  weatherImage.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
  weatherImage.setAttribute("alt", response.data.weather[0].description);
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

search("Montevideo");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);