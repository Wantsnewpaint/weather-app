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

let hour = now.getHours();
if (hour < 10) {
    hour = `0${hour}`;
  };
let minutes = now.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
  };

  let h2 = document.querySelector("h2");
  h2.innerHTML = `${day} ${month} ${hour}:${minutes}`;



function search(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input")
    let h5 = document.querySelector("#mainCity");
    h5.innerHTML = `Searching for ${searchInput.value} ...`;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);