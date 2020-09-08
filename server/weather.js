// TODO: Weather Feature (in progress)

const axios = require('axios');
const { WEATHER_API, GEO_API } = require('../config');
const { Trip } = require('./db');

const getWeather = async () => {
  let trips = await Trip.findAll({ raw: true });
  trips = trips.filter((trip) => trip.destination);
  // NEED TO FIND OUT WHY THERE ARE 2 ENTRIES AND ONE IS NULL FOR DESTINATION ETC
  const coordinates = trips.map((trip) => {
    const destination = trip.destination.split(' ');
    let state = destination.pop();
    let country = 'us';
    if (state === 'Mexico') {
      country = 'mx';
      state = null;
    }
    if (state === 'Canada') {
      country = 'ca';
      state = null;
    }
    const city = destination.join(' ');
    const query = state ? `${city}${state},${country}` : `${city}${country}`;
    console.info('the query', query, 'the state', state);
    return axios.get(`http://api.positionstack.com/v1/forward?access_key=${GEO_API}&query=${query}&limit=1`);
  });
  let weatherData;
  await Promise.all(coordinates)
    .then((res) => {
      weatherData = res.map((response) => {
        const { data } = response.data;
        return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${data[0].latitude}&lon=${data[0].longitude}&
        exclude=minutely,hourly&appid=${WEATHER_API}`);
      });
    });
  await Promise.all(weatherData)
    .then((res) => {
      const result = res.map(({ data }, i) => {
        const city = { name: trips[i].destination };
        const forecast = {};
        data.daily.forEach((day) => {
          const date = new Date(day.dt * 1000).toString().slice(4, 15);
          forecast[date] = day.weather[0].main;
          city.forecast = forecast;
        });
        return city;
      });
      console.info(result);
    });
};

getWeather();

module.exports = {
  getWeather,
};
