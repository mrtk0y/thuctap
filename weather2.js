const express = require('express');
const fetch = require('node-fetch');


// function fetchData(url){
  
//     .then(data => getTemp(data))
// }
function getCelsius(kelvin) {
  const celsius = kelvin - 273;
  return Math.round(celsius);
}

function getTemp(city){
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=27e8a192a08c2cb50fc6139144dcd6fe`)
  .then(checkStatus)
  .then(response => response.json())
  .then(data => {
      // console.log(data);
    const values = {
      temp: getCelsius(data.main.temp),
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      timezone: data.timezone
    }
    console.log(values);
    try{
      informations = {
        city: city,
        temp: values.temp,
        humidity: values.humidity,
        windSpeed: values.windSpeed,
        timezone: values.timezone
      };
    } catch(error) {
      console.log(error);
      
    }
  })
  .catch(error => console.log('problems', error))
}

function checkStatus(response) {
  if(response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}
    // console.log(city);
  // return new Promise((resolve, reject) => {
  //   let body = "";
  //   response.on("data", data1 => {
  //     body += data1.toString();
  //     console.log(body);
  //   })
  // })

module.exports.getTemp = getTemp;
