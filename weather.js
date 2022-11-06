async function getWeatherInfo(location) {
  
  const geocodingResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=64206d65bc341529c8fea8f9158d50d4`, {mode: 'cors'});

  console.log(geocodingResponse)
  
  const geocodingData = await geocodingResponse.json();

  console.log(geocodingData)

  const latCoord = geocodingData[0].lat;

  const lonCoord = geocodingData[0].lon;

  console.log(latCoord)

  const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latCoord}&lon=${lonCoord}&exclude=minutely&appid=64206d65bc341529c8fea8f9158d50d4`, {mode: 'cors'});

  const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latCoord}&lon=${lonCoord}&exclude=minutely&appid=64206d65bc341529c8fea8f9158d50d4`, {mode: 'cors'});

  const weatherData = await weatherResponse.json();
  
  console.log(weatherData)

  const forecastData = await forecastResponse.json();

  console.log(forecastData)

  function convertUnix(unixTime, timezoneValue) {

    const dateFromUnix = new Date((unixTime + timezoneValue) * 1000)

    //console.log(dateFromUnix)
    
    const dateHours = String(dateFromUnix.getUTCHours());

    //console.log(dateHours)

    const dateMinutes = String(dateFromUnix.getUTCMinutes());

    //console.log(dateMinutes)

    const timeOfRequest = dateHours.padStart(2, '0') + ':' + dateMinutes.padStart(2, '0');

    return timeOfRequest;
  }



  const showTime = document.getElementById('time');

  showTime.textContent = `${convertUnix(weatherData.dt, weatherData.timezone)}`

  const currentWeatherDisplay = document.getElementById('current-weather');

  currentWeatherDisplay.textContent = `${weatherData.weather[0].main}`

  const currentWeatherDescription = weatherData.weather.description;

  const currentTemp = weatherData.main.temp
  
  console.log(currentTemp)

  const feelsLikeTemp = weatherData.main.feels_like;

  const currentHumidity = weatherData.main.humidity;

  const windSpeed = weatherData.wind.speed;

  for (let i=0; i < forecastData.list.length; i+=8) {
    console.log(i)
    console.log(convertUnix(forecastData.list[i].dt, weatherData.timezone))

    const forecastMainTemp = forecastData.list[i].main.temp;

    console.log(forecastMainTemp)

    const forecastWeather = forecastData.list[i].weather[0].main

    console.log(forecastWeather)
  }

  

  
}

const locationInput = document.getElementById('city');



getWeatherInfo('london')