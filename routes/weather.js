const express = require('express');
const router = express.Router();
// const weather = require('../weather.js');
const weather = require('../weather2.js');

router.post('/', async (request, response) => {
  try {
    const city = request.body.city;
    const temp = await weather.getTemp(city);
    response.render('weather', temp);
  } catch (error) {
    console.log(error);
  }
});

// router.post('/', (request, response) => {
//   const city = request.body.city;
//   weather.getTemp(city)
//     .then(function(a) {
//       response.render('weather', a);
//     })
//     .catch(function(error) {
//       console.log(error);
//     })
// });
module.exports = router;
