let current = new Date();
let ul = document.querySelector("ul");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

let currentDay = days[current.getDay()];
let currentTime = current.toLocaleTimeString();

ul.innerHTML = `${currentDay} ${currentTime}`;

function citySearch(response) {
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.name;
  let newTemp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${newTemp}`;
}

function cityName(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  cityInput.innerHTML = "cityInput.value";
  let city = `${cityInput.value}`;
  let units = "metric";
  let apiKey = "e5589c9e52b1240bf60acb6fbca63553";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl})&appid=${apiKey}`).then(citySearch);
}

let form = document.querySelector("form");
form.addEventListener("submit", cityName);

function currentTemperature(response) {
  let h2 = document.querySelector("h2");
  let temperature = document.querySelector("#temperature");
  let weatherDescription = document.querySelector("#weather-description");
  let precipitation = document.querySelector("#precipitation");
  let windSpeed = document.querySelector("#wind-speed");
  let icon = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  h2.innerHTML = response.data.name;
  temperature.innerHTML = Math.round(celsiusTemperature);
  weatherDescription.innerHTML = response.data.weather[0].description;
  precipitation.innerHTML = response.data.rain;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function getLocation(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let units = "metric";
  let apiKey = "e5589c9e52b1240bf60acb6fbca63553";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}
`;

  axios.get(apiUrl).then(currentTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}
let locationButton = document.querySelector("#location");
locationButton.addEventListener("click", getCurrentLocation);

function showFahrenheittemp(event) {
  event.preventDefault();
  celsiusLink.classLink.remove("active");
  fahrenheitLink.classList.add("active");
  let temperature = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiustemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheittemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiustemp);
