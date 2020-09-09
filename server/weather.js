// TODO: Weather Feature (in progress)

// const axios = require('axios');
// const { WEATHER_API, GEO_API } = require('../config');
// const { Trip, } = require('./db');

// // const getWeather = async () => {
// //   let trips = await Trip.findAll({ raw: true });
// //   trips = trips.filter((trip) => trip.destination);
// //   // NEED TO FIND OUT WHY THERE ARE 2 ENTRIES AND ONE IS NULL FOR DESTINATION ETC
// //   const promises = trips.map((trip) => {
// //     const destination = trip.destination.split(' ');
// //     let state = destination.pop();
// //     let country = 'us';
// //     if (state === 'Mexico') {
// //       country = 'mx';
// //       state = null;
// //     }
// //     if (state === 'Canada') {
// //       country = 'ca';
// //       state = null;
// //     }
// //     const city = destination.join(' ');
// //     const query = state ? `${city}${state},${country}` : `${city}${country}`;
// //     console.info('the query', query, 'the state', state);
// //     return axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${query}&APPID=${WEATHER_API}`);
// //   });
// //   await Promise.all(promises)
// //     .then((response) => {
// //       response.forEach(({ data }) => {
// //         const { list, city } = data;
// //         const result = { city };
// //         list.forEach((val) => {
// //           const date = val.dt_txt.split(' ')[0];
// //           if (!result[date]) {
// //             console.info(val.dt_txt, val.weather[0].main);
// //             result[date] = val.weather[0].main === 'Rain';
// //           }
// //         });
// //         console.info(result);
// //       });
// //     });
// // };

// // getWeather();

// // axios.get(`http://api.positionstack.com/v1/forward?access_key=${GEO_API}&query=New Orleans,LA`)
// //   .then(({ data }) => {
// //     console.log(data.data[0].latitude, data.data[0].longitude);
// //   });

// axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&
//   exclude=minutely,hourly&appid=${WEATHER_API}`)
//   .then(({ data }) => {
//     data.daily.forEach((day) => {
//       const date = new Date(day.dt * 1000);
//       console.log(date.toUTCString(), day.weather);
//     });
//   });

// module.exports = {
//   // getWeather,
// };
