const axios = require('axios');

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER } = process.env;
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const { WEATHER_API, GEO_API } = require('../config');
const { Trip, TripUser, User } = require('./db');

// Measures total number of days between 2 'YYYY-MM-DD' string dates
const compareISODates = (date1, date2) => {
  const today = date1 === 'today' ? new Date().toISOString().slice(0, 10) : null;
  return (new Date(date2) - new Date(today || date1)) / 86400000;
};
// Converts data received from weather API for readability
const toISO = (date) => new Date(date * 1000).toISOString().slice(0, 10);
const toDegF = (temp) => Math.floor((temp - 273) * (9 / 5) + 32);

// Determines if any dates of trip are within range of 7 day forecast
const isWithinRange = (trip) => {
  const end = compareISODates('today', trip.end_date);
  const start = compareISODates('today', trip.start_date);
  return end >= 0 && start <= 7;
};

// Finds users on trips and alerts them of bad weather
const alertUsersOnTrips = async (trips) => {
  const userTrip = {};

  let tripUsers = trips.map((trip) => TripUser.findAll({ where: { trip_id: trip.id }, raw: true }));
  await Promise.all(tripUsers)
    .then((response) => {
      tripUsers = response;
    })
    .catch((err) => console.warn(err));

  tripUsers.forEach((tripUserArr, i) => {
    tripUserArr.forEach((tripUser) => {
      if (tripUser.user_id in userTrip) {
        userTrip[tripUser.user_id].push(trips[i]);
      } else {
        userTrip[tripUser.user_id] = [trips[i]];
      }
    });
  });

  let users = Object.keys(userTrip).map((googleId) => User.findOne({
    where: { googleId },
    raw: true,
  }));
  await Promise.all(users)
    .then((response) => {
      users = response;
    })
    .catch((err) => console.warn(err));

  const notifications = users.map((user) => {
    const tripStr = userTrip[user.googleId].map((trip) => trip.name).join(',');
    return client.messages.create({
      from: TWILIO_PHONE_NUMBER,
      to: user.phoneNumber,
      body: `The following of your trips may have inclement weather ahead: ${tripStr}.
Check TRVL app for more info.`,
    });
  });
  Promise.all(notifications);
};

// Updates trips in database with weather alert boolean
const updateTrips = async (updated, original) => {
  const trips = updated.filter((trip, i) => trip.weather_alert !== original[i].weather_alert);
  const updateDB = trips.map((trip) => Trip.update(
    {
      weather_alert: trip.weather_alert,
    },
    { where: { id: trip.id } },
  ));

  await Promise.all(updateDB);
  alertUsersOnTrips(trips);
};

// Gets coordinates from a location string
const getCoordinates = async (location) => {
  const coordinates = await axios.get(
    `https://geocoder.ls.hereapi.com/search/6.2/geocode.json?languages=en-US&maxresults=1&searchtext=${location}&apiKey=${GEO_API}`,
  );
  return coordinates.data.Response.View[0].Result[0].Location.NavigationPosition[0];
};

// Gets weather data from array of trips
const getWeather = async (allTrips, weatherOnly = true) => {
  const trips = allTrips.filter(isWithinRange);
  const coordinates = trips.map((trip) => getCoordinates(trip.destination));
  let weatherData;
  await Promise.all(coordinates)
    .then((res) => {
      weatherData = res.map((loc) => axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${loc.Latitude}&lon=${loc.Longitude}&
        exclude=minutely,hourly&appid=${WEATHER_API}`));
    })
    .catch((err) => console.warn(err));
  let results;
  await Promise.all(weatherData)
    .then((res) => {
      results = res.map(({ data }, i) => {
        const trip = { ...trips[i] };
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
          const forecast = {
            weather: weather[0].main,
            temp: {
              low: toDegF(temp.min),
              high: toDegF(temp.max),
            },
            icon: `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
          };
          const date = toISO(day.dt);
          dates[date] = forecast;
          if (weather[0].main === 'Rain') {
            trip.weather_alert = true; // TRIP HAS RAIN ON THIS DATE
            trip.alertDates = trip.alertDates ? trip.alertDates.concat(date) : [date];
          }
        });
        trip.forecast = dates;
        return trip;
      });
    })
    .catch((err) => console.warn(err));
  return weatherOnly ? results : updateTrips(results, trips);
};

// Initializes weather update process for entire database
const weatherUpdate = async () => {
  const trips = await Trip.findAll({ raw: true });
  getWeather(trips, false);
};

module.exports = {
  getWeather,
  weatherUpdate,
  getCoordinates,
};
