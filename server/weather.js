// TODO: Weather Feature (in progress)

const axios = require('axios');
const { WEATHER_API, GEO_API } = require('../config');
const { Trip, TripUser, User } = require('./db');

const _ = undefined;

// Returns total number of days between 2 'YYYY-MM-DD' string dates
const compareISODates = (date1 = new Date().toISOString().slice(0, 10), date2) => (
  (new Date(date2) - new Date(date1)) / 86400000
);
// Helper functions for converting data received from weather API
const toISO = (date) => new Date(date * 1000).toISOString().slice(0, 10);
const toDegF = (temp) => Math.floor((temp - 273) * (9 / 5) + 32);

// Gets users on each trip to alert them of bad weather
const alertUsers = async (trips) => {
  let userIds = trips.map((trip) => TripUser.findOne({ where: { trip_id: trip.id }, raw: true }));
  await Promise.all(userIds)
    .then((response) => {
      userIds = response;
    })
    .catch((err) => console.warn(err));
  let users = userIds.map((userId) => User.findOne(
    { where: { googleId: userId.user_id }, raw: true },
  ));
  await Promise.all(users)
    .then((response) => {
      users = response;
    })
    .catch((err) => console.warn(err));
  console.info(users);
};

// Gets weather data from array of trips
const getWeather = async (trips, weatherOnly = true) => {
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
    })
    .catch((err) => console.warn(err));
  let results;
  await Promise.all(weatherData)
    .then((res) => {
      results = res.map(({ data }, i) => {
        const trip = { ...trips[i], rain: false };
        const dates = {};
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
          const { weather, temp } = day;
          const forecast = { weather: weather[0].main,
            temp: {
              low: toDegF(temp.min),
              high: toDegF(temp.max),
            } };
          const date = toISO(day.dt);
          dates[date] = forecast;
          if (dates[date] === 'Rain') {
            trip.rain = true; // TRIP HAS RAIN ON THIS DATE
          }
        });
        trip.forecast = dates;
        return trip;
      });
    })
    .catch((err) => console.warn(err));
  return weatherOnly ? results : alertUsers(results);
};

// Gets all trips from DB that will have weather info available based on dates
const getTrips = async () => {
  let trips = await Trip.findAll({ raw: true });
  trips = trips.filter((trip) => {
    const date = compareISODates(_, trip.start_date) < 0 ? trip.end_date : trip.start_date;
    const diff = compareISODates(_, date);
    return diff >= 0 && diff <= 7;
  });
  getWeather(trips, false);
};

module.exports = {
  getWeather,
  getTrips,
};
