// const express = require('express');
// const http = require('http');
// const https = require('https');

function fetchData(url){
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=27e8a192a08c2cb50fc6139144dcd6fe`)
    .then(response => response.json())
    .then(data => getTemp(data))

}
// fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=27e8a192a08c2cb50fc6139144dcd6fe`)
//   .then(response => response.json())
//   .then(data => console.log(data))

function getTemp(city){
  return console.log(city);
}

module.exports.getTemp = getTemp;
