let now = new Date();
let h6 = document.querySelector("h6");
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
h6.innerHTML = `${day} ${hours}:${minutes}`;

function followF(event) {
    event.preventDefault();
    let link = document.querySelector(".mainTemp");
    link.innerHTML ="66°"
}
let followLink = document.querySelector("#fahrenheit-link");
followLink.addEventListener("click", followF);

function followC(event) {
    event.preventDefault();
    let link = document.querySelector(".mainTemp");
    link.innerHTML ="18°"
}
let followLink2 = document.querySelector("#celsius-link");
followLink2.addEventListener("click", followC);

function search(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input")
    let h5 = document.querySelector("#mainCity");
    h5.innerHTML = `Searching for ${searchInput.value} ...`;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);