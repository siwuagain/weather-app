getWeatherInfo('montreal');

const locationInput = document.getElementById('location-input');
const searchSubmit = document.getElementById('search');

console.log(locationInput.value)

searchSubmit.addEventListener('click', () => {
  console.log(locationInput.value)
  getWeatherInfo(locationInput.value)
})

locationInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    getWeatherInfo(locationInput.value)
  }
})

async function getWeatherInfo(location) {
  
  const geocodingResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=64206d65bc341529c8fea8f9158d50d4`, {mode: 'cors'});

  console.log(geocodingResponse)
  
  const geocodingData = await geocodingResponse.json();

  console.log(geocodingData)

  const locationName = document.getElementById('location-name')

  locationName.textContent = `${geocodingData[0].name}, ${geocodingData[0].state}`



  const latCoord = geocodingData[0].lat;

  const lonCoord = geocodingData[0].lon;

  console.log(latCoord)

  const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latCoord}&lon=${lonCoord}&exclude=minutely&appid=64206d65bc341529c8fea8f9158d50d4&units=metric`, {mode: 'cors'});

  const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latCoord}&lon=${lonCoord}&exclude=minutely&appid=64206d65bc341529c8fea8f9158d50d4&units=metric`, {mode: 'cors'});

  const weatherData = await weatherResponse.json();
  
  console.log(weatherData)

  const forecastData = await forecastResponse.json();

  console.log(forecastData)

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  function convertUnix(unixTime, timezoneValue) {

    const dateInfo = {}

    const dateFromUnix = new Date((unixTime + timezoneValue) * 1000)

    //console.log(dateFromUnix)
    
    const dateHours = String(dateFromUnix.getUTCHours());

    //console.log(dateHours)

    const dateMinutes = String(dateFromUnix.getUTCMinutes());

    //console.log(dateMinutes)

    dateInfo.timeofrequest = dateHours.padStart(2, '0') + ':' + dateMinutes.padStart(2, '0');

    dateInfo.date = `${months[dateFromUnix.getMonth()]} ${dateFromUnix.getDate()}`
    
    dateInfo.dayofweek = weekdays[dateFromUnix.getDay()]

    return dateInfo;
  }



  const showTime = document.getElementById('time');

  showTime.textContent = `${convertUnix(weatherData.dt, weatherData.timezone).timeofrequest}`

  const currentWeather = document.getElementById('current-weather');

  currentWeather.textContent = `${weatherData.weather[0].main}`;

  const currentWeatherDisplay = document.getElementById('current-weather-icon')

  console.log(currentWeatherDisplay)

  currentWeatherDisplay.src = `images/${weatherData.weather[0].icon}.png`


  const currentWeatherDescription = document.getElementById('current-weather-description');

  console.log(currentWeatherDescription)
  
  currentWeatherDescription.textContent = `${weatherData.weather[0].description}`;

  const currentTemp = document.getElementById('current-temp');

  console.log(currentTemp)
  
  currentTemp.textContent = `${weatherData.main.temp} \u00B0C`
  
  console.log(currentTemp)



  const feelsLikeTemp = document.getElementById('feels-like')
  
  feelsLikeTemp.textContent = `Feels Like: \n ${weatherData.main.feels_like} \u00B0C`;

  const currentHumidity = document.getElementById('humidity');
  
  currentHumidity.textContent = `Humidity: \n ${weatherData.main.humidity} %`;

  const windSpeed = document.getElementById('wind-speed');
  
  windSpeed.textContent = `Wind Speed: \n ${weatherData.wind.speed} m/s`;

  const forecastDate = document.querySelectorAll('.forecast-date-info');

  const maxTempOfForecastDay = document.querySelectorAll('.max-temp')

  const minTempOfForecastDay = document.querySelectorAll('.min-temp')

  const forecastWeatherDisplay = document.querySelectorAll('.forecast-weather-icon')

  for (let i=0; i < 5; i++) {

    const forecastDateInfo = convertUnix(forecastData.list[i*8].dt, weatherData.timezone)

    console.log(i)

    forecastDate[i].textContent = `${forecastDateInfo.dayofweek} \r\n ${forecastDateInfo.date} \r\n ${forecastDateInfo.timeofrequest}`

    maxTempOfForecastDay[i].textContent = `${forecastData.list[i*8].main.temp_max} \u00B0C`

    minTempOfForecastDay[i].textContent = `${forecastData.list[i*8].main.temp_min} \u00B0C`;

    forecastWeatherDisplay[i].src = `images/${forecastData.list[i*8].weather[0].icon}.png`
  }

}



