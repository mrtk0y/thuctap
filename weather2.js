const express = require('express');
const fetch = require('node-fetch');

function getCelsius(kelvin) {
  const celsius = kelvin - 273;
  return Math.round(celsius);
}

function getTemp(city) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=27e8a192a08c2cb50fc6139144dcd6fe`
  )
    .then(checkStatus)
    .then(response => response.json())
    .then(data => {
      const values = {
        temp: getCelsius(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        timezone: data.timezone
      };

      try {
        informations = {
          city: city,
          temp: values.temp,
          humidity: values.humidity,
          windSpeed: values.windSpeed,
          timezone: values.timezone
        };
      } catch (error) {
        return Promise.reject(informations);
      }
      return Promise.resolve(informations);
    })
    .catch(error => console.log('problems', error));
}

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

module.exports.getTemp = getTemp;
