const axios = require('axios');
const { WEATHER_API } = require('../config');

const city = 'los angeles';
const state = 'ca';
const country = 'us';

const query = state ? `${city},${state},${country}` : `${city},${country}`;

axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${query}&APPID=${WEATHER_API}`)
  .then(({ data }) => {
    const result = { city: data.city };
    data.list.forEach((val) => {
      const date = val.dt_txt.split(' ')[0];
      if (!result[date]) {
        result[date] = val.weather[0].main === 'Rain';
      }
    });
    console.info(result);
  });
