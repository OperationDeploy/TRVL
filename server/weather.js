const axios = require('axios');
const { WEATHER_API } = require('../config');
const { Trip } = require('./db');

const getWeather = async () => {
  let trips = await Trip.findAll({ raw: true });
  trips = trips.filter((trip) => trip.destination); // NEED TO FIND OUT WHY THERE ARE 2 ENTRIES AND ONE IS NULL FOR DESTINATION ETC
  const promises = trips.map(async (trip) => {
    const destination = trip.destination.split(' ');
    let state = destination.pop();
    let country = 'us';
    // const state = country === 'us' ? destination[1].slice(0, destination[1].length - 1) : null;
    const city = destination.join(' ');
    const query = state ? `${city}${state},${country}` : `${city}${country}`;
    console.log('the query', query, 'the state', state);
    return await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${query}&APPID=${WEATHER_API}`)
  });
  await Promise.all(promises)
    .then((response) => {
      response.forEach((forecast) => {
        console.log(forecast.data.city);

      });
      // const result = { city: data.city };
      // data.list.forEach((val) => {
      //   const date = val.dt_txt.split(' ')[0];
      //   if (!result[date]) {
      //     result[date] = val.weather[0].main === 'Rain';
      //   }
      // });
      // console.info(result);
    });
  // .then(({ data }) => {
  //   const result = { city: data.city };
  //   data.list.forEach((val) => {
  //     const date = val.dt_txt.split(' ')[0];
  //     if (!result[date]) {
  //       result[date] = val.weather[0].main === 'Rain';
  //     }
  //   });
  //   console.info(result);
  // });
};

getWeather();

module.exports = {
  getWeather,
};
