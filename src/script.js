function displayWeatherCondition(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");



  fahrenheitTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
 
  
  getForecast(response.data.coord);
  
}


function getForecast(coordinates){
  let apiKey = "616cd13531829d29dc851eac29d80546";
  let apiUrl = 
  `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

  
  axios.get(apiUrl).then(displayForecast);
}



  function formatDay(timestamp){
  let date = new Date (timestamp * 1000);
  let day = date.getDay();
  let days = [ "Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];

  }

  function displayForecast(response){
    let forecast = response.data.daily;
    
    let forecastElement = document.querySelector("#forecast");
    
   let forecastHTML = `<div class="row">`;
   forecast.forEach(function (forecastDay, index) {

    if (index < 5) {
    
    
  forecastHTML= forecastHTML + 
          `
            <div class="col-2">
            <div class="weather-forecast-date">${formatDay(forecastDay.dt)}
            </div>
            <img src = 
             "http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
             alt="" width="42"/>
                            <div class="weather-forecast-temp">
                                <span class="temp-max"> ${Math.round(forecastDay.temp.max)}</span>
                                <span class ="temp-min">${Math.round(forecastDay.temp.min)}</span>
                            </div>
                        </div>
                    `;
  }
                    
    });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}


function searchCity(city) {
  let apiKey = "616cd13531829d29dc851eac29d80546";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "616cd13531829d29dc851eac29d80546";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);



let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let dayList = now.getDay();
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

let currentTime = document.querySelector("#date-time");
currentTime.innerHTML = `${days[dayList]} ${hours}:${minutes}`;

searchCity("Austin");
