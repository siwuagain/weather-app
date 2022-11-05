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
    
    const dateHours = String(dateFromUnix.getHours());

    const dateMinutes = String(dateFromUnix.getMinutes());

    const timeOfRequest = dateHours.padStart(2, '0') + ':' + dateMinutes.padStart(2, '0');

    return timeOfRequest;
  }


  console.log(convertUnix(weatherData.dt, weatherData.timezone))

  
}

getWeatherInfo('new york')