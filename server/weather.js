// TODO: Weather Feature (in progress)

const axios = require('axios');
const { WEATHER_API, GEO_API } = require('../config');
const { Trip } = require('./db');

const compareISODates = (date1, date2 = new Date().toISOString().slice(0, 10)) => (
  Math.abs(new Date(date1) - new Date(date2)) / 86400000
);

const toISO = (date) => new Date(date * 1000).toISOString().slice(0, 10);

const getWeather = async () => {
  let trips = await Trip.findAll({ raw: true });
  trips = trips.filter((trip) => compareISODates(trip.start_date) <= 7);

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
        const trip = { name: trips[i].name, location: trips[i].destination, rain: false };
        const forecast = {};
        let startIndex = 0;
        const tripLength = compareISODates(trips[i].start_date, trips[i].end_date);
        for (let j = 0; j < data.daily.length; j += 1) {
          if (toISO(data.daily[j].dt) === trips[i].start_date) {
            startIndex = j;
            break;
          }
        }
        const days = data.daily.slice(startIndex, startIndex + tripLength);
        days.forEach((day) => {
          const date = toISO(day.dt);
          forecast[date] = day.weather[0].main;
          if (forecast[date] === 'Rain') {
            trip.rain = true; // TRIP HAS RAIN ON THIS DATE
          }
        });
        trip.forecast = forecast;
        return trip;
      });
      console.info(result);
    });
};

getWeather();

module.exports = {
  getWeather,
};
