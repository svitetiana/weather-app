//Current Time Display
let currentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];
let hour = currentTime.getHours();
let minutes = currentTime.getMinutes();

let time = document.querySelector("#current-time");
time.innerHTML = `${day}, ${hour}:${minutes}`;

//Search engine

function displayTemperature(response) {
  let temperatureValue = Math.round(response.data.main.temp);
  let tempMain = document.querySelector("#now-temp");
  tempMain.innerHTML = `${temperatureValue}`;
  let weatherInCity = document.querySelector("#city");
  weatherInCity.innerHTML = response.data.name;
}

function search(event) {
  event.preventDefault();

  let input = document.querySelector("#city-form-input");
  let weatherInCity = document.querySelector("#city");

  if (input.value) {
    weatherInCity.innerHTML = `${input.value}`;
    let apiKey = "2e8a4b45b375acbabf901bd141fc3608";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayTemperature);
  } else {
    weatherInCity.innerHTML = null;
  }
}

let searchButton = document.querySelector("#city-form");
searchButton.addEventListener("submit", search);

//Show weather in the current city

function getCurrentCityTemp(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "2e8a4b45b375acbabf901bd141fc3608";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentCityTemp);
}

let currentWeatherButton = document.querySelector("#current-location-button");
currentWeatherButton.addEventListener("click", getCurrentPosition);
